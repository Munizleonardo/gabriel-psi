import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome completo."),
  email: z.string().trim().email("Informe um e-mail válido."),
  phone: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().min(10, "Conte um pouco mais sobre o que você procura."),
  company: z.string().optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
