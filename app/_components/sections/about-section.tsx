import { AnimatedReveal } from "@/app/_components/shared/animated-reveal";
import { SectionHeading } from "@/app/_components/shared/section-heading";
import { CITIES, PSYCHOLOGIST } from "@/app/_lib/constants";

const CREDENTIALS = [
  "Formado em Psicologia",
  `CRP ${PSYCHOLOGIST.crp} — Conselho Regional de Psicologia`,
  "Atendimento individual para adultos",
  "Online para todo o Brasil",
  `Presencial em ${CITIES.caboFrio.name} e ${CITIES.saoPedroDaAldeia.name} (RJ)`,
];

export function AboutSection() {
  return (
    <section id="sobre" className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <SectionHeading eyebrow="Conheça" title="Sobre Mim" />

        <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-14">
          <AnimatedReveal className="flex flex-col gap-4 text-muted-foreground">
            <p>
              Sou {PSYCHOLOGIST.name}, psicólogo. Acredito que a terapia é um encontro — um
              espaço construído aos poucos, sessão após sessão, no ritmo de cada pessoa.
            </p>
            <p>
              Conduzo meu trabalho com escuta ativa e acolhimento, sem julgamentos. Atendo
              adultos que querem entender melhor seus sentimentos, suas relações e as questões
              do dia a dia.
            </p>
            <p>
              O atendimento acontece online, de qualquer lugar do Brasil, ou presencialmente em{" "}
              {CITIES.caboFrio.name} e {CITIES.saoPedroDaAldeia.name}, na Região dos Lagos (RJ).
            </p>
          </AnimatedReveal>

          <AnimatedReveal
            delay={0.1}
            className="h-fit rounded-2xl border border-border bg-card p-6"
          >
            <h3 className="font-heading text-lg font-medium text-foreground">Formação e atuação</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              {CREDENTIALS.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
            {/* Especializações/pós podem entrar aqui quando o Gabriel enviar. */}
          </AnimatedReveal>
        </div>
      </div>
    </section>
  );
}
