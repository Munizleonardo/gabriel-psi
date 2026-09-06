import Image from "next/image";
import { PSYCHOLOGIST } from "@/app/_lib/constants";

type GabrielPhotoProps = {
  className?: string;
  priority?: boolean;
};

export function GabrielPhoto({ className, priority }: GabrielPhotoProps) {
  if (!PSYCHOLOGIST.photoUrl) {
    return (
      <div
        role="img"
        aria-label={`Foto de ${PSYCHOLOGIST.name} (em breve)`}
        className={`flex h-full w-full items-center justify-center bg-primary font-heading text-5xl text-primary-foreground ${className ?? ""}`}
      >
        GR
      </div>
    );
  }

  return (
    <Image
      src={PSYCHOLOGIST.photoUrl}
      alt={`Foto de ${PSYCHOLOGIST.name}, psicólogo`}
      fill
      priority={priority}
      className={`object-cover ${className ?? ""}`}
    />
  );
}
