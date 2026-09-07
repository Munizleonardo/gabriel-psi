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
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:py-32">
        <AnimatedReveal className="flex flex-col items-start gap-6">
          <h1 className="font-heading text-4xl font-medium leading-[1.1] sm:text-5xl lg:text-6xl">
            Olá! Sou Gabriel Ribeiro, psicólogo clínico.
          </h1>
          <p className="max-w-xl text-base text-dark-brown-foreground/75 sm:text-lg">
            Psicologia clínica · Atendimento online e presencial · Adultos ·{" "}
            {CITIES.caboFrio.name} e {CITIES.saoPedroDaAldeia.name} — Região dos Lagos (RJ)
          </p>
          <WhatsappButton tone="onDark" size="lg" message={WHATSAPP_MESSAGE} />
        </AnimatedReveal>

        <AnimatedReveal delay={0.15}>
          <HeroPortrait />
        </AnimatedReveal>
      </div>
    </section>
  );
}
