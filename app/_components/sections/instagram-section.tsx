import { AtSign } from "lucide-react";
import { AnimatedReveal } from "@/app/_components/shared/animated-reveal";
import { SectionHeading } from "@/app/_components/shared/section-heading";
import { PSYCHOLOGIST } from "@/app/_lib/constants";

export function InstagramSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <AnimatedReveal className="flex flex-col items-center gap-6 rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground">
        <AtSign className="size-10" />
        <SectionHeading
          title="Acompanhe no Instagram"
          description={`Conteúdos sobre saúde mental e bastidores do consultório em ${PSYCHOLOGIST.instagramHandle}.`}
          className="items-center text-center [&_h2]:text-primary-foreground [&_p]:text-primary-foreground/90"
        />
        <a
          href={PSYCHOLOGIST.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-background/90"
        >
          Seguir {PSYCHOLOGIST.instagramHandle}
        </a>
      </AnimatedReveal>
    </section>
  );
}
