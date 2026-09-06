import Image from "next/image";
import { AnimatedReveal } from "@/app/_components/shared/animated-reveal";
import { WhatsappButton } from "@/app/_components/shared/whatsapp-button";
import { PSYCHOLOGIST, type CityInfo } from "@/app/_lib/constants";

type LocationHeroSectionProps = {
  city: CityInfo;
};

export function LocationHeroSection({ city }: LocationHeroSectionProps) {
  return (
    <section className="relative isolate overflow-hidden bg-secondary">
      <div className="absolute inset-0 -z-10">
        <Image src={city.heroImage.src} alt={city.heroImage.alt} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-24 sm:py-32">
        <AnimatedReveal className="flex flex-col gap-6">
          <span className="w-fit rounded-full bg-background px-4 py-1 text-sm font-medium text-primary">
            CRP {PSYCHOLOGIST.crp}
          </span>
          <h1 className="max-w-2xl font-heading text-4xl font-medium leading-tight text-white sm:text-5xl">
            Psicólogo em {city.name}, com atendimento presencial e online
          </h1>
          <p className="max-w-xl text-lg text-white/90">{city.intro}</p>
          <div>
            <WhatsappButton
              size="lg"
              message={`Olá, Gabriel! Vi o site e gostaria de agendar uma consulta presencial em ${city.name}.`}
            />
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
}
