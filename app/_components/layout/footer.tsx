import Link from "next/link";
import { AtSign } from "lucide-react";
import { CITIES, PSYCHOLOGIST } from "@/app/_lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-heading text-base text-foreground">{PSYCHOLOGIST.fullTitle}</span>
          <span>CRP {PSYCHOLOGIST.crp}</span>
          <span>
            Atendimento online em todo o Brasil e presencial em {CITIES.caboFrio.name} e{" "}
            {CITIES.saoPedroDaAldeia.name} (RJ)
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <a
            href={PSYCHOLOGIST.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-foreground"
          >
            <AtSign className="size-4" />
            {PSYCHOLOGIST.instagramHandle}
          </a>
          <Link href="/politica-de-privacidade" className="hover:text-foreground">
            Política de Privacidade
          </Link>
        </div>
      </div>

      <div className="border-t border-border px-6 py-4 text-center text-xs text-muted-foreground">
        © {year} {PSYCHOLOGIST.fullTitle}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
