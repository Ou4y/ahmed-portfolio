# Learning Walkthrough — Ahmed Raafat Portfolio

This guide explains both what the project does and how to think like a React engineer while building it. The goal is not only to make the page work, but to understand why its structure will remain understandable as it grows.

## 1. The React Mental Model

A React interface is a tree of components. Each component owns one meaningful part of the page and returns a description of the UI for its current inputs.

The most useful question is not “How do I write this whole page?” It is:

> What are the stable visual and behavioral responsibilities in this page?

For this portfolio, the stable responsibilities are the navbar, hero, sections, cards, language behavior, FAQ state, contact logic, and footer. That is why the code is separated around those ideas.

`App.jsx` should read like a table of contents:

```jsx
<Navbar />
<main>
  <Hero />
  <About />
  <Expertise />
  <Experience />
  <Process />
  <Insights />
  <FAQ />
  <Contact />
</main>
<Footer />
```

This tells a new developer what the page contains before they need to understand how any individual section works.

## 2. JSX Fundamentals

JSX is syntax that lets JavaScript describe an interface with HTML-like elements:

```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}</h1>
}
```

Important details:

- `{name}` enters JavaScript mode inside JSX.
- Component names start with a capital letter. React treats lowercase names such as `section` as native HTML and capitalized names such as `Hero` as custom components.
- JSX uses `className`, not `class`, because `class` is a JavaScript keyword and React maps `className` to the HTML class attribute.
- A component must return one parent value. A fragment (`<>...</>`) groups siblings without adding another HTML element.
- Props are the inputs to a component. They let the same component render different content without copying its markup.

## 3. Data, Props, State, and Derived UI

These four ideas solve different problems:

- **Data** is content such as expertise items or FAQ answers.
- **Props** pass data and callbacks from a parent to a child.
- **State** stores a value that can change during the visit, such as the selected language or open FAQ.
- **Derived UI** is markup calculated from the current data and state.

For example:

```jsx
{items.map((item) => (
  <Card key={item.id} title={item.title} />
))}
```

`.map()` transforms each data item into a React element. `key` gives React a stable identity for that element so it can update the correct item efficiently. An array index is less reliable when items can move or be inserted, so the project uses stable IDs.

The site does not duplicate an English section and an Arabic section. The selected language changes the data, and the same component tree derives the new interface.

## Phase 1 — Initialize the React Project

**1. What was built**

The project was initialized with Vite’s React JSX template. Runtime dependencies, Tailwind’s Vite integration, the production portrait, and a `main` Git branch were added.

**2. Why it exists**

Vite handles the development server, module loading, and optimized production build. React handles the component model. JSX satisfies the requested JavaScript-first version without introducing TypeScript.

**3. React concepts**

The entry point uses `createRoot` to attach the React component tree to `<div id="root">` in `index.html`. `StrictMode` adds useful development checks.

**4. Syntax**

```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

`document.getElementById('root')` finds the real DOM container. `<App />` is the root React component.

**5. Best practices**

Use one package manager and commit its lockfile. Keep deployable assets such as the portrait under `public/` when they need a stable URL.

**6. Common beginner mistakes**

- Mixing npm, pnpm, and Yarn lockfiles.
- Putting a production image in a temporary Downloads path.
- Choosing the TypeScript template when the requirement explicitly says JSX.
- Committing `node_modules` or `dist`.

**7. Main files**

`package.json`, `package-lock.json`, `vite.config.js`, `src/main.jsx`, `public/images/ahmed-raafat.jpeg`.

**8. Commit**

`chore: initialize React lawyer portfolio project`

## Phase 2 — Build the Reusable UI Foundation

**1. What was built**

Design tokens, font loading, base accessibility styles, and reusable `Container`, `Button`, `SectionTitle`, `Card`, `Reveal`, and `SkipLink` components.

**2. Why it exists**

Repeated visual rules should have one source of truth. A shared button fixes hover, focus, spacing, and icon behavior everywhere at once.

**3. React concepts**

Component composition and props. `Container` accepts an `as` prop so it can render a `div`, section-related wrapper, or another semantic element while retaining the same spacing.

**4. Syntax**

```jsx
function Container({ as: Component = 'div', children }) {
  return <Component className="mx-auto max-w-7xl">{children}</Component>
}
```

`as: Component` renames the incoming prop. The capitalized variable tells React that it represents a component or HTML tag.

**5. Best practices**

- Store colors and fonts as tokens.
- Give every interactive element a visible focus state.
- Prefer semantic flexibility over duplicated components.
- Keep variants finite and intentional.

**6. Common beginner mistakes**

- Copying a long button class string into every section.
- Creating a “universal component” with dozens of unclear props.
- Removing focus outlines without replacing them.
- Using fixed page widths that overflow on phones.

**7. Main files**

`src/index.css` and `src/components/ui/`.

**8. Commit**

`feat: add reusable UI foundation`

## Phase 3 — Add English, Arabic, RTL, and Persistence

**1. What was built**

A translations object, a `useLanguage` custom hook, a visible language switch, `localStorage` persistence, and document-level `lang` and `dir` updates.

**2. Why it exists**

Language affects more than text. Screen readers, browser typography, alignment, and logical layout all depend on the correct document language and direction.

**3. React concepts**

`useState` stores the active language. `useEffect` synchronizes that React state with systems outside React: the document element and browser storage.

**4. Syntax**

```js
const [language, setLanguage] = useState(getInitialLanguage)

