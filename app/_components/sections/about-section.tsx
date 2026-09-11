"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "cn";
import { ReferencesCollage } from "@/app/_components/sections/references-collage";
import { AnimatedReveal } from "@/app/_components/shared/animated-reveal";
import { SectionHeading } from "@/app/_components/shared/section-heading";
import { ABOUT_TABS, CITIES, PSYCHOLOGIST } from "@/app/_lib/constants";

type Tab = "outside" | "psychology";

const OPTIONS: { key: Tab; label: string; active: string; idle: string }[] = [
  {
    key: "outside",
    label: ABOUT_TABS.outside.label,
    active: "bg-primary text-primary-foreground",
    idle: "bg-primary/45 text-primary-foreground/90 hover:bg-primary/60",
  },
  {
    key: "psychology",
    label: ABOUT_TABS.psychology.label,
    active: "bg-accent text-accent-foreground",
    idle: "bg-accent/45 text-accent-foreground/90 hover:bg-accent/60",
  },
];

export function AboutSection() {
  const [tab, setTab] = useState<Tab>("outside");
  const isOutside = tab === "outside";

  const topRef = useRef<HTMLDivElement>(null);
  const scrollOnChange = useRef(false);

  useEffect(() => {
    if (!scrollOnChange.current) return;
    scrollOnChange.current = false;
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [tab]);

  function switchTab(next: Tab) {
    scrollOnChange.current = true;
    setTab(next);
  }

  return (
    <section id="sobre" className="bg-secondary">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <div ref={topRef} className="scroll-mt-20">
          <SectionHeading eyebrow="Conheça" title="Quem sou eu?" />
        </div>

        <div className="mt-8 flex gap-4 sm:gap-6">
          {OPTIONS.map((option) => {
            const isActive = tab === option.key;
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => switchTab(option.key)}
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

        {isOutside ? (
          <div className="mt-10 grid gap-10 md:grid-cols-[1fr_0.8fr] md:items-center md:gap-14">
            <AnimatedReveal className="flex flex-col gap-4 text-muted-foreground">
              {ABOUT_TABS.outside.paragraphs.map((text) => (
                <p key={text.slice(0, 24)}>{text}</p>
              ))}
            </AnimatedReveal>

            <AnimatedReveal
              delay={0.1}
              className="overflow-hidden rounded-2xl border border-border bg-background"
            >
              <Image
                src="/img.jpeg"
                alt="Colagem do Gabriel com filmes, músicas, jogos, livros e outras histórias que o marcam"
                width={2400}
                height={1721}
                className="h-auto w-full"
                sizes="(min-width: 768px) 40vw, 90vw"
              />
            </AnimatedReveal>
          </div>
        ) : (
          <AnimatedReveal className="mt-10 flex flex-col gap-8">
            <p className="max-w-2xl text-muted-foreground">
              Sou {PSYCHOLOGIST.name}, psicólogo (CRP {PSYCHOLOGIST.crp}), formado em Psicologia.
              Atendo adolescentes e adultos, online para todo o Brasil e presencialmente em{" "}
              {CITIES.caboFrio.name} e {CITIES.saoPedroDaAldeia.name}, na Região dos Lagos (RJ),
              com horário agendado.
            </p>
            <ReferencesCollage />
          </AnimatedReveal>
        )}

        <button
          type="button"
          onClick={() => switchTab(isOutside ? "psychology" : "outside")}
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-background"
        >
          {isOutside ? (
            <>
              Ver na psicologia
              <ArrowRight className="size-4" />
            </>
          ) : (
            <>
              <ArrowLeft className="size-4" />
              Ver do lado de fora
            </>
          )}
        </button>
      </div>
    </section>
  );
}
