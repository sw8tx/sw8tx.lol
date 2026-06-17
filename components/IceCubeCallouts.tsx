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
  "left-top": { x: "16%", y: "22%", w: "23%", h: "20%" },
  "right-top": { x: "72%", y: "24%", w: "-18%", h: "18%" },
  "left-bottom": { x: "22%", y: "70%", w: "18%", h: "-16%" },
};

export function IceCubeCallouts({
  callouts,
  progress,
}: {
  callouts: Callout[];
  progress: MotionValue<number>;
}) {
  const reduceMotion = useReducedMotion();
  const parallax = useTransform(progress, [0, 0.5, 1], [0, -8, 10]);

  return (
    <div className="ice-callouts" aria-label="Frozen core modules">
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
                    y: parallax,
                    transitionDelay: `${index * 80}ms`,
                  }
            }
            whileHover={reduceMotion ? undefined : { y: -6, scale: 1.015 }}
          >
            <span className="ice-callout-label">{callout.label}</span>
            <strong>{callout.title}</strong>
            <p>{callout.description}</p>
            <span className="ice-callout-plus" aria-hidden="true">+</span>
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