useEffect(() => {
  document.documentElement.lang = language
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
}, [language])
```

Passing `getInitialLanguage` rather than `getInitialLanguage()` gives React a lazy initializer. It runs when the state is created instead of on every render.

The effect dependency array `[language]` means “run this synchronization when the language changes.”

**5. Best practices**

- Validate stored values before using them.
- Wrap storage access because a browser may block it.
- Keep Arabic copy natural and professionally written.
- Use logical CSS properties so one component supports both directions.

**6. Common beginner mistakes**

- Translating text but leaving `<html dir="ltr">`.
- Reading `localStorage` directly during every render.
- Duplicating the whole page for Arabic.
- Applying `text-align: right` everywhere instead of true RTL direction.

**7. Main files**

`src/data/translations.js`, `src/hooks/useLanguage.js`, `src/components/ui/LanguageSwitch.jsx`.

**8. Commit**

`feat: add bilingual language switch with RTL support`

### Why a hook and props were chosen instead of Context

The component tree is shallow: `App` composes each section directly. Passing `language` and `t` from `App` is explicit and easy to trace. Context would add another abstraction without solving meaningful prop drilling in version 1. Context becomes useful if language is needed through many deeply nested, unrelated component layers.

## Phase 4 — Build the Responsive Sticky Navbar

**1. What was built**

A sticky navigation bar, data-driven anchor links, an animated mobile menu, language controls, consultation CTA, Escape handling, and focus return.

**2. Why it exists**

The navbar gives visitors a map of the one-page experience. Anchor links are enough because version 1 has one route; React Router would add complexity without a second page to route to.

**3. React concepts**

`useState` controls whether the menu is open. `useRef` remembers the menu button so focus can return to it. `useEffect` temporarily listens for the Escape key.

**4. Syntax**

```jsx
{navigationItems.map((item) => (
  <a href={`#${item.id}`} key={item.id}>
    {t.nav[item.labelKey]}
  </a>
))}
```

Template literals build each hash URL. Brackets access a translated label using a data key.

**5. Best practices**

- Use anchors for navigation and buttons for actions.
- Add `aria-expanded` and `aria-controls` to disclosure controls.
- Close the menu after selecting a link.
- Return keyboard focus when Escape closes the menu.

**6. Common beginner mistakes**

- Using a clickable `div` instead of a button.
- Forgetting the mobile menu is still keyboard UI.
- Hard-coding every nav item instead of mapping data.
- Adding React Router to a single anchor-based page.

**7. Main files**

`src/components/layout/Navbar.jsx`, `src/data/site.js`.

**8. Commit**

`feat: build responsive sticky navbar`

## Phase 5 — Build the Animated Hero

**1. What was built**

The premium navy hero, bilingual copy, two CTAs, Ahmed’s portrait, trust rail, legal line art, and controlled entrance/floating motion.

**2. Why it exists**

The hero has one job: establish identity, professional position, experience, and the next action immediately. The editorial portrait treatment is more distinctive than a generic circular profile card.

**3. React concepts**

Props supply translated content. Motion components describe animation states alongside the JSX. `useReducedMotion` respects a visitor’s operating-system preference.

**4. Syntax**

```jsx
<motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>
  {t.hero.title}
