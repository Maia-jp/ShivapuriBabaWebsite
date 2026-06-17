# Shivapuri Baba

An open, non-profit website dedicated to the life, teachings, and legacy of
**Shivapuri Baba**.

This project is not about its authors or contributors. It exists solely to
carry **Shivapuri Baba's message** faithfully, freely, and to anyone who seeks
it. Those who build it are stewards, not subjects.

## What this is

A free, fast, and trustworthy place to read about Shivapuri Baba — grounded in
sources rather than rumor, beautiful and effortless to read, and open for anyone
to study, audit, or build upon.

## Our principles

Every decision here serves four pillars. They are the cornerstone of the project
and are documented in full in **[PRINCIPLES.md](./PRINCIPLES.md)**:

1. **Non-Profit, Always** — no ads, no paywalls, no trackers, never monetized.
2. **Academic Rigor Over Rumor** — every claim sourced; fact, interpretation, and
   tradition kept clearly distinct.
3. **The Best Possible Reading Experience** — fast, reliable, accessible, and calm.
4. **Open Source** — public code and content, developed transparently.

When a choice conflicts with a pillar, the pillar wins.

The visual design follows a minimal, black-and-white, monastic aesthetic built
entirely around reading — documented in **[DESIGN.md](./DESIGN.md)**.

## Tech stack

Built with [Astro](https://astro.build) — chosen for speed, minimal JavaScript,
and resilient static output that aligns with pillar 3. Styling uses Tailwind CSS
with the `@tailwindcss/typography` plugin for readable long-form content, and the
site deploys as static files to **Cloudflare Pages**. See
**[TECHSTACK.md](./TECHSTACK.md)** for the full stack and the reasoning behind
each choice.

## Local development

All commands run from the project root:

| Command         | Action                                       |
| :-------------- | :------------------------------------------- |
| `pnpm install`  | Install dependencies                         |
| `pnpm dev`      | Start the dev server at `localhost:4321`     |
| `pnpm build`    | Build the production site to `./dist/`       |
| `pnpm preview`  | Preview the production build locally         |
| `pnpm astro ...`| Run Astro CLI commands                       |

Requires Node `>=22.12.0`.

## Contributing

Contributions are welcome — corrections, better sources, accessibility fixes, and
performance improvements especially. Please read [PRINCIPLES.md](./PRINCIPLES.md)
first; contributions are evaluated against the four pillars. Hold content to a
scholarly standard: cite primary sources, and never present unverified stories as
established fact.

## License

This project is **dual-licensed** so that both the code and the message stay free:

- **Code** — [MIT License](./LICENSE)
- **Content** — [CC BY-SA 4.0](./LICENSE-CONTENT.md)

Third-party quotations, source texts, and images remain under their own copyright
and are credited at the point of use.
