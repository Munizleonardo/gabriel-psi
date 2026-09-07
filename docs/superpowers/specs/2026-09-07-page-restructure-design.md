# Reestruturação da landing page — design

Data: 2026-09-07
Branch: `feat/page-restructure`

## Objetivo

Reorganizar a home do Gabriel Ribeiro para seguir a **estrutura e o
ritmo visual** da referência (site do Matheus Mello — PDF em
`screencapture-matheusmellopsi-*.pdf`), mantendo:

- O conteúdo e as informações do Gabriel (nome, CRP 05/87661, atendimento
  online Brasil + presencial em Cabo Frio e São Pedro da Aldeia,
  `@gabrielribeiro_psi`).
- A paleta e a tipografia definidas no PR #3 (Bordô / Café / Verde /
  Musgo / Creme / Terra; Fraunces nos títulos, DM Sans no corpo).
- O SEO que motivou o projeto original: `Person` + `FAQPage` JSON-LD,
  páginas de cidade (`/psicologo-cabo-frio`, `/psicologo-sao-pedro-da-aldeia`),
  sitemap, metadata por rota, headings semânticos.

Acréscimo pedido: **animações de entrada ao scroll** para deixar a
navegação mais dinâmica.

## Não-objetivos

- Redesenhar as páginas de cidade (só herdam tokens/nav/footer novos).
- Mexer no `/api/contact` além de parar de renderizar o formulário.
- Dark mode.

## Ritmo de seções (nova ordem em `app/page.tsx`)

Alternância clara claro/escuro, dois "darks" (verde e marrom):

| # | Seção | Fundo | Origem |
|---|---|---|---|
| — | Navbar | `dark-green` | atual — recolorida, mantém `Sheet` mobile |
| 1 | Hero | `dark-brown` texturizado | **reescrita** |
| 2 | Sobre Mim | `background` (creme) | `about-section` restilizado |
| 3 | Serviços | `dark-green` | `services-section` restilizado |
| 4 | Abordagens (Princípios da clínica) | `dark-brown` | **nova** (`approach-section`) |
| 5 | Como Funciona | `background` | `how-it-works-section` restilizado |
| 6 | Atendimento presencial | `background` (bloco inset) | `service-area-section` enxuto → `presencial-section` |
| 7 | Perguntas frequentes | `dark-brown` | `faq-section` restilizado |
| 8 | Vamos conversar? | `dark-green` texturizado | **substitui** `contact-section` → `cta-section` |
| 9 | Footer | `dark-brown` | `footer` expandido (3 colunas) |
| — | Botão flutuante WhatsApp | — | mantém |

**Removidos:** `benefits-section`, `instagram-section`, `contact-section`
(formulário). Removidos de `page.tsx` e os arquivos deletados.

**`/api/contact`, `contact-schema`, testes:** ficam no repo, dormentes.
Sem referência na UI. (Decisão registrada; remover de vez é um cleanup
separado se o Gabriel confirmar que não quer formulário nunca.)

## Tokens (em `app/globals.css`)

Renomear o par atual `--dark` / `--dark-foreground` para
`--dark-green` / `--dark-green-foreground` e adicionar o par marrom:

```css
--dark-green: #00291c;            /* Verde Secundário  */
--dark-green-foreground: #f0e7c2; /* Creme             */
--dark-brown: #2d120d;            /* Café Primário     */
--dark-brown-foreground: #f0e7c2; /* Creme             */
```

Registrar os 4 em `@theme inline` como `--color-dark-green*` /
`--color-dark-brown*`. Atualizar os 3 consumidores do `--dark` antigo
(`footer`, `whatsapp-float-button`, `instagram-section` → este último é
removido, então só 2 sobram) para `dark-green`.

Regra de uso:

- **Seções escuras verdes** (`bg-dark-green text-dark-green-foreground`):
  navbar, Serviços, faixa "Vamos conversar?".
- **Seções escuras marrons** (`bg-dark-brown text-dark-brown-foreground`):
  Hero, Abordagens, FAQ, Footer.
