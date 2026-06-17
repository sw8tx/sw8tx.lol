"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";

export function ScrollProgressRail({ progress }: { progress: MotionValue<number> }) {
  const labels = ["Surface", "Inspect", "Enter Core", "Exit"];
  const fill = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div className="scroll-rail" aria-hidden="true">
      <div className="scroll-rail-track">
        <motion.span className="scroll-rail-fill" style={{ height: fill }} />
      </div>
      <div className="scroll-rail-labels">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}