</motion.h1>
```

The object keys describe the CSS-like values Motion interpolates. Small distance and opacity changes are enough for a professional interface.

**5. Best practices**

- Load the first-viewport portrait eagerly.
- Include explicit image dimensions to reduce layout shift.
- Use `object-fit: cover` rather than changing the image’s aspect ratio.
- Hide decorative vectors from assistive technology.
- Disable nonessential motion for reduced-motion users.

**6. Common beginner mistakes**

- Animating every element continuously.
- Stretching an image with unrelated width and height values.
- Using vague alt text such as “photo.”
- Mirroring the portrait in RTL.
- Making gold body text too small for sufficient contrast.

**7. Main files**

`src/components/sections/Hero.jsx`, `src/components/vectors/`.

**8. Commit**

`feat: build animated hero section`

## Phase 6 — Add About, Practice Areas, and Experience

**1. What was built**

The editorial About section, four approved practice-area records with detailed service lists, and the IBS experience highlight.

**2. Why it exists**

These sections move from identity to evidence: the background, service areas, and supplied corporate-practice context.

**3. React concepts**

Practice areas are data-driven. The component maps the selected language’s array and derives the correct icon, number, heading, description, and service list.

**4. Syntax**

```jsx
const Icon = icons[area.icon]

return (
  <article key={area.id}>
    <Icon aria-hidden="true" />
    <h3>{area.title}</h3>
    <ul>
      {area.services.map((service) => (
        <li key={service}>{service}</li>
      ))}
    </ul>
  </article>
)
```

The icon map turns a serializable string into a React component. `Icon` is capitalized because it is rendered as a component.

**5. Best practices**

- Separate content collections from layout markup.
- Use stable IDs.
- Keep employment wording neutral when dates or current status are not confirmed.
- Reuse one section component for both languages.

**6. Common beginner mistakes**

- Repeating four cards and their service lists manually.
- Inventing metrics to fill empty visual space.
- Mixing content decisions deep into styling logic.
- Using the list index as the only identity.

**7. Main files**

`src/components/sections/About.jsx`, `PracticeAreas.jsx`, `Experience.jsx`, and `src/data/practiceAreas.js`.

**8. Commit**

`feat: add about expertise and experience sections`

## Updating Client Content and Bilingual Practice Areas

The client-approved update changed the professional positioning, biography, practice areas, IBS experience copy, CTAs, and search metadata. The implementation was structured so content changes remain separate from layout behavior.

### Where the client content lives

Shared interface copy lives in `src/data/translations.js`. This includes:

- hero positioning and CTAs;
- the three About paragraphs;
- section headings and supporting descriptions;
- trust badges;
- IBS experience copy;
- footer positioning;
- language-aware SEO titles and descriptions.

The longer practice-area records live in `src/data/practiceAreas.js`. Each language has the same four stable records:

```js
{
  id: 'commercial-contracts',
  icon: 'contract',
  title: 'Commercial Contracts',
  description: '...',
  services: ['...', '...'],
}
```

This keeps client content review focused. A wording change normally belongs in a data file, while spacing, accessibility, and responsive behavior remain in the component.

### How the translation object works

`useLanguage` selects either `translations.en` or `translations.ar` and exposes that selected object as `t`. Components do not contain separate English and Arabic markup:

```jsx
<SectionTitle
  eyebrow={t.practiceAreas.eyebrow}
  title={t.practiceAreas.title}
