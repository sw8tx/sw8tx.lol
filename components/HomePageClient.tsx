"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import { useRef, useState } from "react";

const message = "made by Sparkle";
const letters = Array.from(message);

export function HomePageClient() {
  const [spread, setSpread] = useState(0);
  const [tilt, setTilt] = useState(0);
  const startPoint = useRef<{ x: number; y: number } | null>(null);

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    startPoint.current = { x: event.clientX, y: event.clientY };
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!startPoint.current) return;

    const distance = Math.hypot(
      event.clientX - startPoint.current.x,
      event.clientY - startPoint.current.y,
    );
    setSpread(Math.min(1, distance / 170));
    setTilt(Math.max(-8, Math.min(8, (event.clientX - startPoint.current.x) / 35)));
  }

  function handlePointerUp() {
    startPoint.current = null;
    setTilt(0);
  }

  return (
    <main
      className="sparkle-stage"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      aria-label="Interactive made by Sparkle lettering"
    >
      <p className="sparkle-credit" aria-label={message}>
        {letters.map((letter, index) => {
          const isSpace = letter === " ";
          const center = (letters.length - 1) / 2;
          const direction = index - center;
          const amount = direction * spread * 38;
          const lift = Math.abs(direction) * spread * 2.5;

          return (
            <span
              className={isSpace ? "sparkle-letter sparkle-space" : "sparkle-letter"}
              key={`${letter}-${index}`}
              style={{
                transform: `translate3d(${amount}px, ${lift}px, 0) rotate(${direction * tilt * 0.16}deg)`,
              }}
              aria-hidden="true"
            >
              {isSpace ? "\u00a0" : letter}
            </span>
          );
        })}
      </p>
    </main>
  );
}