- **Botão de WhatsApp:** Bordô (`variant="default"`) nas seções claras;
  nas seções escuras, um `WhatsappButton tone="onDark"` que aplica
  `bg-background text-foreground hover:bg-background/90` via `className`
  (sem nova `variant` no `button.tsx` — o override fica no
  `WhatsappButton`).
- **Eyebrow / barra vertical de título / links:** Bordô (`text-primary`,
  `bg-primary`).
- **Textura** das seções Hero e CTA: sobreposição sutil — gradiente
  radial + grão SVG inline em `opacity` baixa sobre a cor sólida. Sem
  imagem externa (CSP/perf). Um utilitário `.surface-texture` no
  `globals.css`.

## Seção a seção

### Navbar (`app/_components/layout/navbar.tsx`)

- `bg-dark-green text-dark-green-foreground`, sem `border-b`
  (a transição pro Hero marrom já marca).
- Esquerda: marca (Ψ pequeno + `PSYCHOLOGIST.fullTitle` + `CRP ...` em
  linha secundária pequena) — igual à referência.
- Centro (desktop): `NAV_LINKS` reduzido a 5 âncoras — Início, Sobre,
  Serviços, Como funciona, Contato. (Abordagens e FAQ acessíveis por
  scroll; manter a nav curta como na referência.)
- Direita: dois ícones circulares — Instagram (`AtSign`) e WhatsApp
  (`WhatsappIcon`), ambos linkando.
- Mobile: mantém o `Sheet` do PR #2; recolorir o gatilho e o conteúdo
  para funcionar sobre verde / dentro do painel creme (o painel segue
  `bg-background`). Ajustar `text-primary`/`hover` que dependia de fundo
  claro.
- `NAV_LINKS` em `constants.ts` passa a ter `Início` (`/#inicio` ou
  `/`), e o Hero ganha `id="inicio"`.

### 1. Hero (`hero-section.tsx` — reescrever)

- `<section>` full-bleed `bg-dark-brown text-dark-brown-foreground
  surface-texture`, `min-h` ~`85vh`, `isolate overflow-hidden`.
- Grid 2 colunas em `md` (texto / retrato), 1 coluna empilhada no mobile
  (texto primeiro).
- Texto:
  - `h1` Fraunces, `text-4xl sm:text-5xl lg:text-6xl`, cor creme:
    "Olá! Sou Gabriel Ribeiro, psicólogo clínico."
  - Linha de especialidades (`text-dark-brown-foreground/80`):
    "Psicologia clínica · Atendimento online e presencial · Adultos ·
    Cabo Frio e São Pedro da Aldeia — Região dos Lagos (RJ)".
  - 1 CTA: `WhatsappButton` variante creme, `size="lg"`, mensagem
    padrão.
- Retrato:
  - `gab1.png` em máscara circular (`rounded-full`, `aspect-square`,
    `object-cover`), `max-w-sm`.
  - 2–3 formas decorativas atrás/à frente: blocos `rounded-[40%_60%…]`
    (blob) em `bg-accent` (Terra) e `bg-[--dark-green]`/Musgo, posicionadas
    `absolute`, `-z-10`/`z-10`, tamanhos diferentes. Reaproveitar os
    keyframes `hero-blob-*` do `globals.css` para flutuação lenta.
- `HeroBackground` (blobs blur atuais) é substituído pela textura +
  formas; o arquivo `hero-background.tsx` pode ser removido ou
  repurposed. Decisão: remover, a textura vive no CSS.

### 2. Sobre Mim (`about-section.tsx` — restilizar)

- `bg-background`, `max-w-6xl`, `py-20 sm:py-28`.
- Eyebrow "— CONHEÇA" + `h2` "Sobre Mim" com **barra vertical Bordô** à
  esquerda (um `<span>` `w-1 bg-primary` ou `border-l-4`).
