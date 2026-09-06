import { Globe, HeartHandshake, MapPin } from "lucide-react";
import { AnimatedReveal } from "@/app/_components/shared/animated-reveal";
import { SectionHeading } from "@/app/_components/shared/section-heading";
import { CITIES, type CityInfo } from "@/app/_lib/constants";

type ServicesSectionProps = {
  city?: CityInfo;
};

export function ServicesSection({ city }: ServicesSectionProps) {
  const services = [
    {
      icon: Globe,
      title: "Terapia online",
      description: city
        ? "Se preferir (ou precisar viajar), seguimos as sessões por videochamada de onde você estiver."
        : "Atendimento por videochamada para todo o Brasil, com a mesma qualidade e sigilo de uma sessão presencial.",
    },
    {
      icon: MapPin,
      title: "Terapia presencial",
      description: city
        ? `Consultório em ${city.name} (${city.state}), pensado para um encontro tranquilo e reservado.`
        : `Consultório em ${CITIES.caboFrio.name} e ${CITIES.saoPedroDaAldeia.name}, na Região dos Lagos (RJ).`,
    },
    {
      icon: HeartHandshake,
      title: "Atendimento individual para adultos",
      description:
        "Um espaço para trabalhar ansiedade, autoestima, relacionamentos, estresse e autoconhecimento, no que fizer sentido para você.",
    },
  ] as const;

  return (
    <section id="servicos" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <SectionHeading eyebrow="Serviços" title="Como posso te ajudar" className="mb-10" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {services.map((service, index) => (
          <AnimatedReveal
            key={service.title}
            delay={index * 0.1}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
              <service.icon className="size-6" />
            </span>
            <h3 className="font-heading text-lg font-medium text-foreground">{service.title}</h3>
            <p className="text-sm text-muted-foreground">{service.description}</p>
          </AnimatedReveal>
        ))}
      </div>
    </section>
  );
}
