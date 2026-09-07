import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#3b0014",
          color: "#f0e7c2",
          fontSize: 24,
          fontWeight: 700,
        }}
      >
        Ψ
      </div>
    ),
    size
  );
}
