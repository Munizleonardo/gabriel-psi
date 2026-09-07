"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { SectionHeading } from "@/app/_components/shared/section-heading";
import { WhatsappButton } from "@/app/_components/shared/whatsapp-button";
import { contactFormSchema, type ContactFormValues } from "@/app/_lib/contact-schema";

const DEFAULT_VALUES: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
  company: "",
};

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Falha ao enviar mensagem");
      }

      toast.success("Mensagem enviada! Gabriel vai te responder em breve.");
      form.reset(DEFAULT_VALUES);
    } catch {
      toast.error(
        "Não foi possível enviar sua mensagem agora. Tente novamente ou fale direto pelo WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contato" className="bg-secondary">
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-16 sm:py-24">
        <SectionHeading
          eyebrow="Contato"
          title="Vamos conversar?"
          description="Preencha o formulário abaixo ou fale direto pelo WhatsApp — o que for mais confortável para você."
        />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="seu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="(22) 90000-0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Conte um pouco sobre o que você procura" rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem className="hidden" aria-hidden="true">
                  <FormLabel>Empresa</FormLabel>
                  <FormControl>
                    <Input tabIndex={-1} autoComplete="off" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar mensagem"}
              </Button>
              <WhatsappButton
                variant="outline"
                size="lg"
                message="Olá, Gabriel! Vim pelo site e gostaria de agendar uma consulta."
              />
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
