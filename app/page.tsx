"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const DISCORD_TEXT = `to add me visit https://discord.com/channels/@me/ click on "Add Friends" and type in "sw8tx.lol" for any business request`;

const works = [
  { num: "01", title: "Brand Identity", tag: "Visual Design", year: "2025" },
  { num: "02", title: "Web Experience", tag: "Frontend Dev", year: "2025" },
  { num: "03", title: "Motion Design", tag: "Animation", year: "2024" },
  { num: "04", title: "Digital Store", tag: "UI/UX", year: "2024" },
];

export default function Home() {
  const [popup, setPopup] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setLoaded(true);
    const t = setTimeout(() => setPopup(true), 5000);

    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    let raf: number;
    const animate = () => {
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.12;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove);

    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(DISCORD_TEXT).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        :root {
          --bg: #080808;
          --bg2: #0d0d0d;
          --fg: #f0ece4;
          --fg2: rgba(240,236,228,0.5);
          --fg3: rgba(240,236,228,0.2);
          --fg4: rgba(240,236,228,0.07);
          --accent: #c8b89a;
          --accent2: rgba(200,184,154,0.15);
          --font: 'Space Grotesk', sans-serif;
          --mono: 'Space Mono', monospace;
        }

        body {
          font-family: var(--font);
          background: var(--bg);
          color: var(--fg);
          overflow-x: hidden;
          cursor: none;
        }

        /* ── CURSOR ── */
        .cursor-ring {
          position: fixed; z-index: 9999; pointer-events: none;
          width: 36px; height: 36px; margin: -18px 0 0 -18px;
          border: 1px solid rgba(200,184,154,0.5);
          border-radius: 50%;
          transition: width 0.3s, height 0.3s, border-color 0.3s, background 0.3s;
          will-change: transform;
          top: 0; left: 0;
        }
        .cursor-dot {
          position: fixed; z-index: 9999; pointer-events: none;
          width: 4px; height: 4px; margin: -2px 0 0 -2px;
          background: var(--accent);
          border-radius: 50%;
          top: 0; left: 0;
          will-change: transform;
        }
        a:hover ~ .cursor-ring, button:hover ~ .cursor-ring { width: 56px; height: 56px; background: var(--accent2); }

        /* ── NAV ── */
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; padding: 24px 40px;
          mix-blend-mode: normal;
          transition: background 0.5s, padding 0.4s, border-color 0.5s;
        }
        nav.scrolled {
          background: rgba(8,8,8,0.9);
          backdrop-filter: blur(20px);
          padding: 16px 40px;
          border-bottom: 1px solid var(--fg4);
        }
        .nav-logo {
          display: flex; align-items: center; gap: 12px;
          text-decoration: none; cursor: none;
        }
        .nav-logo-img {
          width: 32px; height: 32px; border-radius: 6px; overflow: hidden;
          border: 1px solid var(--fg4);
          transition: border-color 0.3s;
        }
        .nav-logo:hover .nav-logo-img { border-color: rgba(200,184,154,0.4); }
        .nav-logo-text {
          font-size: 13px; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--fg2);
          transition: color 0.3s;
        }
        .nav-logo:hover .nav-logo-text { color: var(--fg); }
        .nav-right { margin-left: auto; display: flex; gap: 32px; align-items: center; }
        .nav-link {
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--fg3); text-decoration: none;
          transition: color 0.25s; cursor: none;
        }
        .nav-link:hover { color: var(--fg); }
        .nav-cta {
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.15em;
          text-transform: uppercase; color: var(--accent);
          background: none; border: 1px solid rgba(200,184,154,0.25);
          padding: 8px 18px; border-radius: 3px; cursor: none;
          transition: background 0.25s, border-color 0.25s;
        }
        .nav-cta:hover { background: var(--accent2); border-color: rgba(200,184,154,0.6); }

        /* ── HERO ── */
        .hero {
          min-height: 100vh;
          display: flex; flex-direction: column;
          justify-content: flex-end;
          padding: 0 40px 80px;
          position: relative;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 60% 50% at 70% 40%, rgba(200,184,154,0.055) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 20% 80%, rgba(200,184,154,0.03) 0%, transparent 60%);
        }
        .hero-grain {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px;
        }
        .hero-line {
          position: absolute; top: 0; bottom: 0; pointer-events: none;
          width: 1px; background: linear-gradient(to bottom, transparent, var(--fg4) 20%, var(--fg4) 80%, transparent);
        }
        .hero-line-1 { left: 40px; }
        .hero-line-2 { right: 40px; }

        .hero-eyebrow {
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.35em;
          text-transform: uppercase; color: var(--accent);
          margin-bottom: 24px; display: flex; align-items: center; gap: 16px;
          opacity: 0;
          animation: slideUp 1s cubic-bezier(0.16,1,0.3,1) forwards 0.3s;
        }
        .hero-eyebrow::before {
          content: ''; width: 32px; height: 1px; background: var(--accent); opacity: 0.5;
        }

        .hero-title {
          font-size: clamp(72px, 13vw, 200px);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 0.88;
          color: var(--fg);
          margin-bottom: 48px;
          overflow: hidden;
        }
        .hero-title-line {
          display: block; overflow: hidden;
        }
        .hero-title-inner {
          display: block;
          transform: translateY(110%);
          animation: revealUp 1.1s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .hero-title-line:nth-child(2) .hero-title-inner { animation-delay: 0.12s; }
        .hero-title-line:nth-child(3) .hero-title-inner { animation-delay: 0.22s; }

        .hero-title .dim { color: var(--fg3); }

        .hero-bottom {
          display: flex; align-items: flex-end; justify-content: space-between;
          opacity: 0;
          animation: slideUp 1s cubic-bezier(0.16,1,0.3,1) forwards 0.7s;
        }
        .hero-desc {
          max-width: 340px;
          font-size: 15px; line-height: 1.7; color: var(--fg2); font-weight: 300;
        }
        .hero-desc strong { color: var(--fg); font-weight: 500; }
        .hero-scroll {
          display: flex; flex-direction: column; align-items: center; gap: 10px;
          cursor: none; text-decoration: none;
        }
        .hero-scroll span {
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.3em;
          text-transform: uppercase; color: var(--fg3);
          writing-mode: vertical-rl;
        }
        .hero-scroll-line {
          width: 1px; height: 48px;
          background: linear-gradient(to bottom, var(--accent), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.15); }
        }

        /* ── MARQUEE ── */
        .marquee-wrap {
          border-top: 1px solid var(--fg4);
          border-bottom: 1px solid var(--fg4);
          padding: 16px 0; overflow: hidden;
          background: var(--bg2);
        }
        .marquee-track {
          display: flex; gap: 0;
          animation: marquee 22s linear infinite;
          width: max-content;
        }
        .marquee-item {
          display: flex; align-items: center; gap: 32px;
          padding: 0 40px; white-space: nowrap;
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--fg3);
        }
        .marquee-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--accent); opacity: 0.5; flex-shrink: 0; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* ── ABOUT ── */
        .about {
          padding: 140px 40px 120px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
          max-width: 1200px; margin: 0 auto;
        }
        @media (max-width: 768px) { .about { grid-template-columns: 1fr; gap: 48px; padding: 80px 24px; } }
        .about-left {}
        .section-label {
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.35em;
          text-transform: uppercase; color: var(--accent); margin-bottom: 24px;
          display: flex; align-items: center; gap: 12px;
        }
        .section-label::after { content: ''; flex: 1; height: 1px; background: var(--fg4); max-width: 60px; }
        .about-heading {
          font-size: clamp(36px, 5vw, 56px); font-weight: 700;
          letter-spacing: -0.025em; line-height: 1.05; color: var(--fg);
          margin-bottom: 32px;
        }
        .about-heading .muted { color: var(--fg3); }
        .about-body {
          font-size: 16px; line-height: 1.8; color: var(--fg2); font-weight: 300;
        }
        .about-body p + p { margin-top: 18px; }
        .about-body strong { color: var(--fg); font-weight: 500; }
        .about-right { display: flex; flex-direction: column; justify-content: space-between; gap: 40px; }
        .about-stat {
          border-top: 1px solid var(--fg4); padding-top: 24px;
        }
        .about-stat-num {
          font-size: 48px; font-weight: 700; letter-spacing: -0.04em; color: var(--fg);
          line-height: 1;
        }
        .about-stat-num span { font-size: 24px; color: var(--accent); }
        .about-stat-label {
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--fg3); margin-top: 8px;
        }
        .skills-grid {
          display: flex; flex-wrap: wrap; gap: 8px; margin-top: 40px;
        }
        .skill-tag {
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.12em;
          text-transform: uppercase; padding: 7px 14px;
          border: 1px solid var(--fg4); border-radius: 2px; color: var(--fg2);
          transition: border-color 0.25s, color 0.25s, background 0.25s;
          cursor: none;
        }
        .skill-tag:hover { border-color: rgba(200,184,154,0.3); color: var(--fg); background: var(--accent2); }

        /* ── WORK ── */
        .work { padding: 0 40px 120px; max-width: 1200px; margin: 0 auto; }
        @media (max-width: 768px) { .work { padding: 0 24px 80px; } }
        .work-header {
          display: flex; align-items: flex-end; justify-content: space-between;
          margin-bottom: 48px; padding-bottom: 24px;
          border-bottom: 1px solid var(--fg4);
        }
        .work-list { display: flex; flex-direction: column; }
        .work-item {
          display: grid; grid-template-columns: 80px 1fr auto auto;
          align-items: center; gap: 24px;
          padding: 28px 0; border-bottom: 1px solid var(--fg4);
          cursor: none; position: relative; overflow: hidden;
          transition: padding-left 0.4s cubic-bezier(0.16,1,0.3,1);
          text-decoration: none; color: inherit;
        }
        .work-item::before {
          content: ''; position: absolute; left: -100%; top: 0; bottom: 0;
          width: 100%; background: var(--fg4);
          transition: left 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .work-item:hover::before { left: 0; }
        .work-item:hover { padding-left: 16px; }
        .work-num {
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.2em;
          color: var(--fg3); position: relative;
        }
        .work-title {
          font-size: clamp(20px, 3vw, 32px); font-weight: 600;
          letter-spacing: -0.02em; color: var(--fg); position: relative;
          transition: color 0.3s;
        }
        .work-tag {
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.15em;
          text-transform: uppercase; color: var(--accent); position: relative;
        }
        .work-year {
          font-family: var(--mono); font-size: 11px; color: var(--fg3); position: relative;
        }
        @media (max-width: 600px) {
          .work-item { grid-template-columns: 40px 1fr auto; }
          .work-year { display: none; }
        }

        /* ── CONTACT ── */
        .contact {
          padding: 120px 40px 80px; max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
          align-items: start;
        }
        @media (max-width: 768px) { .contact { grid-template-columns: 1fr; gap: 48px; padding: 80px 24px; } }
        .contact-heading {
          font-size: clamp(48px, 8vw, 96px); font-weight: 700;
          letter-spacing: -0.04em; line-height: 0.9; color: var(--fg);
        }
        .contact-heading .line2 { color: var(--fg3); }
        .contact-right { padding-top: 16px; }
        .contact-desc {
          font-size: 16px; line-height: 1.8; color: var(--fg2); font-weight: 300;
          margin-bottom: 40px;
        }
        .contact-links { display: flex; flex-direction: column; gap: 4px; }
        .contact-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 0; border-bottom: 1px solid var(--fg4);
          text-decoration: none; cursor: none; group: true;
          transition: padding-left 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .contact-link:hover { padding-left: 12px; }
        .contact-link-left { display: flex; align-items: center; gap: 16px; }
        .contact-link-icon {
          width: 36px; height: 36px; border-radius: 50%;
          border: 1px solid var(--fg4); display: flex; align-items: center; justify-content: center;
          transition: border-color 0.3s, background 0.3s;
        }
        .contact-link:hover .contact-link-icon { border-color: rgba(200,184,154,0.4); background: var(--accent2); }
        .contact-link-label { font-size: 16px; font-weight: 500; color: var(--fg); }
        .contact-link-sub { font-family: var(--mono); font-size: 10px; letter-spacing: 0.12em; color: var(--fg3); margin-top: 2px; }
        .contact-link-arrow { color: var(--fg3); font-size: 18px; transition: transform 0.3s, color 0.3s; }
        .contact-link:hover .contact-link-arrow { transform: translate(4px, -4px); color: var(--accent); }

        /* ── FOOTER ── */
        .site-footer {
          border-top: 1px solid var(--fg4);
          padding: 32px 40px;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 16px;
        }
        @media (max-width: 600px) { .site-footer { padding: 24px; } }
        .footer-left { display: flex; align-items: center; gap: 12px; }
        .footer-copy {
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.15em;
          color: var(--fg3);
        }
        .footer-links { display: flex; gap: 24px; }
        .footer-link {
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--fg3); text-decoration: none;
          cursor: none; transition: color 0.25s;
        }
        .footer-link:hover { color: var(--fg); }

        /* ── POPUP ── */
        .popup-backdrop {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(8,8,8,0.8); backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center; padding: 1.5rem;
          opacity: 0; pointer-events: none;
          transition: opacity 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .popup-backdrop.visible { opacity: 1; pointer-events: all; }
        .popup {
          background: #111;
          border: 1px solid rgba(200,184,154,0.12);
          border-radius: 4px;
          padding: 40px 36px 32px;
          max-width: 400px; width: 100%;
          position: relative;
          transform: translateY(32px) scale(0.96);
          opacity: 0;
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease;
          box-shadow: 0 40px 120px rgba(0,0,0,0.7), inset 0 1px 0 rgba(200,184,154,0.06);
        }
        .popup-backdrop.visible .popup { transform: translateY(0) scale(1); opacity: 1; }
        .popup-close {
          position: absolute; top: 18px; right: 18px;
          background: none; border: none; cursor: none;
          color: var(--fg3); font-size: 16px; line-height: 1;
          transition: color 0.2s;
        }
        .popup-close:hover { color: var(--fg); }
        .popup-eyebrow {
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.3em;
          text-transform: uppercase; color: var(--accent); margin-bottom: 16px;
          display: flex; align-items: center; gap: 10px;
        }
        .popup-eyebrow::before { content: ''; width: 20px; height: 1px; background: var(--accent); opacity: 0.5; }
        .popup-title {
          font-size: 22px; font-weight: 700; letter-spacing: -0.02em;
          color: var(--fg); margin-bottom: 8px;
        }
        .popup-sub { font-size: 13px; line-height: 1.6; color: var(--fg2); margin-bottom: 28px; font-weight: 300; }
        .popup-btns { display: flex; flex-direction: column; gap: 8px; }
        .popup-btn {
          display: flex; align-items: center; gap: 14px;
          padding: 16px 18px; border-radius: 3px;
          border: 1px solid var(--fg4);
          background: rgba(255,255,255,0.02);
          cursor: none; text-decoration: none;
          color: var(--fg2); font-family: var(--font);
          font-size: 14px; font-weight: 500;
          transition: border-color 0.25s, background 0.25s, color 0.25s, transform 0.2s;
          width: 100%;
        }
        .popup-btn:hover { border-color: rgba(200,184,154,0.25); background: var(--accent2); color: var(--fg); transform: translateX(4px); }
        .popup-btn svg { flex-shrink: 0; opacity: 0.85; }
        .popup-btn-text { flex: 1; }
        .popup-btn-label { display: block; }
        .popup-btn-hint {
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--fg3); margin-top: 2px; display: block;
          transition: color 0.25s;
        }
        .popup-btn.copied { border-color: rgba(100,200,140,0.25); }
        .popup-btn.copied .popup-btn-hint { color: rgba(100,200,140,0.7); }
        .popup-dismiss {
          margin-top: 20px; width: 100%;
          background: none; border: none; cursor: none;
          font-family: var(--mono); font-size: 9px;
          letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--fg3); transition: color 0.2s; padding: 4px;
        }
        .popup-dismiss:hover { color: var(--fg2); }

        /* ── ANIMATIONS ── */
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes revealUp {
          from { transform: translateY(110%); }
          to { transform: translateY(0); }
        }

        /* Reveal on scroll */
        .reveal {
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <ScrollReveal />

      {/* Custom Cursor */}
      <div ref={cursorRef} className="cursor-ring" />
      <div ref={cursorDotRef} className="cursor-dot" />

      {/* Popup */}
      <div className={`popup-backdrop${popup ? " visible" : ""}`} onClick={(e) => e.target === e.currentTarget && setPopup(false)}>
        <div className="popup">
          <button className="popup-close" onClick={() => setPopup(false)}>✕</button>
          <p className="popup-eyebrow">Connect</p>
          <h2 className="popup-title">Let&apos;s work together</h2>
          <p className="popup-sub">Reach out directly or follow for updates and work.</p>
          <div className="popup-btns">
            <button className={`popup-btn${copied ? " copied" : ""}`} onClick={handleCopy}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" fill="#5865F2"/>
              </svg>
              <span className="popup-btn-text">
                <span className="popup-btn-label">Add on Discord</span>
                <span className="popup-btn-hint">{copied ? "✓ copied to clipboard" : "click to copy message"}</span>
              </span>
            </button>
            <a className="popup-btn" href="https://www.tiktok.com/@sw8tx" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-6.33 6.34 6.34 6.34 0 0 0 6.33 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z" fill="rgba(240,236,228,0.8)"/>
              </svg>
              <span className="popup-btn-text">
                <span className="popup-btn-label">TikTok</span>
                <span className="popup-btn-hint">@sw8tx</span>
              </span>
            </a>
          </div>
          <button className="popup-dismiss" onClick={() => setPopup(false)}>Dismiss</button>
        </div>
      </div>

      {/* Nav */}
      <nav className={scrollY > 60 ? "scrolled" : ""}>
        <a href="https://sw8tx.lol" className="nav-logo">
          <div className="nav-logo-img">
            <Image src="/logo.png" alt="Sparkle" width={32} height={32} style={{objectFit:"cover"}} />
          </div>
          <span className="nav-logo-text">Sparkle</span>
        </a>
        <div className="nav-right">
          <a href="#about" className="nav-link">About</a>
          <a href="#work" className="nav-link">Work</a>
          <button className="nav-cta" onClick={() => setPopup(true)}>Contact</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grain" />
        <div className="hero-line hero-line-1" />
        <div className="hero-line hero-line-2" />

        <p className="hero-eyebrow">Web Designer & Developer</p>

        <h1 className="hero-title">
          <span className="hero-title-line">
            <span className="hero-title-inner">Sparkle</span>
          </span>
          <span className="hero-title-line">
            <span className="hero-title-inner dim">sw8tx</span>
          </span>
        </h1>

        <div className="hero-bottom">
          <p className="hero-desc">
            <strong>Crafting digital experiences</strong> that blend bold design with precise engineering. Based online, working worldwide.
          </p>
          <a href="#about" className="hero-scroll">
            <span>Scroll</span>
            <div className="hero-scroll-line" />
          </a>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{display:"flex"}}>
              {["Web Design","Brand Identity","Motion","Frontend Dev","UI / UX","Digital Products","Visual Design","Interaction"].map(t => (
                <div key={t} className="marquee-item">
                  <span className="marquee-dot" />
                  {t}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <section id="about" className="about">
        <div className="about-left reveal">
          <p className="section-label">About</p>
          <h2 className="about-heading">
            Designer.<br />
            Developer.<br />
            <span className="muted">Trader.</span>
          </h2>
          <div className="about-body">
            <p>I&apos;m Sparkle — a <strong>web designer and developer</strong> focused on creating digital experiences that feel as good as they look. I combine sharp visual thinking with clean, performant code.</p>
            <p>On the side I&apos;m deep in the <strong>Roblox trading scene</strong> — buying and selling rare Limited items — and I freestyle in Rocket League. Everything I do is built on precision and attention to detail.</p>
            <p>This site is my home base. <strong>Open for projects</strong>, collaborations, and business inquiries.</p>
          </div>
          <div className="skills-grid">
            {["Next.js","TypeScript","Figma","Motion Design","UI/UX","Branding","Tailwind","React"].map(s => (
              <span key={s} className="skill-tag">{s}</span>
            ))}
          </div>
        </div>
        <div className="about-right reveal reveal-delay-2">
          {[
            { num: "3+", label: "Years designing" },
            { num: "20+", label: "Projects shipped" },
            { num: "∞", label: "Limiteds traded" },
          ].map(s => (
            <div key={s.label} className="about-stat">
              <div className="about-stat-num">{s.num}</div>
              <div className="about-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Work */}
      <section id="work" className="work">
        <div className="work-header reveal">
          <p className="section-label">Selected Work</p>
        </div>
        <div className="work-list">
          {works.map((w, i) => (
            <a key={w.num} href="#" className={`work-item reveal reveal-delay-${i % 3 + 1}`}>
              <span className="work-num">{w.num}</span>
              <span className="work-title">{w.title}</span>
              <span className="work-tag">{w.tag}</span>
              <span className="work-year">{w.year}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact">
        <div className="reveal">
          <p className="section-label">Contact</p>
          <h2 className="contact-heading">
            Let&apos;s<br />
            <span className="line2">build.</span>
          </h2>
        </div>
        <div className="contact-right reveal reveal-delay-2">
          <p className="contact-desc">Open for web design projects, collaborations, and business opportunities. Reach out and let&apos;s make something great.</p>
          <div className="contact-links">
            <button className={`contact-link${copied ? " copied" : ""}`} onClick={handleCopy} style={{background:"none",border:"none",width:"100%",textAlign:"left",cursor:"none"}}>
              <div className="contact-link-left">
                <div className="contact-link-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" fill="#5865F2"/>
                  </svg>
                </div>
                <div>
                  <div className="contact-link-label">Discord</div>
                  <div className="contact-link-sub">{copied ? "✓ copied" : "sw8tx.lol"}</div>
                </div>
              </div>
              <span className="contact-link-arrow">↗</span>
            </button>
            <a className="contact-link" href="https://www.tiktok.com/@sw8tx" target="_blank" rel="noopener noreferrer">
              <div className="contact-link-left">
                <div className="contact-link-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-6.33 6.34 6.34 6.34 0 0 0 6.33 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z" fill="rgba(240,236,228,0.7)"/>
                  </svg>
                </div>
                <div>
                  <div className="contact-link-label">TikTok</div>
                  <div className="contact-link-sub">@sw8tx</div>
                </div>
              </div>
              <span className="contact-link-arrow">↗</span>
            </a>
            <a className="contact-link" href="mailto:help@sw8tx.lol">
              <div className="contact-link-left">
                <div className="contact-link-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="rgba(240,236,228,0.7)"/>
                  </svg>
                </div>
                <div>
                  <div className="contact-link-label">Email</div>
                  <div className="contact-link-sub">help@sw8tx.lol</div>
                </div>
              </div>
              <span className="contact-link-arrow">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-left">
          <span className="footer-copy">&copy; {new Date().getFullYear()} Sparkle (sw8tx)</span>
        </div>
        <div className="footer-links">
          <a href="/tos" className="footer-link">Terms</a>
          <a href="/privacy" className="footer-link">Privacy</a>
          <a href="/refund" className="footer-link">Refund</a>
        </div>
      </footer>
    </>
  );
}

function ScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return null;
}
