"use client";

import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { useRef, useState } from "react";

const message = "made by Sparkle";
const letters = Array.from(message);

type CursorPosition = { x: number; y: number } | null;

export function HomePageClient() {
  const [cursor, setCursor] = useState<CursorPosition>(null);
  const [showEmailBubble, setShowEmailBubble] = useState(false);
  const emailBubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function triggerEmailBubble() {
    if (emailBubbleTimer.current) clearTimeout(emailBubbleTimer.current);
    setShowEmailBubble(true);
    emailBubbleTimer.current = setTimeout(() => setShowEmailBubble(false), 1000);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    setCursor({
      x: (event.clientX - bounds.left) / bounds.width,
      y: (event.clientY - bounds.top) / bounds.height,
    });
  }

  return (
    <main
      className={`sparkle-stage${cursor ? " has-cursor" : ""}`}
      style={
        {
          "--cursor-x": `${(cursor?.x ?? 0.5) * 100}%`,
          "--cursor-y": `${(cursor?.y ?? 0.5) * 100}%`,
        } as CSSProperties
      }
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
          const force = cursor ? Math.max(0, 1 - distance / 0.22) ** 2 : 0;
          const offsetX = distance === 0 ? 0 : (distanceX / distance) * force * 72;
          const offsetY = distance === 0 ? 0 : (distanceY / distance) * force * 60;

          return (
            <span
              className={isSpace ? "sparkle-letter sparkle-space" : "sparkle-letter"}
              key={`${letter}-${index}`}
              style={{
                transform: `translate3d(${offsetX}px, ${offsetY}px, 0)`,
              }}
              aria-hidden="true"
            >
              <span
                className="sparkle-letter-sway"
                style={{ animationDelay: `${index * -0.16}s` }}
              >
                {isSpace ? "\u00a0" : letter}
              </span>
            </span>
          );
        })}
      </p>

      <footer className="sparkle-footer" aria-label="Legal links and contact">
        <nav className="sparkle-legal" aria-label="Legal">
          <a href="/tos">Terms</a>
          <a href="/privacy">Privacy</a>
          <a href="/refund">Refund</a>
        </nav>
        <a
          className={`sparkle-email${showEmailBubble ? " bubble-active" : ""}`}
          href="mailto:info@tylerosthoff.xyz"
          onPointerEnter={triggerEmailBubble}
          onFocus={triggerEmailBubble}
        >
          <span className="sparkle-email-bubble" aria-hidden="true">
            <span className="sparkle-email-wave">👋</span>
          </span>
          info@tylerosthoff.xyz
        </a>
      </footer>
    </main>
  );
}
