import { AnimatedReveal } from "@/app/_components/shared/animated-reveal";
import { SectionHeading } from "@/app/_components/shared/section-heading";
import { CITIES, PSYCHOLOGIST } from "@/app/_lib/constants";

export function AboutSection() {
  return (
    <section id="sobre" className="bg-secondary">
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <SectionHeading eyebrow="Conheça" title="Quem sou eu?" />

        <AnimatedReveal className="mt-8 flex flex-col gap-4 text-muted-foreground">
          {/* TODO: bio pessoal do Gabriel + fotos — ele vai enviar. */}
          <p>
            Sou {PSYCHOLOGIST.name}, psicólogo (CRP {PSYCHOLOGIST.crp}), formado em Psicologia.
            Atendo adolescentes e adultos, online para todo o Brasil e presencialmente em{" "}
            {CITIES.caboFrio.name} e {CITIES.saoPedroDaAldeia.name}, na Região dos Lagos (RJ).
          </p>
          <p>
            Em breve, um pouco mais sobre a minha trajetória e o meu jeito de trabalhar.
          </p>
        </AnimatedReveal>
      </div>
    </section>
  );
}
