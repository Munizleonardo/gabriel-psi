import { AnimatedReveal } from "@/app/_components/shared/animated-reveal";
import { SectionHeading } from "@/app/_components/shared/section-heading";
import { WhatsappButton } from "@/app/_components/shared/whatsapp-button";

const WHATSAPP_MESSAGE = "Olá, Gabriel! Vim pelo site e gostaria de agendar uma consulta.";

export function CtaSection() {
  return (
    <section
      id="contato"
      className="surface-texture relative isolate overflow-hidden bg-dark-green text-dark-green-foreground"
    >
      <AnimatedReveal className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 py-24 text-center sm:py-32">
        <SectionHeading
          eyebrow="Pronto para começar?"
          title="Vamos conversar?"
          tone="dark"
          bar={false}
          className="items-center text-center"
        />
        <p className="max-w-lg text-dark-green-foreground/80">
          Cada história é única e merece ser ouvida com atenção. Estou aqui pra te acompanhar
          nesse processo.
        </p>
        <WhatsappButton tone="onDark" size="lg" message={WHATSAPP_MESSAGE} label="Falar no WhatsApp" />
      </AnimatedReveal>
    </section>
  );
}
