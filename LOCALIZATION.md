# Localization (l10n)

This document records how the site is translated, the conventions that keep the
translation faithful and consistent, and the **decisions** taken along the way.
It exists for the same reason the rest of the project is documented in the open:
so the localization can be audited and improved (Pillars 2 and 4).

> **Status:** Six locales live — English (default), Brazilian Portuguese
> (`pt-BR`), Arabic (`ar`, RTL), Nepali (`ne`), Hindi (`hi`), Chinese (`zh`,
> Simplified). PT-BR's flagged review questions are resolved (§5); ar/ne/hi/zh
> were produced for a fluent reader and need no review cycle.

---

## 1. Architecture decision

**The site is multilingual, not replaced.** English remains the default language
at the site root (`/`, `/biography`, …). Every other language is added under its
own prefix; the source is never deleted.

- **Brazilian Portuguese** uses **localized slugs** (it shares the Latin script,
  so the URLs read naturally and help Portuguese-language search):

  | English | Português (pt-BR) |
  | --- | --- |
  | `/` | `/pt-br/` |
  | `/biography` | `/pt-br/biografia` |
  | `/teachings` → `/teachings/right-living` | `/pt-br/ensinamentos` → `/pt-br/ensinamentos/vida-correta` |
  | `/books` | `/pt-br/livros` |
  | `/about` | `/pt-br/sobre` |

- **Arabic, Nepali, Hindi, Chinese** use **English-style (ASCII) slugs** under
  `/ar`, `/ne`, `/hi`, `/zh` — e.g. `/ar/biography`, `/ne/teachings/right-living`,
  `/hi/books`, `/zh/about`. Native-script slugs would become percent-encoded,
  opaque URLs; ASCII slugs under the locale prefix are the standard, practical
  choice for non-Latin scripts.

Rationale: "localize the website **to** X" means *adding* a locale, not deleting
the source. Keeping all languages serves more readers (Pillar 1's mission to
reach "anyone who seeks it") and is non-destructive.

**Mechanics:**
- A quiet language switcher sits in the header as a native `<details>` dropdown
  (zero JS, Pillar 3): the summary shows the current language in its own script
  and expands to all six (English, Português, العربية, नेपाली, हिन्दी, 中文). The
  active language is marked; each entry carries its `hreflang`/`lang`.
- `<html lang>` and `<html dir>` are set per page. **Arabic renders RTL**
  (`dir="rtl"`); all others LTR. The CSS hyphenation engine uses each language's
  dictionary automatically.
- **Fonts:** EB Garamond carries no Arabic/Devanagari/CJK glyphs, so `:lang(ar)`,
  `:lang(hi)/:lang(ne)`, and `:lang(zh)` rules in `global.css` fall back to quiet
  system fonts (Noto Naskh Arabic / Noto Serif Devanagari / Noto Serif CJK SC and
  platform equivalents) — zero downloads, while Latin book titles and names still
  render in EB Garamond.
- Each page declares `<link rel="alternate" hreflang>` to all six locales plus
  an `x-default` → English, and sets `og:locale` (+ `og:locale:alternate`).
- Strings, nav labels, text direction, and the route pairing all live in
  `src/i18n/ui.ts`. Content: `src/content/<locale>/…`; pages: `src/pages/<locale>/…`.

**Per-language key terms (ar/ne/hi/zh).** "Right Life / Right Living" (the
concept): الحياة القويمة · सद्जीवन (ne) · सम्यक् जीवन (hi) · 正命之道 (zh). "sage"
(never "mystic"): حكيم · ऋषि · ऋषि · 圣者. "God-realisation": تحقيق الله ·
ईश्वर-साक्षात्कार · ईश्वर-साक्षात्कार · 证悟神. *Swadharma* and the yogic vocabulary
are written in native Devanagari for ne/hi (स्वधर्म, विवेक, वैराग्य, ध्यान, समाधि…),
in established Chinese (largely Buddhist) renderings for `zh` (三摩地, 禅那, 神我,
明辨, 离欲…), and transliterated to Arabic script for `ar`. Book titles and author
names stay in Latin in every locale.

