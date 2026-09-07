# Landing Page Restructure — Implementation Plan

> **For agentic workers:** Steps use checkbox (`- [ ]`) syntax for tracking.
> This is a visual/layout restructure — "tests" per task = `npx tsc --noEmit`
> + `npm run build` + the existing `npm test` suite staying green + a
> Playwright screenshot check. There is no per-widget unit test to write.

**Goal:** Reshape the home page to follow the reference site's section
rhythm, keeping Gabriel's content, the current palette/typography, and the
SEO surface, plus scroll entrance animations.

**Architecture:** Restyle the existing section components in place; rewrite
only the Hero; add two new sections (`approach`, `cta`) and rename one
(`service-area` → `presencial`); remove three (`benefits`, `instagram`,
`contact` form). Two new dark surface tokens (`--dark-green`,
`--dark-brown`) drive the alternating bands.

**Tech Stack:** Next.js 16.3.4 (App Router), React 19, Tailwind v4
(`@theme inline` tokens in `app/globals.css`), `motion` (v13, `motion/react`),
shadcn-style components, `lucide-react`, Fraunces + DM Sans via `next/font`.

**Spec:** `docs/superpowers/specs/2026-09-07-page-restructure-design.md`

## Global Constraints

- Palette/typography from `app/globals.css` as merged in PR #3 — do not
  change existing token values; only add `--dark-green*` / `--dark-brown*`.
- Keep exactly one `<h1>` on each page (the Hero / LocationHero). All
  section titles are `<h2>`.
- Keep `<JsonLd data={personSchema} />` in `app/page.tsx` and
  `<JsonLd data={faqSchema} />` in `faq-section.tsx`.
- Keep internal `<Link href="/psicologo-cabo-frio">` /
  `/psicologo-sao-pedro-da-aldeia` on the home page.
- All animation respects `prefers-reduced-motion` (JS via `useReducedMotion`,
  not only CSS).
- `npm test` (vitest, 8 files / 20 tests) stays green the whole way — those
  files are not touched.
- Portuguese copy, `pt-BR`.
- Shared components (`ServicesSection`, `HowItWorksSection`, `FaqSection`)
  render on `/`, `/psicologo-cabo-frio`, `/psicologo-sao-pedro-da-aldeia` —
  screenshot all three whenever one changes.

---

### Task 1: Surface tokens + texture utility + WhatsApp button tone

**Files:**
- Modify: `app/globals.css`
- Modify: `app/_components/layout/footer.tsx` (token rename)
- Modify: `app/_components/layout/whatsapp-float-button.tsx` (token rename)
- Modify: `app/_components/shared/whatsapp-button.tsx` (new `tone` prop)

- [ ] **Step 1:** In `app/globals.css` `:root`, rename `--dark` →
  `--dark-green`, `--dark-foreground` → `--dark-green-foreground`; add
  `--dark-brown: #2d120d;` and `--dark-brown-foreground: #f0e7c2;`.
- [ ] **Step 2:** In `@theme inline`, replace `--color-dark*` with
  `--color-dark-green: var(--dark-green);`,
  `--color-dark-green-foreground: var(--dark-green-foreground);`,
  `--color-dark-brown: var(--dark-brown);`,
  `--color-dark-brown-foreground: var(--dark-brown-foreground);`.
- [ ] **Step 3:** Add to `app/globals.css`:

```css
/* Sutil textura para seções escuras (Hero, faixa de CTA). SVG inline,
   sem imagem externa (CSP). */
.surface-texture {
  position: relative;
  isolation: isolate;
}
.surface-texture::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(60% 80% at 15% 0%, rgb(255 255 255 / 0.06), transparent 70%),
    radial-gradient(50% 60% at 100% 100%, rgb(0 0 0 / 0.25), transparent 60%),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E");
  background-blend-mode: overlay;
  opacity: 0.5;
  pointer-events: none;
}

@keyframes heading-bar-grow {
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
}
```

- [ ] **Step 4:** `footer.tsx` + `whatsapp-float-button.tsx`: replace every
  `bg-dark`/`text-dark-foreground`/`border-dark-foreground/*` with the
  `dark-green` equivalents. (`instagram-section.tsx` also used `--dark` but
  is deleted in Task 13 — leave it, or update; simplest: update it too.)
