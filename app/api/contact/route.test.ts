import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/app/_lib/resend", () => ({
  resend: { emails: { send: vi.fn() } },
}));

import { resend } from "@/app/_lib/resend";
import { POST } from "./route";

function buildRequest(body: unknown) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.mocked(resend.emails.send).mockReset();
  });

  it("sends an email and returns ok for a valid payload", async () => {
    vi.mocked(resend.emails.send).mockResolvedValueOnce({
      data: { id: "test-id" },
      error: null,
      headers: null,
    });

    const response = await POST(
      buildRequest({
        name: "Maria Silva",
        email: "maria@example.com",
        phone: "",
        message: "Gostaria de agendar uma primeira consulta.",
        company: "",
      })
    );

    expect(response.status).toBe(200);
    expect(resend.emails.send).toHaveBeenCalledTimes(1);
  });

  it("returns 400 and does not send an email for an invalid payload", async () => {
    const response = await POST(buildRequest({ name: "M", email: "not-an-email", message: "curto" }));

    expect(response.status).toBe(400);
    expect(resend.emails.send).not.toHaveBeenCalled();
  });

  it("silently accepts and skips sending when the honeypot field is filled", async () => {
    const response = await POST(
      buildRequest({
        name: "Bot Spam",
        email: "bot@example.com",
        message: "Mensagem qualquer com mais de dez caracteres.",
        company: "preenchido por um bot",
      })
    );

    expect(response.status).toBe(200);
    expect(resend.emails.send).not.toHaveBeenCalled();
  });

  it("returns 502 when Resend throws", async () => {
    vi.mocked(resend.emails.send).mockRejectedValueOnce(new Error("network error"));

    const response = await POST(
      buildRequest({
        name: "Maria Silva",
        email: "maria@example.com",
        message: "Gostaria de agendar uma primeira consulta.",
      })
    );

    expect(response.status).toBe(502);
  });

  it("returns 502 when Resend resolves with an error field", async () => {
    vi.mocked(resend.emails.send).mockResolvedValueOnce({
      data: null,
      error: { name: "validation_error", message: "invalid domain", statusCode: 422 },
      headers: null,
    });

    const response = await POST(
      buildRequest({
        name: "Maria Silva",
        email: "maria@example.com",
        message: "Gostaria de agendar uma primeira consulta.",
      })
    );

    expect(response.status).toBe(502);
  });
});
