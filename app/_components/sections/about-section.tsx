import Image from "next/image";
import { AnimatedReveal } from "@/app/_components/shared/animated-reveal";
import { SectionHeading } from "@/app/_components/shared/section-heading";
import { CITIES, PSYCHOLOGIST } from "@/app/_lib/constants";

export function AboutSection() {
  return (
    <section id="sobre" className="bg-secondary">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <SectionHeading eyebrow="Conheça" title="Quem sou eu?" />

        <div className="mt-8 grid gap-10 md:grid-cols-[1fr_0.8fr] md:items-center md:gap-14">
          <AnimatedReveal className="flex flex-col gap-4 text-muted-foreground">
            <p>
              Sou {PSYCHOLOGIST.name}, psicólogo (CRP {PSYCHOLOGIST.crp}), formado em Psicologia.
              Atendo adolescentes e adultos, online para todo o Brasil e presencialmente em{" "}
              {CITIES.caboFrio.name} e {CITIES.saoPedroDaAldeia.name}, na Região dos Lagos (RJ),
              com horário agendado.
            </p>
            <p>
              Fora do consultório, sou feito das histórias que me marcam: filmes, música, jogos,
              livros, pessoas, momentos. Um pouco disso está aqui do lado.
            </p>
          </AnimatedReveal>

          <AnimatedReveal
            delay={0.1}
            className="overflow-hidden rounded-2xl border border-border bg-background"
          >
            <Image
              src="/img.jpeg"
              alt="Colagem “gosto de” do Gabriel — filmes, músicas, jogos, livros e histórias que o marcam"
              width={1122}
              height={1402}
              className="h-auto w-full"
              sizes="(min-width: 768px) 40vw, 90vw"
            />
          </AnimatedReveal>
        </div>
      </div>
    </section>
  );
}
