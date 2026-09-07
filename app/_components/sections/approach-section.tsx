import { AnimatedReveal } from "@/app/_components/shared/animated-reveal";
import { SectionHeading } from "@/app/_components/shared/section-heading";
import { CLINIC_PRINCIPLES } from "@/app/_lib/constants";

export function ApproachSection() {
  return (
    <section
      id="abordagens"
      className="bg-dark-brown text-dark-brown-foreground"
    >
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <SectionHeading eyebrow="Como eu trabalho" title="Princípios da clínica" tone="dark" />

        <div className="mt-12 flex flex-col gap-12 sm:gap-16">
          {CLINIC_PRINCIPLES.map((principle, index) => {
            const flipped = index % 2 === 1;
            return (
              <AnimatedReveal
                key={principle.term}
                className={`grid items-center gap-3 border-t border-dark-brown-foreground/12 pt-8 sm:grid-cols-2 sm:gap-10 ${
                  flipped ? "sm:[&>*:first-child]:order-2" : ""
                }`}
              >
                <h3
                  className={`font-heading text-2xl font-medium sm:text-3xl ${
                    flipped ? "sm:text-right" : ""
                  }`}
                >
                  {principle.term}
                </h3>
                <p className="text-dark-brown-foreground/75">{principle.text}</p>
              </AnimatedReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
