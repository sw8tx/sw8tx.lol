"use client";

import { motion, type MotionValue, useReducedMotion, useTransform } from "framer-motion";
import type { CSSProperties } from "react";

type Callout = {
  id: string;
  label: string;
  title: string;
  description: string;
  href: string;
  position: "left-top" | "right-top" | "left-bottom";
};

const positionStyles: Record<Callout["position"], { x: string; y: string; w: string; h: string }> = {
  "left-top": { x: "22%", y: "28%", w: "16%", h: "12%" },
  "right-top": { x: "78%", y: "30%", w: "-14%", h: "12%" },
  "left-bottom": { x: "26%", y: "72%", w: "14%", h: "-12%" },
};

export function IceCubeCallouts({
  callouts,
  progress,
  active,
}: {
  callouts: readonly Callout[];
  progress: MotionValue<number>;
  active: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const parallax = useTransform(progress, [0, 0.5, 1], [0, -8, 10]);
  const popPush = useTransform(progress, [0, 0.42, 0.58, 0.76, 1], [0, 0, 18, 8, 0]);
  const popPull = useTransform(popPush, (value) => -value);

  return (
    <div className={`ice-callouts${active ? " hud-active" : ""}`} aria-label="Frozen core modules">
      <svg className="ice-callout-lines" aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none">
        {callouts.map((callout) => {
          const pos = positionStyles[callout.position];
          return (
            <line
              key={callout.id}
              x1="50"
              y1="50"
              x2={pos.x.replace("%", "")}
              y2={pos.y.replace("%", "")}
            />
          );
        })}
      </svg>

      {callouts.map((callout, index) => {
        const pos = positionStyles[callout.position];
        return (
          <motion.a
            aria-label={`${callout.title}. ${callout.description}`}
            className={`ice-callout ice-callout-${callout.position}`}
            href={callout.href}
            key={callout.id}
            style={
              reduceMotion
                ? undefined
                : {
                    x:
                      callout.position === "right-top"
                        ? popPush
                        : callout.position === "left-top" || callout.position === "left-bottom"
                          ? popPull
                          : 0,
                    y: parallax,
                    transitionDelay: `${index * 80}ms`,
                  }
            }
            whileHover={reduceMotion ? undefined : { y: -6, scale: 1.015 }}
          >
            <span className="ice-callout-label">{callout.label}</span>
            <strong>{callout.title}</strong>
            <span
              aria-hidden="true"
              className="ice-callout-point"
              style={{ "--callout-x": pos.x, "--callout-y": pos.y, "--connector-w": pos.w, "--connector-h": pos.h } as CSSProperties}
            />
          </motion.a>
        );
      })}
    </div>
  );
}