---

## 2. Translation principles

1. **Faithful to *this* text, not a re-translation of the sources.** The English
   pages are themselves a careful, sourced rendering. We translate what they say,
   preserving their epistemic care — the explicit separation of **documented
   fact / interpretation / tradition** — and their hedges ("reportedly", "by the
   account Bennett recorded", "is said to"). No claim is strengthened or softened
   in translation.
2. **Register:** calm, literary, scholarly Brazilian Portuguese. Long sentences
   are kept where the original is deliberately measured; readability is improved
   only where Portuguese syntax demands it.
3. **He is a *sábio* (sage), never a *místico* (mystic).** This mirrors a
   deliberate editorial choice in the English (we do not call him a "mystic" in
   our own voice).
4. **Citations stay scholarly.** In-text author–date keys are preserved; only the
   connective is localized (`and` → `e`, `n.d.` → `s.d.`). See §4.
5. **Book titles are not translated.** They are real published works, almost none
   with a Portuguese edition; translating a title would invent a book that does
   not exist. Titles stay in the original; the *apparatus* around them (editorial
   notes, "borrow free", "out of print") is translated. See §4.

---

## 3. Glossary (locked terms)

Core doctrinal vocabulary — kept identical across every page. Sanskrit/IAST terms
keep their transliteration and italics exactly as the English does.

| English | pt-BR | Note |
| --- | --- | --- |
| Shivapuri Baba | Shivapuri Baba | proper name, unchanged |
| sage | sábio | never *místico* |
| the Right Life / Right Living | **a Vida Correta** | the central concept; one term throughout |
| Swadharma | Swadharma | kept; the Baba's own name for the teaching |
| God-realisation; Realization | Realização de Deus; a Realização | |
| sannyasin | sannyasin | kept |
| renunciate name | nome de renunciante | |
| renunciation | renúncia | |
| Brahmin | brâmane | |
| yogi(s) | iogue(s) | Houaiss form; see open question Q3 |
| the three disciplines | as três disciplinas | |
| physical / intellectual discipline | disciplina física / intelectual | |
| moral / mental discipline | disciplina moral / mental | |
| spiritual discipline | disciplina espiritual | |
| Discrimination (Viveka) | **Discernimento (Viveka)** | not *Discriminação* — see Q2 |
| Devotion (Vairāgya) | **Devoção (Vairāgya)** | faithful to the source's wording — see Q1 |
| the threefold misery (Tribidha Tapas) | a tríplice aflição (Tribidha Tapas) | |
| pleasure (sukha) | prazer (sukha) | |
| contentment / serenity (santoṣa) | contentamento / serenidade (santoṣa) | |
| peace (śānti) | paz (śānti) | |
| spiritual enquiry | investigação espiritual | |
| "Who am I?" / "What have I come here for?" | "Quem sou eu?" / "Para que vim aqui?" | |
| concentration / meditation / absorption (dhāraṇā, dhyāna, samādhi) | concentração / meditação / absorção (dhāraṇā, dhyāna, samādhi) | |
| the false / real "I" | o falso / verdadeiro "eu" | |
| Purusha / Purushottama | Purusha / Purushottama | |
| the divine virtues (daivī sampad) | as virtudes divinas (daivī sampad) | |
| Existence, Knowledge, Bliss (Sat-cit-ānanda) | Existência, Consciência, Bem-aventurança (Sat-cit-ānanda) | |
| satsang | satsang | kept |
| sāttvic / tāmasic | sáttvico / tâmasico | adapted, italic |
| pilgrimage | peregrinação | |
| disciple | discípulo | |
| eyewitness | testemunha ocular | |
| first-hand (sources) | (fontes) de primeira mão | |
| aura of serenity | aura de serenidade | |
| the crown of all living beings | a coroa de todos os seres vivos | |
| omnipresent, omniscient, omnipotent | onipresente, onisciente, onipotente | |

**Place names** — established Portuguese exonyms are used in running prose:
Catmandu, Pérsia, Meca, Jerusalém, Turquia, Istambul, Bálcãs, Grécia, Itália,
Europa Ocidental, Inglaterra, América do Norte, México, Andes, Colômbia,
Pacífico, Nova Zelândia, Austrália, Japão, Tibete, Afeganistão. Names without a
settled exonym are kept: Narmada, Shivapuri, Dhrubasthali, Pashupatinath,
Bagmati, Kirateshwar, Benares. Monarchs follow PT convention: **Rainha Vitória**,
**Rei Mahendra**.

**The home-page saying** (attributed to the Baba):
> "It is very simple: to carry Body, Intellect, Mind and Soul to perfection."
→ "É muito simples: levar o Corpo, o Intelecto, a Mente e a Alma à perfeição."
(Capitalization of the four faculties is preserved as in the source.)

---

## 4. Citations and the References section

- **In-text keys** keep their form; connectives are localized:
  `(Bennett and Manandhar 1965)` → `(Bennett e Manandhar, 1965)`;
  `(Shrestha Malla, n.d.)` → `(Shrestha Malla, s.d.)`.
- **The reference-list entries keep the original book titles and place/publisher**
  (`London: Hodder & Stoughton`) — standard practice for citing a specific
  physical edition. Only the **editorial apparatus** is translated, e.g.:
  - "Later editions:" → "Edições posteriores:"
  - "First published" → "Publicado originalmente"
  - "Rev. and enl. ed." → "Ed. rev. e ampl."
  - "[In Nepali.]" → "[Em nepali.]"
  - "[Four public lectures delivered at Denison House, London, …]" →
    "[Quatro conferências proferidas em Denison House, Londres, …]"
  - "Accessed 17 June 2026." → "Acesso em 17 de junho de 2026."
- **Books & Media** vendor notes are localized ("Borrow/read free" →
  "Empréstimo/leitura gratuita"; "In print" → "Em catálogo"; "Out of print →
  secondhand only" → "Fora de catálogo → apenas usado"), while the URLs, vendor
  names, and book titles are untouched.
- **Dates:** day-month-year with lowercase months — "28 January 1963" →
  "28 de janeiro de 1963".

---

## 5. Decisions (resolved)

These were flagged as judgment calls and have now been **confirmed by the
maintainer**. The defaults stand; no further changes pending.

**Q1 — "Devotion (Vairāgya)" → keep "Devoção".** Chosen for **fidelity to the
English the site publishes** ("Devotion") over the literal Sanskrit sense
(*desapego* / dispassion). No change.

**Q2 — "Discrimination (Viveka)" → keep "Discernimento"** (the Vedanta sense:
discernment of real from unreal), not the false friend *"Discriminação"*.

**Q3 — Sanskrit spelling → keep as shipped.** Adjectives adapted for natural
reading (*sáttvico/tâmasico*, *iogue*); IAST nouns preserved exactly (*dhāraṇā,
śānti, santoṣa, daivī sampad*); *Vairāgya* standardized with its macron site-wide.

**Q4 — Place names → keep Portuguese exonyms** (Catmandu, Pérsia, Tibete,
Rainha Vitória) in running prose.

**Q5 — Scope → confirmed.** Site *content* is fully localized in every locale
(all long-form pages, home, teachings index, 404, nav/UI, meta, alt text,
structured data). Developer-facing repo docs (`LICENSE`, `LICENSE-CONTENT.md`,
`PRINCIPLES.md`, `DESIGN.md`, `TECHSTACK.md`, `README.md`) stay in English by
design.

**Q6 — Architecture → multilingual (not a replacement).** English stays the
default at the root; PT-BR, Arabic, Nepali, and Hindi live under their prefixes.
