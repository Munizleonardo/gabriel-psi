import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Atendimento presencial em Cabo Frio suspenso por enquanto.
  async redirects() {
    return [
      {
        source: "/psicologo-cabo-frio",
        destination: "/psicologo-sao-pedro-da-aldeia",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
