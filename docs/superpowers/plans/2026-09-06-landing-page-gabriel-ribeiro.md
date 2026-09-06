# Landing Page Gabriel Ribeiro (Psicólogo) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir a landing page de conversão do psicólogo Gabriel Ribeiro (Home + 2 páginas de localização + política de privacidade + formulário de contato com backend leve), totalmente componentizada em `app/`, com Tailwind inline, shadcn/ui, animações e SEO otimizado.

**Architecture:** Next.js 16 App Router + React 19 + TypeScript. Todo o código vive em `app/`, usando as pastas privadas `_components` e `_lib` (não roteáveis). Sem banco de dados — o único backend é a rota `app/api/contact/route.ts`, que valida com Zod e envia e-mail via Resend. Páginas de localização reaproveitam os componentes de seção genéricos, recebendo props para customizar o texto.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4 (inline, sem CSS Modules), shadcn/ui (New York style, CSS variables), `zod`, `react-hook-form` + `@hookform/resolvers`, `resend`, `motion`, `lucide-react`, Vitest (para lógica testável).

**Spec:** `docs/superpowers/specs/2026-09-06-landing-page-gabriel-ribeiro-design.md`

## Global Constraints

- Toda a página é componentizada dentro de `app/` — nada de pasta `components/` ou `lib/` na raiz do projeto. Use as pastas privadas `app/_components/` e `app/_lib/` (prefixo `_` = não roteável no App Router).
- Estilização 100% Tailwind CSS inline no JSX. Sem CSS Modules nem arquivos `.css` além de `app/globals.css`. Gap e flexbox como estratégia primária de layout/espaçamento (evite `margin` solto entre irmãos quando `gap` resolver).
- Sem banco de dados nesta fase. O único backend é `app/api/contact/route.ts`.
- Sem dark mode — uma única paleta clara, sempre.
- Todo o conteúdo visível ao usuário é em português (pt-BR).
- Nunca fabrique ou "adivinhe" URLs externas (imagens, links). As 4 URLs de imagem usadas neste plano já foram pesquisadas e verificadas (HTTP 200, licença Unsplash gratuita) — reutilize-as exatamente como estão. Se precisar de mais imagens no futuro, pesquise e verifique antes de usar.
- Valores que são placeholders reais (não fabricados, mas que precisam ser substituídos por dados reais do Gabriel antes de publicar): número de WhatsApp, e-mail de contato, domínio do site e foto do Gabriel — todos centralizados em `app/_lib/constants.ts`, cada um com um comentário `SUBSTITUA` explicando o que fazer.
- Tarefas puramente apresentacionais (componentes visuais sem lógica condicional) não seguem o ciclo RED/GREEN de teste — elas têm um passo de "verificação visual" (rodar `npm run dev` e conferir no navegador) no lugar do teste automatizado. Tarefas com lógica (helpers, schema, rota de API) seguem TDD normalmente.

---

## Task 1: Tooling — Vitest, shadcn/ui e tema

**Files:**
- Create: `components.json`
- Create: `vitest.config.ts`
- Create: `.env.example`
- Modify: `package.json` (scripts, dependencies)
- Modify: `next.config.ts`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: alias `@/app/_components/ui/*` (primitivos shadcn), `@/app/_lib/utils` (`cn()`), script `npm run test`, tokens CSS `--background`, `--foreground`, `--card`, `--popover`, `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--destructive`, `--destructive-foreground`, `--border`, `--input`, `--ring`, utilities Tailwind `font-sans` (corpo) e `font-heading` (título).

- [ ] **Step 1: Criar `components.json` com aliases customizados**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/app/_components",
    "utils": "@/app/_lib/utils",
    "ui": "@/app/_components/ui",
    "lib": "@/app/_lib",
    "hooks": "@/app/_hooks"
  },
  "iconLibrary": "lucide"
}
```

- [ ] **Step 2: Instalar as dependências de produto**

Run: `npm install zod react-hook-form @hookform/resolvers resend motion`

- [ ] **Step 3: Instalar o Vitest como dependência de desenvolvimento**

Run: `npm install -D vitest`

- [ ] **Step 4: Adicionar os componentes shadcn necessários**

Run: `npx shadcn@latest add button accordion form input textarea label sonner sheet`

Isso instala automaticamente `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, `tw-animate-css` e os pacotes `@radix-ui/*` necessários, cria `app/_lib/utils.ts` (helper `cn()`) e os componentes em `app/_components/ui/`, e reescreve `app/globals.css` com o tema padrão do shadcn.

- [ ] **Step 5: Substituir `app/globals.css` pelo tema final do projeto**

O passo anterior gera tokens padrão do shadcn — substitua **todo o conteúdo** do arquivo pela nossa paleta (verde-sálvia + areia + terracota, definida no spec), sem bloco de dark mode:

```css
@import "tailwindcss";
@import "tw-animate-css";

:root {
  --radius: 0.75rem;

  --background: #f7f5f0;
  --foreground: #33403a;

  --card: #ffffff;
  --card-foreground: #33403a;

  --popover: #ffffff;
  --popover-foreground: #33403a;

  --primary: #7c9473;
  --primary-foreground: #f7f5f0;

  --secondary: #efeae0;
  --secondary-foreground: #33403a;

  --muted: #efeae0;
  --muted-foreground: #6b7a70;

  --accent: #c1694f;
  --accent-foreground: #f7f5f0;

  --destructive: #b3432b;
  --destructive-foreground: #f7f5f0;

  --border: #e3ded2;
  --input: #e3ded2;
  --ring: #7c9473;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --font-sans: var(--font-body);
  --font-heading: var(--font-heading);
}

body {
  background: var(--background);
  color: var(--foreground);
}
```

- [ ] **Step 6: Configurar `next.config.ts` para permitir imagens do Unsplash**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 7: Criar `.env.example`**

```
RESEND_API_KEY=
CONTACT_EMAIL=
RESEND_FROM_EMAIL=
```

Confira se `.gitignore` já ignora `.env*.local` (padrão do create-next-app); se não ignorar, adicione essa linha.

- [ ] **Step 8: Criar `vitest.config.ts`**

```ts
import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
```

- [ ] **Step 9: Adicionar o script de teste em `package.json`**

Adicione `"test": "vitest run"` ao objeto `"scripts"`.

- [ ] **Step 10: Rodar os testes (ainda vazios) para confirmar que o setup funciona**

Run: `npm run test`
Expected: Vitest roda sem erros de configuração (0 arquivos de teste encontrados ainda é esperado).

- [ ] **Step 11: Commit**

```bash
git add components.json vitest.config.ts .env.example package.json package-lock.json next.config.ts app/globals.css app/_components app/_lib .gitignore
git commit -m "chore: set up shadcn/ui, vitest and design tokens"
```

---

## Task 2: Dados centrais, cidades, imagens e metadata helper

**Files:**
- Create: `app/_lib/constants.ts`
- Create: `app/_lib/metadata.ts`
- Create: `app/_lib/metadata.test.ts`

**Interfaces:**
- Consumes: nenhuma (primeira camada de dados do projeto).
- Produces: `PSYCHOLOGIST` (`name`, `fullTitle`, `crp`, `instagramUrl`, `instagramHandle`, `whatsappNumber`, `email`, `photoUrl: string | null`), `SITE_URL: string`, `type CityInfo = { slug, name, state, heroImage: {src, alt, credit}, intro }`, `CITIES: Record<"caboFrio" | "saoPedroDaAldeia", CityInfo>`, `IMAGES.about`, `IMAGES.benefits` (cada um `{src, alt, credit}`), `NAV_LINKS: {href, label}[]`, `FAQ_ITEMS: {question, answer}[]`, `buildMetadata({title, description, path}): Metadata`.

- [ ] **Step 1: Criar `app/_lib/constants.ts`**

