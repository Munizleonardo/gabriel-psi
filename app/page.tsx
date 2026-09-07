import type { Metadata } from "next";
import { JsonLd } from "@/app/_components/shared/json-ld";
import { AboutSection } from "@/app/_components/sections/about-section";
import { ApproachSection } from "@/app/_components/sections/approach-section";
import { ContactSection } from "@/app/_components/sections/contact-section";
import { FaqSection } from "@/app/_components/sections/faq-section";
import { HeroSection } from "@/app/_components/sections/hero-section";
import { HowItWorksSection } from "@/app/_components/sections/how-it-works-section";
import { PresencialSection } from "@/app/_components/sections/presencial-section";
import { ServicesSection } from "@/app/_components/sections/services-section";
import { PSYCHOLOGIST, SITE_URL } from "@/app/_lib/constants";
import { buildMetadata } from "@/app/_lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: `${PSYCHOLOGIST.name} — Psicólogo Online e em Cabo Frio / São Pedro da Aldeia`,
  description:
    "Psicólogo (CRP 05/87661) com atendimento online para todo o Brasil e presencial em Cabo Frio e São Pedro da Aldeia. Agende sua consulta.",
  path: "/",
});

export default function Home() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PSYCHOLOGIST.name,
    jobTitle: "Psicólogo",
    url: SITE_URL,
    sameAs: [PSYCHOLOGIST.instagramUrl],
    honorificSuffix: `CRP ${PSYCHOLOGIST.crp}`,
  };

  return (
    <>
      <JsonLd data={personSchema} />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ApproachSection />
      <HowItWorksSection />
      <PresencialSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
