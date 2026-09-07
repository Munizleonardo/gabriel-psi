"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

type MotionTag = "div" | "section" | "li" | "article" | "span";

type AnimatedRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Deslocamento vertical inicial, em px. */
  y?: number;
  as?: MotionTag;
};

export function AnimatedReveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
}: AnimatedRevealProps) {
  const reduced = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0 },
  };

  const Tag = motion[as] as typeof motion.div;

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      variants={variants}
    >
      {children}
    </Tag>
  );
}