```ts
export const SITE_URL = "https://gabrielribeiropsi.com.br"; // SUBSTITUA pelo domínio real depois da compra/configuração

export const PSYCHOLOGIST = {
  name: "Gabriel Ribeiro",
  fullTitle: "Gabriel Ribeiro Psicólogo",
  crp: "05/87661",
  instagramUrl: "https://www.instagram.com/gabrielribeiro_psi/",
  instagramHandle: "@gabrielribeiro_psi",
  // SUBSTITUA pelo número real de WhatsApp, formato internacional sem espaços/símbolos (ex: 5522988887777)
  whatsappNumber: "5500000000000",
  // SUBSTITUA pelo e-mail real que vai receber os contatos do formulário
  email: "contato@gabrielribeiropsi.com.br",
  // SUBSTITUA por uma URL (ou import estático) da foto real do Gabriel quando ele enviar
  photoUrl: null as string | null,
};

export type CityInfo = {
  slug: string;
  name: string;
  state: string;
  heroImage: { src: string; alt: string; credit: string };
  intro: string;
};

export const CITIES: Record<"caboFrio" | "saoPedroDaAldeia", CityInfo> = {
  caboFrio: {
    slug: "psicologo-cabo-frio",
    name: "Cabo Frio",
    state: "RJ",
    heroImage: {
      src: "https://images.unsplash.com/photo-1569356855774-2161ca24fe20?w=1600&q=80&auto=format&fit=crop",
      alt: "Mar calmo e azul, remetendo à orla de Cabo Frio",
      credit: "Foto: Debby Ledet / Unsplash",
    },
    intro:
      "Atendimento presencial em Cabo Frio para quem busca um espaço de escuta próximo de casa, com a flexibilidade de também poder continuar as sessões online quando precisar.",
  },
  saoPedroDaAldeia: {
    slug: "psicologo-sao-pedro-da-aldeia",
    name: "São Pedro da Aldeia",
    state: "RJ",
    heroImage: {
      src: "https://images.unsplash.com/photo-1598105729174-32b798d63288?w=1600&q=80&auto=format&fit=crop",
      alt: "Lagoa verde cercada de vegetação, remetendo à paisagem de São Pedro da Aldeia",
      credit: "Foto: Barbara Šipek / Unsplash",
    },
    intro:
      "Atendimento presencial em São Pedro da Aldeia, pensado para quem prefere o contato face a face, com a mesma flexibilidade de horários e acolhimento do atendimento online.",
  },
};

export const IMAGES = {
  about: {
    src: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1600&q=80&auto=format&fit=crop",
    alt: "Ambiente acolhedor com planta e luz natural, remetendo a um espaço de escuta e cuidado",
    credit: "Foto: Samantha Gades / Unsplash",
  },
  benefits: {
    src: "https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?w=1600&q=80&auto=format&fit=crop",
    alt: "Duas pessoas em uma conversa acolhedora à mesa",
    credit: "Foto: Priscilla Du Preez / Unsplash",
  },
} as const;

export const NAV_LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#servicos", label: "Serviços" },
  { href: "#faq", label: "Perguntas frequentes" },
  { href: "#contato", label: "Contato" },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Como funciona uma sessão de terapia online?",
    answer:
      "As sessões acontecem por videochamada, no mesmo formato e duração de uma sessão presencial. Você só precisa de um lugar tranquilo e conexão com a internet.",
  },
  {
    question: "As informações que eu compartilho são sigilosas?",
    answer:
      "Sim. Sigilo profissional é uma exigência ética do Código de Ética do Psicólogo e do CRP (05/87661), válido tanto para o atendimento online quanto presencial.",
  },
  {
    question: "Atende por convênio?",
    answer:
      "O atendimento é particular. Ao final de cada mês, você recebe um recibo que pode ser usado para solicitar reembolso ao seu convênio, caso ele ofereça essa opção.",
  },
  {
    question: "Quantas sessões eu vou precisar?",
    answer:
      "Isso varia de pessoa para pessoa. O processo terapêutico é construído em conjunto, no seu ritmo, e reavaliado periodicamente.",
  },
  {
    question: "Posso fazer terapia presencial e depois migrar para online (ou vice-versa)?",
    answer:
      "Sim. Muitos pacientes alternam entre os dois formatos conforme a rotina muda — o acompanhamento continua o mesmo.",
  },
] as const;
```

- [ ] **Step 2: Escrever o teste de `buildMetadata` (ainda vai falhar, a função não existe)**

