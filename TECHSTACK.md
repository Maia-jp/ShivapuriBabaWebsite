# Tech Stack

This document explains what the Shivapuri Baba website is built with and **why**.
Every choice traces back to the [four pillars](./PRINCIPLES.md) — especially
**pillar 3 (the best possible reading experience: fast and reliable)** and
**pillar 4 (open source, no lock-in)**.

> **Legend:** ✅ in use · 🔜 planned / not yet installed.

---

## Core framework

### Astro ✅ `astro@^6.4.7`

The foundation of the project.

- **Ships zero JavaScript by default.** Pages render to static HTML; interactivity
  is opt-in per component. This is the single biggest reason the site is fast and
  resilient (pillar 3) — content works even when scripts fail.
- **Content-first.** First-class support for Markdown/MDX and content collections
  makes it ideal for a reference- and article-heavy site (pillar 2).
- **Open source** and built on web standards, so there is no lock-in (pillar 4).

Output target is a **static site** (`astro build` → `./dist/`), which is cheap to
host, easy to cache, and reliable to serve.

## Styling

### Tailwind CSS v4 ✅ `tailwindcss@^4.3.1`

Utility-first CSS for consistent, maintainable styling without shipping unused CSS.

- Integrated through the official **`@tailwindcss/vite`** plugin (the v4 approach),
  not a runtime dependency — styles compile at build time.
- Keeps the CSS payload small and predictable, serving pillar 3.
- Loaded from `src/styles/global.css`, imported once in `src/layouts/Layout.astro`.

### `@tailwindcss/typography` ✅

The **typography plugin** is central to this project, not optional.

- Provides the `prose` classes that render long-form Markdown/article content with
  beautiful, readable defaults — comfortable measure, vertical rhythm, sensible
  heading and link styling.
- Because the whole site is reading-centric (pillar 3), `prose` is the default
  treatment for article and reference pages.

## Content authoring

### Markdown / MDX 🔜

- Articles, biography, teachings, and references are authored in Markdown so
  content stays portable, diff-friendly, and reviewable in pull requests
  (pillars 2 & 4).
- Astro **content collections** add typed frontmatter (e.g. title, sources,
  citations), which helps enforce the academic-rigor pillar at the schema level.

## Language & types

### TypeScript ✅

- Type checking via `astro check` and the project `tsconfig.json`.
- Catches errors early and documents intent — keeps the codebase approachable for
  open-source contributors (pillar 4).

## Tooling

### pnpm ✅ (package manager)

- Fast, disk-efficient installs; lockfile committed (`pnpm-lock.yaml`) for
  reproducible builds.

### Node.js ✅ `>=22.12.0`

- Build/runtime requirement, pinned in `package.json` `engines`.

## Hosting & deployment ✅ Cloudflare Pages

- Deploys as **static files** to **Cloudflare Pages**. The site is fully static
  (`output: "static"`), so **no adapter or Workers runtime is required** — Pages
  serves the built `dist/` directory directly over Cloudflare's CDN.
- A static, CDN-backed site is cheap (pillar 1: non-profit, low cost), fast and
  reliable (pillar 3), and remains portable to any other static host (pillar 4:
  no lock-in).

**Configuration:**

- `wrangler.toml` — `pages_build_output_dir = "dist"`.
- `public/_headers` — security headers + immutable caching for `/_astro/*` assets.
- `.nvmrc` (`22`) — pins the Node version used by the Cloudflare build image.

**Pages project settings:**

| Setting          | Value         |
| :--------------- | :------------ |
| Build command    | `pnpm build`  |
| Build output dir | `dist`        |
| Node version     | `22` (`.nvmrc`) |

---

## Styling setup (for reference)

Tailwind + typography are already installed. They were wired up as follows:

```sh
pnpm astro add tailwind        # installs @tailwindcss/vite and configures astro.config
pnpm add -D @tailwindcss/typography
```

Tailwind and the plugin are loaded from the global stylesheet (Tailwind v4 style):

```css
/* src/styles/global.css */
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

`global.css` is imported once in `src/layouts/Layout.astro`. Long-form content
pages wrap their body in `<article class="prose">` (tuned to the palette in
`global.css`).

### Fonts ✅ self-hosted

- **Body serif:** EB Garamond via **`@fontsource-variable/eb-garamond`** —
  self-hosted (bundled into `dist/_astro/`, served from our own origin, no font
  CDN: privacy per pillar 1, reliability per pillar 3). Imported in
  `Layout.astro`.
- **UI sans:** the platform **system font stack** — zero download, instant.

Light/dark colour tokens, focus styles, and `prefers-reduced-motion` handling all
live in `src/styles/global.css`. See [DESIGN.md](./DESIGN.md) for the rationale.

---

## Principle for future additions

Keep the stack **minimal**. Before adding a dependency, ask whether it serves the
reader and the four pillars. Favor build-time over runtime, standards over
abstractions, and zero-JS-by-default over convenience. Every kilobyte shipped to
the reader must earn its place.
