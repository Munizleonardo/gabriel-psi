import { AnimatedGroup } from "@/app/_components/shared/animated-group";
import { SectionHeading } from "@/app/_components/shared/section-heading";
import { CITIES, type CityInfo } from "@/app/_lib/constants";

type ServicesSectionProps = {
  city?: CityInfo;
};

export function ServicesSection({ city }: ServicesSectionProps) {
  const local = city
    ? `${city.name} (${city.state})`
    : `${CITIES.caboFrio.name} e ${CITIES.saoPedroDaAldeia.name}`;

  const services = [
    {
      title: "Psicoterapia individual presencial",
      description: `Para adolescentes e adultos, com horário agendado, no consultório em ${local}, na Região dos Lagos (RJ).`,
    },
    {
      title: "Psicoterapia individual online",
      description:
        "Mesmo formato e duração da sessão presencial, por videochamada, para quem mora em qualquer lugar do Brasil.",
    },
    {
      title: "Rodas de conversa presenciais",
      description: `Encontros em grupo para pensar junto temas do dia a dia, num espaço de escuta e troca, em ${local}.`,
      /* TODO: detalhes das rodas (formato, frequência, valores) quando o Gabriel definir. */
    },
    {
      title: "Atividades em grupo",
      description:
        "Vivências pensadas para empresas e equipes, com foco em saúde mental e convivência no ambiente de trabalho.",
      /* TODO: detalhes das atividades em grupo quando o Gabriel definir. */
    },
  ] as const;

  return (
    <section id="servicos" className="bg-dark-green text-dark-green-foreground">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <SectionHeading eyebrow="O que ofereço" title="Com o que eu trabalho?" tone="dark" />

        <AnimatedGroup className="mt-10 grid gap-5 sm:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="flex h-full flex-col gap-3 rounded-xl border border-dark-green-foreground/12 bg-dark-brown/30 p-6 sm:p-8"
            >
              <span className="font-heading text-3xl text-dark-green-foreground/45">
                0{index + 1}.
              </span>
              <h3 className="font-heading text-xl font-medium">{service.title}</h3>
              <p className="text-sm text-dark-green-foreground/75">{service.description}</p>
            </div>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}