Create `app/_lib/metadata.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { SITE_URL } from "./constants";
import { buildMetadata } from "./metadata";

describe("buildMetadata", () => {
  it("builds the canonical URL and openGraph fields from the given path", () => {
    const metadata = buildMetadata({
      title: "Título de teste",
      description: "Descrição de teste",
      path: "/psicologo-cabo-frio",
    });

    expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/psicologo-cabo-frio`);
    expect(metadata.openGraph?.title).toBe("Título de teste");
    expect(metadata.openGraph?.url).toBe(`${SITE_URL}/psicologo-cabo-frio`);
  });
});
```

- [ ] **Step 3: Rodar o teste e confirmar que falha**

Run: `npx vitest run app/_lib/metadata.test.ts`
Expected: FAIL — `Cannot find module './metadata'` (o arquivo ainda não existe).

- [ ] **Step 4: Criar `app/_lib/metadata.ts`**

```ts
import type { Metadata } from "next";
import { PSYCHOLOGIST, SITE_URL } from "@/app/_lib/constants";

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function buildMetadata({ title, description, path }: BuildMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: PSYCHOLOGIST.fullTitle,
      locale: "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
```

- [ ] **Step 5: Rodar o teste e confirmar que passa**

Run: `npx vitest run app/_lib/metadata.test.ts`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add app/_lib/constants.ts app/_lib/metadata.ts app/_lib/metadata.test.ts
git commit -m "feat: add central constants, city data and metadata helper"
```

---

## Task 3: Helper de link do WhatsApp

**Files:**
- Create: `app/_lib/whatsapp.ts`
- Create: `app/_lib/whatsapp.test.ts`

**Interfaces:**
- Consumes: `PSYCHOLOGIST.whatsappNumber` de `@/app/_lib/constants`.
- Produces: `buildWhatsAppLink(message: string): string`.

- [ ] **Step 1: Escrever o teste (vai falhar, a função não existe)**

Create `app/_lib/whatsapp.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { PSYCHOLOGIST } from "./constants";
import { buildWhatsAppLink } from "./whatsapp";

describe("buildWhatsAppLink", () => {
  it("encodes the message and includes the psychologist's WhatsApp number", () => {
    const link = buildWhatsAppLink("Olá, Gabriel! Gostaria de agendar uma consulta.");

    expect(link).toBe(
      `https://wa.me/${PSYCHOLOGIST.whatsappNumber}?text=Ol%C3%A1%2C%20Gabriel!%20Gostaria%20de%20agendar%20uma%20consulta.`
    );
  });
});
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npx vitest run app/_lib/whatsapp.test.ts`
Expected: FAIL — `Cannot find module './whatsapp'`.

- [ ] **Step 3: Criar `app/_lib/whatsapp.ts`**

```ts
import { PSYCHOLOGIST } from "@/app/_lib/constants";

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${PSYCHOLOGIST.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
```

- [ ] **Step 4: Rodar o teste e confirmar que passa**

Run: `npx vitest run app/_lib/whatsapp.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/_lib/whatsapp.ts app/_lib/whatsapp.test.ts
git commit -m "feat: add WhatsApp link helper"
```

---

## Task 4: Schema Zod do formulário de contato

**Files:**
- Create: `app/_lib/contact-schema.ts`
- Create: `app/_lib/contact-schema.test.ts`

**Interfaces:**
- Consumes: nenhuma.
- Produces: `contactFormSchema` (Zod object com `name`, `email`, `phone`, `message`, `company`), `type ContactFormValues`.

- [ ] **Step 1: Escrever os testes (vão falhar, o schema não existe)**

Create `app/_lib/contact-schema.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { contactFormSchema } from "./contact-schema";

describe("contactFormSchema", () => {
  it("accepts a valid payload without the honeypot field filled", () => {
    const result = contactFormSchema.safeParse({
      name: "Maria Silva",
      email: "maria@example.com",
      phone: "",
      message: "Gostaria de agendar uma primeira consulta.",
      company: "",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = contactFormSchema.safeParse({
      name: "Maria Silva",
      email: "not-an-email",
      message: "Gostaria de agendar uma primeira consulta.",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a message that is too short", () => {
    const result = contactFormSchema.safeParse({
      name: "Maria Silva",
      email: "maria@example.com",
      message: "Oi",
    });

    expect(result.success).toBe(false);
  });
});
```

- [ ] **Step 2: Rodar os testes e confirmar que falham**

Run: `npx vitest run app/_lib/contact-schema.test.ts`
Expected: FAIL — `Cannot find module './contact-schema'`.

- [ ] **Step 3: Criar `app/_lib/contact-schema.ts`**

```ts
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome completo."),
  email: z.string().trim().email("Informe um e-mail válido."),
  phone: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().min(10, "Conte um pouco mais sobre o que você procura."),
  company: z.string().optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
```

`company` é o campo honeypot: deve permanecer vazio; se vier preenchido, a rota de API (Task 21) trata como spam.

- [ ] **Step 4: Rodar os testes e confirmar que passam**

Run: `npx vitest run app/_lib/contact-schema.test.ts`
Expected: PASS (3 testes)

- [ ] **Step 5: Commit**

```bash
git add app/_lib/contact-schema.ts app/_lib/contact-schema.test.ts
git commit -m "feat: add contact form zod schema"
```

---

## Task 5: Fontes e layout raiz (base)

**Files:**
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `PSYCHOLOGIST`, `SITE_URL` de `@/app/_lib/constants`.
- Produces: variáveis CSS `--font-heading` e `--font-body` disponíveis em toda a aplicação; `export const metadata` base do site.

- [ ] **Step 1: Substituir `app/layout.tsx` pelo conteúdo abaixo**

```tsx
import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { PSYCHOLOGIST, SITE_URL } from "@/app/_lib/constants";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PSYCHOLOGIST.fullTitle} | CRP ${PSYCHOLOGIST.crp}`,
    template: `%s | ${PSYCHOLOGIST.fullTitle}`,
  },
  description:
    "Psicólogo (CRP 05/87661) com atendimento online para todo o Brasil e presencial em Cabo Frio e São Pedro da Aldeia, na Região dos Lagos (RJ).",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Verificação visual**

Run: `npm run dev`, abra `http://localhost:3000` e confirme no DevTools que a tag `<html>` tem `lang="pt-BR"` e que as variáveis de fonte estão aplicadas (sem erros no console sobre `next/font`).

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: configure base fonts and root metadata"
```

---

## Task 6: Componentes compartilhados

**Files:**
- Create: `app/_components/shared/animated-reveal.tsx`
- Create: `app/_components/shared/section-heading.tsx`
- Create: `app/_components/shared/whatsapp-button.tsx`
- Create: `app/_components/shared/json-ld.tsx`
- Create: `app/_components/shared/gabriel-photo.tsx`

**Interfaces:**
- Consumes: `buildWhatsAppLink` (Task 3), `PSYCHOLOGIST` (Task 2), `Button` de `@/app/_components/ui/button` (Task 1).
- Produces: `<AnimatedReveal className? delay?>`, `<SectionHeading eyebrow? title description? className?>`, `<WhatsappButton message label? size? variant? className?>`, `<JsonLd data={Record<string, unknown>}>`, `<GabrielPhoto className? priority?>`.

- [ ] **Step 1: Criar `app/_components/shared/animated-reveal.tsx`**

```tsx
"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

type AnimatedRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function AnimatedReveal({ children, className, delay = 0 }: AnimatedRevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Criar `app/_components/shared/section-heading.tsx`**

```tsx
type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <div className={`flex flex-col gap-3 ${className ?? ""}`}>
      {eyebrow ? (
        <span className="text-sm font-semibold uppercase tracking-wide text-primary">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-heading text-3xl font-medium text-foreground sm:text-4xl">{title}</h2>
      {description ? (
        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 3: Criar `app/_components/shared/whatsapp-button.tsx`**

```tsx
import { MessageCircle } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { buildWhatsAppLink } from "@/app/_lib/whatsapp";

type WhatsappButtonProps = {
  message: string;
  label?: string;
  size?: "default" | "lg";
  variant?: "default" | "outline";
  className?: string;
};

export function WhatsappButton({
  message,
  label = "Agende pelo WhatsApp",
  size = "default",
  variant = "default",
  className,
}: WhatsappButtonProps) {
  return (
    <Button asChild size={size} variant={variant} className={className}>
      <a href={buildWhatsAppLink(message)} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="size-4" />
        {label}
      </a>
    </Button>
  );
}
```

- [ ] **Step 4: Criar `app/_components/shared/json-ld.tsx`**

```tsx
type JsonLdProps = {
  data: Record<string, unknown>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

- [ ] **Step 5: Criar `app/_components/shared/gabriel-photo.tsx`**

```tsx
import Image from "next/image";
import { PSYCHOLOGIST } from "@/app/_lib/constants";

type GabrielPhotoProps = {
  className?: string;
  priority?: boolean;
};

export function GabrielPhoto({ className, priority }: GabrielPhotoProps) {
  if (!PSYCHOLOGIST.photoUrl) {
    return (
      <div
        role="img"
        aria-label={`Foto de ${PSYCHOLOGIST.name} (em breve)`}
        className={`flex h-full w-full items-center justify-center bg-primary font-heading text-5xl text-primary-foreground ${className ?? ""}`}
      >
        GR
      </div>
    );
  }

  return (
    <Image
      src={PSYCHOLOGIST.photoUrl}
      alt={`Foto de ${PSYCHOLOGIST.name}, psicólogo`}
      fill
      priority={priority}
      className={`object-cover ${className ?? ""}`}
    />
  );
}
```

- [ ] **Step 6: Verificação visual**

Estes componentes não têm página própria ainda — a verificação acontece quando forem usados nas seções (Tasks 11+). Confirme apenas que `npm run build` (ou `tsc --noEmit`, se preferir mais rápido) não acusa erro de tipos nestes 5 arquivos.

Run: `npx tsc --noEmit`
Expected: sem erros relacionados a `app/_components/shared/*`.

- [ ] **Step 7: Commit**

```bash
git add app/_components/shared
git commit -m "feat: add shared UI building blocks (reveal, heading, whatsapp button, json-ld, gabriel photo)"
```

---

## Task 7: Navbar

**Files:**
- Create: `app/_components/layout/navbar.tsx`

**Interfaces:**
- Consumes: `NAV_LINKS`, `PSYCHOLOGIST` (Task 2), `WhatsappButton` (Task 6), `Button`/`Sheet`/`SheetTrigger`/`SheetContent` de `@/app/_components/ui/*` (Task 1).
- Produces: `<Navbar />`.

- [ ] **Step 1: Criar `app/_components/layout/navbar.tsx`**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import { WhatsappButton } from "@/app/_components/shared/whatsapp-button";
import { NAV_LINKS, PSYCHOLOGIST } from "@/app/_lib/constants";

const WHATSAPP_MESSAGE = "Olá, Gabriel! Vim pelo site e gostaria de agendar uma consulta.";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="font-heading text-lg font-medium text-foreground">
          {PSYCHOLOGIST.fullTitle}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <WhatsappButton message={WHATSAPP_MESSAGE} />
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden" aria-label="Abrir menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col gap-6 pt-12">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-foreground"
              >
                {link.label}
              </a>
            ))}
            <WhatsappButton message={WHATSAPP_MESSAGE} />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Verificação visual**

A Navbar ainda não está no layout — a verificação completa acontece na Task 10. Por ora, rode `npx tsc --noEmit` e confirme que não há erro de tipos.

- [ ] **Step 3: Commit**

```bash
git add app/_components/layout/navbar.tsx
git commit -m "feat: add navbar with mobile sheet menu"
```

---

## Task 8: Footer

**Files:**
- Create: `app/_components/layout/footer.tsx`

**Interfaces:**
- Consumes: `PSYCHOLOGIST`, `CITIES` (Task 2).
- Produces: `<Footer />`.

- [ ] **Step 1: Criar `app/_components/layout/footer.tsx`**

```tsx
import Link from "next/link";
import { Instagram } from "lucide-react";
import { CITIES, PSYCHOLOGIST } from "@/app/_lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-heading text-base text-foreground">{PSYCHOLOGIST.fullTitle}</span>
          <span>CRP {PSYCHOLOGIST.crp}</span>
          <span>
            Atendimento online em todo o Brasil e presencial em {CITIES.caboFrio.name} e{" "}
            {CITIES.saoPedroDaAldeia.name} (RJ)
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <a
            href={PSYCHOLOGIST.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-foreground"
          >
            <Instagram className="size-4" />
            {PSYCHOLOGIST.instagramHandle}
          </a>
          <Link href="/politica-de-privacidade" className="hover:text-foreground">
            Política de Privacidade
          </Link>
        </div>
      </div>

      <div className="border-t border-border px-6 py-4 text-center text-xs text-muted-foreground">
        © {year} {PSYCHOLOGIST.fullTitle}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verificação de tipos**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add app/_components/layout/footer.tsx
git commit -m "feat: add footer"
```

---

## Task 9: Botão flutuante de WhatsApp

**Files:**
- Create: `app/_components/layout/whatsapp-float-button.tsx`

**Interfaces:**
- Consumes: `buildWhatsAppLink` (Task 3).
- Produces: `<WhatsappFloatButton />`.

- [ ] **Step 1: Criar `app/_components/layout/whatsapp-float-button.tsx`**

```tsx
import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/app/_lib/whatsapp";

const WHATSAPP_MESSAGE = "Olá, Gabriel! Vim pelo site e gostaria de agendar uma consulta.";

export function WhatsappFloatButton() {
  return (
    <a
      href={buildWhatsAppLink(WHATSAPP_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex size-14 animate-pulse items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-105 motion-reduce:animate-none"
    >
      <MessageCircle className="size-7" />
    </a>
  );
}
```

`animate-pulse` e `motion-reduce:animate-none` são utilities nativas do Tailwind — não precisam de `motion`/JS, e já respeitam `prefers-reduced-motion`.

- [ ] **Step 2: Verificação de tipos**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add app/_components/layout/whatsapp-float-button.tsx
git commit -m "feat: add floating whatsapp button"
```

---

## Task 10: Composição final do layout raiz

**Files:**
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `Navbar` (Task 7), `Footer` (Task 8), `WhatsappFloatButton` (Task 9), `Toaster` de `@/app/_components/ui/sonner` (Task 1).

- [ ] **Step 1: Atualizar `app/layout.tsx` para compor Navbar, Footer, botão flutuante e Toaster**

```tsx
import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Footer } from "@/app/_components/layout/footer";
import { Navbar } from "@/app/_components/layout/navbar";
import { WhatsappFloatButton } from "@/app/_components/layout/whatsapp-float-button";
import { Toaster } from "@/app/_components/ui/sonner";
import { PSYCHOLOGIST, SITE_URL } from "@/app/_lib/constants";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PSYCHOLOGIST.fullTitle} | CRP ${PSYCHOLOGIST.crp}`,
    template: `%s | ${PSYCHOLOGIST.fullTitle}`,
  },
  description:
    "Psicólogo (CRP 05/87661) com atendimento online para todo o Brasil e presencial em Cabo Frio e São Pedro da Aldeia, na Região dos Lagos (RJ).",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
        <WhatsappFloatButton />
        <Toaster />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verificação visual**

Run: `npm run dev`. Abra `http://localhost:3000` (a página ainda tem o conteúdo padrão do create-next-app, será substituída na Task 20) e confirme que a Navbar aparece no topo, o Footer no final, e o botão flutuante de WhatsApp no canto inferior direito, com o pulse sutil.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: compose root layout with navbar, footer and floating whatsapp button"
```

---

## Task 11: Seção Hero

**Files:**
- Create: `app/_components/sections/hero-section.tsx`

**Interfaces:**
- Consumes: `GabrielPhoto`, `WhatsappButton`, `AnimatedReveal` (Task 6), `PSYCHOLOGIST`, `CITIES` (Task 2).
- Produces: `<HeroSection />`.

- [ ] **Step 1: Criar `app/_components/sections/hero-section.tsx`**

```tsx
import { AnimatedReveal } from "@/app/_components/shared/animated-reveal";
import { GabrielPhoto } from "@/app/_components/shared/gabriel-photo";
import { WhatsappButton } from "@/app/_components/shared/whatsapp-button";
import { CITIES, PSYCHOLOGIST } from "@/app/_lib/constants";

export function HeroSection() {
  return (
    <section className="bg-secondary">
      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-6 py-16 sm:py-24 md:flex-row">
        <AnimatedReveal className="flex flex-1 flex-col items-start gap-6">
          <span className="w-fit rounded-full bg-background px-4 py-1 text-sm font-medium text-primary">
            CRP {PSYCHOLOGIST.crp}
          </span>
          <h1 className="font-heading text-4xl font-medium leading-tight text-foreground sm:text-5xl">
            Um espaço de escuta para você se cuidar, no seu tempo
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Sou {PSYCHOLOGIST.name}, psicólogo. Atendo online em todo o Brasil e presencialmente
            em {CITIES.caboFrio.name} e {CITIES.saoPedroDaAldeia.name}, na Região dos Lagos (RJ).
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <WhatsappButton
              size="lg"
              message="Olá, Gabriel! Vim pelo site e gostaria de agendar uma consulta."
            />
            <a
              href="#contato"
              className="flex items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-background"
            >
              Fale comigo pelo formulário
            </a>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={0.15} className="flex flex-1 justify-center">
          <div className="relative aspect-square w-64 overflow-hidden rounded-3xl shadow-lg sm:w-80">
            <GabrielPhoto priority />
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificação de tipos**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add app/_components/sections/hero-section.tsx
git commit -m "feat: add hero section"
```

---

## Task 12: Seção Sobre

**Files:**
- Create: `app/_components/sections/about-section.tsx`

**Interfaces:**
- Consumes: `AnimatedReveal`, `SectionHeading`, `GabrielPhoto` (Task 6), `IMAGES.about`, `PSYCHOLOGIST` (Task 2).
- Produces: `<AboutSection />` (renderiza `id="sobre"`, usado pela âncora da Navbar).

- [ ] **Step 1: Criar `app/_components/sections/about-section.tsx`**

```tsx
import Image from "next/image";
import { AnimatedReveal } from "@/app/_components/shared/animated-reveal";
import { GabrielPhoto } from "@/app/_components/shared/gabriel-photo";
import { SectionHeading } from "@/app/_components/shared/section-heading";
import { IMAGES, PSYCHOLOGIST } from "@/app/_lib/constants";

export function AboutSection() {
  return (
    <section id="sobre" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <div className="flex flex-col gap-10 md:flex-row md:items-center">
        <AnimatedReveal className="flex flex-1 justify-center">
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl">
            <GabrielPhoto />
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={0.1} className="flex flex-1 flex-col gap-6">
          <SectionHeading
            eyebrow="Sobre mim"
            title={`Olá, eu sou o ${PSYCHOLOGIST.name}`}
            description="Acredito que a terapia é um encontro — um espaço construído aos poucos, sessão após sessão, no ritmo de cada pessoa."
          />
          <p className="text-base text-muted-foreground">
            Sou psicólogo (CRP {PSYCHOLOGIST.crp}) e conduzo meu trabalho com escuta ativa e
            acolhimento, sem julgamentos. Atendo adultos que buscam entender melhor seus
            sentimentos, suas relações e as questões do dia a dia, seja online, de qualquer lugar
            do Brasil, seja presencialmente em Cabo Frio e São Pedro da Aldeia.
          </p>
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
            <Image
              src={IMAGES.about.src}
              alt={IMAGES.about.alt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificação de tipos**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add app/_components/sections/about-section.tsx
git commit -m "feat: add about section"
```

---

## Task 13: Seção Como Funciona

**Files:**
- Create: `app/_components/sections/how-it-works-section.tsx`

**Interfaces:**
- Consumes: `AnimatedReveal`, `SectionHeading` (Task 6).
- Produces: `<HowItWorksSection />` (renderiza `id="como-funciona"`).

- [ ] **Step 1: Criar `app/_components/sections/how-it-works-section.tsx`**

```tsx
import { CalendarCheck, MessageCircle, Repeat, Video } from "lucide-react";
import { AnimatedReveal } from "@/app/_components/shared/animated-reveal";
import { SectionHeading } from "@/app/_components/shared/section-heading";

const STEPS = [
  {
    icon: MessageCircle,
    title: "1. Você entra em contato",
    description: "Pelo WhatsApp ou pelo formulário, me conte um pouco do que você está buscando.",
  },
  {
    icon: CalendarCheck,
    title: "2. Agendamos sua sessão",
    description: "Combinamos juntos o melhor dia e horário, online ou presencial.",
  },
  {
    icon: Video,
    title: "3. Primeira sessão",
    description: "Um encontro inicial para nos conhecermos e entendermos o que te trouxe até aqui.",
  },
  {
    icon: Repeat,
    title: "4. Acompanhamento contínuo",
    description: "Seguimos juntos, no seu ritmo, revendo o processo sempre que fizer sentido.",
  },
] as const;

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="bg-secondary">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 sm:py-24">
        <SectionHeading eyebrow="Como funciona" title="Do primeiro contato ao acompanhamento contínuo" />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <AnimatedReveal key={step.title} delay={index * 0.1} className="flex flex-col gap-3">
              <span className="flex size-12 items-center justify-center rounded-full bg-background text-primary">
                <step.icon className="size-6" />
              </span>
              <h3 className="font-heading text-lg font-medium text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificação de tipos**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add app/_components/sections/how-it-works-section.tsx
git commit -m "feat: add how it works section"
```

---

## Task 14: Seção Serviços

**Files:**
- Create: `app/_components/sections/services-section.tsx`

**Interfaces:**
- Consumes: `AnimatedReveal`, `SectionHeading` (Task 6), `CITIES`, `type CityInfo` (Task 2).
- Produces: `<ServicesSection city?: CityInfo />` (renderiza `id="servicos"`; quando `city` é passada, personaliza o texto da terapia presencial para focar só naquela cidade — usado pelas páginas de localização na Task 22).

- [ ] **Step 1: Criar `app/_components/sections/services-section.tsx`**

```tsx
import { Globe, HeartHandshake, MapPin } from "lucide-react";
import { AnimatedReveal } from "@/app/_components/shared/animated-reveal";
import { SectionHeading } from "@/app/_components/shared/section-heading";
import { CITIES, type CityInfo } from "@/app/_lib/constants";

type ServicesSectionProps = {
  city?: CityInfo;
};

export function ServicesSection({ city }: ServicesSectionProps) {
  const services = [
    {
      icon: Globe,
      title: "Terapia online",
      description: city
        ? "Se preferir (ou precisar viajar), seguimos as sessões por videochamada de onde você estiver."
        : "Atendimento por videochamada para todo o Brasil, com a mesma qualidade e sigilo de uma sessão presencial.",
    },
    {
      icon: MapPin,
      title: "Terapia presencial",
      description: city
        ? `Consultório em ${city.name} (${city.state}), pensado para um encontro tranquilo e reservado.`
        : `Consultório em ${CITIES.caboFrio.name} e ${CITIES.saoPedroDaAldeia.name}, na Região dos Lagos (RJ).`,
    },
    {
      icon: HeartHandshake,
      title: "Atendimento individual para adultos",
      description:
        "Um espaço para trabalhar ansiedade, autoestima, relacionamentos, estresse e autoconhecimento, no que fizer sentido para você.",
    },
  ] as const;

  return (
    <section id="servicos" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <SectionHeading eyebrow="Serviços" title="Como posso te ajudar" className="mb-10" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {services.map((service, index) => (
          <AnimatedReveal
            key={service.title}
            delay={index * 0.1}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
              <service.icon className="size-6" />
            </span>
            <h3 className="font-heading text-lg font-medium text-foreground">{service.title}</h3>
            <p className="text-sm text-muted-foreground">{service.description}</p>
          </AnimatedReveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificação de tipos**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add app/_components/sections/services-section.tsx
git commit -m "feat: add services section with optional city customization"
```

---

## Task 15: Seção Diferenciais

**Files:**
- Create: `app/_components/sections/benefits-section.tsx`

**Interfaces:**
- Consumes: `AnimatedReveal`, `SectionHeading` (Task 6), `IMAGES.benefits` (Task 2).
- Produces: `<BenefitsSection />`.

- [ ] **Step 1: Criar `app/_components/sections/benefits-section.tsx`**

```tsx
import Image from "next/image";
import { Clock, Ear, Repeat2, ShieldCheck } from "lucide-react";
import { AnimatedReveal } from "@/app/_components/shared/animated-reveal";
import { SectionHeading } from "@/app/_components/shared/section-heading";
import { IMAGES } from "@/app/_lib/constants";

const BENEFITS = [
  { icon: ShieldCheck, text: "Sigilo ético, respaldado pelo CRP" },
  { icon: Ear, text: "Escuta acolhedora, sem julgamentos" },
  { icon: Clock, text: "Flexibilidade de horário no atendimento online" },
  { icon: Repeat2, text: "Acompanhamento contínuo, no seu ritmo" },
] as const;

export function BenefitsSection() {
  return (
    <section className="bg-secondary">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 sm:py-24 md:flex-row md:items-center">
        <AnimatedReveal className="relative aspect-video flex-1 overflow-hidden rounded-3xl">
          <Image
            src={IMAGES.benefits.src}
            alt={IMAGES.benefits.alt}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </AnimatedReveal>

        <AnimatedReveal delay={0.1} className="flex flex-1 flex-col gap-6">
          <SectionHeading title="Por que fazer terapia comigo" />
          <ul className="flex flex-col gap-4">
            {BENEFITS.map((benefit) => (
              <li key={benefit.text} className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-background text-primary">
                  <benefit.icon className="size-5" />
                </span>
                <span className="text-base text-foreground">{benefit.text}</span>
              </li>
            ))}
          </ul>
        </AnimatedReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificação de tipos**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add app/_components/sections/benefits-section.tsx
git commit -m "feat: add benefits section"
```

---

## Task 16: Seção Área de Atendimento

**Files:**
- Create: `app/_components/sections/service-area-section.tsx`

**Interfaces:**
- Consumes: `AnimatedReveal`, `SectionHeading` (Task 6), `CITIES` (Task 2).
- Produces: `<ServiceAreaSection />` — inclui links internos para `/psicologo-cabo-frio` e `/psicologo-sao-pedro-da-aldeia`.

- [ ] **Step 1: Criar `app/_components/sections/service-area-section.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import { Globe } from "lucide-react";
import { AnimatedReveal } from "@/app/_components/shared/animated-reveal";
import { SectionHeading } from "@/app/_components/shared/section-heading";
import { CITIES } from "@/app/_lib/constants";

export function ServiceAreaSection() {
  const cities = Object.values(CITIES);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <SectionHeading
        eyebrow="Área de atendimento"
        title="Onde eu atendo"
        description="Presencialmente na Região dos Lagos, e online em qualquer lugar do Brasil."
        className="mb-10"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {cities.map((city, index) => (
          <AnimatedReveal
            key={city.slug}
            delay={index * 0.1}
            className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl"
          >
            <Image
              src={city.heroImage.src}
              alt={city.heroImage.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 640px) 33vw, 100vw"
            />
            <div className="relative z-10 flex flex-col gap-2 bg-gradient-to-t from-black/70 to-transparent p-6">
              <span className="font-heading text-xl text-white">{city.name}</span>
              <Link
                href={`/${city.slug}`}
                className="text-sm font-medium text-white underline underline-offset-4"
              >
                Ver atendimento presencial
              </Link>
            </div>
          </AnimatedReveal>
        ))}

        <AnimatedReveal
          delay={0.2}
          className="flex aspect-[4/5] flex-col justify-center gap-3 rounded-2xl bg-primary p-6 text-primary-foreground"
        >
          <Globe className="size-8" />
          <span className="font-heading text-xl">Online</span>
          <p className="text-sm">Atendimento por videochamada para todo o Brasil.</p>
        </AnimatedReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificação de tipos**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add app/_components/sections/service-area-section.tsx
git commit -m "feat: add service area section with internal links to location pages"
```

---

## Task 17: Seção FAQ

**Files:**
- Create: `app/_components/sections/faq-section.tsx`

**Interfaces:**
- Consumes: `Accordion`/`AccordionItem`/`AccordionTrigger`/`AccordionContent` de `@/app/_components/ui/accordion` (Task 1), `AnimatedReveal`, `SectionHeading`, `JsonLd` (Task 6), `FAQ_ITEMS` (Task 2).
- Produces: `<FaqSection />` (renderiza `id="faq"` e o schema `FAQPage`).

- [ ] **Step 1: Criar `app/_components/sections/faq-section.tsx`**

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";
import { AnimatedReveal } from "@/app/_components/shared/animated-reveal";
import { JsonLd } from "@/app/_components/shared/json-ld";
import { SectionHeading } from "@/app/_components/shared/section-heading";
import { FAQ_ITEMS } from "@/app/_lib/constants";

export function FaqSection() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section id="faq" className="bg-secondary">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <SectionHeading eyebrow="Perguntas frequentes" title="Tirando suas dúvidas" className="mb-10" />
        <AnimatedReveal>
          <Accordion type="single" collapsible>
            {FAQ_ITEMS.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger className="text-left font-heading text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedReveal>
      </div>
      <JsonLd data={faqSchema} />
    </section>
  );
}
```

- [ ] **Step 2: Verificação de tipos**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add app/_components/sections/faq-section.tsx
git commit -m "feat: add faq section with FAQPage json-ld"
```

---

## Task 18: Seção Instagram

**Files:**
- Create: `app/_components/sections/instagram-section.tsx`

**Interfaces:**
- Consumes: `AnimatedReveal`, `SectionHeading` (Task 6), `PSYCHOLOGIST` (Task 2).
- Produces: `<InstagramSection />`.

- [ ] **Step 1: Criar `app/_components/sections/instagram-section.tsx`**

```tsx
import { Instagram } from "lucide-react";
import { AnimatedReveal } from "@/app/_components/shared/animated-reveal";
import { SectionHeading } from "@/app/_components/shared/section-heading";
import { PSYCHOLOGIST } from "@/app/_lib/constants";

export function InstagramSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <AnimatedReveal className="flex flex-col items-center gap-6 rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground">
        <Instagram className="size-10" />
        <SectionHeading
          title="Acompanhe no Instagram"
          description={`Conteúdos sobre saúde mental e bastidores do consultório em ${PSYCHOLOGIST.instagramHandle}.`}
          className="items-center text-center [&_h2]:text-primary-foreground [&_p]:text-primary-foreground/90"
        />
        <a
          href={PSYCHOLOGIST.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-background/90"
        >
          Seguir {PSYCHOLOGIST.instagramHandle}
        </a>
      </AnimatedReveal>
    </section>
  );
}
```

- [ ] **Step 2: Verificação de tipos**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add app/_components/sections/instagram-section.tsx
git commit -m "feat: add instagram section"
```

---

## Task 19: Seção Contato (formulário)

**Files:**
- Create: `app/_components/sections/contact-section.tsx`

**Interfaces:**
- Consumes: `Button`/`Input`/`Textarea`/`Form`/`FormField`/`FormItem`/`FormLabel`/`FormControl`/`FormMessage` de `@/app/_components/ui/*` (Task 1), `SectionHeading`, `WhatsappButton` (Task 6), `contactFormSchema`/`ContactFormValues` (Task 4), `toast` de `sonner`.
- Produces: `<ContactSection />` (renderiza `id="contato"`; faz `POST /api/contact`, consumido pela Task 21).

- [ ] **Step 1: Criar `app/_components/sections/contact-section.tsx`**

```tsx
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { SectionHeading } from "@/app/_components/shared/section-heading";
import { WhatsappButton } from "@/app/_components/shared/whatsapp-button";
import { contactFormSchema, type ContactFormValues } from "@/app/_lib/contact-schema";

const DEFAULT_VALUES: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
  company: "",
};

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Falha ao enviar mensagem");
      }

      toast.success("Mensagem enviada! Gabriel vai te responder em breve.");
      form.reset(DEFAULT_VALUES);
    } catch {
      toast.error(
        "Não foi possível enviar sua mensagem agora. Tente novamente ou fale direto pelo WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contato" className="bg-secondary">
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-16 sm:py-24">
        <SectionHeading
          eyebrow="Contato"
          title="Vamos conversar?"
          description="Preencha o formulário abaixo ou fale direto pelo WhatsApp — o que for mais confortável para você."
        />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="seu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="(22) 90000-0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Conte um pouco sobre o que você procura" rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem className="hidden" aria-hidden="true">
                  <FormLabel>Empresa</FormLabel>
                  <FormControl>
                    <Input tabIndex={-1} autoComplete="off" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar mensagem"}
              </Button>
              <WhatsappButton
                variant="outline"
                size="lg"
                message="Olá, Gabriel! Vim pelo site e gostaria de agendar uma consulta."
              />
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
```

O campo `company` é o honeypot: fica escondido via `className="hidden"` e é validado/tratado como spam na Task 21.

- [ ] **Step 2: Verificação de tipos**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add app/_components/sections/contact-section.tsx
git commit -m "feat: add contact form section"
```

---

## Task 20: Página Home

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: todas as seções das Tasks 11-19, `JsonLd` (Task 6), `buildMetadata` (Task 2), `PSYCHOLOGIST`, `SITE_URL` (Task 2).

- [ ] **Step 1: Substituir `app/page.tsx` pelo conteúdo abaixo**

```tsx
import type { Metadata } from "next";
import { JsonLd } from "@/app/_components/shared/json-ld";
import { AboutSection } from "@/app/_components/sections/about-section";
import { BenefitsSection } from "@/app/_components/sections/benefits-section";
import { ContactSection } from "@/app/_components/sections/contact-section";
import { FaqSection } from "@/app/_components/sections/faq-section";
import { HeroSection } from "@/app/_components/sections/hero-section";
import { HowItWorksSection } from "@/app/_components/sections/how-it-works-section";
import { InstagramSection } from "@/app/_components/sections/instagram-section";
import { ServiceAreaSection } from "@/app/_components/sections/service-area-section";
import { ServicesSection } from "@/app/_components/sections/services-section";
import { PSYCHOLOGIST, SITE_URL } from "@/app/_lib/constants";
import { buildMetadata } from "@/app/_lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: `${PSYCHOLOGIST.name} — Psicólogo Online e em Cabo Frio / São Pedro da Aldeia`,
  description:
    "Psicólogo (CRP 05/87661) com atendimento online para todo o Brasil e presencial em Cabo Frio e São Pedro da Aldeia. Agende sua consulta.",
  path: "/",
});

export default function Home() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PSYCHOLOGIST.name,
    jobTitle: "Psicólogo",
    url: SITE_URL,
    sameAs: [PSYCHOLOGIST.instagramUrl],
    honorificSuffix: `CRP ${PSYCHOLOGIST.crp}`,
  };

  return (
    <>
      <JsonLd data={personSchema} />
      <HeroSection />
      <AboutSection />
      <HowItWorksSection />
      <ServicesSection />
      <BenefitsSection />
      <ServiceAreaSection />
      <FaqSection />
      <InstagramSection />
      <ContactSection />
    </>
  );
}
```

- [ ] **Step 2: Verificação visual completa da Home**

Run: `npm run dev`, abra `http://localhost:3000` e percorra a página inteira: Hero, Sobre, Como Funciona, Serviços, Diferenciais, Área de Atendimento (com links pras páginas de localização — vão dar 404 até a Task 22), FAQ, Instagram, Contato, Footer. Confirme as animações de entrada ao rolar a página e o botão flutuante de WhatsApp.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: compose home page from all sections"
```

---

## Task 21: Cliente Resend e API route `/api/contact`

**Files:**
- Create: `app/_lib/resend.ts`
- Create: `app/api/contact/route.ts`
- Create: `app/api/contact/route.test.ts`

**Interfaces:**
- Consumes: `contactFormSchema` (Task 4), `PSYCHOLOGIST` (Task 2).
- Produces: `resend` (cliente Resend), `POST(request: Request): Promise<Response>` — usado pelo `fetch("/api/contact")` da Task 19.

- [ ] **Step 1: Criar `app/_lib/resend.ts`**

```ts
import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);
```

- [ ] **Step 2: Escrever os testes da rota (vão falhar, a rota não existe)**

Create `app/api/contact/route.test.ts`:

```ts
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/app/_lib/resend", () => ({
  resend: { emails: { send: vi.fn() } },
}));

import { resend } from "@/app/_lib/resend";
import { POST } from "./route";

function buildRequest(body: unknown) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.mocked(resend.emails.send).mockReset();
  });

  it("sends an email and returns ok for a valid payload", async () => {
    vi.mocked(resend.emails.send).mockResolvedValueOnce({ data: null, error: null });

    const response = await POST(
      buildRequest({
        name: "Maria Silva",
        email: "maria@example.com",
        phone: "",
        message: "Gostaria de agendar uma primeira consulta.",
        company: "",
      })
    );

    expect(response.status).toBe(200);
    expect(resend.emails.send).toHaveBeenCalledTimes(1);
  });

  it("returns 400 and does not send an email for an invalid payload", async () => {
    const response = await POST(buildRequest({ name: "M", email: "not-an-email", message: "curto" }));

    expect(response.status).toBe(400);
    expect(resend.emails.send).not.toHaveBeenCalled();
  });

  it("silently accepts and skips sending when the honeypot field is filled", async () => {
    const response = await POST(
      buildRequest({
        name: "Bot Spam",
        email: "bot@example.com",
        message: "Mensagem qualquer com mais de dez caracteres.",
        company: "preenchido por um bot",
      })
    );

    expect(response.status).toBe(200);
    expect(resend.emails.send).not.toHaveBeenCalled();
  });

  it("returns 502 when Resend throws", async () => {
    vi.mocked(resend.emails.send).mockRejectedValueOnce(new Error("network error"));

    const response = await POST(
      buildRequest({
        name: "Maria Silva",
        email: "maria@example.com",
        message: "Gostaria de agendar uma primeira consulta.",
      })
    );

    expect(response.status).toBe(502);
  });

  it("returns 502 when Resend resolves with an error field", async () => {
    vi.mocked(resend.emails.send).mockResolvedValueOnce({
      data: null,
      error: { name: "validation_error", message: "invalid domain" },
    });

    const response = await POST(
      buildRequest({
        name: "Maria Silva",
        email: "maria@example.com",
        message: "Gostaria de agendar uma primeira consulta.",
      })
    );

    expect(response.status).toBe(502);
  });
});
```

- [ ] **Step 3: Rodar os testes e confirmar que falham**

Run: `npx vitest run app/api/contact/route.test.ts`
Expected: FAIL — `Cannot find module './route'`.

- [ ] **Step 4: Criar `app/api/contact/route.ts`**

```ts
import { NextResponse } from "next/server";
import { contactFormSchema } from "@/app/_lib/contact-schema";
import { PSYCHOLOGIST } from "@/app/_lib/constants";
import { resend } from "@/app/_lib/resend";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, phone, message, company } = parsed.data;

  if (company) {
    return NextResponse.json({ ok: true });
  }

  try {
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
      to: process.env.CONTACT_EMAIL ?? PSYCHOLOGIST.email,
      replyTo: email,
      subject: `Novo contato pelo site — ${name}`,
      text: `Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone || "não informado"}\n\nMensagem:\n${message}`,
    });

    if (error) {
      console.error("Resend returned an error", error);
      return NextResponse.json({ ok: false }, { status: 502 });
    }
  } catch (error) {
    console.error("Failed to send contact email", error);
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 5: Rodar os testes e confirmar que passam**

Run: `npx vitest run app/api/contact/route.test.ts`
Expected: PASS (5 testes)

- [ ] **Step 6: Commit**

```bash
git add app/_lib/resend.ts app/api/contact/route.ts app/api/contact/route.test.ts
git commit -m "feat: add contact API route with resend integration"
```

---

## Task 22: Páginas de localização (Cabo Frio e São Pedro da Aldeia)

**Files:**
- Create: `app/_components/sections/location-hero-section.tsx`
- Create: `app/psicologo-cabo-frio/page.tsx`
- Create: `app/psicologo-sao-pedro-da-aldeia/page.tsx`

**Interfaces:**
- Consumes: `CityInfo`, `CITIES`, `PSYCHOLOGIST`, `SITE_URL` (Task 2), `WhatsappButton`, `AnimatedReveal`, `JsonLd` (Task 6), `ServicesSection` (Task 14), `BenefitsSection` (Task 15), `ServiceAreaSection` (Task 16), `FaqSection` (Task 17), `ContactSection` (Task 19), `buildMetadata` (Task 2).
- Produces: `<LocationHeroSection city: CityInfo />`, rotas `/psicologo-cabo-frio` e `/psicologo-sao-pedro-da-aldeia`.

- [ ] **Step 1: Criar `app/_components/sections/location-hero-section.tsx`**

```tsx
import Image from "next/image";
import { AnimatedReveal } from "@/app/_components/shared/animated-reveal";
import { WhatsappButton } from "@/app/_components/shared/whatsapp-button";
import { PSYCHOLOGIST, type CityInfo } from "@/app/_lib/constants";

type LocationHeroSectionProps = {
  city: CityInfo;
};

export function LocationHeroSection({ city }: LocationHeroSectionProps) {
  return (
    <section className="relative isolate overflow-hidden bg-secondary">
      <div className="absolute inset-0 -z-10">
        <Image src={city.heroImage.src} alt={city.heroImage.alt} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-24 sm:py-32">
        <AnimatedReveal className="flex flex-col gap-6">
          <span className="w-fit rounded-full bg-background px-4 py-1 text-sm font-medium text-primary">
            CRP {PSYCHOLOGIST.crp}
          </span>
          <h1 className="max-w-2xl font-heading text-4xl font-medium leading-tight text-white sm:text-5xl">
            Psicólogo em {city.name}, com atendimento presencial e online
          </h1>
          <p className="max-w-xl text-lg text-white/90">{city.intro}</p>
          <div>
            <WhatsappButton
              size="lg"
              message={`Olá, Gabriel! Vi o site e gostaria de agendar uma consulta presencial em ${city.name}.`}
            />
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Criar `app/psicologo-cabo-frio/page.tsx`**

```tsx
import type { Metadata } from "next";
import { JsonLd } from "@/app/_components/shared/json-ld";
import { BenefitsSection } from "@/app/_components/sections/benefits-section";
import { ContactSection } from "@/app/_components/sections/contact-section";
import { FaqSection } from "@/app/_components/sections/faq-section";
import { LocationHeroSection } from "@/app/_components/sections/location-hero-section";
import { ServiceAreaSection } from "@/app/_components/sections/service-area-section";
import { ServicesSection } from "@/app/_components/sections/services-section";
import { CITIES, SITE_URL } from "@/app/_lib/constants";
import { buildMetadata } from "@/app/_lib/metadata";

const city = CITIES.caboFrio;

export const metadata: Metadata = buildMetadata({
  title: `Psicólogo em ${city.name} — Atendimento Presencial e Online`,
  description: `Psicólogo (CRP 05/87661) com atendimento presencial em ${city.name} (RJ) e online para todo o Brasil. Agende sua consulta.`,
  path: `/${city.slug}`,
});

export default function PsicologoCaboFrioPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: `Gabriel Ribeiro Psicólogo — ${city.name}`,
    url: `${SITE_URL}/${city.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.state,
      addressCountry: "BR",
    },
  };

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <LocationHeroSection city={city} />
      <ServicesSection city={city} />
      <BenefitsSection />
      <ServiceAreaSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
```

- [ ] **Step 3: Criar `app/psicologo-sao-pedro-da-aldeia/page.tsx`**

```tsx
import type { Metadata } from "next";
import { JsonLd } from "@/app/_components/shared/json-ld";
import { BenefitsSection } from "@/app/_components/sections/benefits-section";
import { ContactSection } from "@/app/_components/sections/contact-section";
import { FaqSection } from "@/app/_components/sections/faq-section";
import { LocationHeroSection } from "@/app/_components/sections/location-hero-section";
import { ServiceAreaSection } from "@/app/_components/sections/service-area-section";
import { ServicesSection } from "@/app/_components/sections/services-section";
import { CITIES, SITE_URL } from "@/app/_lib/constants";
import { buildMetadata } from "@/app/_lib/metadata";

const city = CITIES.saoPedroDaAldeia;

export const metadata: Metadata = buildMetadata({
  title: `Psicólogo em ${city.name} — Atendimento Presencial e Online`,
  description: `Psicólogo (CRP 05/87661) com atendimento presencial em ${city.name} (RJ) e online para todo o Brasil. Agende sua consulta.`,
  path: `/${city.slug}`,
});

export default function PsicologoSaoPedroDaAldeiaPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: `Gabriel Ribeiro Psicólogo — ${city.name}`,
    url: `${SITE_URL}/${city.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.state,
      addressCountry: "BR",
    },
  };

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <LocationHeroSection city={city} />
      <ServicesSection city={city} />
      <BenefitsSection />
      <ServiceAreaSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
