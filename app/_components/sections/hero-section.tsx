import { AnimatedReveal } from "@/app/_components/shared/animated-reveal";
import { GabrielPhoto } from "@/app/_components/shared/gabriel-photo";
import { HeroBackground } from "@/app/_components/shared/hero-background";
import { WhatsappButton } from "@/app/_components/shared/whatsapp-button";
import { CITIES, PSYCHOLOGIST } from "@/app/_lib/constants";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-secondary">
      <HeroBackground />
      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-6 py-16 sm:py-24 md:flex-row">
        <AnimatedReveal className="flex flex-1 flex-col items-start gap-6">
          <span className="w-fit rounded-full bg-background px-4 py-1 text-sm font-medium text-primary">
            CRP {PSYCHOLOGIST.crp}
          </span>
          <h1 className="font-heading text-4xl font-medium leading-tight text-foreground sm:text-5xl">
            Um espaço de escuta para você se cuidar, no seu tempo
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Sou {PSYCHOLOGIST.name}, psicólogo. Atendo online em todo o Brasil e presencialmente
            em {CITIES.caboFrio.name} e {CITIES.saoPedroDaAldeia.name}, na Região dos Lagos (RJ).
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <WhatsappButton
              size="lg"
              message="Olá, Gabriel! Vim pelo site e gostaria de agendar uma consulta."
            />
            <a
              href="#contato"
              className="flex items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-background"
            >
              Fale comigo pelo formulário
            </a>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={0.15} className="flex flex-1 justify-center">
          <div className="relative aspect-square w-64 overflow-hidden rounded-3xl shadow-lg sm:w-80">
            <GabrielPhoto priority />
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
}
