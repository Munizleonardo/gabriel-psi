import { AtSign } from "lucide-react";
import { WhatsappIcon } from "@/app/_components/shared/whatsapp-icon";
import { buildWhatsAppLink } from "@/app/_lib/whatsapp";
import { PSYCHOLOGIST } from "@/app/_lib/constants";

const WHATSAPP_MESSAGE = "Olá, Gabriel! Vim pelo site e gostaria de agendar uma consulta.";

export function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      <a
        href={PSYCHOLOGIST.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir o Instagram"
        className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg ring-2 ring-accent-foreground/40 transition-transform hover:scale-105"
      >
        <AtSign className="size-7" />
      </a>

      <a
        href={buildWhatsAppLink(WHATSAPP_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="flex size-14 animate-pulse items-center justify-center rounded-full bg-dark-green text-dark-green-foreground shadow-lg ring-2 ring-dark-green-foreground/40 transition-transform hover:scale-105 motion-reduce:animate-none"
      >
        <WhatsappIcon className="size-7" />
      </a>
    </div>
  );
}