```

- [ ] **Step 4: Verificação visual**

Run: `npm run dev`. Acesse `/psicologo-cabo-frio` e `/psicologo-sao-pedro-da-aldeia`, confirme que os links da seção "Área de Atendimento" da Home agora funcionam (sem 404), e que cada página mostra a foto e o texto da cidade correta.

- [ ] **Step 5: Commit**

```bash
git add app/_components/sections/location-hero-section.tsx app/psicologo-cabo-frio app/psicologo-sao-pedro-da-aldeia
git commit -m "feat: add cabo frio and sao pedro da aldeia location pages"
```

---

## Task 23: Página de Política de Privacidade

**Files:**
- Create: `app/politica-de-privacidade/page.tsx`

**Interfaces:**
- Consumes: `PSYCHOLOGIST` (Task 2), `buildMetadata` (Task 2).
- Produces: rota `/politica-de-privacidade`.

- [ ] **Step 1: Criar `app/politica-de-privacidade/page.tsx`**

```tsx
import type { Metadata } from "next";
import { PSYCHOLOGIST } from "@/app/_lib/constants";
import { buildMetadata } from "@/app/_lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Política de Privacidade",
  description: "Como os dados enviados pelo formulário de contato são tratados.",
  path: "/politica-de-privacidade",
});

