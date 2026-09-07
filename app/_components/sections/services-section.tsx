import { Globe, HeartHandshake, MapPin } from "lucide-react";
import { AnimatedGroup } from "@/app/_components/shared/animated-group";
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
    <section id="servicos" className="bg-dark-green text-dark-green-foreground">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <SectionHeading eyebrow="O que ofereço" title="Serviços" tone="dark" />

        <AnimatedGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="flex h-full flex-col gap-3 rounded-xl border border-dark-green-foreground/12 bg-dark-brown/30 p-6 sm:p-7"
            >
              <div className="flex items-center gap-3">
                <span className="font-heading text-3xl text-dark-green-foreground/45">
                  0{index + 1}.
                </span>
                <service.icon className="size-5 text-dark-green-foreground/60" />
              </div>
              <h3 className="font-heading text-lg font-medium">{service.title}</h3>
              <p className="text-sm text-dark-green-foreground/75">{service.description}</p>
            </div>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}
