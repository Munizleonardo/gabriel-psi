import { describe, expect, it } from "vitest";
import { contactFormSchema } from "./contact-schema";

describe("contactFormSchema", () => {
  it("accepts a valid payload without the honeypot field filled", () => {
    const result = contactFormSchema.safeParse({
      name: "Maria Silva",
      email: "maria@example.com",
      phone: "",
      message: "Gostaria de agendar uma primeira consulta.",
      company: "",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = contactFormSchema.safeParse({
      name: "Maria Silva",
      email: "not-an-email",
      message: "Gostaria de agendar uma primeira consulta.",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a message that is too short", () => {
    const result = contactFormSchema.safeParse({
      name: "Maria Silva",
      email: "maria@example.com",
      message: "Oi",
    });

    expect(result.success).toBe(false);
  });
});