export default function PoliticaDePrivacidadePage() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16 sm:py-24">
      <h1 className="font-heading text-3xl font-medium text-foreground">Política de Privacidade</h1>
      <p className="text-muted-foreground">
        Esta página explica como as informações enviadas pelo formulário de contato deste site são
        utilizadas, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
      </p>

      <h2 className="font-heading text-xl font-medium text-foreground">Quais dados são coletados</h2>
      <p className="text-muted-foreground">
        Ao preencher o formulário de contato, coletamos apenas o nome, e-mail, telefone (quando
        informado) e a mensagem enviada. Esses dados são usados exclusivamente para que{" "}
        {PSYCHOLOGIST.name} possa responder ao seu contato.
      </p>

      <h2 className="font-heading text-xl font-medium text-foreground">Como os dados são usados</h2>
      <p className="text-muted-foreground">
        As informações enviadas são encaminhadas por e-mail para {PSYCHOLOGIST.name} e não são
        compartilhadas com terceiros, vendidas ou usadas para fins de marketing. Não armazenamos os
        dados em um banco de dados próprio.
      </p>

      <h2 className="font-heading text-xl font-medium text-foreground">Seus direitos</h2>
      <p className="text-muted-foreground">
        Você pode, a qualquer momento, solicitar a exclusão dos dados enviados, entrando em contato
        pelo e-mail {PSYCHOLOGIST.email} ou pelo WhatsApp disponível no site.
      </p>
    </section>
  );
}
```

- [ ] **Step 2: Verificação visual**

Run: `npm run dev` e acesse `/politica-de-privacidade`.

- [ ] **Step 3: Commit**

```bash
git add app/politica-de-privacidade
git commit -m "feat: add privacy policy page"
```

---

## Task 24: SEO — sitemap, robots e imagem OG

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `app/opengraph-image.tsx`

**Interfaces:**
- Consumes: `CITIES`, `SITE_URL`, `PSYCHOLOGIST` (Task 2).

- [ ] **Step 1: Criar `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { CITIES, SITE_URL } from "@/app/_lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/politica-de-privacidade"];
  const cityRoutes = Object.values(CITIES).map((city) => `/${city.slug}`);

  return [...staticRoutes, ...cityRoutes].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));
}
```

- [ ] **Step 2: Criar `app/robots.ts`**

```ts
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/_lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: Criar `app/opengraph-image.tsx`**

