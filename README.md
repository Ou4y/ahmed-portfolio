# Ahmed Raafat — Corporate Lawyer Portfolio

A premium, bilingual single-page portfolio for Ahmed Raafat, a Corporate Lawyer and Legal Adviser with 10 years of experience in the legal field and corporate legal practice with IBS.

The site is a fully static React frontend. It presents strategic legal support for businesses, startups, investors, and multinational companies operating within the Egyptian commercial and corporate legal environment.

## Features

- English and Arabic content
- Correct LTR and RTL document direction
- Language preference saved on the visitor’s device
- Mobile-first responsive layout
- Sticky desktop and mobile navigation
- Smooth section navigation without React Router
- Supplied professional portrait of Ahmed Raafat
- Supplied signature branding with transparent and premium 3D treatments
- Four-second first-session signature intro with reduced-motion support
- Signature branding reused in the navbar, hero, footer, and social-preview asset
- Custom legal line art and a navy, cream, and gold design system
- Restrained Motion animations with reduced-motion support
- Data-driven practice areas, process, insight, and FAQ content
- Keyboard-accessible mobile menu and FAQ accordion
- Language-aware title and metadata
- Static WhatsApp, telephone, and email integration when verified details are configured
- Cloudflare Pages-compatible production output and response headers

## Page Sections

1. Hero
2. About
3. Practice areas
4. Experience highlight
5. Consultation process
6. Legal insights
7. FAQ
8. Contact
9. Footer and legal disclaimer

## Tech Stack

- React with JSX
- Vite
- Tailwind CSS
- Motion
- Lucide React
- React Helmet Async
- Oxlint
- Self-hosted variable fonts through Fontsource

There is no backend, database, CMS, admin panel, authentication, or form-submission service in version 1.

## Project Structure

```text
src/
├── components/
│   ├── layout/       # Navbar, footer, and SEO
│   ├── sections/     # One component for each page section
│   ├── ui/           # Reusable visual and interaction primitives
│   └── vectors/      # Decorative legal line art
├── data/             # Bilingual content and data collections
├── hooks/            # Language state and document direction
├── utils/            # WhatsApp URL builder
├── App.jsx           # Page composition
├── main.jsx          # React application entry point
└── index.css         # Tailwind, fonts, tokens, and global styles
```

`App.jsx` is intentionally kept small so it reads like a table of contents for the page.

## Local Development

Requirements:

- Node.js 20.19 or newer
- npm

Install and run:

```bash
npm install
npm run dev
```

Vite prints the local URL in the terminal.

## Available Commands

```bash
npm run dev      # Start the local development server
npm run lint     # Check the JSX and JavaScript source
npm run build    # Create the optimized production site in dist/
npm run check    # Run lint and the production build together
npm run preview  # Preview the generated dist/ output locally
```

## Contact Configuration

Ahmed’s verified public phone, WhatsApp, and email details are centralized in `src/data/site.js`:

```js
contact: {
  phone: '+20 106 214 2766',
  email: 'Ahmedraafat69@gmail.com',
  whatsapp: '+20 106 214 2766',
},
```

Keep future changes in this one configuration object. The contact section automatically renders working `tel:`, `mailto:`, and `wa.me` links. The WhatsApp utility removes formatting characters and URL-encodes the bilingual prefilled message.

## Language and RTL Support

The lightweight translation system lives in `src/data/translations.js`. Data-heavy collections use matching English and Arabic records in the other files under `src/data/`.

The four approved bilingual practice areas and their service lists live in `src/data/practiceAreas.js`, separate from the component that renders them.

`useLanguage`:

- starts in English when no preference exists;
- restores a valid saved preference from `localStorage`;
- updates the visible content;
- sets `<html lang="en" dir="ltr">` or `<html lang="ar" dir="rtl">`;
- saves future changes locally.

Arabic text uses a self-hosted Noto Sans Arabic variable font. Logical CSS properties such as `start`, `end`, `ps`, `pe`, and border-inline utilities allow the layout to adapt without duplicating components.

## Portrait Asset

The supplied portrait is stored at:

```text
public/images/ahmed-raafat.jpeg
```

It is loaded eagerly in the first viewport with explicit dimensions, a fixed aspect-ratio frame, and `object-fit: cover` so it is not stretched.

## Signature Brand Assets

The client-supplied JPEG is preserved unchanged at:

```text
public/images/sign-ahmed-original.jpeg
```

Production-ready derivatives live beside it:

```text
public/images/sign-ahmed-transparent.png
public/images/sign-ahmed-mark.png
public/images/sign-ahmed-3d.png
public/images/sign-ahmed-3d-mark.png
public/images/sign-ahmed-vector.svg
public/images/ahmed-raafat-og.png
```

The transparent PNG is the faithful master for light backgrounds. The 3D files
add restrained metallic depth and edge contrast for the navy brand surfaces.
The SVG is an explicitly hybrid, raster-backed filter treatment rather than a
claimed hand-traced vector. `scripts/process_signature_assets.py` contains the
repeatable deterministic matte-removal, trimming, SVG-wrapper, and social-card
finalization steps.

The script requires Python 3, Pillow, and NumPy; SciPy is optional and only
improves removal of isolated JPEG noise. It accepts the original JPEG and an
already-transparent 3D treatment produced by the visual-generation stage:

```bash
python3 scripts/process_signature_assets.py \
  --source public/images/sign-ahmed-original.jpeg \
  --three-d-alpha /absolute/path/to/sign-ahmed-3d-alpha.png
```

The generated 1200×630 social image is ready in the project and Helmet exposes
it at runtime. Static absolute Open Graph/Twitter image tags must still be
added after the production domain is confirmed; until then, live link-unfurl
support is not claimed.

The intro runs for four seconds on the first visit in a browser session, keeps
the full website mounted underneath, then restores scrolling and interaction.
Visitors who prefer reduced motion receive a brief static version instead.

## Production Build

Run:

```bash
npm run check
```

The deployable static output is created in `dist/`.

## Cloudflare Pages Deployment

Connect the GitHub repository to Cloudflare Pages and use these settings:

| Setting | Value |
| --- | --- |
| Framework preset | Vite |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | Leave blank |

The `public/_headers` file is copied into the build and adds caching and baseline security headers on Cloudflare Pages.

Before publishing:

1. Run `npm run check`.
2. Confirm the production domain.
3. Add the final canonical URL and absolute social-preview image URL when the domain is known.
4. Test English, Arabic, all verified contact links, and the legal disclaimer on the deployed URL.

## Content Integrity

The website uses only the facts supplied in the project brief. It does not claim awards, memberships, guaranteed outcomes, case numbers, success rates, or a current employment date. “Corporate Lawyer for IBS” is intentionally neutral because the brief did not establish whether that role is current or previous.

## Learning Guide

See [LEARNING_WALKTHROUGH.md](./LEARNING_WALKTHROUGH.md) for the phase-by-phase React explanation, architecture decisions, syntax notes, common beginner mistakes, and deployment mental model.
