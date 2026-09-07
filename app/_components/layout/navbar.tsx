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
import { NAV_LINKS, PSYCHOLOGIST } from "@/app/_lib/constants";

const WHATSAPP_MESSAGE = "Olá, Gabriel! Vim pelo site e gostaria de agendar uma consulta.";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="font-heading text-base font-medium text-foreground sm:text-lg"
        >
          {PSYCHOLOGIST.fullTitle}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <WhatsappButton message={WHATSAPP_MESSAGE} />
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden" aria-label="Abrir menu">
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

            <div className="shrink-0 space-y-4 border-t border-border p-6">
              <a
                href={PSYCHOLOGIST.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <AtSign className="size-4" />
                {PSYCHOLOGIST.instagramHandle}
              </a>
              <WhatsappButton message={WHATSAPP_MESSAGE} className="w-full" />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
