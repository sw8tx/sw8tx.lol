"use client";
import { useEffect, useState, useRef } from "react";

const TARGET = new Date("2026-06-06T13:00:00");

function FlipUnit({ value, label }: { value: number; label: string }) {
  const [display, setDisplay] = useState(value);
  const [animKey, setAnimKey] = useState(0);
  const prev = useRef(value);

  useEffect(() => {
    if (prev.current !== value) {
      prev.current = value;
      setAnimKey(k => k + 1);
      setDisplay(value);
    }
  }, [value]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="unit">
      <div className="card">
        <span key={animKey} className="num animate">{pad(display)}</span>
      </div>
      <span className="unit-label">{label}</span>
    </div>
  );
}

export default function Home() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const diff = TARGET.getTime() - Date.now();
      if (diff <= 0) { setTime({ d: 0, h: 0, m: 0, s: 0 }); return; }
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&family=Syne+Mono&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; background: #0e0c0a; }
        body {
          font-family: 'Syne', sans-serif;
          color: #ede8e0;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }
        .bg-glow {
          position: fixed; top: -20%; left: 50%;
          transform: translateX(-50%);
          width: 600px; height: 500px;
          background: radial-gradient(ellipse, rgba(196,168,120,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .wrapper {
          position: relative; z-index: 10;
          text-align: center;
          display: flex; flex-direction: column;
          align-items: center;
          padding: 2rem 1.5rem;
          width: 100%; max-width: 700px;
          opacity: 0; transform: translateY(16px);
          animation: fadeUp 0.9s ease forwards 0.1s;
        }
        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
        .eyebrow {
          font-family: 'Syne Mono', monospace;
          font-size: clamp(9px, 2vw, 11px);
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: rgba(237,232,224,0.3);
          margin-bottom: 20px;
        }
        .title {
          font-size: clamp(52px, 14vw, 128px);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 0.9;
          color: #ede8e0;
        }
        .title span { color: rgba(237,232,224,0.18); }
        .divider-line {
          width: 1px; height: 40px;
          background: linear-gradient(to bottom, transparent, rgba(237,232,224,0.15), transparent);
          margin: 28px auto;
        }
        .releasing-label {
          font-family: 'Syne Mono', monospace;
          font-size: clamp(9px, 2vw, 10px);
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(237,232,224,0.28);
          margin-bottom: 36px;
        }
        .countdown {
          display: flex;
          gap: clamp(6px, 2.5vw, 20px);
          align-items: flex-start;
        }
        .unit {
          display: flex; flex-direction: column;
          align-items: center; gap: 12px;
        }
        .card {
          width: clamp(64px, 15vw, 106px);
          height: clamp(72px, 17vw, 118px);
          border-radius: 6px;
          background: #1a1612;
          border: 1px solid rgba(237,232,224,0.07);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }
        .num {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(30px, 7.5vw, 56px);
          color: #ede8e0;
          line-height: 1;
          display: block;
        }
        .num.animate {
          animation: slideIn 0.3s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes slideIn {
          0%   { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .unit-label {
          font-family: 'Syne Mono', monospace;
          font-size: clamp(8px, 1.8vw, 10px);
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(237,232,224,0.22);
        }
        .sep {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(24px, 6vw, 48px);
          color: rgba(237,232,224,0.12);
          margin-top: clamp(18px, 4vw, 34px);
        }
        .date-hint {
          margin-top: 40px;
          font-family: 'Syne Mono', monospace;
          font-size: clamp(9px, 2vw, 11px);
          letter-spacing: 0.3em;
          color: rgba(237,232,224,0.18);
          text-transform: uppercase;
        }
        .footer {
          position: fixed; bottom: 24px;
          left: 0; right: 0; text-align: center;
          font-family: 'Syne Mono', monospace;
          font-size: clamp(8px, 1.5vw, 10px);
          letter-spacing: 0.22em;
          color: rgba(237,232,224,0.14);
          text-transform: uppercase;
          z-index: 10;
        }
        .corner {
          position: fixed;
          width: 14px; height: 14px;
          border-color: rgba(237,232,224,0.1);
          border-style: solid;
        }
        .corner.tl { top: 20px; left: 20px; border-width: 1px 0 0 1px; }
        .corner.tr { top: 20px; right: 20px; border-width: 1px 1px 0 0; }
        .corner.bl { bottom: 20px; left: 20px; border-width: 0 0 1px 1px; }
        .corner.br { bottom: 20px; right: 20px; border-width: 0 1px 1px 0; }
        @media (max-width: 480px) { .corner { display: none; } }
      `}</style>

      <div className="bg-glow" />
      <div className="corner tl" /><div className="corner tr" />
      <div className="corner bl" /><div className="corner br" />

      <main className="wrapper">
        <p className="eyebrow">Sparkle&apos;s official website</p>
        <h1 className="title">Sparkle<span>.</span></h1>
        <div className="divider-line" />
        <p className="releasing-label">Releasing in</p>

        {mounted && (
          <div className="countdown">
            <FlipUnit value={time.d} label="Days" />
            <span className="sep">:</span>
            <FlipUnit value={time.h} label="Hours" />
            <span className="sep">:</span>
            <FlipUnit value={time.m} label="Min" />
            <span className="sep">:</span>
            <FlipUnit value={time.s} label="Sec" />
          </div>
        )}

        <p className="date-hint">06.06 — 13:00</p>
      </main>

      <footer className="footer">
        &copy; {new Date().getFullYear()} Sparkle (sw8tx) — All rights reserved
      </footer>
    </>
  );
}
