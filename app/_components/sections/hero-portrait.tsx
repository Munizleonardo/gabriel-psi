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
    <div className="relative aspect-square w-48 sm:w-56">
      <motion.div
        aria-hidden="true"
        className="absolute -right-4 -top-4 -z-10 size-28 bg-accent sm:size-36"
        style={{ borderRadius: BLOB_1 }}
        {...float(9, -12)}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-5 -left-5 -z-10 size-20 bg-secondary sm:size-24"
        style={{ borderRadius: BLOB_2 }}
        {...float(11, 10)}
      />
      <div className="absolute inset-0 overflow-hidden rounded-full ring-1 ring-dark-brown-foreground/10">
        <Image
          src={PSYCHOLOGIST.photoUrl ?? "/gab1.png"}
          alt={`${PSYCHOLOGIST.name}, psicólogo`}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 640px) 14rem, 12rem"
        />
      </div>
    </div>
  );
}
