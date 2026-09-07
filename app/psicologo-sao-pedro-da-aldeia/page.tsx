import type { Metadata } from "next";
import { JsonLd } from "@/app/_components/shared/json-ld";
import { ContactSection } from "@/app/_components/sections/contact-section";
import { FaqSection } from "@/app/_components/sections/faq-section";
import { HowItWorksSection } from "@/app/_components/sections/how-it-works-section";
import { LocationHeroSection } from "@/app/_components/sections/location-hero-section";
import { PresencialSection } from "@/app/_components/sections/presencial-section";
import { ServicesSection } from "@/app/_components/sections/services-section";
import { CITIES, SITE_URL } from "@/app/_lib/constants";
import { buildMetadata } from "@/app/_lib/metadata";

const city = CITIES.saoPedroDaAldeia;

export const metadata: Metadata = buildMetadata({
  title: `Psicólogo em ${city.name} — Atendimento Presencial e Online`,
  description: `Psicólogo (CRP 05/87661) com atendimento presencial em ${city.name}, às margens da Lagoa de Araruama, e online para todo o Brasil. Agende sua consulta.`,
  path: `/${city.slug}`,
});

export default function PsicologoSaoPedroDaAldeiaPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: `Gabriel Ribeiro Psicólogo — ${city.name}`,
    url: `${SITE_URL}/${city.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.state,
      addressCountry: "BR",
    },
  };

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <LocationHeroSection city={city} />
      <ServicesSection city={city} />
      <HowItWorksSection />
      <PresencialSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
