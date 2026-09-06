import { NextResponse } from "next/server";
import { contactFormSchema } from "@/app/_lib/contact-schema";
import { INITIAL_CONTACT_EMAIL } from "@/app/_lib/constants";
import { resend } from "@/app/_lib/resend";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, phone, message, company } = parsed.data;

  if (company) {
    return NextResponse.json({ ok: true });
  }

  try {
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
      to: process.env.CONTACT_EMAIL ?? INITIAL_CONTACT_EMAIL,
      replyTo: email,
      subject: `Novo contato pelo site — ${name}`,
      text: `Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone || "não informado"}\n\nMensagem:\n${message}`,
    });

    if (error) {
      console.error("Resend returned an error", error);
      return NextResponse.json({ ok: false }, { status: 502 });
    }
  } catch (error) {
    console.error("Failed to send contact email", error);
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
