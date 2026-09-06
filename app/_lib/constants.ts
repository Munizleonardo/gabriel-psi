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

// Destino inicial dos e-mails do formulário de contato, enquanto a conta
// Resend/e-mail definitivo do Gabriel não é configurado (via env var
// CONTACT_EMAIL em produção). SUBSTITUA quando o Gabriel assumir o projeto.
export const INITIAL_CONTACT_EMAIL = "munizzleonardo@gmail.com";

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
      src: "https://images.unsplash.com/photo-1640890092058-eb23282e0039?w=1600&q=80&auto=format&fit=crop",
      alt: "Barco na areia da Praia das Dunas, em Cabo Frio",
      credit: "Foto: Wesley Caribe / Unsplash",
    },
    intro:
      "Atendimento presencial em Cabo Frio para quem busca um espaço de escuta próximo de casa, com a flexibilidade de também poder continuar as sessões online quando precisar.",
  },
  saoPedroDaAldeia: {
    slug: "psicologo-sao-pedro-da-aldeia",
    name: "São Pedro da Aldeia",
    state: "RJ",
    heroImage: {
      src: "https://images.unsplash.com/photo-1680815996886-531379632265?w=1600&q=80&auto=format&fit=crop",
      alt: "Pôr do sol sobre a água em São Pedro da Aldeia",
      credit: "Foto: João Gabriel / Unsplash",
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
  online: {
    src: "https://images.unsplash.com/photo-1758691462743-f9fc9e430d39?w=1600&q=80&auto=format&fit=crop",
    alt: "Consulta por videochamada em um notebook",
    credit: "Foto: Vitaly Gariev / Unsplash",
  },
} as const;

export const NAV_LINKS = [
  { href: "/#sobre", label: "Sobre" },
  { href: "/#como-funciona", label: "Como funciona" },
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
