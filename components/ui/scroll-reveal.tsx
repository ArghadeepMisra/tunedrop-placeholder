"use client";

import { useMemo, type ReactNode } from "react";
import { motion, type Transition, type Variant } from "framer-motion";

const defaultTransition: Transition = {
  duration: 0.25,
  ease: "easeOut",
};

const variants: Record<string, { hidden: Variant; visible: Variant }> = {
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  fadeUpLarge: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

type AnimationType = keyof typeof variants;

interface ScrollRevealProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  animation = "fadeUp",
  delay = 0,
  duration,
  className = "",
  once = true,
}: ScrollRevealProps) {
  const transition: Transition = useMemo(
    () => ({
      ...defaultTransition,
      ...(duration !== undefined && { duration }),
      delay,
    }),
    [duration, delay]
  );

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={variants[animation]}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
