import { PSYCHOLOGIST } from "@/app/_lib/constants";

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${PSYCHOLOGIST.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
