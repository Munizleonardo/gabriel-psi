"use client";

import { useState } from "react";
import Link from "next/link";
import { AtSign, ChevronRight, Menu } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { WhatsappButton } from "@/app/_components/shared/whatsapp-button";
import { WhatsappIcon } from "@/app/_components/shared/whatsapp-icon";
import { buildWhatsAppLink } from "@/app/_lib/whatsapp";
import { NAV_LINKS, PSYCHOLOGIST } from "@/app/_lib/constants";

const WHATSAPP_MESSAGE = "Olá, Gabriel! Vim pelo site e gostaria de agendar uma consulta.";

function Brand() {
  return (
    <span className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="grid size-9 shrink-0 place-items-center rounded-full bg-dark-green-foreground/10 font-heading text-lg leading-none"
      >
        Ψ
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-heading text-base font-medium">{PSYCHOLOGIST.fullTitle}</span>
        <span className="text-xs text-dark-green-foreground/60">CRP {PSYCHOLOGIST.crp}</span>
      </span>
    </span>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-dark-green text-dark-green-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" aria-label={`${PSYCHOLOGIST.fullTitle}, início`}>
          <Brand />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-dark-green-foreground/80 transition-colors hover:text-dark-green-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={PSYCHOLOGIST.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="grid size-9 place-items-center rounded-full border border-dark-green-foreground/25 transition-colors hover:bg-dark-green-foreground/10"
          >
            <AtSign className="size-4" />
          </a>
          <a
            href={buildWhatsAppLink(WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="grid size-9 place-items-center rounded-full border border-dark-green-foreground/25 transition-colors hover:bg-dark-green-foreground/10"
          >
            <WhatsappIcon className="size-4" />
          </a>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="border-dark-green-foreground/30 bg-transparent text-dark-green-foreground hover:bg-dark-green-foreground/10 hover:text-dark-green-foreground md:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-sm">
            <SheetHeader className="shrink-0 border-b border-border px-6 py-5 pr-14 text-left">
              <SheetTitle className="font-heading text-lg font-medium text-foreground">
                {PSYCHOLOGIST.fullTitle}
              </SheetTitle>
              <SheetDescription className="text-sm text-muted-foreground">
                CRP {PSYCHOLOGIST.crp}
              </SheetDescription>
            </SheetHeader>

            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {link.label}
                  <ChevronRight className="size-4 text-muted-foreground" />
                </a>
              ))}
            </nav>

            <div className="shrink-0 space-y-3 border-t border-border p-6">
              <a
                href={PSYCHOLOGIST.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                <AtSign className="size-4" />
                Me siga no Instagram
              </a>
              <WhatsappButton message={WHATSAPP_MESSAGE} className="w-full" />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
