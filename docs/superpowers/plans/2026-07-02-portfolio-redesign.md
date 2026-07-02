# Portfolio Redesign ("Flight Deck") Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current `nextra-theme-blog`-wrapped portfolio pages (Home, About, Experience, Projects, Uses) with custom-built pages in the "Flight Deck" visual system, add a new Expertise page with full-depth, pillar-segregated content, and fix the stale job title / wrong contact email along the way — without touching `/blog`.

**Architecture:** `nextra-theme-blog` only auto-styles `.mdx` files under `pages/` — plain `.tsx` pages are untouched by it and render exactly what they return. Convert `index`, `about`, `experience`, `projects`, `uses` from `.mdx` to `.tsx`, each wrapped in a new `SiteLayout` component (custom `Nav` + `Footer`) that is applied *per-page*, not globally in `_app`, so `/blog` keeps rendering through `nextra-theme-blog` with no double chrome.

**Tech Stack:** Next.js 13.5 (pages router), React 18, TypeScript, `next/font/google` for self-hosted fonts (Fraunces, Public Sans, JetBrains Mono), plain CSS in `styles/global.css` scoped under a `.site-shell` root class (the bespoke grid/pseudo-element-heavy design doesn't fit Tailwind utilities well, and Tailwind is already a minor, inconsistently-used dependency in this repo).

## Global Constraints

- Every headline figure must be an untagged (non-`(est.)`) number from the source vault. The approved set: 70×, 0.40ms, 99.99%, 29–40%, 98.7%, 60%, 12%→100%, 38%, 50%, $360K (30%+), ~$1.464M (30%+), 80%, 6%→100%, 70% escalation reduction, ~900 servers, ~130 accounts, ~$1.2M TCO, ₹100 Cr+, ₹30 Cr+. Do not introduce any other figure without checking it against `/Users/kartik/Documents/Obsidian Vault/Resume Package/` for an `(est.)` tag.
- Current job title across every page must read **"Senior Director of Engineering, AI & Data"** (promoted 01/2026), with "Director of Engineering, Cloud & Platform" (09/2023–01/2026) as a separate, earlier timeline entry. Never leave the stale "Director of Engineering ... Present" framing.
- Contact email everywhere is `kartikmanimuthu@gmail.com` (not `Karthikmani345@gmail.com`, which is what `pages/index.mdx` currently has). No phone number on any public page.
- No emoji anywhere in the redesigned pages (the current site uses 🚀📈⚡🤖 as bullet markers — being removed as part of this work).
- Do not modify `pages/blog/**`, `theme.config.tsx`, or `next.config.js`.
- No new test framework is introduced (none exists in this repo today). Each task's verification step is: TypeScript compiles cleanly, the page returns HTTP 200 from the dev server, and a `grep` check confirms the expected content actually rendered (not just that the page didn't crash).

---

### Task 1: Fonts, design tokens, and layout shell

**Files:**
- Create: `lib/fonts.ts`
- Create: `components/layout/Nav.tsx`
- Create: `components/layout/Footer.tsx`
- Create: `components/layout/SiteLayout.tsx`
- Modify: `pages/_app.js` → delete, replaced by `pages/_app.tsx`
- Create: `pages/_app.tsx`
- Modify: `styles/global.css`
- Create: `pages/index.tsx` (minimal stub for this task only — full content lands in Task 2)
- Delete: `pages/index.mdx` (superseded by the stub; content restored in Task 2)

**Interfaces:**
- Produces: `SiteLayout` component — `React.FC<{ children: React.ReactNode }>`, renders `<div className="site-shell"><Nav /><main>{children}</main><Footer /></div>`. Every subsequent page task imports and uses this.
- Produces: CSS classes available to every later task: `.wrap`, `.eyebrow`, `.mono`, `.stats`, `.stat-tile` (+ `-value`/`-label`), `.chip` (+ `--cloud`/`--ai`/`--data` modifiers), plus the CSS custom properties `--ink`, `--panel`, `--panel-2`, `--hairline`, `--hairline-soft`, `--text`, `--muted`, `--muted-dim`, `--cloud`, `--cloud-dim`, `--ai`, `--ai-dim`, `--data`, `--data-dim` (all scoped under `.site-shell`).

- [ ] **Step 1: Create the font loader**

`lib/fonts.ts`:
```ts
import { Fraunces, Public_Sans, JetBrains_Mono } from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-public-sans",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
```

- [ ] **Step 2: Add the Flight Deck design tokens to global.css**

