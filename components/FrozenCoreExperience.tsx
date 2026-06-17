"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { IceCubeCallouts } from "./IceCubeCallouts";
import { ScrollProgressRail } from "./ScrollProgressRail";

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
  const stageScale = useSpring(useTransform(progress, [0, 0.5, 0.9], [0.96, 1.02, 1.08]), { stiffness: 110, damping: 22 });
  const stageY = useSpring(useTransform(progress, [0, 1], [24, -24]), { stiffness: 110, damping: 24 });
  const glowOpacity = useTransform(progress, [0, 0.3, 1], [0.48, 0.9, 0.38]);

  return (
    <section className="spark-section frozen-core" id="centerpiece" ref={sectionRef}>
      <div className="frozen-core-sticky">
        <motion.div className="frozen-core-copy" style={{ opacity: copyOpacity, y: reduceMotion ? 0 : copyY }}>
          <p className="spark-section-label">Centerpiece</p>
          <h2>Frozen Core Experience</h2>
          <p>
            A scroll-led ice cube that keeps the page memorable without fighting the copy. It stays
            calm on desktop, behaves on iPad, and lightens up on smaller devices.
          </p>
          <div className="frozen-core-facts">
            <div>Dark navy atmosphere</div>
            <div>Transparent ice / glass feel</div>
            <div>Subtle motion, no chaos</div>
          </div>
        </motion.div>

        <motion.div className="frozen-core-stage-shell" style={{ scale: stageScale, y: reduceMotion ? 0 : stageY }}>
          <motion.div className="frozen-core-glow" style={{ opacity: glowOpacity }} />
          <div className="frozen-core-stage">
            <IceCubeScene progress={progress} />
            <IceCubeCallouts callouts={callouts} progress={progress} />
            <ScrollProgressRail progress={progress} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