```tsx
import { ImageResponse } from "next/og";
import { PSYCHOLOGIST } from "@/app/_lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          backgroundColor: "#f7f5f0",
          color: "#33403a",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 140,
            height: 140,
            borderRadius: 70,
            backgroundColor: "#7c9473",
            color: "#f7f5f0",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 56,
          }}
        >
          GR
        </div>
        <div style={{ display: "flex", fontSize: 56 }}>{PSYCHOLOGIST.fullTitle}</div>
        <div style={{ display: "flex", fontSize: 28, color: "#6b7a70" }}>
          CRP {PSYCHOLOGIST.crp} · Atendimento online e em Cabo Frio / São Pedro da Aldeia
        </div>
      </div>
    ),
    size
  );
}
```

- [ ] **Step 4: Verificação visual**

Run: `npm run dev`. Acesse `http://localhost:3000/sitemap.xml`, `http://localhost:3000/robots.txt` e `http://localhost:3000/opengraph-image` e confirme que os três respondem corretamente.

- [ ] **Step 5: Commit**

```bash
git add app/sitemap.ts app/robots.ts app/opengraph-image.tsx
git commit -m "feat: add sitemap, robots and og image generation"
```

---

## Task 25: Verificação final

**Files:** nenhum arquivo novo — apenas validação.