/>
```

Changing the language changes `t`, React renders the new strings, and the language hook updates the document to `lang="en" dir="ltr"` or `lang="ar" dir="rtl"`. Logical spacing utilities such as `start`, `end`, `ps`, and `pe` let the same layout follow both directions naturally.

### Why the practice areas are data-driven

Hardcoding four large cards would duplicate the same JSX structure and make future content updates error-prone. Data-driven rendering provides one accessible card template:

```jsx
{practiceAreas[language].map((area) => (
  <article key={area.id}>
    <h3>{area.title}</h3>
    <p>{area.description}</p>
    <ul>
      {area.services.map((service) => (
        <li key={service}>{service}</li>
      ))}
    </ul>
  </article>
))}
```

The outer `.map()` renders the four practice areas. The inner `.map()` renders each service as a semantic list item.

Every practice area needs a stable `id` because React uses it to preserve the correct element identity between renders. The English and Arabic datasets deliberately share the same IDs, so switching languages changes the content without changing the conceptual records.

### Keeping long legal service lists readable

Commercial Contracts has nine services, so four narrow desktop columns would make the text cramped. The section uses:

- one card per row on mobile;
- two cards per row from tablet widths upward;
- one-column service lists at smaller card widths;
- two-column service lists only on wide desktop screens;
- generous internal spacing, visible grouping, and restrained hover lift;
- semantic `<ul>` and `<li>` elements with small gold check markers.

This preserves scanning comfort in English and in Arabic, where some legal terms require longer lines.

### Files updated for the approved content

- `src/data/translations.js`
- `src/data/practiceAreas.js`
- `src/components/sections/Hero.jsx`
- `src/components/sections/About.jsx`
- `src/components/sections/PracticeAreas.jsx`
- `src/components/sections/Experience.jsx` through translated content
- `src/App.jsx`
- `index.html`
- `README.md`
- `LEARNING_WALKTHROUGH.md`

The previous `src/data/expertise.js` and `Expertise.jsx` files were replaced so the source now reflects the client’s terminology and contains only the four approved practice areas.

## Phase 7 — Add Process, Insights, and FAQ

**1. What was built**

A four-step consultation timeline, three educational insight previews, and an accessible FAQ accordion.

**2. Why it exists**

The process reduces uncertainty, the insight previews demonstrate useful professional framing without pretending full articles exist, and the FAQ handles common preparation questions.

**3. React concepts**

The FAQ parent owns `openItem` state. Each `FAQItem` child receives `isOpen` and `onToggle` props. This is called lifting state up: the parent coordinates which child is open.

**4. Syntax**

```jsx
onToggle={() =>
  setOpenItem((current) => (current === item.id ? null : item.id))
}
```

The functional state update receives the latest value. The ternary operator closes the active item or opens the selected one.

**5. Best practices**

- Keep state in the lowest common parent that needs to coordinate it.
- Connect FAQ buttons and panels with IDs and ARIA attributes.
- Label previews honestly when no published article URL exists.
- Make process steps descriptive without promising an outcome.

**6. Common beginner mistakes**

- Giving every FAQ item isolated state when only one should stay open.
- Hiding content visually while leaving confusing accessibility state.
- Adding dead “Read more” links.
- Claiming an online consultation or fee policy that was never confirmed.

**7. Main files**

`Process.jsx`, `Insights.jsx`, `FAQ.jsx`, `FAQItem.jsx`, `processSteps.js`, `insights.js`, `faqs.js`.

**8. Commit**

`feat: add process insights and FAQ sections`

## Phase 8 — Add Contact, WhatsApp Utility, Footer, and Disclaimer

**1. What was built**

The contact callout, conditional contact methods, WhatsApp URL builder, footer navigation, and bilingual legal disclaimer.

**2. Why it exists**

A static site should use direct contact links instead of pretending to submit a form to a nonexistent backend. The legal disclaimer sets the correct informational boundary.

**3. React concepts**

Conditional rendering decides whether verified contact links or a clear pending state appears. The interface is derived from `siteConfig.contact`.

**4. Syntax**

```js
const methods = [
  whatsapp && { id: 'whatsapp', href: createWhatsAppUrl(...) },
  email && { id: 'email', href: `mailto:${email}` },
].filter(Boolean)
```

JavaScript’s `&&` returns the object only when the value exists. `.filter(Boolean)` removes empty entries.

`encodeURIComponent` safely converts the prefilled message into a URL query value.

**5. Best practices**

- Centralize contact configuration.
- Use `tel:`, `mailto:`, and the official `wa.me` format.
- Add `noopener noreferrer` to external links opened in a new tab.
- Do not render dead actions.
- Never invent public contact details.

**6. Common beginner mistakes**

- Hard-coding contact information in several components.
- Building a form with no submission behavior.
- Putting raw spaces or Arabic text directly into a query string.
- Treating an initial message as a formal engagement.

**7. Main files**

`src/components/sections/Contact.jsx`, `src/components/layout/Footer.jsx`, `src/utils/whatsapp.js`.

**8. Commit**

`feat: add contact footer and disclaimer`

## Phase 9 — SEO, Responsiveness, Accessibility, and Production Quality

**1. What was built**

Language-aware Helmet metadata, a custom favicon, robots rules, Cloudflare headers, reduced-motion configuration, font subsetting, and final responsive checks.

**2. Why it exists**

The production page needs meaningful browser/search metadata, predictable loading, semantic structure, and confidence at real device widths.

**3. React concepts**

`HelmetProvider` supplies context to `Helmet`. The `SEO` component derives its metadata from the same active translation object as the visible page.

**4. Syntax**

```jsx
<Helmet htmlAttributes={{ lang: language, dir }}>
  <title>{t.seo.title}</title>
  <meta name="description" content={t.seo.description} />
