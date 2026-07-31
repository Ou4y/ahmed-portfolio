# Ahmed Raafat — Corporate Lawyer Portfolio

A premium, bilingual single-page portfolio for Ahmed Raafat, an Egyptian corporate lawyer with 10 years of experience in the legal field and corporate legal practice with IBS.

The site is a fully static React frontend. It is designed for individuals, entrepreneurs, and businesses looking for clear corporate and business-focused legal guidance in Egypt.

## Features

- English and Arabic content
- Correct LTR and RTL document direction
- Language preference saved on the visitor’s device
- Mobile-first responsive layout
- Sticky desktop and mobile navigation
- Smooth section navigation without React Router
- Supplied professional portrait of Ahmed Raafat
- Custom legal line art and a navy, cream, and gold design system
- Restrained Motion animations with reduced-motion support
- Data-driven expertise, process, insight, and FAQ content
- Keyboard-accessible mobile menu and FAQ accordion
- Language-aware title and metadata
- Static WhatsApp, telephone, and email integration when verified details are configured
- Cloudflare Pages-compatible production output and response headers

## Page Sections

1. Hero
2. About
3. Expertise
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
