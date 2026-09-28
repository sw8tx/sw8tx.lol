"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import { useState } from "react";

const message = "made by Sparkle";
const letters = Array.from(message);

type CursorPosition = { x: number; y: number } | null;

export function HomePageClient() {
  const [cursor, setCursor] = useState<CursorPosition>(null);

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    setCursor({
      x: (event.clientX - bounds.left) / bounds.width,
      y: (event.clientY - bounds.top) / bounds.height,
    });
  }

  return (
    <main
      className="sparkle-stage"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setCursor(null)}
      aria-label="Interactive made by Sparkle lettering"
    >
      <p className="sparkle-credit" aria-label={message}>
        {letters.map((letter, index) => {
          const isSpace = letter === " ";
          const letterX = 0.36 + (index / (letters.length - 1)) * 0.28;
          const letterY = 0.5;
          const distanceX = letterX - (cursor?.x ?? 0.5);
          const distanceY = letterY - (cursor?.y ?? 0.5);
          const distance = Math.hypot(distanceX, distanceY);
          const force = cursor ? Math.max(0, 1 - distance / 0.32) : 0;
          const offsetX = distance === 0 ? 0 : (distanceX / distance) * force * 88;
          const offsetY = distance === 0 ? 0 : (distanceY / distance) * force * 88;

          return (
            <span
              className={isSpace ? "sparkle-letter sparkle-space" : "sparkle-letter"}
              key={`${letter}-${index}`}
              style={{
                transform: `translate3d(${offsetX}px, ${offsetY}px, 0) rotate(${offsetX * 0.06}deg)`,
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
