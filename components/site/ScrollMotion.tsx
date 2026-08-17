"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.16, margin: "0px 0px -8%" });
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const offsets = { up: 42, down: -42, left: 42, right: -42 };
  const axis = "y";
  const offset = direction === "left" || direction === "right" ? 28 : offsets[direction];

  return (
    <motion.div
      ref={ref}
      className={`min-w-0 max-w-full overflow-x-clip ${className ?? ""}`}
      initial={{ opacity: 0, [axis]: reducedMotion || (isMobile && axis === "x") ? 0 : offset, filter: reducedMotion ? "blur(0px)" : "blur(8px)" }}
      animate={isInView ? { opacity: 1, [axis]: 0, filter: "blur(0px)" } : undefined}
      transition={{ duration: reducedMotion ? 0.01 : 0.85, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="scroll-progress"
      style={{ scaleX, transformOrigin: "0% 50%" }}
    />
  );
}

export function HeroDepth({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const reducedMotion = useReducedMotion();
  const y = useTransform(scrollY, [0, 800], [0, reducedMotion ? 0 : 120]);
  const scale = useTransform(scrollY, [0, 800], [1, reducedMotion ? 1 : 1.08]);
  const opacity = useTransform(scrollY, [0, 550], [1, 0.35]);

  return <motion.div className="max-w-full overflow-x-clip" style={{ y, scale, opacity }}>{children}</motion.div>;
}
