# Landing page — Gabriel Ribeiro (Psicólogo) — Design

Data: 2026-09-06

> **Atualização (2026-09-07):** a estrutura e o ritmo visual da home foram
> revistos em `2026-09-07-page-restructure-design.md` (novo layout baseado
> numa referência, seções Benefits/Instagram/formulário removidas, seção
> "Abordagens" adicionada, CTA de WhatsApp no lugar do formulário). A paleta
> e a tipografia da §8 são as do PR #3. As seções da §5 abaixo descrevem a
> versão original.

## 1. Objetivo

Landing page de conversão para o psicólogo Gabriel Ribeiro (CRP 05/87661), que
atende online em todo o Brasil e presencialmente em Cabo Frio e São Pedro da
Aldeia (Região dos Lagos, RJ). A página deve apresentá-lo como pessoa e
profissional, gerar contatos de pacientes em potencial e ranquear bem no
Google para buscas relacionadas a psicologia/terapia online e local.

Instagram: https://www.instagram.com/gabrielribeiro_psi/

Público-alvo do conteúdo: adultos em geral, sem nicho clínico específico.

## 2. Stack

- Next.js 16 (App Router), React 19, TypeScript — já escafoldado via
  `create-next-app`.
- Tailwind CSS v4, utility classes inline no JSX. Sem CSS Modules /
  arquivos de estilo separados além de `app/globals.css` (import base do
  Tailwind + CSS variables de tema usadas pelo shadcn).
- Gap e flexbox como estratégia primária de espaçamento/layout.
- shadcn/ui para os componentes de interface (button, card, accordion, form,
  input, textarea, label, separator, sonner, sheet/navigation-menu para o
  menu mobile). Traz Radix UI + `tailwindcss-animate` + `lucide-react`.
- `zod` + `react-hook-form` + `@hookform/resolvers` para o formulário de
  contato.
- `resend` para envio de e-mail transacional a partir da API route.
- `motion` (ex-`framer-motion`) para animações de entrada em viewport
  (scroll reveal) — o `tailwindcss-animate` do shadcn cobre só
  micro-interações de componentes (accordion, etc.), não esse efeito.

Sem banco de dados nesta fase. O único "backend" é a rota
`app/api/contact/route.ts`.

## 3. Rotas

| Rota | Conteúdo |
|---|---|
| `/` | Home — landing completa, todas as seções |
| `/psicologo-cabo-frio` | Variante localizada, copy própria focada em Cabo Frio |
| `/psicologo-sao-pedro-da-aldeia` | Variante localizada, copy própria focada em São Pedro da Aldeia |
| `/politica-de-privacidade` | Página estática (LGPD, por causa do formulário) |
| `/api/contact` | Route Handler POST — valida com Zod e envia e-mail via Resend |

As páginas de localização reaproveitam os mesmos componentes de
`_components/sections/`, recebendo props (ex.: `city`) para customizar o
texto — sem duplicar JSX. Cada uma precisa de texto de introdução e de
serviços genuinamente próprio (não apenas o nome da cidade trocado), para
evitar conteúdo duplicado do ponto de vista de SEO.

Diferente da Home, as páginas de localização **não repetem** as seções
"Sobre o Gabriel" e "Instagram" (conteúdo pessoal/genérico que já está na
Home) — usam navbar, hero (adaptado à cidade), serviços, diferenciais, área
de atendimento, FAQ, contato final, footer e botão flutuante.

## 4. Estrutura de pastas (dentro de `app/`)

```
app/
  layout.tsx, page.tsx, globals.css
  sitemap.ts, robots.ts            (SEO gerado)
  opengraph-image.tsx              (imagem OG padrão)
  psicologo-cabo-frio/page.tsx
  psicologo-sao-pedro-da-aldeia/page.tsx
  politica-de-privacidade/page.tsx
  api/contact/route.ts
  _components/
    ui/            → primitivos do shadcn
    layout/         → navbar, footer, whatsapp-float-button
    sections/       → hero, about, services, how-it-works, benefits,
                       service-area, faq, instagram, contact
    shared/         → section-heading, animated-reveal, whatsapp-button
  _lib/
    constants.ts      → dados do Gabriel (nome, CRP, telefone, cidades, IG)
    contact-schema.ts → schema Zod compartilhado (form + API route)
    resend.ts, metadata.ts
```

`_components` e `_lib` são pastas privadas (prefixo `_`), não roteáveis.

## 5. Seções da Home

1. **Navbar** (sticky) — nome, links âncora (Sobre, Como funciona, Serviços,
   FAQ, Contato), CTA "Agende pelo WhatsApp", menu mobile via `Sheet`.
2. **Hero** — headline de proposta de valor, foto do Gabriel (placeholder até
   ele enviar a real), dois CTAs (WhatsApp primário + scroll até o
   formulário), selos de confiança (CRP, "online em todo o Brasil" +
   "presencial em Cabo Frio e São Pedro da Aldeia").
3. **Sobre o Gabriel** — bio humanizada, foto, formação, forma de conduzir a
   terapia.
4. **Como funciona** — passo a passo: Contato → Agendamento → Primeira
   sessão → Acompanhamento contínuo.
5. **Serviços/Modalidades** — cards: Terapia Online (todo o Brasil), Terapia
   Presencial (Cabo Frio / São Pedro da Aldeia), atendimento generalista
   (ansiedade, autoestima, relacionamentos, estresse, autoconhecimento) sem
   prometer nicho clínico.
6. **Diferenciais** — sigilo ético (CRP), escuta acolhedora, flexibilidade de
   horário online, acompanhamento contínuo.
7. **Área de atendimento** — bloco com as duas cidades presenciais + "online
   em todo o Brasil", com links internos para `/psicologo-cabo-frio` e
   `/psicologo-sao-pedro-da-aldeia`.
