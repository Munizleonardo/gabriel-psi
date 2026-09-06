import { describe, expect, it } from "vitest";
import { SITE_URL } from "./constants";
import { buildMetadata } from "./metadata";

describe("buildMetadata", () => {
  it("builds the canonical URL and openGraph fields from the given path", () => {
    const metadata = buildMetadata({
      title: "Título de teste",
      description: "Descrição de teste",
      path: "/psicologo-cabo-frio",
    });

    expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/psicologo-cabo-frio`);
    expect(metadata.openGraph?.title).toBe("Título de teste");
    expect(metadata.openGraph?.url).toBe(`${SITE_URL}/psicologo-cabo-frio`);
  });
});
