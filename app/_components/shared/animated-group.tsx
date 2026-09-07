"use client";

import { Children, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

const container: Variants = { hidden: {}, visible: {} };
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

type AnimatedGroupProps = {
  children: ReactNode;
  className?: string;
  /** Atraso entre a entrada de cada filho, em segundos. */
  stagger?: number;
};

/**
 * Envolve um grid/lista: cada filho direto entra com fade + subida em
 * sequência quando o grupo aparece na viewport. Consumidores passam
 * elementos comuns (a div de motion é adicionada aqui).
 */
export function AnimatedGroup({ children, className, stagger = 0.08 }: AnimatedGroupProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
      transition={{ staggerChildren: stagger }}
    >
      {Children.map(children, (child) => (
        <motion.div
          data-reveal=""
          variants={item}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