- [ ] **Step 5:** `whatsapp-button.tsx`: add `tone?: "default" | "onDark"`
  to props (default `"default"`). When `"onDark"`, force
  `variant="outline"`-like look via className:
  `"bg-background text-foreground border-transparent hover:bg-background/90"`.
  Keep the icon + label. Existing call sites unaffected (default tone).
- [ ] **Step 6:** Run `npx tsc --noEmit` → expect clean.
- [ ] **Step 7:** Run `npm test` → expect 20 passed.
- [ ] **Step 8:** Run `npm run build` → expect exit 0.
- [ ] **Step 9:** `npm run dev`, screenshot footer + floating button →
  expect visually unchanged (pure token rename).
- [ ] **Step 10:** Commit: `feat: add dark-green/dark-brown surface tokens and button onDark tone`

---

### Task 2: Shared primitives — SectionHeading, AnimatedReveal, AnimatedGroup, constants

**Files:**
- Modify: `app/_components/shared/section-heading.tsx`
- Modify: `app/_components/shared/animated-reveal.tsx`
- Create: `app/_components/shared/animated-group.tsx`
- Modify: `app/_lib/constants.ts`

**Interfaces produced (used by later tasks):**
- `SectionHeading` props: `{ eyebrow?, title, description?, className?,
  bar?: boolean (default true), tone?: "light" | "dark" (default "light") }`
- `AnimatedReveal` props: `{ children, className?, delay?, y?: number
  (default 24), as?: keyof JSX.IntrinsicElements (default "div") }`
- `AnimatedGroup` props: `{ children, className?, stagger?: number
  (default 0.08) }` — wraps children so each direct child fades+rises in
  sequence when the group scrolls into view. Children rendered via
  `motion.div` wrappers; consumers pass plain elements.
- `constants.ts` new export: `CLINIC_PRINCIPLES: readonly { term: string;
  text: string }[]` (4 items from the spec §4).
- `constants.ts`: `NAV_LINKS` trimmed to `Início` (`/#inicio`), `Sobre`
  (`/#sobre`), `Serviços` (`#servicos`), `Como funciona` (`/#como-funciona`),
  `Contato` (`#contato`).

- [ ] **Step 1:** `section-heading.tsx` — add `bar` and `tone`. Render:
  eyebrow as `<span>` with a leading `— ` and
  `text-primary` (both tones — validate contrast in Task 14, fall back to
  `text-accent` on dark if needed); when `bar`, wrap title in a flex row
  with `<span className="mt-1 h-[1.1em] w-1 shrink-0 origin-top bg-primary
  motion-safe:animate-[heading-bar-grow_.5s_ease-out]" aria-hidden />`.
  Title colour: `tone==="dark" ? "text-dark-brown-foreground" :
  "text-foreground"` (dark-green sections also read fine with this creme).
  Description colour: `tone==="dark" ? "text-dark-brown-foreground/80" :
  "text-muted-foreground"`.
- [ ] **Step 2:** `animated-reveal.tsx` — add `y` + `as` props; call
  `useReducedMotion()` from `motion/react`; when reduced, render the plain
  tag with `className` and no motion. Keep `whileInView`, `once: true`,
  `amount: 0.2`.
- [ ] **Step 3:** Create `animated-group.tsx` (`"use client"`):

