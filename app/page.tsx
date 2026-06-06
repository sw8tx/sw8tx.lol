"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

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

const tags = [
  "Rocket League Freestyler",
  "Roblox Trader",
  "Limited Seller",
  "Discord Vendor",
  "sw8tx",
];

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
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Syne+Mono&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'Syne', sans-serif;
          color: #ede8e0;
          background: #0e0c0a;
          overflow-x: hidden;
        }

        /* NAV */
        nav {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex; align-items: center;
          padding: 18px 32px;
          background: linear-gradient(to bottom, rgba(14,12,10,0.9) 0%, transparent 100%);
          backdrop-filter: blur(8px);
        }
        .nav-logo {
          width: 36px; height: 36px;
          border-radius: 6px;
          overflow: hidden;
          opacity: 0.9;
          transition: opacity 0.2s;
        }
        .nav-logo:hover { opacity: 1; }
        .nav-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 15px;
          letter-spacing: 0.06em;
          color: rgba(237,232,224,0.7);
          margin-left: 12px;
        }
        .nav-scroll {
          margin-left: auto;
          font-family: 'Syne Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(237,232,224,0.3);
          cursor: pointer;
          transition: color 0.2s;
          text-decoration: none;
        }
        .nav-scroll:hover { color: rgba(237,232,224,0.7); }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center;
          padding: 100px 1.5rem 2rem;
          position: relative;
        }
        .bg-glow {
          position: absolute; top: -20%; left: 50%;
          transform: translateX(-50%);
          width: 700px; height: 500px;
          background: radial-gradient(ellipse, rgba(196,168,120,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .eyebrow {
          font-family: 'Syne Mono', monospace;
          font-size: clamp(10px, 2vw, 12px);
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(237,232,224,0.4);
          margin-bottom: 20px;
          opacity: 0;
          animation: fadeUp 0.8s ease forwards 0.2s;
        }
        .title {
          font-size: clamp(64px, 16vw, 144px);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 0.9;
          color: #f5f0e8;
          text-shadow: 0 2px 60px rgba(245,240,232,0.06);
          animation: float 4s ease-in-out infinite, fadeUp 0.8s ease forwards 0.3s;
          opacity: 0;
          cursor: default;
        }
        .title:hover {
          text-shadow: 0 0 80px rgba(245,240,232,0.16), 0 2px 40px rgba(245,240,232,0.06);
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
          from { opacity: 0; transform: translateY(14px); }
        }

        .divider-line {
          width: 1px; height: 44px;
          background: linear-gradient(to bottom, transparent, rgba(237,232,224,0.2), transparent);
          margin: 28px auto;
          opacity: 0;
          animation: fadeUp 0.8s ease forwards 0.45s;
        }
        .releasing-label {
          font-family: 'Syne Mono', monospace;
          font-size: clamp(10px, 2vw, 12px);
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(237,232,224,0.35);
          margin-bottom: 32px;
          opacity: 0;
          animation: fadeUp 0.8s ease forwards 0.5s;
        }
        .countdown {
          display: flex;
          gap: clamp(4px, 1.5vw, 12px);
          align-items: flex-start;
          opacity: 0;
          animation: fadeUp 0.8s ease forwards 0.6s;
        }
        .unit { display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .card {
          width: clamp(52px, 11vw, 80px);
          height: clamp(60px, 13vw, 92px);
          border-radius: 7px;
          background: #181410;
          border: 1px solid rgba(237,232,224,0.09);
          box-shadow: 0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03);
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), border-color 0.25s, box-shadow 0.25s;
          cursor: default;
        }
        .card:hover {
          transform: translateY(-5px);
          border-color: rgba(237,232,224,0.28);
          box-shadow: 0 10px 36px rgba(0,0,0,0.5), 0 0 0 1px rgba(237,232,224,0.1), inset 0 1px 0 rgba(255,255,255,0.06);
        }
        .num {
          font-weight: 800;
          font-size: clamp(24px, 5.5vw, 40px);
          color: #f5f0e8;
          line-height: 1;
          letter-spacing: -0.02em;
          transition: color 0.2s;
        }
        .card:hover .num { color: #fff; }
        .num.animate { animation: slideIn 0.28s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(8px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .unit-label {
          font-family: 'Syne Mono', monospace;
          font-size: clamp(7px, 1.5vw, 9px);
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(237,232,224,0.25);
          transition: color 0.2s;
        }
        .unit:hover .unit-label { color: rgba(237,232,224,0.5); }
        .sep {
          font-weight: 800;
          font-size: clamp(20px, 5vw, 36px);
          color: rgba(237,232,224,0.12);
          margin-top: clamp(16px, 3.5vw, 27px);
        }
        .date-hint {
          margin-top: 40px;
          font-family: 'Syne Mono', monospace;
          font-size: clamp(10px, 2vw, 11px);
          letter-spacing: 0.28em;
          color: rgba(237,232,224,0.2);
          text-transform: uppercase;
          opacity: 0;
          animation: fadeUp 0.8s ease forwards 0.8s;
        }
        .scroll-hint {
          margin-top: 64px;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          opacity: 0;
          animation: fadeUp 0.8s ease forwards 1s;
          cursor: pointer;
          text-decoration: none;
        }
        .scroll-hint span {
          font-family: 'Syne Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(237,232,224,0.2);
        }
        .scroll-arrow {
          width: 1px; height: 32px;
          background: linear-gradient(to bottom, rgba(237,232,224,0.2), transparent);
          animation: arrowPulse 2s ease-in-out infinite;
        }
        @keyframes arrowPulse {
          0%,100% { opacity: 0.4; transform: scaleY(1); }
          50%      { opacity: 1; transform: scaleY(1.1); }
        }

        /* ABOUT */
        .about {
          max-width: 720px;
          margin: 0 auto;
          padding: 100px 2rem 80px;
        }
        .section-tag {
          font-family: 'Syne Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(237,232,224,0.3);
          margin-bottom: 20px;
          display: block;
        }
        .about-heading {
          font-size: clamp(32px, 6vw, 56px);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.05;
          color: #f5f0e8;
          margin-bottom: 32px;
        }
        .about-heading em {
          font-style: normal;
          color: rgba(245,240,232,0.35);
        }
        .about-body {
          font-size: clamp(15px, 2.2vw, 17px);
          font-weight: 400;
          line-height: 1.75;
          color: rgba(237,232,224,0.6);
        }
        .about-body p + p { margin-top: 20px; }
        .about-body strong {
          color: rgba(237,232,224,0.85);
          font-weight: 700;
        }

        /* TAGS */
        .tags {
          display: flex; flex-wrap: wrap; gap: 10px;
          margin-top: 40px;
        }
        .tag {
          font-family: 'Syne Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(237,232,224,0.45);
          border: 1px solid rgba(237,232,224,0.1);
          border-radius: 4px;
          padding: 6px 14px;
          transition: border-color 0.2s, color 0.2s, transform 0.2s;
          cursor: default;
        }
        .tag:hover {
          border-color: rgba(237,232,224,0.3);
          color: rgba(237,232,224,0.8);
          transform: translateY(-2px);
        }

        /* OFFERS */
        .offers {
          max-width: 720px;
          margin: 0 auto;
          padding: 0 2rem 100px;
        }
        .offers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-top: 32px;
        }
        .offer-card {
          background: #131109;
          border: 1px solid rgba(237,232,224,0.07);
          border-radius: 10px;
          padding: 24px 20px;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
          cursor: default;
        }
        .offer-card:hover {
          border-color: rgba(237,232,224,0.18);
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.4);
        }
        .offer-icon {
          font-size: 22px;
          margin-bottom: 14px;
          display: block;
        }
        .offer-title {
          font-weight: 800;
          font-size: 15px;
          color: #f5f0e8;
          margin-bottom: 8px;
          letter-spacing: -0.01em;
        }
        .offer-desc {
          font-size: 13px;
          line-height: 1.6;
          color: rgba(237,232,224,0.45);
          font-weight: 400;
        }

        /* DIVIDER */
        .section-divider {
          width: 100%;
          max-width: 720px;
          margin: 0 auto 80px;
          padding: 0 2rem;
        }
        .section-divider hr {
          border: none;
          border-top: 1px solid rgba(237,232,224,0.07);
        }

        /* FOOTER */
        footer {
          text-align: center;
          padding: 32px 2rem;
          font-family: 'Syne Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(237,232,224,0.15);
          border-top: 1px solid rgba(237,232,224,0.06);
        }

        /* CORNERS */
        .corner {
          position: fixed;
          width: 14px; height: 14px;
          border-color: rgba(237,232,224,0.1);
          border-style: solid;
          z-index: 50;
        }
        .corner.tl { top: 20px; left: 20px; border-width: 1px 0 0 1px; }
        .corner.tr { top: 20px; right: 20px; border-width: 1px 1px 0 0; }
        .corner.bl { bottom: 20px; left: 20px; border-width: 0 0 1px 1px; }
        .corner.br { bottom: 20px; right: 20px; border-width: 0 1px 1px 0; }
        @media (max-width: 480px) { .corner { display: none; } }
      `}</style>

      <div className="corner tl" /><div className="corner tr" />
      <div className="corner bl" /><div className="corner br" />

      {/* NAV */}
      <nav>
        <div className="nav-logo">
          <Image src="/logo.png" alt="Sparkle" width={36} height={36} style={{objectFit:"cover"}} />
        </div>
        <span className="nav-name">Sparkle</span>
        <a href="#about" className="nav-scroll">About ↓</a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="bg-glow" />
        <p className="eyebrow">Sparkle&apos;s official website</p>
        <h1 className="title">Sparkle</h1>
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

        <a href="#about" className="scroll-hint">
          <span>Scroll</span>
          <div className="scroll-arrow" />
        </a>
      </section>

      {/* ABOUT */}
      <section id="about" className="about">
        <span className="section-tag">// About</span>
        <h2 className="about-heading">
          Hey, I&apos;m Sparkle<em> —</em><br />also known as sw8tx
        </h2>
        <div className="about-body">
          <p>
            I&apos;m a <strong>Rocket League freestyler</strong>, known for creative and technical gameplay that pushes what&apos;s possible in the game. Freestyle is more than mechanics to me — it&apos;s expression, and I&apos;ve been grinding it for years.
          </p>
          <p>
            On the side, I&apos;m deep in the <strong>Roblox trading scene</strong>. I buy and sell <strong>Roblox Limiteds</strong> — rare items that hold and grow in value over time. Whether you want to sell your items or buy from my stock, I&apos;m always open to deals.
          </p>
          <p>
            I also run a <strong>Discord marketplace</strong> where I offer various services and items. Everything is handled with transparency — no middleman BS. If you&apos;re looking for a reliable trader, you&apos;re in the right place.
          </p>
          <p>
            This is my <strong>official site</strong> — the one place where everything comes together. The full shop, my portfolio, and all the ways to reach me are coming on <strong>06.06</strong>.
          </p>
        </div>
        <div className="tags">
          {tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      </section>

      <div className="section-divider"><hr /></div>

      {/* OFFERS */}
      <section className="offers">
        <span className="section-tag">// What I offer</span>
        <h2 className="about-heading">
          Services &<em> </em>Products
        </h2>
        <div className="offers-grid">
          <div className="offer-card">
            <span className="offer-icon">🎮</span>
            <div className="offer-title">RL Freestyle</div>
            <div className="offer-desc">Clips, content, and freestyle showcases. Follow my journey in competitive creative play.</div>
          </div>
          <div className="offer-card">
            <span className="offer-icon">📦</span>
            <div className="offer-title">Roblox Limiteds</div>
            <div className="offer-desc">Buying and selling rare Roblox limited items. Fair prices, fast trades, trusted seller.</div>
          </div>
          <div className="offer-card">
            <span className="offer-icon">🛒</span>
            <div className="offer-title">Discord Shop</div>
            <div className="offer-desc">Various items and services available through my Discord. DM me to see what&apos;s in stock.</div>
          </div>
          <div className="offer-card">
            <span className="offer-icon">🤝</span>
            <div className="offer-title">Trading</div>
            <div className="offer-desc">Open to trades across platforms. Transparent, no scams, always communicative.</div>
          </div>
        </div>
      </section>

      <footer>
        &copy; {new Date().getFullYear()} Sparkle (sw8tx) — All rights reserved
      </footer>
    </>
  );
}
