"use client";

import { useState } from "react";
import { cn } from "cn";
import { AnimatedReveal } from "@/app/_components/shared/animated-reveal";
import { SectionHeading } from "@/app/_components/shared/section-heading";
import { THERAPY_COPY } from "@/app/_lib/constants";

type Audience = "adults" | "teens";

const OPTIONS: { key: Audience; label: string; active: string; idle: string }[] = [
  {
    key: "adults",
    label: "adultos",
    active: "bg-dark-green text-dark-green-foreground",
    idle: "bg-dark-green/45 text-dark-green-foreground/90 hover:bg-dark-green/60",
  },
  {
    key: "teens",
    label: "adolescentes",
    active: "bg-accent text-accent-foreground",
    idle: "bg-accent/45 text-accent-foreground/90 hover:bg-accent/60",
  },
];

function Paragraph({ text }: { text: string }) {
  if (text.includes("\n")) {
    return (
      <p className="whitespace-pre-line border-l-2 border-primary/40 pl-4 italic text-foreground/80">
        {text}
      </p>
    );
  }
  if (text.length <= 62) {
    return <p className="font-heading text-xl text-foreground sm:text-2xl">{text}</p>;
  }
  return <p>{text}</p>;
}

export function TherapySection() {
  const [audience, setAudience] = useState<Audience>("adults");
  const copy = THERAPY_COPY[audience];

  return (
    <section id="terapia" className="bg-background">
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <SectionHeading eyebrow="A proposta" title="Como é a terapia comigo?" />

        <div className="mt-8 flex gap-4 sm:gap-6">
          {OPTIONS.map((option) => {
            const isActive = audience === option.key;
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => setAudience(option.key)}
                aria-pressed={isActive}
                className={cn(
                  "flex size-28 items-center justify-center rounded-full px-3 text-center text-lg font-semibold leading-tight wrap-break-word transition-colors outline-none [hyphens:auto] focus-visible:ring-2 focus-visible:ring-ring/50 sm:size-32 sm:text-xl",
                  isActive ? option.active : option.idle
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <AnimatedReveal key={audience} className="mt-10 flex flex-col gap-5 text-muted-foreground">
          <h3 className="font-heading text-2xl font-medium text-foreground">{copy.heading}</h3>
          {copy.paragraphs.map((text) => (
            <Paragraph key={text.slice(0, 24)} text={text} />
          ))}
        </AnimatedReveal>
      </div>
    </section>
  );
}