```tsx
"use client";
import type { ReactNode } from "react";
import { Children } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

const container: Variants = { hidden: {}, visible: {} };
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function AnimatedGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
      transition={{ staggerChildren: stagger }}
    >
      {Children.map(children, (child) => (
        <motion.div variants={item} transition={{ duration: 0.5, ease: "easeOut" }}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

- [ ] **Step 4:** `constants.ts` — trim `NAV_LINKS`, add `CLINIC_PRINCIPLES`:

```ts
export const CLINIC_PRINCIPLES = [
  { term: "Escuta ativa", text: "Te escuto sem pressa e sem julgamento, atento ao detalhe do que você traz." },
  { term: "Acolhimento", text: "Um espaço seguro pra falar do que pesa, sem medo de ser avaliado." },
  { term: "Vínculo e confiança", text: "A terapia acontece na relação — construímos isso com cuidado, sessão após sessão." },
  { term: "No seu ritmo", text: "Cada processo tem seu tempo. Revemos juntos para onde caminhar." },
] as const;
```

- [ ] **Step 5:** `npx tsc --noEmit`, `npm test`, `npm run build` → all green.
  (Home still renders old layout — SectionHeading default `bar` now shows a
  vertical bar everywhere; acceptable interim, fixed as sections land.)
- [ ] **Step 6:** Commit: `feat: extend SectionHeading + AnimatedReveal, add AnimatedGroup and clinic principles`

---

### Task 3: Navbar — dark-green bar, brand with CRP, social icons

**Files:**
- Modify: `app/_components/layout/navbar.tsx`
- Modify: `app/_lib/constants.ts` (only if not done in Task 2)

- [ ] **Step 1:** `<header>` → `bg-dark-green text-dark-green-foreground`,
  drop `border-b` and `bg-background/95 backdrop-blur` (keep `sticky top-0 z-50`).
- [ ] **Step 2:** Brand block (left): `Ψ` mark in a small `size-8 rounded-full
  bg-dark-green-foreground/10` + a two-line stack — `PSYCHOLOGIST.fullTitle`
  (`font-heading text-base`) and `CRP {PSYCHOLOGIST.crp}` (`text-xs
  text-dark-green-foreground/60`).
- [ ] **Step 3:** Desktop nav (`hidden md:flex`): map trimmed `NAV_LINKS`,
  links `text-sm text-dark-green-foreground/80 hover:text-dark-green-foreground`.
- [ ] **Step 4:** Right (desktop): two circular icon links —
  `<a>` Instagram (`AtSign`) + WhatsApp (`WhatsappIcon`), each
  `size-9 rounded-full border border-dark-green-foreground/20 grid place-items-center
  hover:bg-dark-green-foreground/10`. Remove the old `<WhatsappButton>` from
  the desktop bar.
- [ ] **Step 5:** Mobile: keep the `Sheet`. Trigger button: `variant="outline"`
  → restyle for green bar: `border-dark-green-foreground/30
  text-dark-green-foreground hover:bg-dark-green-foreground/10 bg-transparent`.
  Sheet panel stays `bg-background` (creme) — the inner links/`SheetHeader`
  already use `text-foreground`/`text-primary`, which is correct on creme;
  verify the WhatsApp button inside stays Bordô (light-section tone).
- [ ] **Step 6:** `npm run build`, screenshot desktop nav + mobile menu open
  → nav is green, brand shows CRP, 2 icons right, mobile sheet still works.
- [ ] **Step 7:** Commit: `feat: recolor navbar to dark-green with brand + social icons`

---

### Task 4: Hero — rewrite

**Files:**
- Rewrite: `app/_components/sections/hero-section.tsx`
- Delete: `app/_components/shared/hero-background.tsx`
- Modify: `app/_components/sections/hero-section.tsx` gets `id="inicio"`

- [ ] **Step 1:** New `hero-section.tsx`:
  - `<section id="inicio" className="relative isolate overflow-hidden
    bg-dark-brown text-dark-brown-foreground surface-texture">`.
  - Inner `mx-auto max-w-6xl px-6 py-20 sm:py-28 lg:py-32`, grid
    `md:grid-cols-[1.1fr_0.9fr] items-center gap-12`.
  - Left (`AnimatedReveal`): `h1` Fraunces `text-4xl sm:text-5xl lg:text-6xl
    font-medium leading-[1.1]` — "Olá! Sou Gabriel Ribeiro, psicólogo
    clínico." ; specialty line `text-dark-brown-foreground/75 text-base
    sm:text-lg` — "Psicologia clínica · Atendimento online e presencial ·
    Adultos · Cabo Frio e São Pedro da Aldeia — Região dos Lagos (RJ)." ;
    `<WhatsappButton tone="onDark" size="lg" message={WHATSAPP_MESSAGE} />`.
  - Right (`AnimatedReveal delay={0.15}`): relative box; `next/image`
    `gab1.png` `fill` inside `aspect-square max-w-sm rounded-full
    overflow-hidden` with `sizes="(min-width:768px) 24rem, 80vw"`; two/three
    decorative blobs — `motion.div` absolute, `bg-accent` and
    `bg-dark-green` (Musgo `#687451` also fine), `rounded-[42%_58%_60%_40%/45%_45%_55%_55%]`,
    sizes ~`size-40`/`size-28`, offset behind/in front, with a slow float
    `animate={{ y: [0, -14, 0] }} transition={{ duration: 9, repeat: Infinity }}`
    guarded by `useReducedMotion`.