Append to `styles/global.css` (do not touch the existing `h1:first-child` rule — that's still needed for `/blog`):

```css
/* ===== Flight Deck design system (scoped to .site-shell) ===== */
.site-shell {
  --ink: #0a0e16;
  --panel: #10151f;
  --panel-2: #141a26;
  --hairline: #232c3d;
  --hairline-soft: #1a2130;
  --text: #eceff4;
  --muted: #8993a8;
  --muted-dim: #5c6478;
  --cloud: #6fa3e0;
  --cloud-dim: #234563;
  --ai: #b09af0;
  --ai-dim: #3f3560;
  --data: #52c2a0;
  --data-dim: #1e4f42;

  background: var(--ink);
  color: var(--text);
  font-family: var(--font-public-sans), system-ui, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

.site-shell h1,
.site-shell h2,
.site-shell h3 {
  font-family: var(--font-fraunces), Georgia, serif;
  font-weight: 600;
  text-wrap: balance;
  margin: 0;
}

.site-shell a {
  color: inherit;
}

.site-shell .mono {
  font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
  font-variant-numeric: tabular-nums;
}

.site-shell .wrap {
  max-width: 1040px;
  margin: 0 auto;
  padding: 0 32px;
}

.site-shell .eyebrow {
  font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted-dim);
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 14px;
}
.site-shell .eyebrow::before {
  content: "";
  width: 16px;
  height: 1px;
  background: var(--muted-dim);
  display: inline-block;
}

/* nav */
.site-nav {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(10, 14, 22, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--hairline-soft);
}
.site-nav-inner {
  max-width: 1040px;
  margin: 0 auto;
  padding: 0 32px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.site-nav-mark {
  font-family: var(--font-fraunces), serif;
  font-weight: 600;
  font-size: 16px;
}
.site-nav-links {
  display: flex;
  gap: 26px;
  font-family: var(--font-jetbrains-mono), monospace;
  font-size: 11.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.site-nav-links a {
  color: var(--muted);
  text-decoration: none;
}
.site-nav-links a.active {
  color: var(--text);
}

/* footer */
.site-footer {
  max-width: 1040px;
  margin: 0 auto;
  padding: 30px 32px 48px;
  border-top: 1px solid var(--hairline);
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--muted);
}
.site-footer-links {
  display: flex;
  gap: 20px;
  font-family: var(--font-jetbrains-mono), monospace;
  font-size: 11.5px;
}
.site-footer-links a {
  text-decoration: none;
  color: var(--muted);
}

/* stat tiles */
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid var(--hairline);
  margin: 40px 0 56px;
}
.stat-tile {
  padding: 20px 18px;
  border-right: 1px solid var(--hairline);
}
.stat-tile:last-child {
  border-right: none;
}
.stat-tile-value {
  font-size: 23px;
  font-weight: 500;
}
.stat-tile-label {
  margin-top: 5px;
  font-size: 11.5px;
  color: var(--muted);
  line-height: 1.4;
}

/* chips */
.chip {
  font-size: 10.5px;
  padding: 4px 8px;
  border: 1px solid var(--hairline);
  color: var(--muted);
  display: inline-block;
}
.chip--cloud {
  border-color: var(--cloud-dim);
  color: #a9c6e8;
}
.chip--ai {
  border-color: var(--ai-dim);
  color: #cdbff2;
}
.chip--data {
  border-color: var(--data-dim);
  color: #9fdbc4;
}

@media (max-width: 720px) {
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
  .stat-tile:nth-child(2n) {
    border-right: none;
  }
  .site-footer {
    flex-direction: column;
    gap: 14px;
  }
}
```

- [ ] **Step 3: Create Nav**

`components/layout/Nav.tsx`:
```tsx
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/expertise", label: "Expertise" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/uses", label: "Uses" },
];

const Nav: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="site-nav">
      <div className="site-nav-inner">
        <span className="site-nav-mark">Kartik Manimuthu</span>
        <div className="site-nav-links">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={router.pathname === link.href ? "active" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
```

- [ ] **Step 4: Create Footer**

`components/layout/Footer.tsx`:
```tsx
import React from "react";

const Footer: React.FC = () => (
  <footer className="site-footer">
    <span>© 2026 Kartik Manimuthu — Mumbai</span>
    <div className="site-footer-links">
      <a
        href="https://www.linkedin.com/in/kartik-manimuthu"
        target="_blank"
        rel="noreferrer"
      >
        LinkedIn
      </a>
      <a href="https://github.com/kartikmanimuthu" target="_blank" rel="noreferrer">
        GitHub
      </a>
      <a href="mailto:kartikmanimuthu@gmail.com">Email</a>
    </div>
  </footer>
);

export default Footer;
```

- [ ] **Step 5: Create SiteLayout**

`components/layout/SiteLayout.tsx`:
```tsx
import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";

interface SiteLayoutProps {
  children: React.ReactNode;
}

const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => (
  <div className="site-shell">
    <Nav />
    <main>{children}</main>
    <Footer />
  </div>
);

export default SiteLayout;
```

- [ ] **Step 6: Replace `_app.js` with `_app.tsx`**

Delete `pages/_app.js`, create `pages/_app.tsx`:
```tsx
import "../styles/global.css";
import type { AppProps } from "next/app";
import { fraunces, publicSans, jetbrainsMono } from "../lib/fonts";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${fraunces.variable} ${publicSans.variable} ${jetbrainsMono.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
```

This only defines CSS custom properties on a wrapper div — it does not set `font-family` globally, so `/blog` (still on `nextra-theme-blog`) is visually unaffected.

- [ ] **Step 7: Replace `index.mdx` with a minimal stub `index.tsx`**

Delete `pages/index.mdx`. Create `pages/index.tsx`:
```tsx
import React from "react";
import SiteLayout from "../components/layout/SiteLayout";

export default function Home() {
  return (
    <SiteLayout>
      <div className="wrap">
        <p className="eyebrow">page · home</p>
        <h1>Kartik Manimuthu</h1>
      </div>
    </SiteLayout>
  );
}
```

This is intentionally minimal — Task 2 replaces the body with the full hero/stats/teaser content. Its only job here is to prove the layout shell renders correctly end to end.

- [ ] **Step 8: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 9: Verify in the dev server**

Run:
```bash
pnpm dev &
sleep 5
curl -s http://localhost:3000/ | grep -o 'Kartik Manimuthu' | head -1
curl -s http://localhost:3000/ | grep -o 'site-nav-links' | head -1
curl -s http://localhost:3000/blog | grep -o '<html' | head -1
kill %1
```
Expected: first two greps each print a match (nav mark and nav links rendered); the third confirms `/blog` still returns a normal HTML page (not broken by the `_app.tsx` change).

- [ ] **Step 10: Commit**

```bash
git add lib/fonts.ts components/layout pages/_app.tsx pages/index.tsx styles/global.css
git rm pages/_app.js pages/index.mdx
git commit -m "feat: add Flight Deck design system and layout shell"
```

---

### Task 2: Home page — hero, stats, pillar teasers

**Files:**
- Modify: `pages/index.tsx`
- Modify: `styles/global.css`

**Interfaces:**
- Consumes: `SiteLayout` from Task 1.
- Produces: `.hero`, `.hero-grid`, `.hero-photo`, `.hero-cta`, `.btn`/`.btn.primary`, `.teaser-row`, `.teaser` (+ `--cloud`/`--ai`/`--data`) CSS classes — not reused by later tasks, but documented here so a reviewer can see nothing is orphaned.

- [ ] **Step 1: Add Home-page CSS**

Append to `styles/global.css`:
```css
/* home */
.hero {
  padding: 72px 0 0;
}
.hero-grid {
  display: grid;
  grid-template-columns: 1fr 140px;
  gap: 40px;
  align-items: start;
}
.hero h1 {
  font-size: 34px;
  line-height: 1.3;
}
.hero .role {
  font-family: var(--font-jetbrains-mono), monospace;
  font-size: 12.5px;
  color: var(--cloud);
  margin: 16px 0 0;
}
.hero p.lede {
  margin: 18px 0 0;
  font-size: 16px;
  color: #c2c8d4;
  max-width: 62ch;
}
.hero p.lede + p.lede {
  margin-top: 12px;
  color: var(--muted);
}
.hero-photo {
  width: 140px;
  height: 140px;
  border: 1px solid var(--hairline);
  padding: 6px;
  background: var(--panel);
}
.hero-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero-cta {
  margin-top: 26px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.btn {
  font-family: var(--font-jetbrains-mono), monospace;
  font-size: 11.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 10px 16px;
  border: 1px solid var(--hairline);
  text-decoration: none;
  color: var(--text);
  display: inline-block;
}
.btn.primary {
  background: var(--text);
  color: var(--ink);
  border-color: var(--text);
}

.teaser-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--hairline);
  border: 1px solid var(--hairline);
  margin-bottom: 56px;
}
.teaser {
  background: var(--panel);
  padding: 20px 20px 22px;
}
.teaser .k {
  font-family: var(--font-jetbrains-mono), monospace;
  font-size: 10.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.teaser--cloud .k {
  color: var(--cloud);
}
.teaser--ai .k {
  color: var(--ai);
}
.teaser--data .k {
  color: var(--data);
}
.teaser h4 {
  font-size: 15.5px;
  font-weight: 600;
  font-family: var(--font-public-sans);
  margin: 0 0 8px;
}
.teaser p {
  font-size: 12.5px;
  color: var(--muted);
  margin: 0 0 10px;
}
.teaser a {
  font-family: var(--font-jetbrains-mono), monospace;
  font-size: 11px;
  color: var(--text);
  text-decoration: none;
}

@media (max-width: 720px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
  .hero-photo {
    width: 84px;
    height: 84px;
    order: -1;
  }
  .teaser-row {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 2: Write the full Home page**

Replace `pages/index.tsx`:
```tsx
import React from "react";
import Link from "next/link";
import SiteLayout from "../components/layout/SiteLayout";
import StatTile from "../components/ui/StatTile";
import { personalization } from "../metadata";

const STATS = [
  { value: "70×", label: "Order-volume scale in 10 months" },
  { value: "0.40ms", label: "Market-data latency, industry-lowest" },
  { value: "99.99%", label: "Uptime through peak volatility" },
  { value: "29–40%", label: "Annualized infra savings via FinOps" },
];

export default function Home() {
  return (
    <SiteLayout>
      <div className="wrap">
        <section className="hero">
          <p className="eyebrow">page · home</p>
          <div className="hero-grid">
            <div>
              <h1>I&apos;m Kartik Manimuthu. I take legacy institutions on-prem to AI-native.</h1>
              <p className="role">
                Senior Director of Engineering — AI &amp; Data · SMC Group · Mumbai
              </p>
              <p className="lede">
                I lead engineering for SMC Group&apos;s trading platform — cloud, data,
                and now applied AI — across a rebuild that took a 30-year-old broking
                house from on-premise servers to a hybrid-cloud system trading at
                national-exchange scale.
              </p>
              <p className="lede">
                Before this, I optimized cloud spend at BYJU&apos;S through its
                highest-traffic year, and ran a 42-person engineering org at Scrut
                Automation. I like systems that have to be right the first time —
                market-data feeds, reconciliation engines, anything where
                &quot;probably correct&quot; isn&apos;t good enough.
              </p>
              <div className="hero-cta">
                <a className="btn primary" href="/resume.pdf">
                  Download Résumé
                </a>
                <a
                  className="btn"
                  href="https://www.linkedin.com/in/kartik-manimuthu"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn ↗
                </a>
                <a className="btn" href="mailto:kartikmanimuthu@gmail.com">
                  Email ↗
                </a>
              </div>
            </div>
            <div className="hero-photo">
              <img src={personalization.profilePicPublicPath} alt="Kartik Manimuthu" />
            </div>
          </div>

          <div className="stats">
            {STATS.map((stat) => (
              <StatTile key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>

          <div className="teaser-row">
            <div className="teaser teaser--cloud">
              <p className="k">Cloud &amp; Platform</p>
              <h4>Hyper-scale infrastructure</h4>
              <p>900 servers, 130 accounts, 0.40ms latency, 29–40% FinOps savings.</p>
              <Link href="/expertise#cloud">Full breakdown ↓</Link>
            </div>
            <div className="teaser teaser--ai">
              <p className="k">AI/ML &amp; GenAI</p>
              <h4>Applied, production LLMs</h4>
              <p>Self-hosted inference, fine-tuning, and the firm&apos;s GenAI platform.</p>
              <Link href="/expertise#ai">Full breakdown ↓</Link>
            </div>
            <div className="teaser teaser--data">
              <p className="k">Data Engineering</p>
              <h4>Lakehouse, built 0-to-1</h4>
              <p>SEBI-audited Medallion Lakehouse and real-time data products.</p>
              <Link href="/expertise#data">Full breakdown ↓</Link>
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
```

- [ ] **Step 3: Create the StatTile component it depends on**

`components/ui/StatTile.tsx`:
```tsx
import React from "react";

interface StatTileProps {
  value: string;
  label: string;
}

const StatTile: React.FC<StatTileProps> = ({ value, label }) => (
  <div className="stat-tile">
    <div className="stat-tile-value mono">{value}</div>
    <div className="stat-tile-label">{label}</div>
  </div>
);

export default StatTile;
```

- [ ] **Step 4: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Verify content rendered**

```bash
pnpm dev &
sleep 5
curl -s http://localhost:3000/ | grep -c 'stat-tile-value'
curl -s http://localhost:3000/ | grep -o 'kartikmanimuthu@gmail.com'
curl -s http://localhost:3000/ | grep -o 'Karthikmani345'
kill %1
```
Expected: first command prints `4` (all four stat tiles rendered); second prints the correct email; third prints nothing (confirming the old wrong email is gone).

- [ ] **Step 6: Commit**

```bash
git add pages/index.tsx components/ui/StatTile.tsx styles/global.css
git commit -m "feat: build full Home page hero, stats, and pillar teasers"
```

---

### Task 3: Expertise page — full depth, three pillars

**Files:**
- Create: `pages/expertise.tsx`
- Create: `components/ui/PillarIcons.tsx`
- Create: `components/ui/Chip.tsx`
- Modify: `styles/global.css`

**Interfaces:**
- Consumes: `SiteLayout` (Task 1), `.chip`/`.chip--*` CSS (Task 1).
- Produces: `Chip` — `React.FC<{ pillar?: "cloud" | "ai" | "data"; children: React.ReactNode }>`, reused by Task 6 (Projects).
- Produces: `CloudIcon`, `AiIcon`, `DataIcon` — `React.FC<React.SVGProps<SVGSVGElement>>`, used only on this page.

- [ ] **Step 1: Create the Chip component**

`components/ui/Chip.tsx`:
```tsx
import React from "react";

type Pillar = "cloud" | "ai" | "data";

interface ChipProps {
  pillar?: Pillar;
  children: React.ReactNode;
}

const Chip: React.FC<ChipProps> = ({ pillar, children }) => (
  <span className={`chip mono${pillar ? ` chip--${pillar}` : ""}`}>{children}</span>
);

export default Chip;
```

- [ ] **Step 2: Create the pillar icon set**

`components/ui/PillarIcons.tsx`:
```tsx
import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

export const CloudIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} {...props}>
    <path d="M7 18a4.5 4.5 0 0 1-.4-8.98A5.5 5.5 0 0 1 17.5 8a4 4 0 0 1 .5 7.98" />
    <path d="M7 18h10.5" />
  </svg>
);

export const AiIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} {...props}>
    <rect x="7" y="7" width="10" height="10" rx="1" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.5 4.5l2 2M17.5 17.5l2 2M4.5 19.5l2-2M17.5 6.5l2-2" />
  </svg>
);

export const DataIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} {...props}>
    <ellipse cx="12" cy="5.5" rx="7" ry="2.5" />
    <path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13" />
    <path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
  </svg>
);
```

- [ ] **Step 3: Add Expertise-page CSS**

Append to `styles/global.css`:
```css
/* expertise */
.page-title {
  font-size: 30px;
  margin-bottom: 8px;
}
.page-sub {
  color: var(--muted);
  font-size: 14.5px;
  max-width: 60ch;
  margin: 0 0 40px;
}

