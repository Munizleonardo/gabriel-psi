import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { PSYCHOLOGIST, SITE_URL } from "@/app/_lib/constants";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PSYCHOLOGIST.fullTitle} | CRP ${PSYCHOLOGIST.crp}`,
    template: `%s | ${PSYCHOLOGIST.fullTitle}`,
  },
  description:
    "Psicólogo (CRP 05/87661) com atendimento online para todo o Brasil e presencial em Cabo Frio e São Pedro da Aldeia, na Região dos Lagos (RJ).",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