</Helmet>
```

An object prop configures the document element while child elements describe head tags.

Tailwind is mobile-first:

```jsx
<div className="grid gap-8 lg:grid-cols-4">
```

The base classes apply to phones. `lg:` changes only the layout at the large breakpoint and above.

**5. Best practices**

- Keep exactly one page-level `h1`.
- Verify every hash link has a target.
- Test 320 px, common mobile, tablet, and desktop widths.
- Test English and Arabic independently.
- Do not invent a canonical URL before the production domain exists.
- Load only the font subsets the page uses.

**6. Common beginner mistakes**

- Designing desktop first and trying to shrink it later.
- Assuming RTL is correct because text is right-aligned.
- Shipping a successful dev server without running the production build.
- Adding a false canonical URL or relative social image that crawlers cannot resolve.
- Ignoring console warnings.

**7. Main files**

`src/components/layout/SEO.jsx`, `src/main.jsx`, `src/index.css`, `index.html`, `public/_headers`, `public/robots.txt`, `public/favicon.svg`.

**8. Commit**

`chore: polish SEO responsiveness and production build`

## Phase 10 — Documentation and Cloudflare Pages Handoff

**1. What was built**

The project README, this learning guide, exact Cloudflare Pages settings, and the final deployment checklist.

**2. Why it exists**

Good code is not a complete handoff unless the next person knows how to run, configure, verify, and publish it.

**3. React concepts**

This phase does not introduce UI state. It explains how all earlier React decisions fit together and where future changes belong.

**4. Syntax**

The essential production command is:

```bash
npm run check
```

It runs source validation and then creates the optimized `dist/` directory.

**5. Best practices**

- Document required configuration instead of hiding placeholders.
- Keep deployment settings exact and copyable.
- Explain important tradeoffs, not every obvious line.
- Update documentation whenever architecture changes.

**6. Common beginner mistakes**

- Treating a README as optional.
- Publishing before real contact links are verified.
- Deploying the project root instead of `dist/`.
- Adding a backend because a static contact experience feels “too simple.”

Version 1 intentionally avoids a backend, CMS, database, authentication, and admin panel. None is needed to deliver the requested portfolio, and adding them would create security, maintenance, and hosting work without solving a current requirement.

**7. Main files**

`README.md`, `LEARNING_WALKTHROUGH.md`.

**8. Commit**

`docs: add project README and deployment guide`

## 4. Why Semantic HTML Matters

Semantic HTML describes meaning, not only appearance:

- `<nav>` identifies navigation.
- `<main>` identifies the page’s primary content.
- `<section>` groups a named topic.
- `<article>` marks a self-contained expertise, process, or insight record.
- `<button>` performs an action.
- `<a>` navigates to a destination.
- `<footer>` contains closing navigation and legal information.

This helps keyboards, assistive technology, search engines, and future developers.

## 5. Why Subtle Animation Fits Legal Services

Motion communicates hierarchy and polish when it supports the reading flow. It becomes harmful when it competes for attention.

This project uses:

- short fade-and-rise entrances;
- a soft portrait entrance;
- small hover movement;
- a controlled mobile-menu transition;
- an accordion height transition;
- very slow decorative movement.

It avoids dramatic parallax, rapid floating elements, neon effects, and constant card animation. Professional interfaces should feel composed, not busy.

## 6. Deployment Mental Model

The deployment chain is:

```text
React source → Vite build → dist/ static files → Cloudflare Pages → browser
```

Cloudflare does not run the source JSX directly. During deployment it installs the dependencies, runs `npm run build`, and publishes the generated `dist/` directory.

The site has one page and uses hash links, so it does not need server-side routing or a single-page-app fallback rule in version 1.

## 7. Safe Next Steps

Before the public launch:

1. Push the existing `main` branch to the configured GitHub repository.
2. Connect that repository to Cloudflare Pages.
3. Confirm the production domain.
4. Add a canonical URL and absolute social-preview image for that domain.
5. Test every verified contact link on a real phone.
6. Ask Ahmed to review the Arabic and English legal wording before publication.

Future features such as full articles, analytics, a booking provider, or a CMS should be added only after a real requirement justifies their complexity.
