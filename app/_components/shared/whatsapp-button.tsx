import { MessageCircle } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { buildWhatsAppLink } from "@/app/_lib/whatsapp";

type WhatsappButtonProps = {
  message: string;
  label?: string;
  size?: "default" | "lg";
  variant?: "default" | "outline";
  className?: string;
};

export function WhatsappButton({
  message,
  label = "Agende pelo WhatsApp",
  size = "default",
  variant = "default",
  className,
}: WhatsappButtonProps) {
  return (
    <Button asChild size={size} variant={variant} className={className}>
      <a href={buildWhatsAppLink(message)} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="size-4" />
        {label}
      </a>
    </Button>
  );
}
