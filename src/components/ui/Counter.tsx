import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, useTransform, motion } from "framer-motion";

interface CounterProps {
  value: number;
  direction?: "up" | "down";
  delay?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function Counter({
  value,
  direction = "up",
  delay = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  const count = useMotionValue(direction === "up" ? 0 : value);
  const rounded = useSpring(count, {
    damping: 30,
    stiffness: 100,
  });

  const displayValue = useTransform(rounded, (latest) => {
    const formatted = latest.toFixed(decimals);
    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    if (inView) {
      const timeout = setTimeout(() => {
        count.set(value);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    } else {
      count.set(direction === "up" ? 0 : value);
    }
  }, [inView, value, count, delay, direction]);

  return (
    <motion.span ref={ref} className={className}>
      {displayValue}
    </motion.span>
  );
}
