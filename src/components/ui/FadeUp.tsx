import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
}

export function FadeUp({ children, delay = 0, className, yOffset = 40 }: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(4px)", y: yOffset }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Custom spring-like easing for premium feel
      }}
      className={className || ""}
    >
      {children}
    </motion.div>
  );
}
