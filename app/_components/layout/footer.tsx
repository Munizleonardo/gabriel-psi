import Link from "next/link";
import { AtSign, Mail, MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/app/_lib/whatsapp";
import { PSYCHOLOGIST } from "@/app/_lib/constants";

const WHATSAPP_MESSAGE = "Olá, Gabriel! Vim pelo site e gostaria de agendar uma consulta.";

const NAV = [
  { href: "/#inicio", label: "Início" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#faq", label: "Perguntas frequentes" },
  { href: "/#contato", label: "Contato" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark-brown text-dark-brown-foreground/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.6fr_1fr_1fr_1.1fr]">
        <div className="flex flex-col gap-3">
          <span className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="grid size-8 place-items-center rounded-full bg-dark-brown-foreground/10 font-heading text-base"
            >
              Ψ
            </span>
            <span className="font-heading text-base text-dark-brown-foreground">
              {PSYCHOLOGIST.fullTitle}
            </span>
          </span>
          <span className="text-sm">CRP {PSYCHOLOGIST.crp}</span>
          <span className="max-w-xs text-sm">
            Psicólogo clínico. Atendimento online para todo o Brasil e presencial na Região dos
            Lagos (RJ).
          </span>
        </div>

        <FooterCol title="Navegação">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-dark-brown-foreground">
              {item.label}
            </Link>
          ))}
          <Link
            href="/politica-de-privacidade"
            className="transition-colors hover:text-dark-brown-foreground"
          >
            Política de Privacidade
          </Link>
        </FooterCol>

        <FooterCol title="Atendimento">
          <span>Segunda a sexta</span>
          <span>Sessões de ~50 min</span>
          <span>Online e presencial</span>
        </FooterCol>

        <FooterCol title="Contato">
          <a
            href={buildWhatsAppLink(WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-dark-brown-foreground"
          >
            <MessageCircle className="size-4" />
            WhatsApp
          </a>
          <a
            href={`mailto:${PSYCHOLOGIST.email}`}
            className="flex items-center gap-2 transition-colors hover:text-dark-brown-foreground"
          >
            <Mail className="size-4" />
            {PSYCHOLOGIST.email}
          </a>
          <a
            href={PSYCHOLOGIST.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-dark-brown-foreground"
          >
            <AtSign className="size-4" />
            {PSYCHOLOGIST.instagramHandle}
          </a>
        </FooterCol>
      </div>

      <div className="border-t border-dark-brown-foreground/12 px-6 py-5 sm:pr-24">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {PSYCHOLOGIST.fullTitle}. Todos os direitos reservados.
          </span>
          <span>
            {PSYCHOLOGIST.name} · CRP {PSYCHOLOGIST.crp}
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 text-sm">
      <span className="text-xs font-semibold uppercase tracking-wide text-dark-brown-foreground/50">
        {title}
      </span>
      {children}
    </div>
  );
}
