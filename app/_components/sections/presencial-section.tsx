import Image from "next/image";
import Link from "next/link";
import { Globe } from "lucide-react";
import { AnimatedGroup } from "@/app/_components/shared/animated-group";
import { SectionHeading } from "@/app/_components/shared/section-heading";
import { CITIES, IMAGES } from "@/app/_lib/constants";

export function PresencialSection() {
  const cities = Object.values(CITIES);

  return (
    <section id="atendimento" className="bg-background">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <div className="rounded-3xl bg-secondary p-6 sm:p-10">
          <SectionHeading
            eyebrow="Onde eu atendo"
            title="Presencial e online"
            description="Presencialmente na Região dos Lagos, e online em qualquer lugar do Brasil."
          />

          <AnimatedGroup className="mt-8 grid gap-5 sm:grid-cols-3">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="group relative flex aspect-4/3 flex-col justify-end overflow-hidden rounded-2xl"
              >
                <Image
                  src={city.heroImage.src}
                  alt={city.heroImage.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 640px) 20rem, 90vw"
                />
                <div className="relative z-10 flex flex-col gap-1 bg-linear-to-t from-dark-brown/85 to-transparent p-5 text-dark-brown-foreground">
                  <span className="font-heading text-lg">{city.name}</span>
                  <span className="text-xs font-medium underline underline-offset-4">
                    Ver atendimento presencial
                  </span>
                </div>
              </Link>
            ))}

            <div className="group relative flex aspect-4/3 flex-col justify-end overflow-hidden rounded-2xl">
              <Image
                src={IMAGES.online.src}
                alt={IMAGES.online.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 640px) 20rem, 90vw"
              />
              <div className="relative z-10 flex flex-col gap-1 bg-linear-to-t from-dark-brown/85 to-transparent p-5 text-dark-brown-foreground">
                <Globe className="size-5" />
                <span className="font-heading text-lg">Online</span>
                <span className="text-xs">Videochamada para todo o Brasil</span>
              </div>
            </div>
          </AnimatedGroup>
        </div>
      </div>
    </section>
  );
}
