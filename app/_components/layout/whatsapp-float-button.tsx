import { WhatsappIcon } from "@/app/_components/shared/whatsapp-icon";
import { buildWhatsAppLink } from "@/app/_lib/whatsapp";

const WHATSAPP_MESSAGE = "Olá, Gabriel! Vim pelo site e gostaria de agendar uma consulta.";

export function WhatsappFloatButton() {
  return (
    <a
      href={buildWhatsAppLink(WHATSAPP_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex size-14 animate-pulse items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-105 motion-reduce:animate-none"
    >
      <WhatsappIcon className="size-7" />
    </a>
  );
}
