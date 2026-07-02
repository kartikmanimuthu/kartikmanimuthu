# Portfolio Redesign — Design Spec

Date: 2026-07-02
Status: Approved by user (Concept H — "Flight Deck, Full Depth")

## 1. Problem

The current site (`nextra-blog-template`) is wrapped end-to-end in `nextra-theme-blog`,
a plain docs/blog theme with no layout control — centered text column, no hero, no
cards, no visual hierarchy. The user is job-hunting for CTO / VP / Director roles and
needs the site to read as senior-leadership-grade. Separately, their one-page resume
can't hold the depth of their actual work (three engineering disciplines: Cloud, AI/ML,
Data, plus leadership), which is the whole reason they want a portfolio instead of
just a resume.

Six visual directions were explored as throwaway HTML mockups (see conversation
history — not committed to the repo). The user selected **Concept A, "Flight Deck"**
as the base visual language, then asked for it to be validated against full real
content volume (not a trimmed 3-bullet preview) before committing — that validation
pass is **Concept H**, the approved direction.

## 2. Architecture

`next.config.js` currently wraps every page in `nextra-theme-blog`. Nextra only
auto-styles `.mdx` files — plain `.tsx` pages under `/pages` are untouched by it. So:

- Convert `index.mdx`, `about.mdx`, `experience.mdx`, `projects.mdx` → custom `.tsx`
  pages, built with hand-written React components and Tailwind (already a
  dependency). Full design freedom, no fighting the theme.
- Add one new page: `pages/expertise.tsx`.
- Leave `/blog` exactly as-is (Nextra + `nextra-theme-blog`, MDX posts) — it's prose
  content, not a design problem, and this keeps the change surgical.
- `pages/_app.js` is replaced with a custom app shell (persistent `Nav` + `Footer`,
  dark theme only — no light/dark toggle, since the whole visual system is designed
  as a single dark "instrument panel" theme, not a light/dark pair).
