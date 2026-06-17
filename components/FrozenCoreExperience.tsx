"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { IceCubeCallouts } from "./IceCubeCallouts";

const IceCubeScene = dynamic(() => import("./IceCubeScene").then((mod) => mod.IceCubeScene), {
  ssr: false,
  loading: () => <div className="frozen-core-canvas-fallback">Loading frozen core...</div>,
});

const callouts = [
  {
    id: "web",
    label: "01 / WEB",
    title: "Interface Systems",
    description: "Polished portfolio, shop and SaaS surfaces built around fast flows.",
    href: "#work",
    position: "left-top" as const,
  },
  {
    id: "motion",
    label: "02 / MOTION",
    title: "Animated Details",
    description: "Micro-interactions, reveal systems, hover energy and page rhythm.",
    href: "#process",
    position: "right-top" as const,
  },
  {
    id: "code",
    label: "03 / CODE",
    title: "Next.js Builds",
    description: "Responsive components with crisp implementation and clean handoff.",
    href: "#contact",
    position: "left-bottom" as const,
  },
];

export function FrozenCoreExperience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 24, mass: 0.22 });
  const copyY = useSpring(useTransform(progress, [0, 0.6], [0, -28]), { stiffness: 110, damping: 24 });
  const copyOpacity = useTransform(progress, [0, 0.12, 0.72], [1, 1, 0.66]);
  const stageScale = useSpring(
    useTransform(progress, [0, 0.22, 0.46, 0.58, 0.8, 1], [0.97, 1.01, 1.06, 1.16, 1.08, 1.03]),
    { stiffness: 118, damping: 20 },
  );
  const stageY = useSpring(useTransform(progress, [0, 0.38, 0.58, 1], [26, 0, -26, -42]), {
    stiffness: 116,
    damping: 22,
  });
  const glowOpacity = useTransform(progress, [0, 0.28, 0.58, 1], [0.48, 0.8, 1, 0.36]);

  return (
    <section className="section studio-section frozen-core-section" id="centerpiece" ref={sectionRef}>
      <div className="section-grid frozen-core-grid">
        <motion.div className="reveal frozen-core-copy" style={{ opacity: copyOpacity, y: reduceMotion ? 0 : copyY }}>
          <p className="section-label">Centerpiece</p>
          <h2 className="section-title">A frozen core, fully in focus.</h2>
          <p className="section-text soft-copy">
            The site stays recognizable, but the object now leads the moment: larger, colder, more
            immersive, and less boxed into a UI frame.
          </p>
        </motion.div>

        <motion.div className="frozen-core-stage-shell reveal delay-1" style={{ scale: stageScale, y: reduceMotion ? 0 : stageY }}>
          <motion.div className="frozen-core-glow" style={{ opacity: glowOpacity }} />
          <div className="frozen-core-stage light-core-stage">
            <IceCubeScene progress={progress} />
            <IceCubeCallouts callouts={callouts} progress={progress} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
