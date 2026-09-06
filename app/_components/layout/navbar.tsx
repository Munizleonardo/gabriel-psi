"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import { WhatsappButton } from "@/app/_components/shared/whatsapp-button";
import { NAV_LINKS, PSYCHOLOGIST } from "@/app/_lib/constants";

const WHATSAPP_MESSAGE = "Olá, Gabriel! Vim pelo site e gostaria de agendar uma consulta.";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="font-heading text-lg font-medium text-foreground">
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
          <SheetContent side="right" className="flex flex-col gap-6 pt-12">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-foreground"
              >
                {link.label}
              </a>
            ))}
            <WhatsappButton message={WHATSAPP_MESSAGE} />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
