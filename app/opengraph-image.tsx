import { ImageResponse } from "next/og";
import { PSYCHOLOGIST } from "@/app/_lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          backgroundColor: "#f0e7c2",
          color: "#2d120d",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 140,
            height: 140,
            borderRadius: 70,
            backgroundColor: "#3b0014",
            color: "#f0e7c2",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 56,
          }}
        >
          GR
        </div>
        <div style={{ display: "flex", fontSize: 56 }}>{PSYCHOLOGIST.fullTitle}</div>
        <div style={{ display: "flex", fontSize: 28, color: "#586448" }}>
          CRP {PSYCHOLOGIST.crp} · Atendimento online e em Cabo Frio / São Pedro da Aldeia
        </div>
      </div>
    ),
    size
  );
}