- Grid `md:grid-cols-[1.4fr_1fr]`:
  - Esquerda: 3–4 parágrafos de bio (reaproveitar texto atual, ampliar
    um pouco no tom da referência — trajetória, como conduz a clínica,
    para quem atende).
  - Direita: card `border border-border rounded-2xl p-6 bg-card` —
    "Formação e atuação":
    - `CRP {crp}` — Conselho Regional de Psicologia
    - Atendimento a adultos
    - Modalidades: Online (Brasil) · Presencial (Cabo Frio, São Pedro
      da Aldeia)
    - Linha `{/* TODO: formação acadêmica do Gabriel quando ele enviar */}`
- Sem a foto secundária `IMAGES.about` (o retrato agora vive no Hero) —
  ou manter uma imagem só; decisão: manter **uma** imagem ambiente
  pequena no rodapé do card, opcional. Simplificar: sem imagem aqui.

### 3. Serviços (`services-section.tsx` — restilizar)

- `bg-dark-green text-dark-green-foreground`, `py-20 sm:py-28`.
- Eyebrow "— O QUE OFEREÇO" + `h2` "Serviços" (barra vertical).
- Grid `sm:grid-cols-2 lg:grid-cols-3` — 3 cards do conteúdo atual
  (Terapia online, Terapia presencial, Atendimento individual para
  adultos), estilo referência:
  - `bg-dark-brown/40` ou `bg-black/15`, `rounded-xl p-6 sm:p-8`,
    borda `border-white/10`.
  - Número grande "01." Fraunces em `text-dark-green-foreground/50`.
  - `h3` título + `p` descrição `/80`.
  - Sem ícone (a referência não usa) — ou ícone discreto no topo.
    Decisão: manter o `lucide` atual pequeno, `/60`.
- Prop `city` do componente é preservada (as páginas de cidade usam).

### 4. Abordagens — Princípios da clínica (`approach-section.tsx` — nova)

- `bg-dark-brown text-dark-brown-foreground`, `py-20 sm:py-28`.
- Eyebrow "— COMO EU TRABALHO" + `h2` "Princípios da clínica".
- Lista de 4 itens em **layout editorial alternado** (como
  Psicanálise/Lacan/Freud/Dejours na referência): cada item é uma linha
  com o termo grande (Fraunces, `text-2xl`) de um lado e o parágrafo do
  outro, alternando lado a cada item; no mobile empilha (termo em cima).
  - **Escuta ativa** — "Te escuto sem pressa e sem julgamento, no
    detalhe do que você traz."
  - **Acolhimento** — "Um espaço seguro pra falar do que pesa, sem medo
    de ser avaliado."
  - **Vínculo e confiança** — "A terapia acontece na relação; construímos
    isso com cuidado, sessão após sessão."
  - **No seu ritmo** — "Cada processo tem seu tempo. Revemos junto para
    onde caminhar."
  - (textos finais podem ser ajustados na implementação; tom = o do
    `about` atual.)
- Dados em `constants.ts` → `CLINIC_PRINCIPLES`.

### 5. Como Funciona (`how-it-works-section.tsx` — restilizar)

- `bg-background`, `py-20 sm:py-28`.
- Eyebrow "— PASSO A PASSO" + `h2` "Como Funciona" (barra vertical).
- 4 passos (conteúdo atual) numerados "01."–"04." em linha
  (`sm:grid-cols-2 lg:grid-cols-4`), número Fraunces grande em
  `text-primary/40`.
- Abaixo, caixa de destaque (como na referência):
  `border border-border rounded-2xl bg-card p-8 text-center` com
  "Sessões de ~50 minutos · online ou presencial na Região dos Lagos" +
  `WhatsappButton` Bordô "Agendar primeira conversa".

### 6. Atendimento presencial (`presencial-section.tsx` — de `service-area-section`)

- `bg-background`, bloco `max-w-5xl` `rounded-3xl` inset com leve
  destaque (`bg-secondary` ou `border`).
- Eyebrow "— ONDE EU ATENDO" + `h2` curto.
- 3 itens compactos: **Cabo Frio** e **São Pedro da Aldeia** (cada um
  linka para `/{slug}` — preserva os links internos de SEO) + **Online**
  (todo o Brasil). Cards menores com imagem `CITIES[*].heroImage` ou só
  texto + ícone `MapPin`/`Globe`. Decisão: cards com imagem, menores que
  hoje (`aspect-video`), `sm:grid-cols-3`.

