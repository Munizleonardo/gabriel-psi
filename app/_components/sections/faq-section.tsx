import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";
import { AnimatedReveal } from "@/app/_components/shared/animated-reveal";
import { JsonLd } from "@/app/_components/shared/json-ld";
import { SectionHeading } from "@/app/_components/shared/section-heading";
import { FAQ_ITEMS } from "@/app/_lib/constants";

export function FaqSection() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section id="faq" className="bg-dark-brown text-dark-brown-foreground">
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <SectionHeading eyebrow="Dúvidas" title="Perguntas frequentes" tone="dark" />

        <AnimatedReveal className="mt-10">
          <Accordion type="single" collapsible>
            {FAQ_ITEMS.map((item) => (
              <AccordionItem
                key={item.question}
                value={item.question}
                className="border-dark-brown-foreground/15"
              >
                <AccordionTrigger className="font-heading text-lg text-dark-brown-foreground hover:no-underline [&>svg]:text-dark-brown-foreground/60">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-dark-brown-foreground/75">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedReveal>
      </div>
      <JsonLd data={faqSchema} />
    </section>
  );
}
