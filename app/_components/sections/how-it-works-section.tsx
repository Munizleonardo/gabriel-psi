import { AnimatedGroup } from "@/app/_components/shared/animated-group";
import { AnimatedReveal } from "@/app/_components/shared/animated-reveal";
import { SectionHeading } from "@/app/_components/shared/section-heading";
import { WhatsappButton } from "@/app/_components/shared/whatsapp-button";

const WHATSAPP_MESSAGE =
  "Olá, Gabriel! Vim pelo site e gostaria de agendar uma primeira conversa.";

const STEPS = [
  {
    title: "Você entra em contato",
    description: "Pelo WhatsApp, me conte um pouco do que você está buscando.",
  },
  {
    title: "Agendamos sua sessão",
    description: "Combinamos juntos o melhor dia e horário, online ou presencial.",
  },
  {
    title: "Primeira sessão",
    description: "Um encontro inicial para nos conhecermos e entendermos o que te trouxe até aqui.",
  },
  {
    title: "Acompanhamento contínuo",
    description: "Seguimos juntos, no seu ritmo, revendo o processo sempre que fizer sentido.",
  },
] as const;

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <SectionHeading eyebrow="Passo a passo" title="Como Funciona" />

        <AnimatedGroup className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <div key={step.title} className="flex flex-col gap-2">
              <span className="font-heading text-4xl text-primary/40">0{index + 1}.</span>
              <h3 className="font-heading text-lg font-medium text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </AnimatedGroup>

        <AnimatedReveal
          delay={0.1}
          className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center"
        >
          <p className="max-w-md text-muted-foreground">
            Sessões de aproximadamente 50 minutos, online ou presencial na Região dos Lagos.
          </p>
          <WhatsappButton size="lg" message={WHATSAPP_MESSAGE} label="Agendar primeira conversa" />
        </AnimatedReveal>
      </div>
    </section>
  );
}
