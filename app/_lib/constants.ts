export const SITE_URL = "https://gabrielribeiropsi.com.br"; // SUBSTITUA pelo domínio real depois da compra/configuração

export const PSYCHOLOGIST = {
  name: "Gabriel Ribeiro",
  fullTitle: "Gabriel Ribeiro Psicólogo",
  crp: "05/87661",
  instagramUrl: "https://www.instagram.com/gabrielribeiro_psi/",
  instagramHandle: "@gabrielribeiro_psi",
  // Formato internacional sem espaços/símbolos. (22) 98111-4695
  whatsappNumber: "5522981114695",
  // SUBSTITUA pelo e-mail real que vai receber os contatos do formulário
  email: "contato@gabrielribeiropsi.com.br",
  photoUrl: "/gab1.png" as string | null,
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
  { href: "/#inicio", label: "Início" },
  { href: "/#terapia", label: "Terapia" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#contato", label: "Contato" },
] as const;

// Seção "Como é a terapia comigo?" — dois textos, alternados por um botão.
// Parágrafos curtos (≤ ~60 caracteres) são renderizados em destaque.
export const THERAPY_COPY = {
  adults: {
    heading: "Se você é adulto…",
    paragraphs: [
      "Primeiro, é bom a gente ajustar as expectativas. Não estou aqui para te mudar, nem para te dar conselho, nem para dizer o que fazer, porque esse trabalho é para os seus amigos. O meu trabalho é entender como você funciona nos seus pensamentos e emoções, ou pelo menos tentar entender.",
      "Meu trabalho é tentar me colocar no seu lugar, tentar ver o mundo com os seus olhos e, da perspectiva de uma pessoa que está fora da situação, tentar te ajudar a enxergar outros pontos de vista além daquele que você já está apresentando.",
      "Se você me conta que é ansioso, beleza, vamos trabalhar com isso.",
      "Vamos tentar descobrir o que é que tá causando essa ansiedade, como é que ela funciona, como isso se reflete emocionalmente em você e como interfere na sua tomada de decisão. E aí você decide o que a gente vai fazer com isso.",
      "Você é o piloto, e eu tô aqui servindo de navegador.",
      "Se você me disser que os efeitos dela estão te atrapalhando, ou que você quer mudar a forma de reagir ou de enxergar a ansiedade, a gente consegue trabalhar nisso. Se você me disser que está de boa com isso e que a sua questão é outra, a gente também consegue trabalhar com essa ideia.",
      "Você está no controle da sua terapia.",
      "E o principal é que eu tô aqui pra ver o cenário inteiro. Não vou te tratar pelo nome de um diagnóstico e nem vou ficar agindo como se você fosse um coitado por ter um laudo. Meu trabalho é te entender como indivíduo e ver o mundo junto contigo.",
      "Não te vejo como “o paciente ansioso”, “o paciente autista”, “o paciente depressivo”.",
      "Eu vejo você.",
      "E todos esses diagnósticos vão ser levados em consideração, mas de um jeito que permita à gente entender se, e como, eles fazem parte da pessoa que você é.",
    ],
  },
  teens: {
    heading: "E para adolescentes?",
    paragraphs: [
      "Às vezes, os pais de adolescentes vêm procurar terapia pros filhos e o tipo de coisa que eu costumo ouvir é:",
      "“Ele não obedece ninguém.”\n“Ela tá muito fechada, se isolou.”\n“Ela mudou completamente com a gente.”",
      "E a primeira advertência que eu dou é a seguinte: isso não é hipnose nem magia. Antes de considerar qualquer intervenção, eu preciso entender o que tá acontecendo aí dentro.",
      "É muito necessário entender quem é esse adolescente que está se tornando uma pessoa cada vez mais própria e, principalmente, o que esses comportamentos significam pra ele. Porque nem toda mudança é sinal de que alguma coisa deu errado.",
      "Eu preciso permitir que esse adolescente seja lido como uma pessoa. Uma pessoa única, não como uma extensão da família. Ele precisa ter espaço pra desenvolver a própria autenticidade e, aí sim, a gente entende se tem alguma coisa que precisa ser trabalhada.",
      "Pode ser que o que os pais enxerguem como “rebeldia” seja um adolescente começando a perceber que pensa diferente. O isolamento pode ser sofrimento. Às vezes, é só uma necessidade maior de privacidade ou pode ser que exista um conflito importante acontecendo.",
      "Meu trabalho não é fazer seu filho voltar pra casa “obedecendo melhor”. Também não é ensinar ele a concordar com vocês.",
      "O que eu faço é dar pra ele um espaço em que consiga falar com liberdade, entender melhor o que sente, perceber o que quer e desenvolver formas mais conscientes de lidar com a própria vida e com as relações ao redor.",
      "E isso inclui a família, claro. Adolescente não vive sozinho. Existem pais, regras, responsabilidades, escola, limites e convivência. Tudo isso importa.",
      "Mas a terapia não pode virar um lugar em que o adolescente entra pra ser “consertado” e devolvido do jeito que os adultos esperavam.",
    ],
  },
} as const;

// Seção "Quem sou eu?" — duas abas: vida fora do consultório e jeito de
// trabalhar como psicólogo. Cada aba é exibida como um par de "bolas",
// no mesmo padrão da seção "A proposta".
export const ABOUT_TABS = {
  outside: {
    label: "Do lado de fora",
    paragraphs: [
      "Pra além de psicólogo, sou pai, esposo, curioso e um músico meia-boca. Adoro matemática e física, mesmo sendo de humanas.",
      "Amo literatura e, quando tenho tempo, escrevo contos e histórias de ficção. Em breve (um dia) eu conto mais sobre isso.",
      "Gosto de música, cinema, jogos, futebol, histórias boas e de entender por que as pessoas fazem o que fazem. Acho que boa parte da minha curiosidade pela psicologia vem daí também. Pessoas são complicadas, contraditórias, mudam de ideia, fazem escolhas estranhas e nem sempre conseguem explicar direito o que estão vivendo.",
      "Talvez por isso eu tenha pouca paciência com respostas prontas sobre gente.",
      "No consultório, essa curiosidade continua comigo. Não no sentido de tentar decifrar quem está na minha frente, mas de conhecer aquela pessoa de verdade, no tempo dela, sem partir do pressuposto de que eu já sei quem ela é.",
    ],
  },
  psychology: {
    label: "Na psicologia",
  },
} as const;

// Colagem "Gente que me ajuda a pensar gente." — exibida na aba "Na
// psicologia" de "Quem sou eu?", logo abaixo do texto de apresentação.
// Fotos recortadas em public/referencias/ a partir da peça de referência
// enviada pelo Gabriel.
export const PSYCHOLOGY_REFERENCES = {
  eyebrow: "Referências",
  title: "Gente que me ajuda a pensar ",
  titleEmphasis: "gente",
  intro:
    "Minha prática clínica tem um lugar bem definido, que é a Abordagem Centrada na Pessoa. Mas meu jeito de compreender cuidado, sofrimento e desenvolvimento foi construído ouvindo muitas vozes. Algumas vieram da psicologia; outras, da filosofia, da enfermagem, da saúde mental e de outros lugares. São pessoas que ampliaram meu jeito de olhar para gente e continuam me ajudando a pensar o que significa cuidar de alguém.",
  quote: "Talvez o mais importante seja nunca deixar de fazer perguntas.",
  footerLeft: "Pessoas. Histórias. Mundos reais.",
  footerRight: "É sobre encontros.",
  people: [
    {
      number: "01",
      category: "Relação",
      text: "Colocou a relação no centro da psicoterapia. Seu trabalho me interessa pela confiança na capacidade da pessoa de se desenvolver quando encontra compreensão, autenticidade e aceitação.",
      name: "Carl Rogers",
      role: "Psicólogo • Abordagem Centrada na Pessoa",
      note: "A more human world is possible.",
      image: "/referencias/carl-rogers.jpg",
      width: 150,
      height: 310,
      ratio: "4/5",
      accent: "dark-green",
      photoSide: "right",
      size: "md",
    },
    {
      number: "02",
      category: "Amadurecimento",
      text: "Pensou profundamente sobre vínculo, espontaneidade e a importância de um ambiente suficientemente seguro para que alguém possa existir de maneira própria. É, provavelmente, minha maior influência na compreensão do desenvolvimento humano.",
      name: "Donald Winnicott",
      role: "Pediatra • Psicanalista",
      note: "To be alive is to be real.",
      image: "/referencias/donald-winnicott.jpg",
      width: 220,
      height: 405,
      ratio: "3/5",
      accent: "primary",
      photoSide: "left",
      size: "lg",
    },
    {
      number: "03",
      category: "Existência",
      text: "Trouxe para a clínica questões que não podem simplesmente ser “eliminadas”: ansiedade, liberdade, responsabilidade, escolha, coragem e os conflitos inevitáveis de estar vivo.",
      name: "Rollo May",
      role: "Psicólogo • Psicoterapia Existencial",
      note: "Courage is a form of care.",
      image: "/referencias/rollo-may.jpg",
      width: 160,
      height: 190,
      ratio: "4/5",
      accent: "accent",
      photoSide: "right",
      size: "md",
    },
    {
      number: "04",
      category: "Escolha",
      text: "Muito antes da psicoterapia existencial, investigou angústia, escolha, desespero e a tarefa de tornar-se si mesmo. Sua obra ajuda a pensar o que significa existir de maneira pessoal, e não apenas funcionar.",
      name: "Søren Kierkegaard",
      role: "Filósofo",
      note: "A vida só pode ser compreendida para trás, mas só pode ser vivida para frente.",
      image: "/referencias/kierkegaard.jpg",
      width: 155,
      height: 140,
      ratio: "4/5",
      accent: "secondary",
      photoSide: "right",
      size: "sm",
    },
    {
      number: "05",
      category: "Ser-no-mundo",
      text: "Mudou a maneira de pensar o ser humano ao entendê-lo sempre situado em um mundo, numa história e em relações. Sua filosofia influencia profundamente a clínica fenomenológica e existencial.",
      name: "Martin Heidegger",
      role: "Filósofo • Fenomenologia existencial",
      note: "Ser é estar em relação.",
      image: "/referencias/heidegger.jpg",
      width: 140,
      height: 225,
      ratio: "2/3",
      accent: "dark-green",
      photoSide: "right",
      size: "md",
    },
    {
      number: "06",
      category: "Cuidado",
      text: "Antes de se tornar um dos grandes nomes do samba brasileiro, trabalhou durante décadas com saúde mental. Sua trajetória reúne cuidado, cultura, comunidade e uma compreensão de pessoas que nunca se reduz ao diagnóstico.",
      name: "Dona Ivone Lara",
      role: "Assistente social • Enfermeira • Compositora",
      note: "Quem cuida também canta.",
      image: "/referencias/dona-ivone-lara.jpg",
      width: 155,
      height: 195,
      ratio: "4/5",
      accent: "accent",
      photoSide: "right",
      size: "md",
    },
    {
      number: "07",
      category: "Experiência",
      text: "Uma das grandes referências brasileiras da Gestalt-terapia. Seu trabalho aproxima fenomenologia, relação terapêutica e compreensão do sujeito sem separar a experiência clínica da pessoa concreta que a vive.",
      name: "Lilian Meyer Frazão",
      role: "Psicóloga • Gestalt-terapia",
      note: "A experiência é sempre agora.",
      image: "/referencias/lilian-frazao.jpg",
      width: 115,
      height: 152,
      ratio: "1/1",
      accent: "secondary",
      photoSide: "right",
      size: "sm",
    },
  ],
} as const;

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
      "Sim. Muitos pacientes alternam entre os dois formatos conforme a rotina muda, e o acompanhamento continua o mesmo.",
  },
] as const;
