# Design Language

The visual design of the Shivapuri Baba website has one job: **get out of the way
of reading.** This document is the design cornerstone — it serves
[pillar 3 (the best possible reading experience)](./PRINCIPLES.md) and the
[stewardship ethos](./PRINCIPLES.md) (the design must never draw attention to
itself or to the people behind the site, only to the message).

> **In one line:** minimal, black-and-white, monastic. Like a quiet room with a
> single page of text in it.

Reference in spirit: the calm restraint of sites like
[kfoundation.org](https://kfoundation.org/l/pt/) — generous whitespace, a single
centered column, no decoration competing with the words.

---

## Principles

1. **Reading is the interface.** Text is the primary content and the primary UI.
   Everything else is subordinate to a comfortable reading experience.
2. **Minimal but effective.** Remove until it breaks, then add back only what the
   reader genuinely needs. No decoration for its own sake.
3. **Monastic restraint.** Black on white. Stillness over motion. Silence over
   noise. The mood is contemplative, unhurried, and humble.
4. **Content over chrome.** Navigation, controls, and branding stay quiet and
   recede; the words take the foreground.
5. **The same everywhere.** A first-class read on a phone, an e-reader, a laptop,
   or a slow connection. No device is a second-class citizen.

## Color — black & white

A strict near-monochrome palette. Color is information, not decoration.

- **Background:** white / warm off-white (paper, not pure clinical `#fff`).
- **Text:** near-black, soft (e.g. `stone-800`/`#1c1917`), never harsh `#000`,
  to reduce glare and feel like ink on paper.
- **Muted:** a single grey for secondary text, captions, and metadata.
- **Rules & borders:** hairline light grey.
- **Accent:** essentially none. Links are distinguished by underline/weight, not
  color. If a single accent is ever needed, it is restrained and used sparingly.
- **Dark mode:** built in **from the start** — an inverted, equally calm reading
  mode (off-black background, off-white text) that respects `prefers-color-scheme`.
  Both modes get the same care; neither is an afterthought.

> No gradients, no shadows-as-decoration, no brand colors. The page should read as
> well printed in plain black and white as it does on screen.

## Typography

Type is the design. Most of the craft lives here.

- **Readability first:** comfortable measure (**~60–75 characters** per line),
  generous line height (~1.6–1.75 for body), clear vertical rhythm.
- **Scale:** a calm, restrained type scale — a few sizes, not many.
- **Long-form content** uses Tailwind's `prose` (`@tailwindcss/typography`) as the
  default, tuned to this palette via `prose-stone` and overrides.
- **Self-hosted fonts** only (no third-party font CDNs — privacy per pillar 1,
  reliability per pillar 3). Provide robust system-font fallbacks so text renders
  instantly even before any webfont loads.
- **Decided & implemented:** the whole site is set in a **single typeface —
  EB Garamond** (a warm, book-like old-style serif), self-hosted via
  `@fontsource-variable/eb-garamond`. Chrome (navigation, captions, metadata) is
  the *same* serif as the body, only smaller and quieter — so the site reads like
  one continuous book rather than a serif document wrapped in sans-serif UI. A
  robust system-serif fallback (`Georgia`, `Times New Roman`) renders instantly
  before the webfont loads. Base font size is bumped to 18px so the delicate
  serif reads comfortably, and body copy is hyphenated for an even right edge on
  narrow screens.

## Layout & space

- **Single centered column.** One readable measure, centered, with generous
  margins. No multi-column complexity, no sidebars competing for attention.
- **Whitespace is a feature.** Ample, intentional spacing creates the calm,
  unhurried feel. When in doubt, add space.
- **Vertical flow.** Content reads top-to-bottom in a clear hierarchy; avoid
  layouts that scatter the eye.

## Navigation & controls

- **Quiet and minimal.** A small, unobtrusive top navigation; no megamenus, no
  sticky bars stealing reading space, no popups or interstitials — ever.
- Controls are text or simple, low-contrast affordances. They appear when needed
  and otherwise stay out of the way.

## Imagery

- **Sparing and purposeful.** Images earn their place; they are not decoration.
- Treated to sit calmly within the monochrome aesthetic (restrained, never loud).
- Always optimized, responsive, lazy-loaded, and given meaningful `alt` text
  (accessibility, pillar 3).

## Motion

- **Stillness by default.** Little to no animation. Any transition is subtle and
  brief, and is fully disabled under `prefers-reduced-motion`.

## Responsive & accessible

- **Mobile-first, fluid.** The reading column adapts to every viewport; tap
  targets and font sizes stay comfortable on small screens.
- **Accessible:** semantic HTML, strong contrast (WCAG AA minimum), full keyboard
  navigation, visible focus states, and screen-reader-friendly structure.
- **Resilient:** the page is fully readable with zero JavaScript and degrades
  gracefully on slow or unreliable connections.

---

## The test for any design decision

Before adding anything to the page, ask:

> *Does this help someone read and understand Shivapuri Baba's message — or does it
> compete with it?*

If it competes, it does not belong.
