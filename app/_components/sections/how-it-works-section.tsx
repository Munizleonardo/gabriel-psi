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
