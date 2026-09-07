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
    <section id="faq" className="bg-secondary">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <SectionHeading eyebrow="Perguntas frequentes" title="Tirando suas dúvidas" className="mb-10" />
        <AnimatedReveal>
          <Accordion type="single" collapsible>
            {FAQ_ITEMS.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger className="text-left font-heading text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedReveal>
      </div>
      <JsonLd data={faqSchema} />
    </section>
  );
}
