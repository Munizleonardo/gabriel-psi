import { describe, expect, it } from "vitest";
import { PSYCHOLOGIST } from "./constants";
import { buildWhatsAppLink } from "./whatsapp";

describe("buildWhatsAppLink", () => {
  it("encodes the message and includes the psychologist's WhatsApp number", () => {
    const link = buildWhatsAppLink("Olá, Gabriel! Gostaria de agendar uma consulta.");

    expect(link).toBe(
      `https://wa.me/${PSYCHOLOGIST.whatsappNumber}?text=Ol%C3%A1%2C%20Gabriel!%20Gostaria%20de%20agendar%20uma%20consulta.`
    );
  });
});
