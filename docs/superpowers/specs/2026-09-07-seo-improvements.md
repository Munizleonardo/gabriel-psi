# Melhoria de SEO — auditoria e spec de execução

Data: 2026-09-07
Estado do código: `main` @ `6b0bd7a` (após PR #8)

## Objetivo

Levar a landing page do Gabriel de "SEO tecnicamente correto" para "SEO
competitivo para busca local + terapia online", e deixar todos os sinais
prontos para o Google indexar e exibir corretamente (título, descrição,
rich results, perfil local).

Palavras-chave núcleo (do design original, ainda válidas):
*psicólogo online*, *terapia online*, *psicólogo em Cabo Frio*, *psicólogo
em São Pedro da Aldeia*, *psicólogo Região dos Lagos*, *psicoterapia
individual*, *psicólogo para adolescentes*, *Abordagem Centrada na Pessoa*,
*Gabriel Ribeiro psicólogo*.

---

## 1. Auditoria — o que já está certo

| Item | Estado |
|---|---|
| Metadata API por rota (`title`, `description`, `canonical`, OG, Twitter) | ✅ `buildMetadata` em `app/_lib/metadata.ts` |
| `metadataBase`, `formatDetection` | ✅ `app/layout.tsx` |
| `lang="pt-BR"` | ✅ |
| 1 `<h1>` por página, seções em `<h2>`, sub-itens em `<h3>` | ✅ (home e páginas de cidade) |
| FAQ em `<h3>` + `FAQPage` JSON-LD | ✅ home + páginas de cidade |
| `Person` JSON-LD | ✅ home (mínimo) |
| `MedicalBusiness` JSON-LD | ✅ páginas de cidade (mínimo) |
| `sitemap.xml`, `robots.txt` | ✅ gerados (`app/sitemap.ts`, `app/robots.ts`) |
| OG image 1200×630 gerada | ✅ `app/opengraph-image.tsx` (genérica) |
| Favicon | ✅ `app/icon.tsx` (Ψ) |
| `next/font` (sem CLS de fonte) | ✅ Fraunces + DM Sans |
| `next/image` com `alt` e `priority` no LCP | ✅ |
| Links internos para as páginas de cidade | ✅ (`presencial-section`) |

## 2. Bloqueadores — dependem de decisão/dado do Gabriel

Respostas do Gabriel (2026-09-07) incorporadas abaixo.

| # | Item | Status | Como fica |
|---|---|---|---|
| B1 | Domínio definitivo | ⏳ **pendente** ("será definido ainda") | Fazer P0.1 (env var) já; o valor real entra na Vercel quando existir. Nada de canonical/OG/sitemap/JSON-LD deve ser dado como final antes disso. |
| B2 | Endereço público | ✅ **não terá** | *Service-area business* confirmado. Schemas **sem** `address` de rua e **sem** `geo`; usar só `areaServed` (Brasil + Cabo Frio + São Pedro + "Região dos Lagos") e `addressRegion: "RJ"`. |
| B3 | Google Business Profile | ⏳ pendente (não-código) | Criar como negócio de área de atendimento (endereço oculto). §4. |
| B4 | Bio + fotos | ⚠️ **sem bio** · ✅ fotos reais já existem (`gab1.png`, `gab2.png`) | "Quem sou eu?" fica curta, sem bio longa. `Person.description` = 1–2 frases derivadas do texto já existente. Trocar as fotos stock das cidades por `gab2.png` / recortes reais (P1.2 / P2.1). |
| B5 | Rodas de conversa | ⏳ pendente | Seção fica com a descrição genérica atual + TODO. |
| B6 | Telefone | ✅ **resolvido** | `+55 22 98111-4695` (mesmo do WhatsApp) → `telephone` nos schemas. |
| B7 | Horário | ✅ **com hora marcada** (agendado) | **Não** usar `openingHoursSpecification` (seria impreciso). Comunicar "atendimento com horário agendado" no texto + 1 item de FAQ. Opcional: `LocalBusiness` sem `openingHours`. |
| B8 | Formação | ⚠️ só "Formado em Psicologia" | `hasCredential` = o CRP (`EducationalOccupationalCredential`). **Sem** `alumniOf` (não há instituição/ano). |

---

## 3. Melhorias no código — priorizadas

Legenda: **P0** = fazer já, alto impacto, sem dependência · **P1** = alto
impacto, alguma dependência · **P2** = incremento.

### P0 — Infra e dados estruturados

#### P0.1 — `SITE_URL` via env var + guardas de canonical

**Arquivos:** `app/_lib/constants.ts`, `.env.example`, `next.config.ts`

- Trocar a constante fixa por
  `export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gabrielribeiropsi.com.br";`
- `.env.example`: adicionar `NEXT_PUBLIC_SITE_URL=`
- Documentar no README que a Vercel precisa da env var em produção.
- **Verificação:** `curl` no HTML de produção → `<link rel="canonical">`,
  `og:url`, `sitemap.xml` e todos os `url` de JSON-LD com o domínio real e
  **sem** `localhost`.

#### P0.2 — Schema do negócio na HOME (`Psychologist` / `MedicalBusiness`)

**Arquivo:** `app/page.tsx` (novo bloco JSON-LD) + helper em
`app/_lib/schema.ts` (novo)

Hoje a home só tem `Person`. Adicionar uma entidade de negócio, que é o que
o Google usa para painel de conhecimento e busca local:

```jsonc
{
  "@context": "https://schema.org",
  "@type": ["Psychologist", "MedicalBusiness"],
  "@id": "https://<dominio>/#business",
  "name": "Gabriel Ribeiro Psicólogo",
  "url": "https://<dominio>",
  "image": "https://<dominio>/gab1.png",
  "logo": "https://<dominio>/icon",
  "description": "<meta description>",
  "telephone": "+55 22 98111-4695",        // B6
  "priceRange": "$$",                        // ou faixa real
  "areaServed": [
    { "@type": "Country", "name": "Brasil" },
    { "@type": "City", "name": "Cabo Frio" },
    { "@type": "City", "name": "São Pedro da Aldeia" }
  ],
  "availableService": [
    { "@type": "MedicalTherapy", "name": "Psicoterapia individual" },
    { "@type": "MedicalTherapy", "name": "Psicoterapia para adolescentes" },
    { "@type": "Service", "name": "Rodas de conversa" }
  ],
  "founder": { "@id": "https://<dominio>/#person" },
  "sameAs": ["https://www.instagram.com/gabrielribeiro_psi/"]
  // B2: sem `address` de rua e sem `geo` (service-area business).
  // B7: sem `openingHoursSpecification` — atendimento com hora marcada.
}
```

- `image` deve ser uma foto real do Gabriel (`gab1.png` ou `gab2.png`), não
  um placeholder.
- Dar `@id` ao `Person` (`#person`) e referenciar cruzado
  (`Person.worksFor` → `#business`, `business.founder` → `#person`).
- **Verificação:** colar a URL no
  [Rich Results Test](https://search.google.com/test/rich-results) e no
  [Schema Markup Validator](https://validator.schema.org/) → 0 erros.

#### P0.3 — Enriquecer o `Person` JSON-LD

**Arquivo:** `app/page.tsx`

Adicionar ao objeto atual: `@id`, `image` (retrato real), `description`
(1–2 frases, B4), `knowsAbout: ["Psicoterapia", "Abordagem Centrada na Pessoa", "Psicologia clínica", "Terapia para adolescentes"]`,
`worksFor: { "@id": "#business" }`, `hasCredential` (o CRP como
`EducationalOccupationalCredential`, `recognizedBy` = Conselho Federal de
Psicologia). **Sem** `alumniOf` (B8: não há instituição/ano).

#### P0.4 — `MedicalBusiness` das páginas de cidade: sair do mínimo

**Arquivo:** `app/psicologo-cabo-frio/page.tsx`,
`app/psicologo-sao-pedro-da-aldeia/page.tsx` (usar o helper de
`app/_lib/schema.ts`)

Acrescentar ao schema de cada cidade: `@id`, `image` (foto real),
`telephone` (B6), `url`, `priceRange`, `areaServed` (a cidade + "Região dos
Lagos"), `provider`/`founder` → `#person`.

B2 (sem endereço) e B7 (hora marcada): **sem** `geo`, **sem**
`openingHoursSpecification`. `address` só com `addressRegion: "RJ"` (sem
`addressLocality` de rua) ou omitir `address` e ficar só com `areaServed` —
o Google aceita service-area business. Não inventar endereço.

#### P0.5 — `BreadcrumbList` nas páginas de cidade

**Arquivo:** helper + as duas `page.tsx` de cidade

`Início › Psicólogo em Cabo Frio`. Habilita breadcrumb no resultado de
busca. Baixo esforço.

#### P0.6 — OG image com o rosto do Gabriel

**Arquivo:** `app/opengraph-image.tsx`

Hoje é "GR" em um círculo. Trocar por: foto do Gabriel (via
`ImageResponse` + `<img>` com `gab1.png` em base64 ou `fetch` do asset) +
nome + "Psicólogo · CRP 05/87661 · Região dos Lagos (RJ)". Social preview
com rosto tem CTR muito maior. Opcional: `app/psicologo-cabo-frio/opengraph-image.tsx`
com a cidade no texto.

#### P0.7 — Sitemap: `lastModified` estável + `changeFrequency`/`priority`

**Arquivo:** `app/sitemap.ts`

`new Date()` a cada build polui o sitemap. Usar uma data fixa por rota
(constante atualizada quando o conteúdo muda) ou `lastModified` derivado do
git. Adicionar `priority` (1.0 home, 0.8 cidades, 0.3 privacidade) e
`changeFrequency: "monthly"`.

#### P0.8 — `robots.ts`: bloquear rotas não-indexáveis

**Arquivo:** `app/robots.ts` + `metadata.robots` nas rotas

- `Disallow: /api/`
- `politica-de-privacidade`: manter indexável, mas garantir que a
  `opengraph-image` e rotas de sistema (`/icon`, `/opengraph-image`) não
  virem páginas no índice (elas não estão no sitemap, ok, mas convém
  `metadata: { robots: { index: false } }` numa eventual página de
  obrigado/erro).

### P1 — Conteúdo on-page

#### P1.1 — `<h1>` da home com palavra-chave

**Arquivo:** `app/_components/sections/hero-section.tsx`

Hoje: `<h1>Gabriel Ribeiro</h1>` (fraco). O Gabriel pediu "nome, profissão
e CRP" — dá pra atender e ainda ter keyword:

```
<h1>Gabriel Ribeiro — Psicólogo</h1>
<p>Atendimento a adolescentes e adultos · online e na Região dos Lagos (RJ) · CRP 05/87661</p>
```

Alternativa mínima: manter `<h1>Gabriel Ribeiro</h1>` mas garantir que a
linha seguinte (`Psicólogo · CRP…`) tenha "Psicólogo clínico" +
"psicoterapia" + "Região dos Lagos".

#### P1.2 — Diferenciar as páginas de cidade (evitar conteúdo duplicado)

**Arquivos:** `app/_lib/constants.ts` (`CITIES`), possivelmente um
`CityContent` novo, `location-hero-section.tsx`

Hoje Cabo Frio e São Pedro compartilham **7 de 8 seções idênticas**
(TherapySection, ApproachSection, HowItWorks, Presencial, FAQ, Cta). Risco
de o Google tratar como *doorway pages* finas.

Como não há endereço público (B2), o diferencial não pode ser "onde fica" —
tem que ser conteúdo editorial único por cidade:
- 1–2 parágrafos únicos por cidade (contexto local: "atendimento presencial
  com hora marcada em Cabo Frio / São Pedro da Aldeia; combinamos o local
  no agendamento"; características do público local; deslocamento).
- 1–2 itens de FAQ específicos ("O atendimento presencial em São Pedro da
  Aldeia é com hora marcada?" etc.).
- Trocar a imagem stock do Unsplash por `gab2.png` ou outro recorte real
  (B4: fotos reais existem).
- Meta description única já existe — só reforçar com termo local.

#### P1.3 — Trabalhar as palavras-chave no corpo

**Arquivos:** textos em `constants.ts` e nas seções

Auditar se aparecem naturalmente: "psicoterapia individual", "psicólogo
para adolescentes", "terapia online", "Região dos Lagos", "Abordagem
Centrada na Pessoa". Hoje "psicoterapia" e "adolescentes" aparecem;
"terapia online" e "Região dos Lagos" aparecem pouco na home (mais nas
cidades). Ajustar 2–3 frases sem forçar.

#### P1.4 — Seção "Quem sou eu?" — conteúdo mínimo (B4: sem bio)

O Gabriel não vai mandar bio. Então: manter a seção **curta e honesta** —
1–2 parágrafos com o que já se sabe (psicólogo, CRP, formado em Psicologia,
atende adolescentes e adultos, ACP, online + Região dos Lagos com hora
marcada) e as **fotos reais** (`gab2.png`) para dar rosto e prova. Sem
"lorem", sem "em breve mais sobre mim". `Person.description` = uma frase
resumo. Se a seção continuar magra demais, avaliar **fundir "Quem sou eu?"
com "Abordagem"** numa seção só ("Quem sou eu e como trabalho").

#### P1.5 — FAQ: cobrir as novas dúvidas

**Arquivo:** `app/_lib/constants.ts` (`FAQ_ITEMS`)

Acrescentar perguntas long-tail alinhadas à nova estrutura:
- "Como é a terapia para adolescentes?"
- "O que é a Abordagem Centrada na Pessoa?"
- "Como funcionam as rodas de conversa?"
- "Qual o valor da sessão?" (se puder divulgar)
- "Você atende presencialmente em qual cidade da Região dos Lagos?"
- "Como funciona o agendamento? / O atendimento é com hora marcada?" (B7)

Cada uma entra no `FAQPage` schema automaticamente.

### P2 — Técnico / performance (Core Web Vitals é fator de ranking)

#### P2.1 — Auto-hospedar as imagens (sair do `images.unsplash.com`)

**Arquivos:** `next.config.ts`, `constants.ts`, `/public`

Baixar as imagens usadas (heros de cidade, `presencial`), otimizar
(WebP/AVIF, ~1600px), colocar em `/public/…`, remover o `remotePatterns`
do Unsplash. Menos DNS/handshake, controle de cache, LCP melhor. Onde fizer
sentido, usar `gab2.png` (foto real, B4) no lugar do stock.

#### P2.2 — Otimizar `gab1.png` (839 KB)

Converter o arquivo-fonte para WebP (~80–120 KB) ou um PNG menor. O
`next/image` já otimiza na entrega, mas o source pesado atrapalha build e
qualquer uso sem `next/image`.

#### P2.3 — `next/font` com `display: "swap"` explícito e menos pesos

**Arquivo:** `app/layout.tsx`

Adicionar `display: "swap"`. Avaliar reduzir Fraunces para 2 pesos
(400/600) e DM Sans para 3 (400/500/700) — hoje são 7 arquivos de fonte.

#### P2.4 — `theme-color` + `manifest`

**Arquivos:** `app/layout.tsx` (`metadata.themeColor` / `viewport`),
`app/manifest.ts` (novo)

`theme-color: "#00291c"`, manifest mínimo (name, short_name, icons,
theme/background color). Ajuda em mobile e é sinal de site cuidado.

#### P2.5 — `apple-touch-icon`

**Arquivo:** `app/apple-icon.tsx` (novo, análogo ao `icon.tsx`)

#### P2.6 — Página 404 própria (`app/not-found.tsx`)

Com link pra home e principais seções — evita que erros virem becos sem
saída para o crawler.

---

## 4. Fora do código — checklist de setup no Google

Sem isso, "implementar completamente as informações no Google" não fecha:

1. **Google Search Console** — verificar a propriedade (via DNS TXT ou meta
   `google-site-verification` em `app/layout.tsx` `metadata.verification`),
   enviar `sitemap.xml`, acompanhar Cobertura/Rich Results.
2. **Google Business Profile** — criar como **negócio de área de
   atendimento** (marcar "atendo clientes no endereço deles" / ocultar
   endereço, já que não há consultório público — B2). Categoria "Psicólogo",
   área = Cabo Frio + São Pedro da Aldeia + Região dos Lagos, telefone
   (= WhatsApp, B6), fotos reais, link do site, "atendimento com hora
   marcada". Pedir avaliações aos pacientes (com consentimento).
3. **Bing Webmaster Tools** — importar do GSC (2 min).
4. **Consistência NAP** (Nome / Endereço / Telefone) idêntica em: site,
   GBP, Instagram, e diretórios.
5. **Diretórios / citações**: Doctoralia, Vittude, Zenklub/BoaConsulta,
   listagem do CRP-05. Cada um é um backlink + citação local.
6. **`google-site-verification`** e, se usar, `facebook-domain-verification`
   → `metadata.verification` no `layout.tsx`.

---

## 5. Ordem de execução sugerida

1. **P0.1** (env var) agora — o valor do domínio entra na Vercel quando B1
   fechar; até lá nada que dependa do domínio final vai pra produção.
2. `app/_lib/schema.ts` + **P0.2 / P0.3 / P0.4 / P0.5** — já dá pra fazer
   completo: telefone (B6) resolvido, service-area (B2) definido, sem
   `openingHours` (B7), `hasCredential` só com CRP (B8).
3. **P0.6 / P0.7 / P0.8** (OG com rosto, sitemap, robots).
4. **P1.1 / P1.2 / P1.3 / P1.4 / P1.5** — nenhum depende mais do Gabriel
   (bio não vem, fotos existem). P1.2/P1.4 com o conteúdo mínimo possível.
5. **P2.1–P2.6** (performance).
6. Só fica pendente de terceiros: B1 (domínio) e a §4 (Search Console +
   Business Profile).
7. Em paralelo (não-código): §4 — Search Console + Business Profile.

## 6. Verificação global (ao final de cada bloco)

- `npm run build` + `tsc` + `vitest` verdes.
- [Rich Results Test] e [Schema Validator] sem erros nas 3 páginas
  principais.
- `curl` do HTML de produção: 1 `<h1>`, `canonical` correto, todos os
  JSON-LD com domínio real.
- Lighthouse (mobile) SEO 100, Performance ≥ 90, sem itens de
  "crawlable/indexable" pendentes.
- `sitemap.xml` e `robots.txt` acessíveis e coerentes.