8. **FAQ** (Accordion) — objeções comuns: sessão online, sigilo, convênio,
   quantidade de sessões. Também vira dado estruturado `FAQPage`.
9. **Instagram** — bloco estático de prova social linkando para o perfil
   (sem embed ao vivo do feed — exigiria app registrado na Meta; fica como
   evolução futura).
10. **Contato final** — formulário + botão de WhatsApp lado a lado, horários
    e cidades.
11. **Footer** — nome, CRP, cidades, Instagram, link da política de
    privacidade, ano corrente.
12. **Botão flutuante de WhatsApp** — fixo, visível durante toda a
    navegação, com pulse discreto.

## 6. Formulário de contato — fluxo de dados e erro

- Campos: nome, e-mail, telefone (opcional), mensagem. Validados por um
  único schema Zod (`_lib/contact-schema.ts`) usado tanto no client
  (`react-hook-form` + shadcn `Form`) quanto na API route (a validação do
  client nunca é considerada suficiente sozinha).
- Honeypot escondido como anti-spam simples (sem captcha/serviço externo).
- Submit → `POST /api/contact` com JSON. A rota revalida com o mesmo schema,
  e em caso de sucesso chama `resend.emails.send(...)` enviando para
  `CONTACT_EMAIL`.
- Sucesso (`200`) → client limpa o formulário e mostra toast de confirmação
  (shadcn `sonner`).
- Erro de validação (`400`) → mensagens inline nos campos do formulário.
- Erro do Resend/rede (`502`) → toast de erro amigável sugerindo o WhatsApp
  como alternativa (o WhatsApp é a rede de segurança do formulário).
- Env vars: `RESEND_API_KEY`, `CONTACT_EMAIL`, `RESEND_FROM_EMAIL`.
  `.env.example` versionado no git; `.env.local` fora do controle de
  versão.

## 7. SEO

- Metadata única por rota via Metadata API do Next (`title`, `description`,
  `openGraph`, `alternates.canonical`, `robots`) — inclusive nas páginas de
  localização.
- Dados estruturados (JSON-LD):
  - `Person` para o Gabriel (CRP, `sameAs` apontando pro Instagram).
  - `LocalBusiness`/`MedicalBusiness` em cada página de localização
    (cidade/UF apenas — sem endereço de rua).
  - `FAQPage` na seção de FAQ da Home.
- `app/sitemap.ts` e `app/robots.ts` gerados automaticamente.
- Palavras-chave núcleo: *psicólogo online*, *terapia online*, *psicólogo em
  Cabo Frio*, *psicólogo em São Pedro da Aldeia*, *psicólogo Região dos
  Lagos*, *atendimento psicológico online*, *terapia online para todo o
  Brasil*, *psicoterapia individual*, *Gabriel Ribeiro psicólogo*.

## 8. Design visual

- Paleta (light mode apenas), mapeada nas CSS variables que o shadcn usa em
  `app/globals.css`. Princípio: **Bordô = ações** (botões, links, foco) ·
  **Terra = destaque/hover** · **Verde = superfícies escuras** ·
  **Café = texto** · **Musgo = texto secundário** · **Creme = fundo**.

  | Token shadcn | Uso | Cor |
  |---|---|---|
  | `--background` | Fundo padrão | Creme Fundo `#F0E7C2` |
  | `--foreground` | Texto | Café Primário `#2D120D` |
  | `--card` / `--popover` | Cards, popovers | Off-white quente `#FBF8EE` (derivado) |
  | `--primary` | Botões/CTA, links, foco | Bordó Primário `#3B0014` |
  | `--secondary` / `--muted` | Fundo de seções alternadas | Areia `#E7DBB4` (derivado do Creme) |
  | `--accent` | Destaque, hover de botões outline/ghost | Terra Destaque `#954130` |
  | `--muted-foreground` | Texto secundário | Musgo `#586448` (Musgo `#687451` aprofundado p/ contraste AA) |
  | `--border` / `--input` | Bordas/divisores | Areia fechada `#D8CB9E` |
  | `--ring` | Anel de foco | Bordó `#3B0014` |
  | `--dark` / `--dark-foreground` | Seções de contraste (footer, faixa do Instagram, botão flutuante de WhatsApp) | Verde Secundário `#00291C` / Creme `#F0E7C2` |

  Valores derivados (`--card`, `--secondary`, `--border`) e o `--muted-foreground`
  foram calibrados para contraste AA sobre o Creme.
- Tipografia via `next/font`: **Fraunces** (serif humanista) para títulos
  (acolhimento) + **DM Sans** para o corpo (legibilidade/profissionalismo).
- Animações via `motion`: fade-in + slide-up ao entrar no viewport em cada
  seção (wrapper reutilizável `AnimatedReveal`), hover sutil em cards/botões
  via utilities do Tailwind, pulse discreto no botão flutuante de WhatsApp.
  Respeitar `prefers-reduced-motion`.

## 9. Imagens

- Foto do Gabriel: placeholder até ele enviar a foto real (marcada
  claramente no código para troca fácil), usada na Hero e em Sobre.
- Demais imagens: banco gratuito (Unsplash/Pexels, licença livre para uso
  comercial, sem exigência de atribuição), com temas coerentes — ambiente
  acolhedor, natureza calma remetendo à Região dos Lagos, conversa/terapia.
- `next/image` com `remotePatterns` configurado em `next.config.ts` para os
  hosts escolhidos (ex.: `images.unsplash.com`).

## 10. Fora de escopo (evolução futura)

- Blog de artigos (reforço de SEO orgânico a longo prazo).
- Embed ao vivo do feed do Instagram (exige app Meta).
- Banco de dados para armazenar leads do formulário.
- Dark mode.