- [ ] **Step 2:** Delete `hero-background.tsx`; remove its import from the
  old hero (gone in the rewrite).
- [ ] **Step 3:** `grep -rn "hero-background\|HeroBackground" app/` → expect
  no matches.
- [ ] **Step 4:** `npx tsc --noEmit`, `npm run build` → green.
- [ ] **Step 5:** Screenshot home hero desktop + mobile; confirm exactly one
  `<h1>` (`curl -s localhost:3000 | grep -c '<h1'` → 1).
- [ ] **Step 6:** Commit: `feat: rewrite hero as dark textured section with portrait and decorative shapes`

---

### Task 5: Sobre Mim — restyle

**Files:**
- Modify: `app/_components/sections/about-section.tsx`

- [ ] **Step 1:** `<section id="sobre" className="bg-background">` wrapper
  `mx-auto max-w-6xl px-6 py-20 sm:py-28`.
- [ ] **Step 2:** `SectionHeading` `eyebrow="Conheça"` `title="Sobre Mim"`
  (default `bar`, `tone="light"`).
- [ ] **Step 3:** Grid `md:grid-cols-[1.4fr_1fr] gap-10 mt-10`:
  - Left `AnimatedReveal`: 3 paragraphs `text-muted-foreground` —
    reuse/expand current bio (trajetória; escuta ativa e acolhimento, sem
    julgamentos; para quem atende: adultos, online Brasil + presencial
    Cabo Frio / São Pedro da Aldeia).
  - Right `AnimatedReveal delay={0.1}`: card `rounded-2xl border
    border-border bg-card p-6` titled `Formação e atuação` (`font-heading
    text-lg`), then a `<ul>` with: `CRP {crp} — Conselho Regional de
    Psicologia (05)`; `Atendimento individual para adultos`;
    `Online para todo o Brasil`; `Presencial em Cabo Frio e São Pedro da
    Aldeia (RJ)`; plus a comment
    `{/* TODO: formação acadêmica quando o Gabriel enviar */}`.
- [ ] **Step 4:** Remove the `IMAGES.about` `<Image>` and the `GabrielPhoto`
  import/usage (portrait now lives in Hero). Remove now-unused imports.
- [ ] **Step 5:** `npx tsc --noEmit` (catch unused imports via lint),
  `npm run build`, screenshot section.
- [ ] **Step 6:** Commit: `feat: restyle about section with credential card`

---

### Task 6: Serviços — restyle (dark-green, numbered cards)

**Files:**
- Modify: `app/_components/sections/services-section.tsx`

- [ ] **Step 1:** `<section id="servicos" className="bg-dark-green
  text-dark-green-foreground">` wrapper `mx-auto max-w-6xl px-6 py-20 sm:py-28`.
- [ ] **Step 2:** `SectionHeading eyebrow="O que ofereço" title="Serviços"
  tone="dark"`.
- [ ] **Step 3:** Replace the grid with `AnimatedGroup className="mt-10 grid
  gap-5 sm:grid-cols-2 lg:grid-cols-3"`. Each card:
  `rounded-xl border border-dark-green-foreground/12 bg-dark-brown/30 p-6
  sm:p-7`; top: `<span className="font-heading text-3xl
  text-dark-green-foreground/45">0{i+1}.</span>`; `h3` `font-heading text-lg`;
  `p` `text-sm text-dark-green-foreground/75`. Keep the 3 services + the
  `city` prop logic exactly as today.
- [ ] **Step 4:** `npm run build`; screenshot `/`, `/psicologo-cabo-frio`,
  `/psicologo-sao-pedro-da-aldeia` (shared component).
- [ ] **Step 5:** Commit: `feat: restyle services as numbered cards on dark-green`

---

### Task 7: Abordagens — new section

**Files:**
- Create: `app/_components/sections/approach-section.tsx`

- [ ] **Step 1:** `approach-section.tsx` — `<section id="abordagens"
  className="bg-dark-brown text-dark-brown-foreground">` wrapper
  `mx-auto max-w-5xl px-6 py-20 sm:py-28`.
- [ ] **Step 2:** `SectionHeading eyebrow="Como eu trabalho" title="Princípios
  da clínica" tone="dark"`.
