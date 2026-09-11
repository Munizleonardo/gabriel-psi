import type { Metadata } from "next";
import { Caveat, DM_Sans, Fraunces } from "next/font/google";
import { FloatingActions } from "@/app/_components/layout/floating-actions";
import { Footer } from "@/app/_components/layout/footer";
import { Navbar } from "@/app/_components/layout/navbar";
import { Toaster } from "@/app/_components/ui/sonner";
import { PSYCHOLOGIST, SITE_URL } from "@/app/_lib/constants";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Fonte cursiva para as anotações "à mão" da colagem de referências
// (seção "Quem sou eu?" > aba "Na psicologia").
const caveat = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PSYCHOLOGIST.fullTitle} | CRP ${PSYCHOLOGIST.crp}`,
    template: `%s | ${PSYCHOLOGIST.fullTitle}`,
  },
  description:
    "Psicólogo (CRP 05/87661) com atendimento online para todo o Brasil e presencial em Cabo Frio e São Pedro da Aldeia, na Região dos Lagos (RJ).",
  formatDetection: { telephone: false, address: false, email: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${dmSans.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
        <FloatingActions />
        <Toaster />
      </body>
    </html>
  );
}
