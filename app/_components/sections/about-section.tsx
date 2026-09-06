import Image from "next/image";
import { AnimatedReveal } from "@/app/_components/shared/animated-reveal";
import { GabrielPhoto } from "@/app/_components/shared/gabriel-photo";
import { SectionHeading } from "@/app/_components/shared/section-heading";
import { IMAGES, PSYCHOLOGIST } from "@/app/_lib/constants";

export function AboutSection() {
  return (
    <section id="sobre" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <div className="flex flex-col gap-10 md:flex-row md:items-center">
        <AnimatedReveal className="flex flex-1 justify-center">
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl">
            <GabrielPhoto />
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={0.1} className="flex flex-1 flex-col gap-6">
          <SectionHeading
            eyebrow="Sobre mim"
            title={`Olá, eu sou o ${PSYCHOLOGIST.name}`}
            description="Acredito que a terapia é um encontro — um espaço construído aos poucos, sessão após sessão, no ritmo de cada pessoa."
          />
          <p className="text-base text-muted-foreground">
            Sou psicólogo (CRP {PSYCHOLOGIST.crp}) e conduzo meu trabalho com escuta ativa e
            acolhimento, sem julgamentos. Atendo adultos que buscam entender melhor seus
            sentimentos, suas relações e as questões do dia a dia, seja online, de qualquer lugar
            do Brasil, seja presencialmente em Cabo Frio e São Pedro da Aldeia.
          </p>
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
            <Image
              src={IMAGES.about.src}
              alt={IMAGES.about.alt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
}