- [ ] **Step 3:** Map `CLINIC_PRINCIPLES` into an editorial alternating list —
  `mt-12 flex flex-col gap-10 sm:gap-14`; each row
  `AnimatedReveal` → `grid gap-2 sm:grid-cols-2 sm:gap-10
  ${i % 2 ? "sm:[&>*:first-child]:order-2" : ""}` ; term
  `font-heading text-2xl sm:text-3xl`; text
  `text-dark-brown-foreground/75 self-center`.
- [ ] **Step 4:** `npx tsc --noEmit`, `npm run build`, screenshot.
- [ ] **Step 5:** Commit: `feat: add clinic principles (Abordagens) section`

---

### Task 8: Como Funciona — restyle

**Files:**
- Modify: `app/_components/sections/how-it-works-section.tsx`

- [ ] **Step 1:** `<section id="como-funciona" className="bg-background">`
  wrapper `mx-auto max-w-6xl px-6 py-20 sm:py-28`.
- [ ] **Step 2:** `SectionHeading eyebrow="Passo a passo" title="Como Funciona"`.
- [ ] **Step 3:** Steps: `AnimatedGroup className="mt-10 grid gap-8
  sm:grid-cols-2 lg:grid-cols-4"`; drop the icon circle; lead each with
  `<span className="font-heading text-4xl text-primary/40">0{i+1}.</span>`;
  keep title (`h3 font-heading text-lg`, strip the "1. " prefix from data or
  keep — prefer strip so the numeral isn't doubled) + description.
- [ ] **Step 4:** Below the grid: highlight box `AnimatedReveal` →
  `mt-12 rounded-2xl border border-border bg-card p-8 text-center
  flex flex-col items-center gap-4`; text "Sessões de aproximadamente 50
  minutos · online ou presencial na Região dos Lagos"; `<WhatsappButton
  size="lg" message={...} label="Agendar primeira conversa" />` (Bordô).
- [ ] **Step 5:** Update `STEPS` titles in the file to remove leading
  "1. "/"2. " etc.
- [ ] **Step 6:** `npm run build`; screenshot `/` + both city pages.
- [ ] **Step 7:** Commit: `feat: restyle how-it-works with numerals and booking box`

---

### Task 9: Atendimento presencial — from service-area

**Files:**
- Create: `app/_components/sections/presencial-section.tsx` (git mv from
  `service-area-section.tsx`, then edit)
- Delete: `app/_components/sections/service-area-section.tsx`
- Modify: `app/page.tsx` (import path only, full recompose in Task 13)

- [ ] **Step 1:** `git mv app/_components/sections/service-area-section.tsx
  app/_components/sections/presencial-section.tsx`; rename the export
  `ServiceAreaSection` → `PresencialSection`.
- [ ] **Step 2:** `<section id="atendimento" className="bg-background">`
  wrapper `mx-auto max-w-5xl px-6 py-20 sm:py-28`; put the cards inside an
  inset panel `rounded-3xl bg-secondary p-6 sm:p-10`.
- [ ] **Step 3:** `SectionHeading eyebrow="Onde eu atendo" title="Atendimento
  presencial e online"`.
- [ ] **Step 4:** Keep the 3 cards (2 cities + Online) but smaller:
  `AnimatedGroup className="mt-8 grid gap-5 sm:grid-cols-3"`; card
  `aspect-[4/3] rounded-2xl`; keep the `<Link href="/${city.slug}">` on each
  city card (SEO — do not drop). Online card gradient stays but recolour
  `from-dark-brown/85` instead of `from-primary/90`.
- [ ] **Step 5:** Update the import in `app/page.tsx` so the build passes
  (full recompose in Task 13).
- [ ] **Step 6:** `npm run build`; screenshot; `curl -s localhost:3000 |
  grep -o 'href="/psicologo-[a-z-]*"'` → both slugs present.
- [ ] **Step 7:** Commit: `feat: slim service-area into presencial section`

---

### Task 10: FAQ — restyle on dark-brown

**Files:**
- Modify: `app/_components/sections/faq-section.tsx`

- [ ] **Step 1:** `<section id="faq" className="bg-dark-brown
  text-dark-brown-foreground">` wrapper `mx-auto max-w-3xl px-6 py-20 sm:py-28`.
- [ ] **Step 2:** `SectionHeading eyebrow="Dúvidas" title="Perguntas
  frequentes" tone="dark"`.
- [ ] **Step 3:** `Accordion` — add `className` overrides for dark:
  items `border-b border-dark-brown-foreground/15`; `AccordionTrigger`
  `text-dark-brown-foreground hover:text-dark-brown-foreground [&>svg]:text-dark-brown-foreground/60`;
  `AccordionContent` `text-dark-brown-foreground/75`.
- [ ] **Step 4:** Keep `<JsonLd data={faqSchema} />` untouched.
- [ ] **Step 5:** `npm run build`; screenshot `/` + a city page; verify
  `curl -s localhost:3000 | grep -c 'FAQPage'` → 1.
- [ ] **Step 6:** Commit: `feat: restyle FAQ on dark-brown, keep FAQPage schema`

---

### Task 11: CTA section — replace contact form

**Files:**
- Create: `app/_components/sections/cta-section.tsx`
- Modify: `app/psicologo-cabo-frio/page.tsx`,
  `app/psicologo-sao-pedro-da-aldeia/page.tsx` (swap `ContactSection` →
  `CtaSection`)

- [ ] **Step 1:** `cta-section.tsx` (`"use client"` not needed — static):
  `<section id="contato" className="bg-dark-green text-dark-green-foreground
  surface-texture">` wrapper `mx-auto max-w-2xl px-6 py-24 sm:py-32
  text-center flex flex-col items-center gap-5`.
- [ ] **Step 2:** `SectionHeading eyebrow="Pronto para começar?" title="Vamos
  conversar?" tone="dark" bar={false} className="items-center text-center"` +
  paragraph `text-dark-green-foreground/80` — "Cada história é única e merece
  ser ouvida com atenção. Estou aqui pra te acompanhar nesse processo." +
  `<WhatsappButton tone="onDark" size="lg" message={...} label="Falar no
  WhatsApp" />`.
- [ ] **Step 3:** In both city pages, replace `<ContactSection />` +
  its import with `<CtaSection />`.
- [ ] **Step 4:** `npx tsc --noEmit`, `npm run build`; screenshot.
- [ ] **Step 5:** Commit: `feat: add Vamos conversar CTA section, use it on city pages`

---

### Task 12: Footer — expand to columns

**Files:**
- Modify: `app/_components/layout/footer.tsx`

- [ ] **Step 1:** Root `<footer className="bg-dark-brown
  text-dark-brown-foreground/70">`.
- [ ] **Step 2:** Top row `mx-auto max-w-6xl px-6 py-14 grid gap-10
  md:grid-cols-[1.6fr_1fr_1fr_1fr]`:
  - Brand: `Ψ` + `font-heading text-base text-dark-brown-foreground`
    `{fullTitle}` ; `CRP {crp}` ; "Psicólogo. Atendimento online e presencial."
  - `Navegação` col: links to `#inicio`, `#sobre`, `#servicos`,
    `#como-funciona`, `#faq`, `#contato`, `/politica-de-privacidade`.
  - `Atendimento` col: "Segunda a sexta", "Sessões de ~50 min", "Online e
    presencial".
  - `Contato` col: WhatsApp link (`buildWhatsAppLink`), e-mail
    (`PSYCHOLOGIST.email`), Instagram (`@gabrielribeiro_psi`) — each with a
    `lucide` icon (`MessageCircle`/`Mail`/`AtSign`).
  Column headers `text-xs uppercase tracking-wide text-dark-brown-foreground/50`.
- [ ] **Step 3:** Bottom bar `border-t border-dark-brown-foreground/12 px-6
  py-5 text-xs`: left "© {year} {fullTitle}. Todos os direitos reservados." ;
  right `{/* TODO: nome civil completo */}` + `CRP {crp}`.
- [ ] **Step 4:** `npm run build`; screenshot footer desktop + mobile.
- [ ] **Step 5:** Commit: `feat: expand footer into nav/atendimento/contato columns`

---

### Task 13: Recompose page.tsx, delete removed sections, wire city pages

**Files:**
- Modify: `app/page.tsx`
- Delete: `app/_components/sections/benefits-section.tsx`,
  `instagram-section.tsx`, `contact-section.tsx`
- Verify: `app/psicologo-cabo-frio/page.tsx`,
  `app/psicologo-sao-pedro-da-aldeia/page.tsx` (already edited in Task 11)

- [ ] **Step 1:** Rewrite `app/page.tsx` body:

```tsx
<>
  <JsonLd data={personSchema} />
  <HeroSection />
  <AboutSection />
  <ServicesSection />
  <ApproachSection />
  <HowItWorksSection />
  <PresencialSection />
  <FaqSection />
  <CtaSection />
</>
```

  Update imports; remove `BenefitsSection`, `InstagramSection`,
  `ContactSection`, `ServiceAreaSection`.
- [ ] **Step 2:** `git rm app/_components/sections/benefits-section.tsx
  app/_components/sections/instagram-section.tsx
  app/_components/sections/contact-section.tsx`.
- [ ] **Step 3:** `grep -rn "BenefitsSection\|InstagramSection\|ContactSection\|ServiceAreaSection\|benefits-section\|instagram-section\|contact-section\|service-area" app/` → expect no matches.
- [ ] **Step 4:** `npx tsc --noEmit` → clean. `npm test` → 20 passed
  (contact-schema + route tests still pass — files untouched).
- [ ] **Step 5:** `npm run build` → exit 0, all 11 routes.
- [ ] **Step 6:** Screenshot full page `/`, `/psicologo-cabo-frio`,
  `/psicologo-sao-pedro-da-aldeia` at desktop + 390px; menu open; and once
  with `prefers-reduced-motion` emulated.
- [ ] **Step 7:** Commit: `feat: recompose home to the new section order, drop benefits/instagram/contact-form`

---

### Task 14: Verification + polish pass

**Files:** whatever the checks turn up.

- [ ] **Step 1:** Contrast: sample eyebrow (`--primary` Bordô) on
  `--dark-brown` and `--dark-green`. If < 3:1, switch `SectionHeading`
  eyebrow to `text-accent` (Terra) when `tone="dark"`. Re-screenshot.
- [ ] **Step 2:** `console --errors` on `/` and a city page via Playwright →
  no errors; the `gab1.png` `sizes` warning should be gone (Hero uses
  `<Image sizes>` now).
- [ ] **Step 3:** Animation review: scroll the page in the screenshot script,
  confirm sections reveal and grids stagger; confirm reduced-motion renders
  everything static.
- [ ] **Step 4:** `npx tsc --noEmit` + `npm run lint` (changed files clean) +
  `npm test` (20) + `npm run build` (0) — final green run.
- [ ] **Step 5:** Update `docs/superpowers/specs/2026-09-06-…-design.md` §7
  with a one-line note: "Estrutura da home revista em
  `2026-09-07-page-restructure-design.md`."
- [ ] **Step 6:** Commit: `chore: contrast + console fixes after restructure`
- [ ] **Step 7:** Push branch, open PR to `main`.

---

## Self-Review

**Spec coverage:**
- Tokens → Task 1. SectionHeading/animations → Task 2. Navbar → Task 3.
  Hero → Task 4. Sobre → Task 5. Serviços → Task 6. Abordagens → Task 7.
  Como Funciona → Task 8. Presencial → Task 9. FAQ → Task 10. CTA → Task 11.
  Footer → Task 12. Recompose + deletions + city pages → Task 11/13.
  SEO invariants → Global Constraints + verification steps in Tasks 4, 9,
  10, 13. Animations reduced-motion → Task 2 + Task 14.
- Gap: spec mentions `Toaster` can stay in layout — no task removes it, and
  it's harmless; explicitly leaving `app/layout.tsx` untouched. OK.
- Gap: `hero-background.tsx` deletion → Task 4 Step 2. OK.

**Placeholder scan:** Copy that depends on unknown real data (Gabriel's
academic formation, civil name) is marked as `{/* TODO */}` comments in the
rendered output — intentional, flagged to the user, not plan placeholders.

**Type consistency:** `SectionHeading` `tone` values `"light"|"dark"` used
consistently (Tasks 2, 5, 6, 7, 10, 11). `WhatsappButton` `tone`
`"default"|"onDark"` (Tasks 1, 4, 11). `AnimatedGroup` used in Tasks 6, 8,
9. Section ids: `inicio`, `sobre`, `servicos`, `abordagens`, `como-funciona`,
`atendimento`, `faq`, `contato` — nav links reference `inicio/sobre/servicos/
como-funciona/contato`, all defined.

## Execution

Executing **inline in this session** (no subagents per project setup),
task-by-task with a build + screenshot check and a commit at each task
boundary.
