import { AnimatedGroup } from "@/app/_components/shared/animated-group";
import { AnimatedReveal } from "@/app/_components/shared/animated-reveal";
import { SectionHeading } from "@/app/_components/shared/section-heading";
import { APPROACH } from "@/app/_lib/constants";

export function ApproachSection() {
  return (
    <section id="abordagem" className="bg-dark-brown text-dark-brown-foreground">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <SectionHeading eyebrow="Como eu trabalho" title={APPROACH.name} tone="dark" />

        <AnimatedReveal className="mt-8 max-w-2xl text-lg text-dark-brown-foreground/80">
          {APPROACH.lead}
        </AnimatedReveal>

        <AnimatedGroup className="mt-12 grid gap-8 sm:grid-cols-2">
          {APPROACH.points.map((point) => (
            <div
              key={point.term}
              className="border-t border-dark-brown-foreground/15 pt-5"
            >
              <h3 className="font-heading text-xl font-medium sm:text-2xl">{point.term}</h3>
              <p className="mt-2 text-dark-brown-foreground/75">{point.text}</p>
            </div>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}
