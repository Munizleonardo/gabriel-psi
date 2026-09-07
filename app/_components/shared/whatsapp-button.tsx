import { Button } from "@/app/_components/ui/button";
import { WhatsappIcon } from "@/app/_components/shared/whatsapp-icon";
import { buildWhatsAppLink } from "@/app/_lib/whatsapp";
import { cn } from "cn";

type WhatsappButtonProps = {
  message: string;
  label?: string;
  size?: "default" | "lg";
  variant?: "default" | "outline";
  /** "onDark": creme fill + dark text, para uso sobre seções escuras. */
  tone?: "default" | "onDark";
  className?: string;
};

export function WhatsappButton({
  message,
  label = "Agende pelo WhatsApp",
  size = "default",
  variant = "default",
  tone = "default",
  className,
}: WhatsappButtonProps) {
  return (
    <Button
      asChild
      size={size}
      variant={variant}
      className={cn(
        tone === "onDark" &&
          "border-transparent bg-background text-foreground hover:bg-background/90",
        className
      )}
    >
      <a href={buildWhatsAppLink(message)} target="_blank" rel="noopener noreferrer">
        <WhatsappIcon className="size-4" />
        {label}
      </a>
    </Button>
  );
}
