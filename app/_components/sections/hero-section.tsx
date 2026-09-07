import { AnimatedReveal } from "@/app/_components/shared/animated-reveal";
import { HeroPortrait } from "@/app/_components/sections/hero-portrait";
import { WhatsappButton } from "@/app/_components/shared/whatsapp-button";
import { CITIES } from "@/app/_lib/constants";

const WHATSAPP_MESSAGE = "Olá, Gabriel! Vim pelo site e gostaria de agendar uma consulta.";

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="surface-texture relative isolate overflow-hidden bg-dark-brown text-dark-brown-foreground"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-6 py-20 text-center sm:py-28 lg:py-32">
        <AnimatedReveal>
          <HeroPortrait />
        </AnimatedReveal>

        <AnimatedReveal delay={0.15} className="flex flex-col items-center gap-6">
          <h1 className="font-heading text-4xl font-medium leading-[1.1] sm:text-5xl lg:text-6xl">
            Olá! Sou Gabriel Ribeiro, psicólogo clínico.
          </h1>
          <p className="max-w-xl text-base text-dark-brown-foreground/75 sm:text-lg">
            Psicologia clínica · Atendimento online e presencial · Adultos ·{" "}
            {CITIES.caboFrio.name} e {CITIES.saoPedroDaAldeia.name} — Região dos Lagos (RJ)
          </p>
          <WhatsappButton tone="onDark" size="lg" message={WHATSAPP_MESSAGE} />
        </AnimatedReveal>
      </div>
    </section>
  );
}
