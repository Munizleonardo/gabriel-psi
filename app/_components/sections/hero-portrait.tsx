"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { PSYCHOLOGIST } from "@/app/_lib/constants";

const BLOB_1 = "42% 58% 63% 37% / 45% 44% 56% 55%";
const BLOB_2 = "63% 37% 42% 58% / 55% 56% 44% 45%";

export function HeroPortrait() {
  const reduced = useReducedMotion();
  const float = (d: number, y: number) =>
    reduced
      ? {}
      : {
          animate: { y: [0, y, 0] },
          transition: { duration: d, repeat: Infinity, ease: "easeInOut" as const },
        };

  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm">
      <motion.div
        aria-hidden="true"
        className="absolute -right-6 -top-6 -z-10 size-44 bg-accent sm:size-56"
        style={{ borderRadius: BLOB_1 }}
        {...float(9, -14)}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-8 -left-8 -z-10 size-32 bg-secondary sm:size-40"
        style={{ borderRadius: BLOB_2 }}
        {...float(11, 12)}
      />
      <div className="absolute inset-0 overflow-hidden rounded-full ring-1 ring-dark-brown-foreground/10">
        <Image
          src={PSYCHOLOGIST.photoUrl ?? "/gab1.png"}
          alt={`${PSYCHOLOGIST.name}, psicólogo`}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 768px) 24rem, 80vw"
        />
      </div>
    </div>
  );
}
