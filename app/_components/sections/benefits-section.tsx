import Image from "next/image";
import { Clock, Ear, Repeat2, ShieldCheck } from "lucide-react";
import { AnimatedReveal } from "@/app/_components/shared/animated-reveal";
import { SectionHeading } from "@/app/_components/shared/section-heading";
import { IMAGES } from "@/app/_lib/constants";

const BENEFITS = [
  { icon: ShieldCheck, text: "Sigilo ético, respaldado pelo CRP" },
  { icon: Ear, text: "Escuta acolhedora, sem julgamentos" },
  { icon: Clock, text: "Flexibilidade de horário no atendimento online" },
  { icon: Repeat2, text: "Acompanhamento contínuo, no seu ritmo" },
] as const;

export function BenefitsSection() {
  return (
    <section className="bg-secondary">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 sm:py-24 md:flex-row md:items-center">
        <AnimatedReveal className="relative aspect-video flex-1 overflow-hidden rounded-3xl">
          <Image
            src={IMAGES.benefits.src}
            alt={IMAGES.benefits.alt}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </AnimatedReveal>

        <AnimatedReveal delay={0.1} className="flex flex-1 flex-col gap-6">
          <SectionHeading title="Por que fazer terapia comigo" />
          <ul className="flex flex-col gap-4">
            {BENEFITS.map((benefit) => (
              <li key={benefit.text} className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-background text-primary">
                  <benefit.icon className="size-5" />
                </span>
                <span className="text-base text-foreground">{benefit.text}</span>
              </li>
            ))}
          </ul>
        </AnimatedReveal>
      </div>
    </section>
  );
}