### 7. Perguntas frequentes (`faq-section.tsx` — restilizar)

- `bg-dark-brown text-dark-brown-foreground`, `py-20 sm:py-28`,
  `max-w-3xl`.
- Eyebrow "— DÚVIDAS" + `h2` "Perguntas frequentes" (barra vertical).
- `Accordion` shadcn com cores ajustadas p/ fundo escuro:
  `border-white/10`, trigger creme, conteúdo `/80`.
- **Mantém o `FAQPage` JSON-LD** intacto.

### 8. Vamos conversar? (`cta-section.tsx` — substitui `contact-section`)

- `bg-dark-green text-dark-green-foreground surface-texture`,
  `py-24 sm:py-32`, conteúdo centralizado `max-w-2xl`.
- Eyebrow "— PRONTO PARA COMEÇAR?" + `h2` "Vamos conversar?" +
  parágrafo curto ("Cada história é única e merece ser ouvida com
  atenção. Estou aqui pra te acompanhar nesse processo.") +
  `WhatsappButton` variante creme `size="lg"` "Falar no WhatsApp".
- Remove `Form`, `react-hook-form`, `zodResolver`, `Input`, `Textarea`,
  `sonner` toast do fluxo da home. (`Toaster` no layout pode ficar; sem
  custo.)

### 9. Footer (`footer.tsx` — expandir)

- `bg-dark-brown text-dark-brown-foreground/70`.
- Linha superior `md:grid-cols-[1.5fr_1fr_1fr_1fr]`:
  - Marca (Ψ + nome) + `CRP {crp}` + tagline "Psicólogo. Atendimento
    online e presencial."
  - **Navegação:** Início, Sobre, Serviços, Como funciona, Perguntas
    frequentes, Contato, Política de Privacidade.
  - **Atendimento:** "Segunda a sexta", "Sessões de ~50 min", "Online e
    presencial". (placeholders realistas; ajustáveis)
  - **Contato:** WhatsApp (link), e-mail (`PSYCHOLOGIST.email`),
    Instagram (`@gabrielribeiro_psi`), com ícones `lucide`.
- Barra inferior `border-t border-white/10`: "© {ano}
  {fullTitle}. Todos os direitos reservados." + (direita) nome completo
  legal `{/* TODO: nome civil completo do Gabriel */}` + `CRP {crp}`.

## Animações (`app/_components/shared/animated-reveal.tsx` + uso)

- Manter `motion/react`. `AnimatedReveal` ganha props:
  - `as` (tag), `y` (deslocamento, default 24), `blur` opcional.
- Novo `AnimatedGroup` (ou `staggerChildren` via `variants` no
  container) para grids: cada filho entra com atraso incremental
  (`delayChildren`, `staggerChildren: 0.08`).
- Hero: formas decorativas com `motion` + `whileInView` leve +
  animação de float contínua (keyframes CSS já existentes; ou
  `animate` do motion com `repeat: Infinity`).
- `SectionHeading`: a barra vertical "cresce" (`scaleY 0→1`) e o
  texto sobe, ao entrar.
- `viewport={{ once: true, amount: 0.2 }}`.
- `@media (prefers-reduced-motion: reduce)`: `AnimatedReveal` detecta
  via `useReducedMotion()` e renderiza estático (hoje só o CSS dos
  blobs respeita; passar a respeitar no JS também).

## `SectionHeading` (`shared/section-heading.tsx` — ajustar)

- Adicionar variante com **barra vertical** (prop `bar?: boolean`,
  default `true` no novo layout).
- Suporte a fundo escuro: prop `tone?: "light" | "dark"` que troca
  `text-foreground`↔`text-dark-*-foreground` e mantém o eyebrow Bordô
  (Bordô tem contraste suficiente sobre os dois darks — validar; se não,
  eyebrow vira Terra `text-accent` no escuro).
- Eyebrow com traço "— " antes do texto (como na referência).

## SEO — o que não pode quebrar

- `app/page.tsx`: mantém `<JsonLd data={personSchema} />`.
- `faq-section.tsx`: mantém `<JsonLd data={faqSchema} />`.
- Um único `<h1>` na página (Hero). Todas as seções usam `<h2>`.
- `service-area`/`presencial`: mantém `<Link href="/{slug}">` para as
  duas cidades (links internos).
- `app/_lib/metadata.ts`, `sitemap.ts`, `robots.ts`, `opengraph-image`,
  `icon`: sem mudança.
- Páginas de cidade (`psicologo-cabo-frio`, `psicologo-sao-pedro-da-aldeia`):
  usam `HeroSection`? Não — usam `LocationHeroSection` + `ServicesSection`
  + `HowItWorksSection` + `FaqSection` + `ContactSection`. **Atenção:**
  ao mexer nesses componentes compartilhados e remover `ContactSection`,
  as páginas de cidade precisam ser atualizadas para usar `CtaSection` no
  lugar e herdar o novo estilo. Incluído no plano.

## Arquivos

**Novos:**
- `app/_components/sections/approach-section.tsx`
- `app/_components/sections/cta-section.tsx`
- `app/_components/sections/presencial-section.tsx` (rename de service-area)
- `app/_components/shared/animated-group.tsx` (stagger)

**Modificados:**
- `app/globals.css` (tokens + `.surface-texture` + keyframe da barra)
- `app/page.tsx` (nova composição)
- `app/_lib/constants.ts` (`NAV_LINKS`, `CLINIC_PRINCIPLES`, textos)
- `app/_components/layout/navbar.tsx`, `footer.tsx`,
  `whatsapp-float-button.tsx`
- `app/_components/sections/hero-section.tsx` (reescrita),
  `about-section.tsx`, `services-section.tsx`,
  `how-it-works-section.tsx`, `faq-section.tsx`
- `app/_components/shared/section-heading.tsx`, `animated-reveal.tsx`
- `app/_components/shared/whatsapp-button.tsx` (prop `tone="onDark"`)
- `app/psicologo-cabo-frio/page.tsx`,
  `app/psicologo-sao-pedro-da-aldeia/page.tsx` (trocar `ContactSection`
  → `CtaSection`)
- `docs/superpowers/specs/2026-09-06-…-design.md` (nota de que a
  estrutura foi revista por este spec)

**Removidos:**
- `app/_components/sections/benefits-section.tsx`
- `app/_components/sections/instagram-section.tsx`
- `app/_components/sections/contact-section.tsx`
- `app/_components/sections/service-area-section.tsx` (vira presencial)
- `app/_components/shared/hero-background.tsx`

**Intocados (dormentes):** `app/api/contact/route.ts`,
`app/_lib/contact-schema.ts` + os 2 testes.

## Testes / verificação

- `contact-schema.test.ts`, `route.test.ts`, `whatsapp.test.ts`,
  `metadata.test.ts` seguem passando (não são tocados).
- `npx tsc --noEmit`, `npm run build`, `npm test` verdes.
- Verificação visual (Playwright) em desktop + mobile:
  home completa, `/psicologo-cabo-frio`, menu mobile, `prefers-reduced-motion`.
- Sem erros novos no console (o aviso de `sizes` do `gab1.png` some se o
  Hero passar a usar `<Image>` com `sizes`).
- Lighthouse/estrutura: 1 `<h1>`, JSON-LD presente, links internos ok.

## Riscos

- **Componentes compartilhados com as páginas de cidade** — mudar
  `ServicesSection`/`HowItWorksSection`/`FaqSection` afeta 3 páginas.
  Mitigar: verificar as 3 rotas a cada mudança de componente
  compartilhado.
- **Contraste em fundo escuro** — Bordô sobre Café é escuro-sobre-escuro.
  Validar eyebrow/detalhes; cair para Terra/Creme onde falhar AA.
- **Textura** — precisa ser sutil e barata (SVG inline, sem imagem). Se
  ficar ruim, cai para gradiente sólido.