- `pages/_meta.json` (Nextra's nav config) becomes irrelevant for the converted pages;
  the new custom `Nav` component owns navigation for them. It still governs `/blog`.
- `metadata/index.ts`'s `workExperience` and `technicalSkills` arrays are removed.
  The Expertise and Experience content is bespoke enough (nested sub-groups, inline
  bold spans within bullets) that forcing it through a generic shared-array shape
  adds indirection without benefit — content is inlined as local data structures
  directly in `expertise.tsx` and `experience.tsx`. `personalization.profilePicPublicPath`
  stays in `metadata/index.ts` since it's still shared across pages.

## 3. Visual system — "Flight Deck"

Rationale: the subject's own professional identity is precision instrumentation —
market-data latency measured in fractions of a millisecond, uptime to two decimal
places, dashboards and RCAs. The visual system borrows that grammar directly instead
of a generic "tech executive" template.

**Color** (dark theme only):
- `--ink: #0a0e16` (background)
- `--panel: #10151f`, `--panel-2: #141a26` (card/section surfaces)
- `--hairline: #232c3d`, `--hairline-soft: #1a2130` (borders/rules)
- `--text: #eceff4` (primary text), `--muted: #8993a8`, `--muted-dim: #5c6478`
- Pillar accents (semantic — one per engineering discipline, used consistently
  everywhere that discipline appears): `--cloud: #6fa3e0` (blue), `--ai: #b09af0`
  (violet), `--data: #52c2a0` (teal). Each also has a `-dim` variant for chip borders.
- No other accent colors. No light-mode variant in v1.

**Type:**
- Display (`h1`/`h2`/`h3`): **Fraunces** (500/600, italic 400 for small emphasis) —
  an editorial serif with real character, used for headline personality against the
  disciplined dark grid.
- Body: **Public Sans** (400/600) — clean, legible, distinct from Inter.
- Labels, stats, nav, chips, dates: **JetBrains Mono** (400/500) with
  `font-variant-numeric: tabular-nums` wherever digits line up.
- No emoji anywhere (the current site uses 🚀📈⚡🤖 as bullet markers — reads as
  blog-casual, not executive; remove entirely). Small inline SVG line icons (cloud,
  chip/circuit, database) replace emoji where a pillar needs a glyph.

**Layout conventions:**
- Hairline-bordered panels and stat tiles, not rounded cards with shadows.
- Section eyebrows in uppercase mono with a short leading rule (e.g. `— PAGE · HOME`).
- Sticky top nav, blurred dark background.
- Responsive breakpoint at 720px: multi-column grids collapse to single column.

## 4. Information architecture

| Page | Role | Depth |
|---|---|---|
| **Home** (`index.tsx`) | Short, personal, first-person — modeled on nadh.in (Kailash Nadh, CTO of Zerodha): a real CTO in the same industry whose homepage stays brief while depth lives on dedicated pages. Hero (2 short paragraphs, first-person voice — see §6), a 4-stat strip, three one-line pillar teaser cards linking to `/expertise`. | Intentionally shallow |
| **Expertise** (`expertise.tsx`, new) | The core deliverable — the "segregated skills section" the user originally asked for. Three pillar sections (Cloud & Platform, AI/ML & Applied GenAI, Data Engineering), each broken into the same sub-categories already present in the user's own resume documents (e.g. Cloud → Strategic Transformation / High-Performance Systems / FinOps & Networking / Security & Compliance), each sub-category a bullet list. Each pillar ends with a skill-chip row scoped to that discipline. | Full depth |
| **Experience** (`experience.tsx`) | Every role, complete bullet list — not one-liners. SMC (both titles: Senior Director AI&Data, and prior Director of Engineering Cloud&Platform), Scrut Automation, BYJU'S get full detail; the five earlier roles (Finicity, CitiusTech, NeoSoft, Sitel, Select Jobs) are listed as title/company/dates only — no fabricated bullets, since no achievement detail exists in the source vault for them. | Full depth for roles with source detail; honest minimal listing otherwise |
| **Projects** (`projects.tsx`) | Existing 4 projects (Scrut GRC, BYJU'S PCA, BYJU'S UMS, Legal Babu), restyled as panels in the Flight Deck system. Currently hidden from nav (`_meta.json` `"display": "hidden"`) — surfaced into the new `Nav` component. | Unchanged content, restyled |
| **About** (`about.tsx`) | Leadership philosophy, awards, publications, education. Skills list is removed from here (moved to Expertise) to avoid duplication. | Moderate |
| **Uses** (`uses.tsx`) | Unchanged content, restyled to match. | Unchanged |
| **Blog** | Unchanged — stays on Nextra/`nextra-theme-blog`. | N/A |

Nav order: Home · Expertise · Experience · Projects · About · Uses (table order above
matches this exactly).

## 5. Content policy

1. **Exclude every `(est.)`-tagged figure.** The vault's resume documents
   (`Resume - Super`, `Resume - Cloud/AI/Data Engineering`,
   `Achievements - Executive Resume`) explicitly mark fabricated placeholder numbers
   with `(est.)` — e.g. "~$180K/yr saved", "~92% RCA" is actually *not* tagged and is
   described as "directly derived," so it stays; but numbers like "8 teams (est.)",
   "$1.2M (est.) incremental pipeline", "~55% (est.) ticket deflection" must not
   appear anywhere on the public site. Only untagged, verified figures are used
   (full list already validated in the Concept H mockup: 70×, 0.40ms, 99.99%,
   29–40%, 98.7%, 60%, 12%→100%, 38%, 50%, $360K/30%+, ~$1.464M/30%+, 80%, 6%→100%,
   70% escalation reduction, ~900 servers, ~130 accounts, ~$1.2M TCO, ₹100 Cr+,
   ₹30 Cr+).
2. **Fix the stale job title.** Current site and `metadata/index.ts` both say
   "Director of Engineering, SMC Group, 09/2023–Present" with no mention of the
   01/2026 promotion to "Senior Director of Engineering, AI & Data." All pages must
   reflect the current title and show both SMC roles as separate timeline entries.
3. **Fix the contact email.** Site currently links `Karthikmani345@gmail.com`
   (index.mdx) which doesn't match the resume's `kartikmanimuthu@gmail.com`. Use the
   resume email everywhere; do not add a phone number to any public page.
4. **No fabricated bullets for roles lacking source detail** (Finicity, CitiusTech,
   NeoSoft, Sitel, Select Jobs) — list title/company/dates only.

## 6. Copy direction

Hero copy shifts from third-person corporate voice ("Visionary Technology Executive
with a proven track record...") to first-person, direct voice, per the Concept H
mockup:

> I'm Kartik Manimuthu. I take legacy institutions on-prem to AI-native.
>
> I lead engineering for SMC Group's trading platform — cloud, data, and now applied
> AI — across a rebuild that took a 30-year-old broking house from on-premise servers
> to a hybrid-cloud system trading at national-exchange scale.
>
> Before this, I optimized cloud spend at BYJU'S through its highest-traffic year,
> and ran a 42-person engineering org at Scrut Automation. I like systems that have
> to be right the first time — market-data feeds, reconciliation engines, anything
> where "probably correct" isn't good enough.

This same first-person register should carry into the About page's leadership
philosophy section; the Expertise and Experience pages stay in resume-register
(third-person implied, bullet-driven) since they are reference/scan material, not
narrative.

## 7. Out of scope for this pass

- Light mode / theme toggle.
- Resume PDF generation (the "Download Résumé" button links to a static PDF the user
  supplies separately; building a PDF export pipeline is not part of this work).
- Blog redesign.
- CMS or any data-driven content system — content is hand-written in the `.tsx`
  pages/components, consistent with the current repo's approach.
- Analytics / SEO metadata beyond what already exists.

## 8. Reference mockup

The approved visual/content direction is captured in a throwaway HTML artifact
("Concept H — Flight Deck, Full Depth") produced during the design conversation. It
is not part of the repo; the implementation plan should treat this spec (not the
artifact) as the source of truth, since the artifact used inlined fonts and
placeholder photo boxes purely for preview purposes.
