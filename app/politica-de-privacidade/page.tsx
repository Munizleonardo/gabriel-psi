import type { Metadata } from "next";
import { PSYCHOLOGIST } from "@/app/_lib/constants";
import { buildMetadata } from "@/app/_lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Política de Privacidade",
  description: "Como os dados enviados pelo formulário de contato são tratados.",
  path: "/politica-de-privacidade",
});

export default function PoliticaDePrivacidadePage() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16 sm:py-24">
      <h1 className="font-heading text-3xl font-medium text-foreground">Política de Privacidade</h1>
      <p className="text-muted-foreground">
        Esta página explica como as informações enviadas pelo formulário de contato deste site são
        utilizadas, em conformidade com a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018).
      </p>

      <h2 className="font-heading text-xl font-medium text-foreground">Quais dados são coletados</h2>
      <p className="text-muted-foreground">
        Ao preencher o formulário de contato, coletamos apenas o nome, e-mail, telefone (quando
        informado) e a mensagem enviada. Esses dados são usados exclusivamente para que{" "}
        {PSYCHOLOGIST.name} possa responder ao seu contato.
      </p>

      <h2 className="font-heading text-xl font-medium text-foreground">Como os dados são usados</h2>
      <p className="text-muted-foreground">
        As informações enviadas são encaminhadas por e-mail para {PSYCHOLOGIST.name} e não são
        compartilhadas com terceiros, vendidas ou usadas para fins de marketing. Não armazenamos os
        dados em um banco de dados próprio.
      </p>

      <h2 className="font-heading text-xl font-medium text-foreground">Seus direitos</h2>
      <p className="text-muted-foreground">
        Você pode, a qualquer momento, solicitar a exclusão dos dados enviados, entrando em contato
        pelo e-mail {PSYCHOLOGIST.email} ou pelo WhatsApp disponível no site.
      </p>
    </section>
  );
}
