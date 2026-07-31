#!/usr/bin/env python3
"""Build faithful, web-ready signature assets from the supplied client artwork."""

from __future__ import annotations

import argparse
import base64
from io import BytesIO
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter


NOISE_FLOOR = 2.0
TRANSPARENT_PADDING = 24


def remove_white_matte(source: Image.Image) -> Image.Image:
    """Recover foreground color and alpha from artwork flattened on near-white."""

    rgb = np.asarray(source.convert("RGB"), dtype=np.float32)
    border_width = min(12, source.width // 4, source.height // 4)
    border = np.concatenate(
        (
            rgb[:border_width, :, :].reshape(-1, 3),
            rgb[-border_width:, :, :].reshape(-1, 3),
            rgb[:, :border_width, :].reshape(-1, 3),
            rgb[:, -border_width:, :].reshape(-1, 3),
        ),
        axis=0,
    )
    matte_level = float(np.median(border))
    distance = np.max(np.maximum(matte_level - rgb, 0), axis=2)
    alpha = np.clip(
        (distance - NOISE_FLOOR) / (matte_level - NOISE_FLOOR),
        0,
        1,
    )

    # JPEG ringing produces isolated, nearly invisible dots in otherwise empty
    # space. Remove only weak components small enough to be compression noise.
    weak_mask = (alpha > 0) & (alpha < 0.05)
    try:
        from scipy import ndimage

        labels, count = ndimage.label(weak_mask)
        if count:
            sizes = np.bincount(labels.ravel())
            tiny_labels = np.flatnonzero(sizes <= 8)
            if tiny_labels.size:
                alpha[np.isin(labels, tiny_labels)] = 0
    except ImportError:
        # The matte calculation remains safe without SciPy; this fallback only
        # removes the faintest possible JPEG noise.
        alpha[alpha < 0.008] = 0

    safe_alpha = np.maximum(alpha[..., None], 1e-12)
    foreground = np.clip(
        (rgb - matte_level * (1 - safe_alpha)) / safe_alpha,
        0,
        255,
    )
    foreground[alpha == 0] = 0

    rgba = np.dstack(
        (
            np.rint(foreground).astype(np.uint8),
            np.rint(alpha * 255).astype(np.uint8),
        )
    )
    return Image.fromarray(rgba, mode="RGBA")


def trim_with_padding(image: Image.Image, padding: int = TRANSPARENT_PADDING) -> Image.Image:
    """Trim empty canvas while retaining a guaranteed transparent safety edge."""

    alpha = image.getchannel("A")
    bbox = alpha.point(lambda value: 255 if value > 1 else 0).getbbox()
    if bbox is None:
        raise ValueError("The processed image contains no visible artwork.")

    cropped = image.crop(bbox)
    output = Image.new(
        "RGBA",
        (cropped.width + padding * 2, cropped.height + padding * 2),
        (0, 0, 0, 0),
    )
    output.alpha_composite(cropped, (padding, padding))
    return output


def extract_signature_mark(image: Image.Image) -> Image.Image:
    """Extract the handwritten name, underline, and scale icon for small placements."""

    alpha = np.asarray(image.getchannel("A"))
    visible_rows = np.any(alpha > 5, axis=1)
    first_row = int(np.flatnonzero(visible_rows)[0])
    last_row = int(np.flatnonzero(visible_rows)[-1])

    gaps: list[tuple[int, int]] = []
    gap_start: int | None = None
    for row in range(first_row, last_row + 1):
        if not visible_rows[row] and gap_start is None:
            gap_start = row
        elif visible_rows[row] and gap_start is not None:
            gaps.append((gap_start, row - 1))
            gap_start = None

    candidates = [
        gap
        for gap in gaps
        if gap[0] > image.height * 0.45
        and gap[1] < image.height * 0.78
        and gap[1] - gap[0] >= 12
    ]
    if not candidates:
        raise ValueError("Could not find the safe gap below the signature mark.")

    split_start, split_end = max(candidates, key=lambda gap: gap[1] - gap[0])
    split_row = (split_start + split_end) // 2
    return trim_with_padding(image.crop((0, 0, image.width, split_row)))


def save_png(image: Image.Image, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    image.save(destination, format="PNG", optimize=True)


def create_hybrid_svg(image: Image.Image, destination: Path) -> None:
    """Wrap the faithful raster master in scalable SVG depth/highlight filters."""

    buffer = BytesIO()
    image.save(buffer, format="PNG", optimize=True)
    encoded = base64.b64encode(buffer.getvalue()).decode("ascii")
    width, height = image.size

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title desc">
  <title id="title">Ahmed Raafat signature logo</title>
  <desc id="desc">Faithful transparent signature artwork with a restrained gold edge and soft dimensional shadow.</desc>
  <defs>
    <filter id="premium-depth" x="-8%" y="-10%" width="116%" height="125%" color-interpolation-filters="sRGB">
      <feMorphology in="SourceAlpha" operator="dilate" radius="1.1" result="edge"/>
      <feFlood flood-color="#8d6a10" flood-opacity=".48" result="gold"/>
      <feComposite in="gold" in2="edge" operator="in" result="gold-edge"/>
      <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur"/>
      <feOffset in="blur" dx="4" dy="7" result="offset-blur"/>
      <feFlood flood-color="#071827" flood-opacity=".28" result="navy"/>
      <feComposite in="navy" in2="offset-blur" operator="in" result="shadow"/>
      <feMerge>
        <feMergeNode in="shadow"/>
        <feMergeNode in="gold-edge"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <image width="{width}" height="{height}" filter="url(#premium-depth)" href="data:image/png;base64,{encoded}"/>
</svg>
"""
    destination.write_text(svg, encoding="utf-8")


def create_og_image(logo: Image.Image, destination: Path) -> None:
    """Compose a premium 1200×630 social preview from the approved brand asset."""

    width, height = 1200, 630
    top = np.array([7, 24, 39], dtype=np.float32)
    bottom = np.array([11, 31, 51], dtype=np.float32)
    gradient = np.zeros((height, width, 3), dtype=np.uint8)
    for row in range(height):
        progress = row / (height - 1)
        gradient[row, :, :] = np.rint(top * (1 - progress) + bottom * progress)

    canvas = Image.fromarray(gradient, mode="RGB").convert("RGBA")

    shadow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    panel_box = (62, 53, 1138, 577)
    shadow_draw.rounded_rectangle(
        (panel_box[0] + 8, panel_box[1] + 12, panel_box[2] + 8, panel_box[3] + 12),
        radius=34,
        fill=(0, 0, 0, 92),
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(20))
    canvas.alpha_composite(shadow)

    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle(
        panel_box,
        radius=34,
        fill=(248, 245, 239, 255),
        outline=(201, 162, 39, 190),
        width=2,
    )
    draw.line((105, 94, 1095, 94), fill=(201, 162, 39, 90), width=1)
    draw.line((105, 536, 1095, 536), fill=(201, 162, 39, 90), width=1)

    max_logo_width = 980
    max_logo_height = 410
    scale = min(max_logo_width / logo.width, max_logo_height / logo.height)
    resized = logo.resize(
        (round(logo.width * scale), round(logo.height * scale)),
        Image.Resampling.LANCZOS,
    )
    logo_x = (width - resized.width) // 2
    logo_y = (height - resized.height) // 2
    canvas.alpha_composite(resized, (logo_x, logo_y))

    destination.parent.mkdir(parents=True, exist_ok=True)
    canvas.convert("RGB").save(destination, format="PNG", optimize=True)


def validate_alpha_edges(image: Image.Image, label: str) -> None:
    alpha = np.asarray(image.getchannel("A"))
    edge_alpha = np.concatenate(
        (alpha[0, :], alpha[-1, :], alpha[:, 0], alpha[:, -1])
    )
    if np.any(edge_alpha):
        raise ValueError(f"{label} has nontransparent pixels on its outer edge.")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", required=True, type=Path)
    parser.add_argument("--three-d-alpha", required=True, type=Path)
    parser.add_argument(
        "--output-dir",
        default=Path("public/images"),
        type=Path,
    )
    args = parser.parse_args()

    original = Image.open(args.source).convert("RGB")
    transparent_full = trim_with_padding(remove_white_matte(original))
    transparent_mark = extract_signature_mark(remove_white_matte(original))

    three_d_source = Image.open(args.three_d_alpha).convert("RGBA")
    three_d_full = trim_with_padding(three_d_source, padding=32)
    three_d_mark = extract_signature_mark(three_d_source)

    outputs = {
        "sign-ahmed-transparent.png": transparent_full,
        "sign-ahmed-mark.png": transparent_mark,
        "sign-ahmed-3d.png": three_d_full,
        "sign-ahmed-3d-mark.png": three_d_mark,
    }
    for filename, image in outputs.items():
        validate_alpha_edges(image, filename)
        save_png(image, args.output_dir / filename)

    create_hybrid_svg(
        transparent_full,
        args.output_dir / "sign-ahmed-vector.svg",
    )
    create_og_image(
        three_d_full,
        args.output_dir / "ahmed-raafat-og.png",
    )

    for filename, image in outputs.items():
        alpha = np.asarray(image.getchannel("A"))
        print(
            f"{filename}: {image.width}x{image.height}, "
            f"visible={int(np.count_nonzero(alpha))}, "
            f"partial={int(np.count_nonzero((alpha > 0) & (alpha < 255)))}"
        )
    print("sign-ahmed-vector.svg: hybrid SVG using the faithful PNG master")
    print("ahmed-raafat-og.png: 1200x630")


if __name__ == "__main__":
    main()
