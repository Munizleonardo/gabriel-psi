import Image from "next/image";
import { HERO_BACKGROUND_IMAGES } from "@/app/_lib/constants";

export function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      <Image
        src={HERO_BACKGROUND_IMAGES.first.src}
        alt={HERO_BACKGROUND_IMAGES.first.alt}
        fill
        priority
        className="hero-crossfade-a object-cover"
      />
      <Image
        src={HERO_BACKGROUND_IMAGES.second.src}
        alt={HERO_BACKGROUND_IMAGES.second.alt}
        fill
        className="hero-crossfade-b object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/95 via-secondary/85 to-secondary/95" />
    </div>
  );
}
