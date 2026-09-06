import Image from "next/image";
import Link from "next/link";
import { Globe } from "lucide-react";
import { AnimatedReveal } from "@/app/_components/shared/animated-reveal";
import { SectionHeading } from "@/app/_components/shared/section-heading";
import { CITIES, IMAGES } from "@/app/_lib/constants";

export function ServiceAreaSection() {
  const cities = Object.values(CITIES);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <SectionHeading
        eyebrow="Área de atendimento"
        title="Onde eu atendo"
        description="Presencialmente na Região dos Lagos, e online em qualquer lugar do Brasil."
        className="mb-10"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {cities.map((city, index) => (
          <AnimatedReveal
            key={city.slug}
            delay={index * 0.1}
            className="group relative flex aspect-video flex-col justify-end overflow-hidden rounded-2xl sm:aspect-[4/5]"
          >
            <Image
              src={city.heroImage.src}
              alt={city.heroImage.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 640px) 33vw, 100vw"
            />
            <div className="relative z-10 flex flex-col gap-2 bg-gradient-to-t from-black/70 to-transparent p-6">
              <span className="font-heading text-xl text-white">{city.name}</span>
              <Link
                href={`/${city.slug}`}
                className="text-sm font-medium text-white underline underline-offset-4"
              >
                Ver atendimento presencial
              </Link>
            </div>
          </AnimatedReveal>
        ))}

        <AnimatedReveal
          delay={0.2}
          className="group relative flex aspect-video flex-col justify-end overflow-hidden rounded-2xl sm:aspect-[4/5]"
        >
          <Image
            src={IMAGES.online.src}
            alt={IMAGES.online.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 640px) 33vw, 100vw"
          />
          <div className="relative z-10 flex flex-col gap-2 bg-gradient-to-t from-primary/90 to-primary/10 p-6 text-primary-foreground">
            <Globe className="size-6" />
            <span className="font-heading text-xl">Online</span>
            <p className="text-sm">Atendimento por videochamada para todo o Brasil.</p>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
}
