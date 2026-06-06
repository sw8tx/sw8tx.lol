"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const tags = [
  "Rocket League Freestyler",
  "Roblox Trader",
  "Limited Seller",
  "Discord Vendor",
  "sw8tx",
];

const footer = {
  Products: ["Discord Boosts", "Nitro", "Giftlinks", "Nitro Accounts", "Partner Programm", "Members"],
  Company: ["About Us", "Contact", "Blog", "Careers"],
  Support: ["Help Center", "Terms of Service", "Privacy Policy", "Refund Policy", "Status"],
  Community: ["Discord Server", "Twitter", "Tiktok", "Reviews", "FAQ", "Partners"],
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

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
          background: linear-gradient(to bottom, rgba(14,12,10,0.95) 0%, transparent 100%);
          backdrop-filter: blur(10px);
        }
        .nav-logo-wrap {
          width: 36px; height: 36px;
          border-radius: 6px;
          overflow: hidden;
          perspective: 600px;
        }
        .nav-logo-inner {
          width: 100%; height: 100%;
          animation: spin3d 6s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        .nav-logo-inner:hover {
          animation: spin3d-fast 0.6s ease-in-out infinite;
        }
        @keyframes spin3d {
          0%   { transform: rotateY(0deg); }
          20%  { transform: rotateY(180deg); }
          40%  { transform: rotateY(360deg); }
          60%  { transform: rotateY(360deg) rotateX(20deg); }
          80%  { transform: rotateY(540deg) rotateX(0deg); }
          100% { transform: rotateY(720deg); }
        }
        @keyframes spin3d-fast {
          0%   { transform: rotateY(0deg) rotateX(0deg); }
          25%  { transform: rotateY(90deg) rotateX(15deg); }
          50%  { transform: rotateY(180deg) rotateX(0deg); }
          75%  { transform: rotateY(270deg) rotateX(-15deg); }
          100% { transform: rotateY(360deg) rotateX(0deg); }
        }
        .nav-name {
          font-weight: 800; font-size: 15px;
          letter-spacing: 0.06em;
          color: rgba(237,232,224,0.7);
          margin-left: 12px;
        }
        .nav-right {
          margin-left: auto;
          display: flex; gap: 24px;
        }
        .nav-link {
          font-family: 'Syne Mono', monospace;
          font-size: 10px; letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(237,232,224,0.3);
          text-decoration: none;
          transition: color 0.2s;
        }
        .nav-link:hover { color: rgba(237,232,224,0.7); }

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
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .eyebrow {
          font-family: 'Syne Mono', monospace;
          font-size: clamp(10px, 2vw, 12px);
          letter-spacing: 0.35em; text-transform: uppercase;
          color: rgba(237,232,224,0.4);
          margin-bottom: 20px;
          opacity: 0; animation: fadeUp 0.8s ease forwards 0.2s;
        }
        .title {
          font-size: clamp(64px, 16vw, 144px);
          font-weight: 800; letter-spacing: -0.02em; line-height: 0.9;
          color: #f5f0e8;
          text-shadow: 0 2px 60px rgba(245,240,232,0.06);
          animation: float 4s ease-in-out infinite, fadeUp 0.8s ease forwards 0.3s;
          opacity: 0; cursor: default;
          transition: text-shadow 0.3s;
        }
        .title:hover { text-shadow: 0 0 80px rgba(245,240,232,0.18), 0 2px 40px rgba(245,240,232,0.06); }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        .divider-line {
          width: 1px; height: 44px;
          background: linear-gradient(to bottom, transparent, rgba(237,232,224,0.2), transparent);
          margin: 28px auto;
          opacity: 0; animation: fadeUp 0.8s ease forwards 0.45s;
        }
        .scroll-hint {
          margin-top: 64px;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          opacity: 0; animation: fadeUp 0.8s ease forwards 0.9s;
          cursor: pointer; text-decoration: none;
        }
        .scroll-hint span {
          font-family: 'Syne Mono', monospace; font-size: 9px;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(237,232,224,0.2);
        }
        .scroll-arrow {
          width: 1px; height: 32px;
          background: linear-gradient(to bottom, rgba(237,232,224,0.2), transparent);
          animation: arrowPulse 2s ease-in-out infinite;
        }
        @keyframes arrowPulse {
          0%,100% { opacity: 0.4; } 50% { opacity: 1; }
        }

        /* ABOUT */
        .about {
          max-width: 720px; margin: 0 auto;
          padding: 100px 2rem 80px;
        }
        .section-tag {
          font-family: 'Syne Mono', monospace; font-size: 10px;
          letter-spacing: 0.35em; text-transform: uppercase;
          color: rgba(237,232,224,0.3); margin-bottom: 20px; display: block;
        }
        .about-heading {
          font-size: clamp(32px, 6vw, 56px); font-weight: 800;
          letter-spacing: -0.02em; line-height: 1.05;
          color: #f5f0e8; margin-bottom: 32px;
        }
        .about-heading em { font-style: normal; color: rgba(245,240,232,0.35); }
        .about-body { font-size: clamp(15px, 2.2vw, 17px); font-weight: 400; line-height: 1.75; color: rgba(237,232,224,0.6); }
        .about-body p + p { margin-top: 20px; }
        .about-body strong { color: rgba(237,232,224,0.85); font-weight: 700; }
        .tags { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 40px; }
        .tag {
          font-family: 'Syne Mono', monospace; font-size: 10px;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(237,232,224,0.45);
          border: 1px solid rgba(237,232,224,0.1);
          border-radius: 4px; padding: 6px 14px;
          transition: border-color 0.2s, color 0.2s, transform 0.2s;
          cursor: default;
        }
        .tag:hover { border-color: rgba(237,232,224,0.3); color: rgba(237,232,224,0.8); transform: translateY(-2px); }

        /* OFFERS */
        .offers { max-width: 720px; margin: 0 auto; padding: 0 2rem 100px; }
        .offers-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 32px; }
        .offer-card {
          background: #131109; border: 1px solid rgba(237,232,224,0.07);
          border-radius: 10px; padding: 24px 20px;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
          cursor: default;
        }
        .offer-card:hover { border-color: rgba(237,232,224,0.18); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
        .offer-icon { font-size: 22px; margin-bottom: 14px; display: block; }
        .offer-title { font-weight: 800; font-size: 15px; color: #f5f0e8; margin-bottom: 8px; }
        .offer-desc { font-size: 13px; line-height: 1.6; color: rgba(237,232,224,0.45); }

        /* FOOTER */
        .site-footer {
          background: #080706;
          border-top: 1px solid rgba(237,232,224,0.07);
          padding: 64px 2rem 32px;
        }
        .footer-grid {
          max-width: 960px; margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px 24px;
          padding-bottom: 48px;
          border-bottom: 1px solid rgba(237,232,224,0.07);
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .footer-col-title {
          font-weight: 800; font-size: 13px;
          color: #f5f0e8; margin-bottom: 16px;
          letter-spacing: 0.02em;
        }
        .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .footer-col ul li a {
          font-size: 13px; color: rgba(237,232,224,0.4);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-col ul li a:hover { color: rgba(237,232,224,0.8); }
        .footer-bottom {
          max-width: 960px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 28px;
          flex-wrap: wrap; gap: 16px;
        }
        .footer-brand {
          display: flex; align-items: center; gap: 10px;
        }
        .footer-brand-logo {
          width: 28px; height: 28px; border-radius: 4px; overflow: hidden; opacity: 0.7;
        }
        .footer-brand-name {
          font-weight: 800; font-size: 14px;
          color: rgba(237,232,224,0.5);
          letter-spacing: 0.04em;
        }
        .footer-copy {
          font-family: 'Syne Mono', monospace; font-size: 10px;
          letter-spacing: 0.15em; color: rgba(237,232,224,0.25);
        }
        .footer-links {
          display: flex; gap: 20px;
        }
        .footer-links a {
          font-family: 'Syne Mono', monospace; font-size: 10px;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: rgba(237,232,224,0.3); text-decoration: none;
          transition: color 0.2s;
        }
        .footer-links a:hover { color: rgba(237,232,224,0.7); }

        /* CORNER DECORATIONS */
        .corner {
          position: fixed; width: 14px; height: 14px;
          border-color: rgba(237,232,224,0.1); border-style: solid; z-index: 50;
        }
        .corner.tl { top: 20px; left: 20px; border-width: 1px 0 0 1px; }
        .corner.tr { top: 20px; right: 20px; border-width: 1px 1px 0 0; }
        .corner.bl { bottom: 20px; left: 20px; border-width: 0 0 1px 1px; }
        .corner.br { bottom: 20px; right: 20px; border-width: 0 1px 1px 0; }
        @media (max-width: 480px) { .corner { display: none; } }
      `}</style>

      <div className="corner tl" /><div className="corner tr" />
      <div className="corner bl" /><div className="corner br" />

      <nav>
        <div className="nav-logo-wrap">
          <div className="nav-logo-inner">
            <Image src="/logo.png" alt="Sparkle" width={36} height={36} style={{objectFit:"cover", borderRadius:"6px"}} />
          </div>
        </div>
        <span className="nav-name">Sparkle</span>
        <div className="nav-right">
          <a href="#about" className="nav-link">About</a>
          <a href="#offers" className="nav-link">Shop</a>
        </div>
      </nav>

      <section className="hero">
        <div className="bg-glow" />
        <p className="eyebrow">Sparkle&apos;s official website</p>
        <h1 className="title">Sparkle</h1>
        <div className="divider-line" />
        <a href="#about" className="scroll-hint">
          <span>Scroll</span>
          <div className="scroll-arrow" />
        </a>
      </section>

      <section id="about" className="about">
        <span className="section-tag">// About</span>
        <h2 className="about-heading">Hey, I&apos;m Sparkle<em> —</em><br />also known as sw8tx</h2>
        <div className="about-body">
          <p>I&apos;m a <strong>Rocket League freestyler</strong>, known for creative and technical gameplay that pushes what&apos;s possible in the game. Freestyle is more than mechanics to me — it&apos;s expression, and I&apos;ve been grinding it for years.</p>
          <p>On the side, I&apos;m deep in the <strong>Roblox trading scene</strong>. I buy and sell <strong>Roblox Limiteds</strong> — rare items that hold and grow in value over time. Whether you want to sell your items or buy from my stock, I&apos;m always open to deals.</p>
          <p>I also run a <strong>Discord marketplace</strong> where I offer various services and items. Everything is handled with transparency — no middleman BS. If you&apos;re looking for a reliable trader, you&apos;re in the right place.</p>
          <p>This is my <strong>official site</strong> — the one place where everything comes together. The full shop, my portfolio, and all the ways to reach me.</p>
        </div>
        <div className="tags">
          {tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      </section>

      <section id="offers" className="offers">
        <span className="section-tag">// What I offer</span>
        <h2 className="about-heading">Services &amp; Products</h2>
        <div className="offers-grid">
          {[
            { icon: "🎮", title: "RL Freestyle", desc: "Clips, content, and freestyle showcases. Follow my journey in competitive creative play." },
            { icon: "📦", title: "Roblox Limiteds", desc: "Buying and selling rare Roblox limited items. Fair prices, fast trades, trusted seller." },
            { icon: "🛒", title: "Discord Shop", desc: "Various items and services available through my Discord. DM me to see what's in stock." },
            { icon: "🤝", title: "Trading", desc: "Open to trades across platforms. Transparent, no scams, always communicative." },
          ].map(o => (
            <div key={o.title} className="offer-card">
              <span className="offer-icon">{o.icon}</span>
              <div className="offer-title">{o.title}</div>
              <div className="offer-desc">{o.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-grid">
          {Object.entries(footer).map(([col, items]) => (
            <div key={col} className="footer-col">
              <div className="footer-col-title">{col}</div>
              <ul>
                {items.map(item => (
                  <li key={item}><a href="#">{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <div className="footer-brand">
            <div className="footer-brand-logo">
              <Image src="/logo.png" alt="Sparkle" width={28} height={28} style={{objectFit:"cover"}} />
            </div>
            <span className="footer-brand-name">Sparkle</span>
          </div>
          <span className="footer-copy">&copy; {new Date().getFullYear()} Sparkle (sw8tx) — All rights reserved</span>
          <div className="footer-links">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Status</a>
          </div>
        </div>
      </footer>
    </>
  );
}