.pillar-full {
  border-top: 1px solid var(--hairline);
  padding: 40px 0 44px;
  scroll-margin-top: 80px;
}
.pillar-head {
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 26px;
}
.pillar-icon {
  width: 26px;
  height: 26px;
  flex-shrink: 0;
}
.pillar-full h3 {
  font-size: 24px;
}
.pillar--cloud .pillar-icon,
.pillar--cloud .group-k {
  color: var(--cloud);
}
.pillar--ai .pillar-icon,
.pillar--ai .group-k {
  color: var(--ai);
}
.pillar--data .pillar-icon,
.pillar--data .group-k {
  color: var(--data);
}

.group-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px 36px;
  margin-bottom: 24px;
}
.group-k {
  font-family: var(--font-jetbrains-mono), monospace;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--hairline-soft);
}
.group ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 9px;
}
.group li {
  font-size: 13.5px;
  color: #c7ccd9;
  padding-left: 14px;
  position: relative;
  line-height: 1.5;
}
.group li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 7px;
  width: 5px;
  height: 1px;
  background: var(--muted-dim);
}
.group li b {
  color: var(--text);
  font-weight: 600;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding-top: 18px;
  border-top: 1px solid var(--hairline-soft);
}

@media (max-width: 720px) {
  .group-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 4: Write the Expertise page**

`pages/expertise.tsx`:
```tsx
import React from "react";
import SiteLayout from "../components/layout/SiteLayout";
import Chip from "../components/ui/Chip";
import { CloudIcon, AiIcon, DataIcon } from "../components/ui/PillarIcons";

export default function Expertise() {
  return (
    <SiteLayout>
      <div className="wrap" style={{ paddingTop: "8px", paddingBottom: "20px" }}>
        <p className="eyebrow">page · expertise</p>
        <h2 className="page-title">Three disciplines, in full</h2>
        <p className="page-sub">
          Every pillar below mirrors the structure of my actual working notes —
          grouped into sub-categories, not flattened into a handful of headline
          bullets.
        </p>

        <div className="pillar-full pillar--cloud" id="cloud">
          <div className="pillar-head">
            <CloudIcon className="pillar-icon" />
            <h3>Cloud &amp; Platform Engineering</h3>
          </div>
          <div className="group-grid">
            <div className="group">
              <p className="group-k">Strategic Transformation &amp; Capacity</p>
              <ul>
                <li>
                  Orchestrated a <b>30-month digital overhaul</b> transitioning a
                  30-year-old institution from legacy on-prem to hybrid cloud,
                  powering the &quot;SmartTrader&quot; launch (<b>₹30 Cr+</b> client
                  fee savings)
                </li>
                <li>
                  Architected &quot;10x-ready&quot; infrastructure scaling daily
                  orders <b>10K → 700K+ (70×)</b> within 10 months; migrated{" "}
                  <b>~900 servers</b> to AWS
                </li>
                <li>
                  Managed a <b>₹100 Cr+</b> technology investment budget, aligning
                  roadmaps to business KPIs
                </li>
              </ul>
            </div>
            <div className="group">
              <p className="group-k">High-Performance &amp; Low-Latency Systems</p>
              <ul>
                <li>
                  Designed a hybrid ingestion engine — Direct Connect + Transit
                  Gateway Multicast + GRE — for NSE/BSE/MCX feeds at{" "}
                  <b>0.40ms</b> latency (~90% reduction)
                </li>
                <li>
                  Eliminated &quot;thundering herd&quot; login surges via WebSocket
                  management on Amazon ECS, sustaining <b>99.99% uptime</b> for
                  hundreds of thousands of concurrent traders
                </li>
                <li>Re-architected marketing/static sites to render via CDN for caching and performance</li>
              </ul>
            </div>
            <div className="group">
              <p className="group-k">FinOps, Networking &amp; Multi-Account</p>
              <ul>
                <li>
                  Implemented a FinOps framework and AWS MAP vendor negotiation for{" "}
                  <b>29–40%</b> annualized cost savings — <i>FinOps Leader of the
                  Year, 2025</i>
                </li>
                <li>
                  Governed <b>~130 AWS accounts</b> via Control Tower; ran a{" "}
                  <b>~900-server estate at ~$1.2M TCO</b>
                </li>
                <li>Designed the hybrid network backbone — hub-and-spoke, Transit Gateway, Direct Connect, VPN tunnels</li>
                <li>Earned AWS Well-Architected qualification ($6,000 in credits)</li>
              </ul>
            </div>
            <div className="group">
              <p className="group-k">Security, Compliance &amp; Reliability</p>
              <ul>
                <li>Built an in-house DevSecOps program with IaC SecOps gates in CI/CD, cutting MTTR materially</li>
                <li>Deployed CloudHSM-backed KMS, AWS WAF, and led EDR/XDR/MDR + SIEM/SOC adoption</li>
                <li>Standardized IaC org-wide (Terraform, Pulumi, OpenTofu); deployed a self-hosted LGTM observability stack with AIOps-driven incident response</li>
                <li>Key contributor to <b>ISO 27001</b> and <b>SEBI</b> compliance audits</li>
              </ul>
            </div>
          </div>
          <div className="chips">
            <Chip pillar="cloud">AWS</Chip>
            <Chip pillar="cloud">Transit Gateway</Chip>
            <Chip pillar="cloud">Direct Connect</Chip>
            <Chip pillar="cloud">Amazon ECS</Chip>
            <Chip pillar="cloud">Control Tower</Chip>
            <Chip pillar="cloud">CloudHSM</Chip>
            <Chip pillar="cloud">AWS WAF</Chip>
            <Chip pillar="cloud">Terraform</Chip>
            <Chip pillar="cloud">Pulumi</Chip>
            <Chip pillar="cloud">OpenTofu</Chip>
            <Chip pillar="cloud">LGTM</Chip>
            <Chip pillar="cloud">FinOps</Chip>
          </div>
        </div>

        <div className="pillar-full pillar--ai" id="ai">
          <div className="pillar-head">
            <AiIcon className="pillar-icon" />
            <h3>AI / ML &amp; Applied GenAI</h3>
          </div>
          <div className="group-grid">
            <div className="group">
              <p className="group-k">Model Training, Fine-Tuning &amp; Alignment</p>
              <ul>
                <li>
                  Built an end-to-end fine-tuning pipeline for open-weight models
                  (<b>Gemma 2, Qwen2.5, Llama</b>) using <b>LoRA/QLoRA</b> on
                  curated golden datasets
                </li>
                <li>Engineered an &quot;online golden-dataset&quot; flywheel — production traffic → review → curated SFT/preference pairs → scheduled retraining</li>
                <li>Applied preference-based alignment (<b>DPO/RLHF/RLAIF</b>) to steer models to domain tone and compliance constraints</li>
                <li>Stood up an evaluation harness — golden-set scoring, LLM-as-judge, red-teaming — as a production promotion gate</li>
              </ul>
            </div>
            <div className="group">
              <p className="group-k">Model Compression &amp; Efficient Serving</p>
              <ul>
                <li>Led model compression — quantization (INT8/INT4, GPTQ/AWQ/GGUF), distillation, pruning — to fit larger models onto smaller GPUs (L4/A10G vs. A100-class)</li>
                <li>Optimized throughput with <b>vLLM/TensorRT-LLM</b>, paged KV-cache, continuous batching, and speculative decoding</li>
                <li>Ran a right-sized GPU serving cluster on AWS ECS with autoscaling across training and inference workloads</li>
              </ul>
            </div>
            <div className="group">
              <p className="group-k">Self-Hosted Inference — Cost &amp; Compliance</p>
              <ul>
                <li>Replaced third-party API inference with fully self-hosted, in-VPC models to meet SEBI data-residency requirements</li>
                <li>Centralized model access via a <b>LiteLLM</b> gateway — unified auth, routing, rate limiting, cost attribution, audit logging</li>
              </ul>
            </div>
            <div className="group">
              <p className="group-k">Applied GenAI Products</p>
              <ul>
                <li>
                  Architected a proprietary <b>GenAI Agent Platform</b> on{" "}
                  <b>Amazon Bedrock (Claude 3.5)</b> with <b>MCP</b> —{" "}
                  <b>98.7%</b> less context overhead, <b>60%</b> of support
                  workloads automated
                </li>
                <li>
                  Shipped a <b>RAG</b> assistant (LangChain/LangGraph); built an
                  AIOps self-healing platform cutting incident RCA time ~92%
                  (2 hrs → &lt;10 min)
                </li>
                <li>
                  Automated compliance ops: AI voice bots replaced <b>38%</b> of
                  manual collection calls; QA audit coverage scaled{" "}
                  <b>12% → 100%</b>
                </li>
                <li>Built a PyTorch signature-verification model and a GenAI portfolio analyzer; delivered predictive (Prophecy) and operational (MOTIF) ML platforms</li>
              </ul>
            </div>
          </div>
          <div className="chips">
            <Chip pillar="ai">Amazon Bedrock</Chip>
            <Chip pillar="ai">Claude 3.5</Chip>
            <Chip pillar="ai">MCP</Chip>
            <Chip pillar="ai">LangGraph</Chip>
            <Chip pillar="ai">RAG</Chip>
            <Chip pillar="ai">LoRA/QLoRA</Chip>
            <Chip pillar="ai">DPO/RLHF</Chip>
            <Chip pillar="ai">vLLM</Chip>
            <Chip pillar="ai">TensorRT-LLM</Chip>
            <Chip pillar="ai">LiteLLM</Chip>
            <Chip pillar="ai">PyTorch</Chip>
            <Chip pillar="ai">AIOps</Chip>
          </div>
        </div>

        <div className="pillar-full pillar--data" id="data">
          <div className="pillar-head">
            <DataIcon className="pillar-icon" />
            <h3>Data Engineering</h3>
          </div>
          <div className="group-grid">
            <div className="group">
              <p className="group-k">Lakehouse &amp; Data Platform (0-to-1)</p>
              <ul>
                <li>
                  Established an enterprise <b>Medallion Lakehouse</b>
                  (Bronze/Silver/Gold) on <b>Apache Iceberg, AWS Glue, S3</b> with
                  ACID-compliant, time-travel auditing for <b>SEBI</b> compliance
                </li>
                <li>Architected the open-source pipeline — DLT ingestion, dbt transformation, Parquet + Delta Lake with Lake Formation governance, Presto/Athena query — orchestrated by <b>Airflow</b>, self-hosted on AWS EKS</li>
              </ul>
            </div>
            <div className="group">
              <p className="group-k">Real-Time Data &amp; Governance</p>
              <ul>
                <li>Developed a fault-tolerant real-time reconciliation engine (microservices + <b>ElastiCache</b>) with zero tolerance for packet loss</li>
                <li>Enforced data modeling, lineage, and auditability with dbt + Spark and <b>OpenMetadata</b>, meeting SEBI standards</li>
                <li>Delivered a semantic layer (<b>Cube.js</b>) for embedded analytics, surfaced through Metabase for BI</li>
              </ul>
            </div>
            <div className="group">
              <p className="group-k">Data Products</p>
              <ul>
                <li>
                  Led the build of <b>Piper</b>, a Customer Data Platform
                  (Customer 360) — <b>50%</b> improvement in customer engagement
                </li>
                <li>Provided the data substrate for predictive (Prophecy) and operational (MOTIF) analytics platforms</li>
              </ul>
            </div>
          </div>
          <div className="chips">
            <Chip pillar="data">Apache Iceberg</Chip>
            <Chip pillar="data">AWS Glue</Chip>
            <Chip pillar="data">Amazon S3</Chip>
            <Chip pillar="data">dbt</Chip>
            <Chip pillar="data">DLT</Chip>
            <Chip pillar="data">Airflow</Chip>
            <Chip pillar="data">Cube.js</Chip>
            <Chip pillar="data">OpenMetadata</Chip>
            <Chip pillar="data">ElastiCache</Chip>
            <Chip pillar="data">Metabase</Chip>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
```

- [ ] **Step 5: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Verify content depth rendered**

```bash
pnpm dev &
sleep 5
curl -s http://localhost:3000/expertise | grep -c '<li'
curl -s http://localhost:3000/expertise | grep -c 'class="chip'
curl -s http://localhost:3000/expertise | grep -o 'Data Engineering'
kill %1
```
Expected: first command prints `34` (Cloud 14 + AI 13 + Data 7 bullets across all sub-groups); second prints `34` (Cloud 12 + AI 12 + Data 10 chips); third prints the Data pillar heading, confirming all three pillars are present. If the `<li>` or chip counts differ from what you count by hand in the file, that means a bullet or chip was dropped during editing — recount the JSX before proceeding.

- [ ] **Step 7: Commit**

```bash
git add pages/expertise.tsx components/ui/PillarIcons.tsx components/ui/Chip.tsx styles/global.css
git commit -m "feat: add full-depth Expertise page with segregated Cloud/AI/Data pillars"
```

---

### Task 4: Experience page — every role, full detail

**Files:**
- Modify: `pages/experience.tsx` (currently `.mdx`; converting)
- Delete: `pages/experience.mdx`
- Modify: `styles/global.css`

**Interfaces:**
- Consumes: `SiteLayout` (Task 1).
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Add Experience-page CSS**

Append to `styles/global.css`:
```css
/* experience */
.role-full {
  border-top: 1px solid var(--hairline);
  padding: 30px 0 32px;
}
.role-full-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 4px;
}
.role-full-head h3 {
  font-size: 20px;
}
.role-full-head .dates {
  font-size: 12px;
  color: var(--muted-dim);
}
.role-full .org {
  font-family: var(--font-jetbrains-mono), monospace;
  font-size: 12.5px;
  color: var(--cloud);
  margin-bottom: 16px;
}
.role-full ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 9px;
}
.role-full li {
  font-size: 14px;
  color: #c7ccd9;
  padding-left: 14px;
  position: relative;
}
.role-full li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 8px;
  width: 5px;
  height: 1px;
  background: var(--muted-dim);
}
.role-full li b {
  color: var(--text);
  font-weight: 600;
}

.early-career {
  border-top: 1px solid var(--hairline);
  padding-top: 30px;
  margin-top: 4px;
}
.early-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  padding: 10px 0;
  border-bottom: 1px dotted var(--hairline-soft);
  color: #c7ccd9;
  flex-wrap: wrap;
  gap: 6px;
}
.early-row:last-child {
  border-bottom: none;
}
.early-row .e-meta {
  color: var(--muted-dim);
  font-family: var(--font-jetbrains-mono), monospace;
  font-size: 11.5px;
  white-space: nowrap;
}
```

- [ ] **Step 2: Write the Experience page**

Delete `pages/experience.mdx`. Create `pages/experience.tsx`:
```tsx
import React from "react";
import SiteLayout from "../components/layout/SiteLayout";

const EARLY_CAREER = [
  { title: "Senior Software Engineer — Finicity, a Mastercard Company", dates: "03/2021 – 08/2021" },
  { title: "Senior Software Engineer — CitiusTech Healthcare Technology", dates: "09/2019 – 03/2021" },
  { title: "Software Engineer — NeoSoft Technologies (client: Edelweiss Financial Services)", dates: "04/2018 – 09/2019" },
  { title: "Programmer Analyst — Sitel India", dates: "11/2017 – 04/2018" },
  { title: "Software Engineer — Select Jobs Pvt Ltd", dates: "08/2016 – 11/2017" },
];

export default function Experience() {
  return (
    <SiteLayout>
      <div className="wrap" style={{ paddingTop: "8px", paddingBottom: "20px" }}>
        <p className="eyebrow">page · experience</p>
        <h2 className="page-title">Track record, unabridged</h2>
        <p className="page-sub">
          Each role carries its complete achievement list — nothing trimmed to fit
          a summary card.
        </p>

        <div className="role-full">
          <div className="role-full-head">
            <h3>Senior Director of Engineering, AI &amp; Data</h3>
            <span className="dates mono">01/2026 — Present</span>
          </div>
          <div className="org">SMC GROUP · MUMBAI / DELHI, INDIA</div>
          <ul>
            <li>Promoted from Director of Engineering; retained cloud-platform ownership alongside the new AI &amp; Data mandate</li>
            <li>
              Built a proprietary <b>GenAI Agent Platform</b> on Amazon Bedrock
              (Claude 3.5) with MCP, reducing context-window overhead{" "}
              <b>98.7%</b> and automating <b>60%</b> of support workloads
            </li>
            <li>
              Increased QA call-audit coverage from <b>12% to 100%</b>; replaced{" "}
              <b>38%</b> of manual collection calls with autonomous AI voice bots
            </li>
            <li>
              Stood up self-hosted LLM infrastructure — GPU cluster, LoRA/QLoRA
              fine-tuning, LiteLLM governance; AIOps RCAs cut incident diagnosis
              time <b>~92%</b> (2 hrs → under 10 min)
            </li>
            <li>Established an enterprise Medallion Lakehouse (Apache Iceberg, AWS Glue, S3) with ACID time-travel auditing for SEBI compliance</li>
            <li>
              Built <b>Piper</b>, a Customer 360 CDP, and a zero-loss real-time
              reconciliation engine — <b>50%</b> improvement in customer
              engagement
            </li>
          </ul>
        </div>

        <div className="role-full">
          <div className="role-full-head">
            <h3>Director of Engineering, Cloud &amp; Platform</h3>
            <span className="dates mono">09/2023 — 01/2026</span>
          </div>
          <div className="org">SMC GROUP · DELHI, INDIA</div>
          <ul>
            <li>
              Orchestrated a 30-month digital overhaul from legacy on-prem to
              hybrid cloud, powering the &quot;SmartTrader&quot; launch (
              <b>₹30 Cr+</b> client fee savings)
            </li>
            <li>
              Architected &quot;10x-ready&quot; infrastructure scaling daily
              orders <b>10K → 700K+ (70×)</b> in under 10 months; managed a{" "}
              <b>₹100 Cr+</b> technology budget
            </li>
            <li>Delivered <b>0.40ms</b> market-data latency via Direct Connect + Transit Gateway Multicast + GRE ingestion of NSE/BSE/MCX feeds</li>
            <li>Sustained <b>99.99%</b> uptime at peak volatility; solved &quot;thundering herd&quot; surges via WebSocket scaling on Amazon ECS</li>
            <li>Implemented a FinOps framework and AWS MAP vendor negotiation for <b>29–40%</b> annualized cost savings; governed ~130 AWS accounts (~$1.2M TCO)</li>
            <li>Hardened security/compliance: CloudHSM, AWS WAF, EDR/XDR/MDR, SIEM/SOC, IaC (Terraform/Pulumi/OpenTofu); key contributor to ISO 27001 &amp; SEBI audits</li>
          </ul>
        </div>

        <div className="role-full">
          <div className="role-full-head">
            <h3>Engineering Manager</h3>
            <span className="dates mono">01/2023 — 09/2023</span>
          </div>
          <div className="org">SCRUT AUTOMATION · BENGALURU, INDIA</div>
          <ul>
            <li>Led a cross-functional organization of <b>42</b> (Product, Platform, QA, DevOps, Support)</li>
            <li>Delivered <b>$360K (30%+)</b> annualized savings via a custom FinOps framework and serverless migration</li>
            <li>Directed the GRC framework engineering roadmap for global enterprise clients; spearheaded SaaS deployment across European and US markets</li>
            <li>Redesigned AWS infrastructure with a multi-region, multi-zone strategy; resolved critical DynamoDB bottlenecks at scale</li>
          </ul>
        </div>

        <div className="role-full">
          <div className="role-full-head">
            <h3>Principal Architect</h3>
            <span className="dates mono">02/2022 — 01/2023</span>
          </div>
          <div className="org">BYJU&apos;S (THINK &amp; LEARN GROUP) · MUMBAI, INDIA</div>
          <ul>
            <li>Delivered <b>~$1.464M (30%+)</b> in annualized savings through Cloud Cost Optimization and FinOps</li>
            <li>Reduced production incidents <b>80%</b>; secured infrastructure for high-traffic events including the FIFA World Cup sponsorship</li>
            <li>
              Developed an in-house AI/ML post-call auditing solution, raising
              coverage from <b>6% to 100%</b> and cutting escalations{" "}
              <b>70%</b>
            </li>
            <li>Transitioned CI/CD from Jenkins to GitHub Actions; moved infrastructure from bare-metal to EKS/ECS for zero downtime</li>
            <li>Re-architected the VPC network for private link, peering, and NAT; hardened perimeter with Cloudflare WAF</li>
          </ul>
        </div>

        <div className="early-career">
          <h2 className="page-title" style={{ fontSize: "20px", marginBottom: "16px" }}>
            Early Career
          </h2>
          {EARLY_CAREER.map((role) => (
            <div className="early-row" key={role.title}>
              <span>{role.title}</span>
              <span className="e-meta">{role.dates}</span>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
```

- [ ] **Step 3: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Verify all roles rendered**

```bash
pnpm dev &
sleep 5
curl -s http://localhost:3000/experience | grep -c 'role-full-head'
curl -s http://localhost:3000/experience | grep -c 'early-row'
curl -s http://localhost:3000/experience | grep -o 'Senior Director of Engineering, AI'
kill %1
```
Expected: first prints `4` (SMC ×2, Scrut, BYJU'S), second prints `5` (early-career roles), third confirms the current title text is present (not the stale "Director of Engineering" alone).

- [ ] **Step 5: Commit**

```bash
git add pages/experience.tsx styles/global.css
git rm pages/experience.mdx
git commit -m "feat: rebuild Experience page with full per-role detail"
```

---

### Task 5: About page — restyled, first-person philosophy

**Files:**
- Modify: `pages/about.tsx` (currently `.mdx`; converting)
- Delete: `pages/about.mdx`
- Modify: `styles/global.css`

**Interfaces:**
- Consumes: `SiteLayout` (Task 1).
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Add About-page CSS**

Append to `styles/global.css`:
```css
/* about */
.about-section {
  border-top: 1px solid var(--hairline);
  padding: 30px 0 32px;
}
.about-section:first-of-type {
  border-top: none;
}
.about-section p {
  font-size: 14.5px;
  color: #c7ccd9;
  max-width: 66ch;
  margin: 0 0 14px;
}
.about-section ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 9px;
}
.about-section li {
  font-size: 14px;
  color: #c7ccd9;
  padding-left: 14px;
  position: relative;
}
.about-section li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 8px;
  width: 5px;
  height: 1px;
  background: var(--muted-dim);
}
.list-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px dotted var(--hairline-soft);
  font-size: 13.5px;
  flex-wrap: wrap;
  gap: 6px;
}
.list-row:last-child {
  border-bottom: none;
}
.list-row .meta {
  color: var(--muted-dim);
  font-family: var(--font-jetbrains-mono), monospace;
  font-size: 11.5px;
  white-space: nowrap;
}
```

- [ ] **Step 2: Write the About page**

Delete `pages/about.mdx`. Create `pages/about.tsx`:
```tsx
import React from "react";
import SiteLayout from "../components/layout/SiteLayout";

export default function About() {
  return (
    <SiteLayout>
      <div className="wrap" style={{ paddingTop: "8px", paddingBottom: "20px" }}>
        <p className="eyebrow">page · about</p>
        <h2 className="page-title">About</h2>
        <p className="page-sub">
          Senior Director of Engineering, AI &amp; Data — SMC Group, Mumbai.
        </p>

        <section className="about-section">
          <p>
            I specialize in 0-to-1 product building and 1-to-100 organizational
            scaling. Whether transitioning a legacy financial institution to a
            cloud-native platform or building enterprise GenAI agents on the Model
            Context Protocol, I work at the intersection of business strategy and
            deep engineering.
          </p>
          <p>
            Great software is a byproduct of great culture. I build for
            &quot;10x-ready&quot; standards, give engineers room to own hard
            problems, and treat FinOps and compliance as first-class engineering
            concerns — not afterthoughts.
          </p>
        </section>

        <section className="about-section">
          <h3 style={{ fontSize: "18px", marginBottom: "14px" }}>Awards</h3>
          <div className="list-row">
            <span>FinOps Leader of the Year</span>
            <span className="meta">Quantic FinOps Show, 2025</span>
          </div>
          <div className="list-row">
            <span>Architects of Innovation</span>
            <span className="meta">SMC TechLab, 2024</span>
          </div>
          <div className="list-row">
            <span>AWS Well-Architected Qualification</span>
            <span className="meta">2024</span>
          </div>
        </section>

        <section className="about-section">
          <h3 style={{ fontSize: "18px", marginBottom: "14px" }}>Publications</h3>
          <div className="list-row">
            <span>
              Building a high-performance exchange market-data broadcasting
              platform on AWS
            </span>
            <span className="meta">AWS, 09/2025</span>
          </div>
          <div className="list-row">
            <span>Enhancing Security: Shift-Left Strategies for AWS Native CI/CD</span>
            <span className="meta">Medium, 11/2024</span>
          </div>
          <div className="list-row">
            <span>Stoxkart&apos;s Revolutionizing Trading with Modern Infrastructure</span>
            <span className="meta">Motherson, 11/2025</span>
          </div>
        </section>

        <section className="about-section">
          <h3 style={{ fontSize: "18px", marginBottom: "14px" }}>Education</h3>
          <p>B.S., Computer Science — University of Mumbai, 2012 – 2015</p>
        </section>
      </div>
    </SiteLayout>
  );
}
```

- [ ] **Step 3: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Verify content**

```bash
pnpm dev &
sleep 5
curl -s http://localhost:3000/about | grep -c 'list-row'
curl -s http://localhost:3000/about | grep -o 'FinOps Leader of the Year'
kill %1
```
Expected: first prints `6` (3 awards + 3 publications), second confirms the award text renders.

- [ ] **Step 5: Commit**

```bash
git add pages/about.tsx styles/global.css
git rm pages/about.mdx
git commit -m "feat: rebuild About page with first-person philosophy and restyled awards/publications"
```

---

### Task 6: Projects page — restyled with Chip

**Files:**
- Modify: `pages/projects.tsx` (currently `.mdx`; converting)
- Delete: `pages/projects.mdx`
- Delete: `components/Badge.tsx`
- Modify: `pages/_meta.json`

**Interfaces:**
- Consumes: `SiteLayout` (Task 1), `Chip` (Task 3) — used here with no `pillar` prop (neutral styling) since these projects don't map to the Cloud/AI/Data taxonomy.

- [ ] **Step 1: Write the Projects page**

Delete `pages/projects.mdx` and `components/Badge.tsx`. Create `pages/projects.tsx`:
```tsx
import React from "react";
import SiteLayout from "../components/layout/SiteLayout";
import Chip from "../components/ui/Chip";

interface Project {
  name: string;
  description: string;
  stack: string[];
  links: { label: string; href: string }[];
}

const PROJECTS: Project[] = [
  {
    name: "Scrut GRC Platform (SaaS)",
    description:
      "A comprehensive B2B SaaS platform merging Governance, Risk, and Compliance (GRC) functionality — real-time risk monitoring across multi-cloud infrastructure with deep integration across 70+ apps.",
    stack: ["Docker", "Kubernetes", "Terraform", "Golang", "Next.js", "Python", "RabbitMQ", "AWS", "AWS DynamoDB", "AWS SQS", "Cognito", "CodePipeline", "Jenkins", "ECS", "Selenium"],
    links: [
      { label: "Platform ↗", href: "https://app.scrut.io" },
      { label: "Website ↗", href: "https://www.scrut.io" },
    ],
  },
  {
    name: "BYJU's Post Call Analytics (PCA)",
    description:
      "An AI/ML and NLP-driven call-auditing system enabling 80% audit coverage of 120K daily calls with only 2 personnel, versus the prior 7% coverage with 20 staff. Delivers real-time sentiment analysis and data-driven agent ratings.",
    stack: ["Python", "Node.js", "Grafana K6", "React.js", "Playwright", "AWS Transcribe", "AWS Comprehend", "AWS Glue", "AWS Athena", "AWS Quicksight", "AWS CDK", "AWS Lambda", "AWS StepFunction", "AWS EventBridge", "AWS ECS", "AWS S3", "AWS SQS", "AWS SNS", "AWS Dynamodb"],
    links: [
      { label: "Platform ↗", href: "https://pca.byjusorders.com" },
      { label: "Website ↗", href: "https://byjus.com/" },
    ],
  },
  {
    name: "BYJU's User Management & Configuration System for B2B",
    description:
      "A unified identity, access-management, and configuration-management system for the B2B landscape, giving organizations centralized control over user roles and core configuration.",
    stack: ["React.js", "Node.js", "AWS API Gateway", "AWS Cognito", "Lambda", "S3", "Docker", "ECS Fargate", "GitHub Actions", "Lerna", "AWS RDS Aurora", "MongoAtlas", "Confluent Kafka", "AWS Batch", "Datadog", "ELK", "Redis", "K6", "Vercel"],
    links: [
      { label: "Platform ↗", href: "https://users.byjusorders.com" },
      { label: "Website ↗", href: "https://byjus.com/" },
    ],
  },
  {
    name: "Legal Babu: Digital Transformation of Legal Services",
    description:
      "A digital platform reimagining legal-service delivery in India — bridging technology and legal expertise to make legal solutions simple, affordable, and accessible.",
    stack: ["MicroFrontend", "Strapi", "Next.js", "React.js", "Material UI", "Webpack", "Rollup", "SASS/SCSS", "GraphQL", "Node.js", "MongoDb", "Docker", "Kubernetes", "Redis", "BullMQ", "RabbitMQ", "WebSockets", "AWS EC2", "AWS", "CloudFront", "S3"],
    links: [{ label: "Website ↗", href: "https://www.legalbabu.com" }],
  },
];

export default function Projects() {
  return (
    <SiteLayout>
      <div className="wrap" style={{ paddingTop: "8px", paddingBottom: "20px" }}>
        <p className="eyebrow">page · projects</p>
        <h2 className="page-title">Projects</h2>

        {PROJECTS.map((project) => (
          <section className="about-section" key={project.name}>
            <h3 style={{ fontSize: "19px", marginBottom: "10px" }}>{project.name}</h3>
            <p>{project.description}</p>
            <div className="chips" style={{ borderTop: "none", paddingTop: 0, marginBottom: "14px" }}>
              {project.stack.map((tech) => (
                <Chip key={tech}>{tech}</Chip>
              ))}
            </div>
            <div style={{ display: "flex", gap: "16px" }}>
              {project.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="mono" style={{ fontSize: "12px" }}>
                  {link.label}
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </SiteLayout>
  );
}
```

- [ ] **Step 2: Update `_meta.json`**

`pages/_meta.json` no longer needs entries for pages that have left Nextra's control — only `blog` remains Nextra-managed:
```json
{
  "blog": {
    "display": "hidden"
  }
}
```

- [ ] **Step 3: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Verify content**

```bash
pnpm dev &
sleep 5
curl -s http://localhost:3000/projects | grep -c 'class="chip'
curl -s http://localhost:3000/projects | grep -o 'Legal Babu'
kill %1
```
Expected: first prints `74` (15+19+19+21 stack chips across the four projects — recount against the arrays above if this doesn't match), second confirms the fourth project renders.

- [ ] **Step 5: Commit**

```bash
git add pages/projects.tsx pages/_meta.json
git rm pages/projects.mdx components/Badge.tsx
git commit -m "feat: rebuild Projects page with Chip-based stack tags"
```

---

### Task 7: Uses page — restyled

**Files:**
- Modify: `pages/uses.tsx` (currently `.mdx`; converting)
- Delete: `pages/uses.mdx`

**Interfaces:**
- Consumes: `SiteLayout` (Task 1), `.about-section` CSS (Task 5).

- [ ] **Step 1: Write the Uses page**

Delete `pages/uses.mdx`. Create `pages/uses.tsx`:
```tsx
import React from "react";
import SiteLayout from "../components/layout/SiteLayout";

export default function Uses() {
  return (
    <SiteLayout>
      <div className="wrap" style={{ paddingTop: "8px", paddingBottom: "20px" }}>
        <p className="eyebrow">page · uses</p>
        <h2 className="page-title">Uses</h2>
        <p className="page-sub">A glimpse into my workstation and the tools I use daily to build software.</p>

        <section className="about-section">
          <h3 style={{ fontSize: "18px", marginBottom: "14px" }}>Workstation &amp; Hardware</h3>
          <ul>
            <li><b>Computer:</b> MacBook M1 Max (32GB RAM, 1TB SSD)</li>
            <li><b>Audio:</b> Apple AirPods Pro 2, Blue Yeti Mic</li>
            <li><b>Peripherals:</b> Logitech MX Master 3 Mouse, Logitech MX Keys Mini, Apple Trackpad, Fifine Low Profile Boom Arm</li>
          </ul>
        </section>

        <section className="about-section">
          <h3 style={{ fontSize: "18px", marginBottom: "14px" }}>Software &amp; Productivity</h3>
          <ul>
            <li><b>Antigravity:</b> Advanced AI IDE</li>
            <li><b>Cursor:</b> AI-first Code Editor</li>
            <li><b>Notion:</b> Knowledge Management</li>
          </ul>
        </section>
      </div>
    </SiteLayout>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Verify content**

```bash
pnpm dev &
sleep 5
curl -s http://localhost:3000/uses | grep -o 'MacBook M1 Max'
kill %1
```
Expected: prints a match.

- [ ] **Step 4: Commit**

```bash
git add pages/uses.tsx
git rm pages/uses.mdx
git commit -m "feat: rebuild Uses page in the Flight Deck system"
```

---

### Task 8: Cleanup and full-site verification

**Files:**
- Delete: `components/ProfileCard.tsx`
- Delete: `components/WorkExpTimeline.tsx`
- Modify: `metadata/index.ts`

**Interfaces:**
- None — this task only removes now-dead code and performs whole-site verification.

- [ ] **Step 1: Confirm nothing still imports the components being deleted**

```bash
grep -rn "ProfileCard\|WorkExpTimeline" pages components --include="*.tsx" --include="*.mdx"
```
Expected: no output (all pages that used them were already rewritten in Tasks 2–7).

- [ ] **Step 2: Delete the dead components**

```bash
git rm components/ProfileCard.tsx components/WorkExpTimeline.tsx
```

- [ ] **Step 3: Trim `metadata/index.ts`**

Replace `metadata/index.ts` — keep only `personalization` (still used by `pages/index.tsx` for the profile photo and by `theme.config.tsx` for the favicon):
```ts
export const personalization: { [key: string]: string } = {
  profilePicPublicPath: "/Profile.png",
};
```

- [ ] **Step 4: Confirm `theme.config.tsx` still imports cleanly**

```bash
grep -n "personalization" theme.config.tsx
```
Expected: one match, confirming it only uses `profilePicPublicPath` (already the case per the current file — no code change needed there).

- [ ] **Step 5: Full type-check and production build**

```bash
pnpm exec tsc --noEmit
pnpm build
```
Expected: both succeed with zero errors. The build output should list `/`, `/expertise`, `/experience`, `/projects`, `/about`, `/uses`, and the existing `/blog/*` routes as static pages.

- [ ] **Step 6: Full route smoke test**

```bash
pnpm dev &
sleep 5
for route in / /expertise /experience /projects /about /uses /blog; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000$route")
  echo "$route -> $code"
done
kill %1
```
Expected: every route prints `200`.

- [ ] **Step 7: Confirm no stray references to the removed old copy**

```bash
curl -s http://localhost:3000/ | grep -c '🚀\|📈\|⚡\|🤖'
grep -rln "Karthikmani345" pages components metadata
```
(Run against a running `pnpm dev` instance as in Step 6.) Expected: emoji grep prints `0`; the email grep prints no files.

- [ ] **Step 8: Commit**

```bash
git add metadata/index.ts
git commit -m "chore: remove dead components and unused metadata after portfolio redesign"
```

---

## Post-plan note

`pages/index.tsx`'s "Download Résumé" button links to `/resume.pdf`, which does not
exist yet — per the design spec, generating/supplying that PDF is out of scope for
this plan. Add `public/resume.pdf` separately before treating the button as fully
functional; until then it will 404, which is acceptable for this implementation
pass but should be flagged to the user before calling the redesign fully complete.
