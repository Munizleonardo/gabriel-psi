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
  /**
   * Se true (padrão), só anima quando entra na viewport ao rolar a página.
   * Use false para conteúdo que troca por interação (ex.: abas) e precisa
   * aparecer na hora, sem depender de rolagem — por exemplo quando o
   * conteúdo trocado é mais alto que a viewport atual.
   */
  onView?: boolean;
};

export function AnimatedReveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
  onView = true,
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

  const trigger = onView
    ? { whileInView: "visible", viewport: { once: true, amount: 0.2 } }
    : { animate: "visible" };

  return (
    <Tag
      data-reveal=""
      className={className}
      initial="hidden"
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      variants={variants}
      {...trigger}
    >
      {children}
    </Tag>
  );
}