- [ ] **Step 1: Rodar a suíte de testes completa**

Run: `npm run test`
Expected: todos os testes (metadata, whatsapp, contact-schema, api/contact) passam.

- [ ] **Step 2: Rodar o lint**

Run: `npm run lint`
Expected: sem erros.

- [ ] **Step 3: Rodar o build de produção**

Run: `npm run build`
Expected: build conclui sem erros.

- [ ] **Step 4: Checklist manual no navegador**

Run: `npm run dev` e percorra manualmente: Home (todas as seções e animações), `/psicologo-cabo-frio`, `/psicologo-sao-pedro-da-aldeia`, `/politica-de-privacidade`, menu mobile (Sheet), envio do formulário de contato (vai falhar de verdade com 502 até as env vars do Resend serem configuradas — confirme que o toast de erro amigável aparece e sugere o WhatsApp), botão flutuante de WhatsApp, links da Navbar.

- [ ] **Step 5: Commit final (se houver ajustes)**

```bash
git add -A
git commit -m "chore: final verification pass"
```

---

## Pendências que exigem informação real do Gabriel

Estes itens ficam com valores de placeholder claramente marcados em `app/_lib/constants.ts` e precisam ser substituídos antes de publicar o site:

1. **Número de WhatsApp** (`PSYCHOLOGIST.whatsappNumber`) — hoje é um placeholder, todos os botões de WhatsApp do site dependem dele.
2. **E-mail de contato** (`PSYCHOLOGIST.email` e a env var `CONTACT_EMAIL`) — destino dos e-mails do formulário.
3. **Domínio do site** (`SITE_URL`) — usado em metadata, sitemap e dados estruturados.
4. **Foto do Gabriel** (`PSYCHOLOGIST.photoUrl`) — hoje mostra um monograma "GR" no lugar da foto real.
5. **Conta no Resend** — `RESEND_API_KEY` e `RESEND_FROM_EMAIL` precisam ser configuradas (`.env.local`) para o formulário de contato funcionar de verdade.
