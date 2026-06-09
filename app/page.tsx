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
  const [ticker, setTicker] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setPopup(true), 5000);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });

    // ticker for animated counter
    const interval = setInterval(() => setTicker(p => p + 1), 80);

    // scroll reveal
    const revealEls = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });
    revealEls.forEach(el => obs.observe(el));

    return () => {
      clearTimeout(t);
      clearInterval(interval);
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(DISCORD_TEXT).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const parallax = scrollY * 0.35;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        :root {
          --bg: #070707;
          --bg2: #0c0c0c;
          --bg3: #111;
          --fg: #f0ece4;
          --fg2: rgba(240,236,228,0.5);
          --fg3: rgba(240,236,228,0.2);
          --fg4: rgba(240,236,228,0.07);
          --accent: #c8b89a;
          --accent2: rgba(200,184,154,0.12);
          --font: 'Space Grotesk', sans-serif;
          --mono: 'Space Mono', monospace;
        }

        body { font-family: var(--font); background: var(--bg); color: var(--fg); overflow-x: hidden; }

        /* ─── NAV ─── */
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; padding: 22px 40px;
          transition: background 0.5s, padding 0.4s, border-color 0.5s;
        }
        nav.scrolled {
          background: rgba(7,7,7,0.92); backdrop-filter: blur(24px);
          padding: 14px 40px; border-bottom: 1px solid var(--fg4);
        }
        .nav-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }
        .nav-logo-img {
          width: 32px; height: 32px; border-radius: 6px; overflow: hidden;
          border: 1px solid var(--fg4); perspective: 400px;
          transition: border-color 0.3s;
        }
        .nav-logo-img-inner {
          width: 100%; height: 100%;
          animation: spin3d 7s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        .nav-logo:hover .nav-logo-img-inner { animation: spin3d-fast 0.7s ease-in-out infinite; }
        @keyframes spin3d {
          0%   { transform: rotateY(0deg); }
          30%  { transform: rotateY(180deg) rotateX(10deg); }
          60%  { transform: rotateY(360deg); }
          100% { transform: rotateY(720deg) rotateX(0deg); }
        }
        @keyframes spin3d-fast {
          0%   { transform: rotateY(0deg) rotateX(0deg); }
          50%  { transform: rotateY(180deg) rotateX(20deg); }
          100% { transform: rotateY(360deg) rotateX(0deg); }
        }
        .nav-logo-text {
          font-size: 13px; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--fg2); transition: color 0.3s;
        }
        .nav-logo:hover .nav-logo-text { color: var(--fg); }
        .nav-logo:hover .nav-logo-img { border-color: rgba(200,184,154,0.4); }
        .nav-right { margin-left: auto; display: flex; gap: 8px; align-items: center; }
        .nav-link {
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--fg3); text-decoration: none;
          padding: 8px 14px; border-radius: 2px;
          transition: color 0.25s, background 0.25s;
        }
        .nav-link:hover { color: var(--fg); background: var(--fg4); }
        .nav-cta {
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.15em;
          text-transform: uppercase; color: var(--accent);
          background: none; border: 1px solid rgba(200,184,154,0.2);
          padding: 9px 20px; border-radius: 2px; cursor: pointer;
          transition: background 0.25s, border-color 0.25s, transform 0.2s;
          position: relative; overflow: hidden;
        }
        .nav-cta::before {
          content: ''; position: absolute; inset: 0;
          background: var(--accent2); transform: translateX(-101%);
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-cta:hover::before { transform: translateX(0); }
        .nav-cta:hover { border-color: rgba(200,184,154,0.5); }
        .nav-cta span { position: relative; z-index: 1; }

        /* ─── HERO ─── */
        .hero {
          min-height: 100vh; display: flex; flex-direction: column;
          justify-content: flex-end; padding: 0 40px 72px;
          position: relative; overflow: hidden;
        }
        @media (max-width: 600px) { .hero { padding: 0 24px 56px; } }
        .hero-bg {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 55% 45% at 65% 35%, rgba(200,184,154,0.07) 0%, transparent 65%),
            radial-gradient(ellipse 30% 50% at 15% 85%, rgba(200,184,154,0.04) 0%, transparent 55%);
        }
        .hero-grain {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px;
        }
        .hero-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(var(--fg4) 1px, transparent 1px),
            linear-gradient(90deg, var(--fg4) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%);
          opacity: 0.4;
        }

        .hero-eyebrow {
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.35em;
          text-transform: uppercase; color: var(--accent);
          margin-bottom: 20px; display: flex; align-items: center; gap: 14px;
          opacity: 0; animation: slideUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards 0.1s;
        }
        .hero-eyebrow::before { content: ''; width: 28px; height: 1px; background: var(--accent); opacity: 0.5; }

        .hero-title {
          font-size: clamp(68px, 14vw, 190px); font-weight: 700;
          letter-spacing: -0.03em; line-height: 0.88; color: var(--fg);
          margin-bottom: 44px;
        }
        .hero-title-line { display: block; overflow: hidden; }
        .hero-title-inner {
          display: block; transform: translateY(110%);
          animation: revealUp 1s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .hero-title-line:nth-child(2) .hero-title-inner { animation-delay: 0.1s; }
        .hero-title .dim { color: var(--fg3); }

        .hero-bottom {
          display: flex; align-items: flex-end; justify-content: space-between; gap: 40px;
          opacity: 0; animation: slideUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards 0.5s;
        }
        .hero-desc { max-width: 320px; font-size: 15px; line-height: 1.75; color: var(--fg2); font-weight: 300; }
        .hero-desc strong { color: var(--fg); font-weight: 500; }

        .hero-actions { display: flex; flex-direction: column; align-items: flex-end; gap: 16px; }
        .hero-btn {
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.18em;
          text-transform: uppercase; padding: 12px 24px; border-radius: 2px;
          cursor: pointer; text-decoration: none; display: inline-block;
          transition: transform 0.25s, opacity 0.25s;
          position: relative; overflow: hidden;
        }
        .hero-btn-primary {
          background: var(--accent); color: var(--bg); border: none;
          font-weight: 700;
        }
        .hero-btn-primary::after {
          content: ''; position: absolute; inset: 0;
          background: rgba(255,255,255,0.15); transform: translateX(-101%);
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .hero-btn-primary:hover::after { transform: translateX(0); }
        .hero-btn-primary:hover { transform: translateY(-2px); }
        .hero-btn-secondary {
          background: none; border: 1px solid var(--fg4); color: var(--fg2);
        }
        .hero-btn-secondary:hover { border-color: var(--fg3); color: var(--fg); transform: translateY(-2px); }

        .hero-scroll {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none;
        }
        .hero-scroll-line {
          width: 48px; height: 1px;
          background: linear-gradient(to right, var(--accent), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        .hero-scroll-text {
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.3em;
          text-transform: uppercase; color: var(--fg3);
        }
        @keyframes scrollPulse { 0%,100% { opacity:0.4; width:48px; } 50% { opacity:1; width:64px; } }

        /* ─── MARQUEE ─── */
        .marquee-wrap {
          border-top: 1px solid var(--fg4); border-bottom: 1px solid var(--fg4);
          padding: 14px 0; overflow: hidden; background: var(--bg2);
        }
        .marquee-track { display: flex; animation: marquee 20s linear infinite; width: max-content; }
        .marquee-item {
          display: flex; align-items: center; gap: 28px; padding: 0 32px;
          white-space: nowrap; font-family: var(--mono); font-size: 10px;
          letter-spacing: 0.22em; text-transform: uppercase; color: var(--fg3);
        }
        .marquee-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }
        @keyframes marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }

        /* ─── ABOUT ─── */
        .about {
          padding: 120px 40px 100px; display: grid;
          grid-template-columns: 1fr 1fr; gap: 80px;
          max-width: 1200px; margin: 0 auto;
        }
        @media (max-width: 768px) { .about { grid-template-columns:1fr; gap:48px; padding:80px 24px; } }

        .section-label {
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.3em;
          text-transform: uppercase; color: var(--accent); margin-bottom: 20px;
          display: flex; align-items: center; gap: 10px;
        }
        .section-label::after { content:''; flex:1; height:1px; background:var(--fg4); max-width:48px; }

        .about-heading {
          font-size: clamp(34px, 4.5vw, 54px); font-weight: 700;
          letter-spacing: -0.025em; line-height: 1.05; color: var(--fg); margin-bottom: 28px;
        }
        .about-heading .muted { color: var(--fg3); }
        .about-body { font-size: 15px; line-height: 1.8; color: var(--fg2); font-weight: 300; }
        .about-body p + p { margin-top: 16px; }
        .about-body strong { color: var(--fg); font-weight: 500; }

        .skills-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 32px; }
        .skill-tag {
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.12em;
          text-transform: uppercase; padding: 7px 13px;
          border: 1px solid var(--fg4); border-radius: 2px; color: var(--fg2);
          transition: border-color 0.25s, color 0.25s, background 0.25s, transform 0.2s;
          cursor: default;
        }
        .skill-tag:hover { border-color:rgba(200,184,154,0.3); color:var(--fg); background:var(--accent2); transform:translateY(-2px); }

        .about-right { display:flex; flex-direction:column; gap:0; }
        .about-stat {
          border-top: 1px solid var(--fg4); padding: 28px 0;
          transition: background 0.3s; position: relative; overflow: hidden;
        }
        .about-stat::before {
          content:''; position:absolute; left:0; top:0; bottom:0; width:2px;
          background:var(--accent); transform:scaleY(0); transition:transform 0.4s cubic-bezier(0.16,1,0.3,1);
          transform-origin: bottom;
        }
        .about-stat:hover::before { transform:scaleY(1); }
        .about-stat:hover { background: rgba(200,184,154,0.03); padding-left:14px; }
        .about-stat-num { font-size:52px; font-weight:700; letter-spacing:-0.04em; color:var(--fg); line-height:1; }
        .about-stat-label { font-family:var(--mono); font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:var(--fg3); margin-top:6px; }

        /* ─── WORK ─── */
        .work { padding:0 40px 100px; max-width:1200px; margin:0 auto; }
        @media (max-width:768px) { .work { padding:0 24px 80px; } }
        .work-header { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:40px; padding-bottom:20px; border-bottom:1px solid var(--fg4); }
        .work-count { font-family:var(--mono); font-size:10px; letter-spacing:0.2em; color:var(--fg3); }

        .work-item {
          display:grid; grid-template-columns:72px 1fr auto auto;
          align-items:center; gap:24px; padding:26px 0;
          border-bottom:1px solid var(--fg4);
          position:relative; overflow:hidden;
          text-decoration:none; color:inherit;
          transition: padding-left 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        .work-item::before {
          content:''; position:absolute; inset:0;
          background: linear-gradient(90deg, var(--fg4) 0%, transparent 100%);
          transform:translateX(-100%);
          transition:transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .work-item:hover::before { transform:translateX(0); }
        .work-item:hover { padding-left:20px; }
        .work-item-arrow {
          position:absolute; right:0; top:50%; transform:translateY(-50%) translateX(8px);
          opacity:0; color:var(--accent); font-size:20px;
          transition:opacity 0.3s, transform 0.3s;
        }
        .work-item:hover .work-item-arrow { opacity:1; transform:translateY(-50%) translateX(0); }
        .work-num { font-family:var(--mono); font-size:10px; letter-spacing:0.2em; color:var(--fg3); position:relative; }
        .work-title { font-size:clamp(18px,3vw,30px); font-weight:600; letter-spacing:-0.02em; color:var(--fg); position:relative; transition:color 0.3s; }
        .work-tag { font-family:var(--mono); font-size:10px; letter-spacing:0.12em; text-transform:uppercase; color:var(--accent); position:relative; }
        .work-year { font-family:var(--mono); font-size:10px; color:var(--fg3); position:relative; }
        @media (max-width:600px) { .work-item { grid-template-columns:40px 1fr auto; } .work-year { display:none; } }

        /* ─── CONTACT ─── */
        .contact {
          padding:100px 40px 80px; max-width:1200px; margin:0 auto;
          display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:start;
        }
        @media (max-width:768px) { .contact { grid-template-columns:1fr; gap:48px; padding:80px 24px; } }

        .contact-heading {
          font-size:clamp(52px,9vw,110px); font-weight:700;
          letter-spacing:-0.04em; line-height:0.88; color:var(--fg);
        }
        .contact-heading .line2 { color:var(--fg3); }

        .contact-right { padding-top:8px; }
        .contact-desc { font-size:15px; line-height:1.8; color:var(--fg2); font-weight:300; margin-bottom:36px; }

        .contact-link {
          display:flex; align-items:center; justify-content:space-between;
          padding:20px 0; border-bottom:1px solid var(--fg4);
          text-decoration:none; color:inherit;
          transition:padding-left 0.35s cubic-bezier(0.16,1,0.3,1), background 0.3s;
          cursor:pointer; background:none; border-left:none; border-right:none; border-top:none;
          width:100%;
        }
        .contact-link:hover { padding-left:12px; background:rgba(200,184,154,0.025); }
        .contact-link-left { display:flex; align-items:center; gap:16px; }
        .contact-link-icon {
          width:38px; height:38px; border-radius:50%; border:1px solid var(--fg4);
          display:flex; align-items:center; justify-content:center;
          transition:border-color 0.3s, background 0.3s;
          flex-shrink:0;
        }
        .contact-link:hover .contact-link-icon { border-color:rgba(200,184,154,0.35); background:var(--accent2); }
        .contact-link-label { font-size:16px; font-weight:500; color:var(--fg); }
        .contact-link-sub { font-family:var(--mono); font-size:9px; letter-spacing:0.15em; color:var(--fg3); margin-top:3px; }
        .contact-link-arrow { color:var(--fg3); font-size:20px; transition:transform 0.3s, color 0.3s; flex-shrink:0; }
        .contact-link:hover .contact-link-arrow { transform:translate(3px,-3px); color:var(--accent); }

        /* ─── FOOTER ─── */
        .site-footer {
          background: var(--bg2); border-top:1px solid var(--fg4);
          padding:28px 40px;
          display:flex; align-items:center; justify-content:space-between;
          flex-wrap:wrap; gap:16px;
        }
        @media (max-width:600px) { .site-footer { padding:20px 24px; flex-direction:column; align-items:flex-start; } }
        .footer-left { display:flex; align-items:center; gap:10px; }
        .footer-logo-img { width:22px; height:22px; border-radius:3px; overflow:hidden; opacity:0.5; }
        .footer-copy { font-family:var(--mono); font-size:10px; letter-spacing:0.12em; color:var(--fg3); }
        .footer-links { display:flex; gap:20px; }
        .footer-link {
          font-family:var(--mono); font-size:10px; letter-spacing:0.12em;
          text-transform:uppercase; color:var(--fg3); text-decoration:none;
          transition:color 0.25s; padding-bottom:1px; border-bottom:1px solid transparent;
          transition: color 0.25s, border-color 0.25s;
        }
        .footer-link:hover { color:var(--accent); border-color:rgba(200,184,154,0.3); }

        /* ─── POPUP ─── */
        .popup-backdrop {
          position:fixed; inset:0; z-index:200;
          background:rgba(7,7,7,0.82); backdrop-filter:blur(14px);
          display:flex; align-items:center; justify-content:center; padding:1.5rem;
          opacity:0; pointer-events:none;
          transition:opacity 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        .popup-backdrop.visible { opacity:1; pointer-events:all; }
        .popup {
          background:#0f0f0f; border:1px solid rgba(200,184,154,0.1);
          border-radius:4px; padding:40px 36px 32px;
          max-width:400px; width:100%; position:relative;
          transform:translateY(28px) scale(0.97); opacity:0;
          transition:transform 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.45s ease;
          box-shadow:0 48px 120px rgba(0,0,0,0.8), inset 0 1px 0 rgba(200,184,154,0.05);
        }
        .popup-backdrop.visible .popup { transform:translateY(0) scale(1); opacity:1; }
        .popup-close {
          position:absolute; top:16px; right:16px;
          background:none; border:none; cursor:pointer;
          color:var(--fg3); font-size:15px; line-height:1;
          transition:color 0.2s, transform 0.2s;
          width:28px; height:28px; display:flex; align-items:center; justify-content:center;
          border-radius:50%; border:1px solid var(--fg4);
        }
        .popup-close:hover { color:var(--fg); transform:rotate(90deg); border-color:var(--fg3); }
        .popup-eyebrow {
          font-family:var(--mono); font-size:9px; letter-spacing:0.3em;
          text-transform:uppercase; color:var(--accent); margin-bottom:14px;
          display:flex; align-items:center; gap:10px;
        }
        .popup-eyebrow::before { content:''; width:18px; height:1px; background:var(--accent); opacity:0.5; }
        .popup-title { font-size:22px; font-weight:700; letter-spacing:-0.02em; color:var(--fg); margin-bottom:8px; }
        .popup-sub { font-size:13px; line-height:1.6; color:var(--fg2); margin-bottom:26px; font-weight:300; }
        .popup-btns { display:flex; flex-direction:column; gap:8px; }
        .popup-btn {
          display:flex; align-items:center; gap:14px;
          padding:15px 18px; border-radius:3px; border:1px solid var(--fg4);
          background:rgba(255,255,255,0.015); cursor:pointer; text-decoration:none;
          color:var(--fg2); font-family:var(--font); font-size:14px; font-weight:500;
          transition:border-color 0.25s, background 0.25s, color 0.25s, transform 0.25s;
          width:100%; position:relative; overflow:hidden;
        }
        .popup-btn::before {
          content:''; position:absolute; inset:0;
          background:var(--accent2); transform:translateX(-101%);
          transition:transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .popup-btn:hover::before { transform:translateX(0); }
        .popup-btn:hover { border-color:rgba(200,184,154,0.25); color:var(--fg); transform:translateX(4px); }
        .popup-btn svg { flex-shrink:0; position:relative; z-index:1; }
        .popup-btn-text { flex:1; position:relative; z-index:1; }
        .popup-btn-label { display:block; }
        .popup-btn-hint { font-family:var(--mono); font-size:9px; letter-spacing:0.15em; text-transform:uppercase; color:var(--fg3); margin-top:2px; display:block; transition:color 0.25s; }
        .popup-btn.copied .popup-btn-hint { color:rgba(100,200,140,0.8); }
        .popup-dismiss {
          margin-top:18px; width:100%; background:none; border:none; cursor:pointer;
          font-family:var(--mono); font-size:9px; letter-spacing:0.25em;
          text-transform:uppercase; color:var(--fg3); transition:color 0.2s; padding:4px;
        }
        .popup-dismiss:hover { color:var(--fg2); }

        /* ─── ANIMATIONS ─── */
        @keyframes slideUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes revealUp { from { transform:translateY(110%); } to { transform:translateY(0); } }

        .reveal { opacity:0; transform:translateY(22px); transition:opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1); }
        .reveal.visible { opacity:1; transform:translateY(0); }
        .reveal-d1 { transition-delay:0.1s; }
        .reveal-d2 { transition-delay:0.2s; }
        .reveal-d3 { transition-delay:0.3s; }
        .reveal-d4 { transition-delay:0.4s; }

        @media (prefers-reduced-motion:reduce) { *, *::before, *::after { animation-duration:0.01ms !important; transition-duration:0.01ms !important; } }
      `}</style>

      {/* POPUP */}
      <div className={`popup-backdrop${popup ? " visible" : ""}`} onClick={(e) => e.target === e.currentTarget && setPopup(false)}>
        <div className="popup">
          <button className="popup-close" onClick={() => setPopup(false)}>✕</button>
          <p className="popup-eyebrow">Connect</p>
          <h2 className="popup-title">Let&apos;s work together</h2>
          <p className="popup-sub">Reach out directly or follow along for updates.</p>
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

      {/* NAV */}
      <nav className={scrollY > 60 ? "scrolled" : ""}>
        <a href="https://sw8tx.lol" className="nav-logo">
          <div className="nav-logo-img">
            <div className="nav-logo-img-inner">
              <Image src="/logo.png" alt="Sparkle" width={32} height={32} style={{objectFit:"cover",borderRadius:"5px"}} />
            </div>
          </div>
          <span className="nav-logo-text">Sparkle</span>
        </a>
        <div className="nav-right">
          <a href="#about" className="nav-link">About</a>
          <a href="#work" className="nav-link">Work</a>
          <a href="#contact" className="nav-link">Contact</a>
          <button className="nav-cta" onClick={() => setPopup(true)}><span>Get in touch</span></button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg" />
        <div className="hero-grain" />
        <div className="hero-grid" style={{transform:`translateY(${parallax * 0.3}px)`}} />

        <p className="hero-eyebrow">Web Designer &amp; Developer</p>

        <h1 className="hero-title" style={{transform:`translateY(${-parallax * 0.12}px)`}}>
          <span className="hero-title-line"><span className="hero-title-inner">Sparkle</span></span>
          <span className="hero-title-line"><span className="hero-title-inner dim">sw8tx</span></span>
        </h1>

        <div className="hero-bottom">
          <p className="hero-desc">
            <strong>Crafting digital experiences</strong> that blend bold design with precise engineering. Based online — working worldwide.
          </p>
          <div className="hero-actions">
            <button className="hero-btn hero-btn-primary" onClick={() => setPopup(true)}>Contact me</button>
            <a href="#work" className="hero-btn hero-btn-secondary">View work</a>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{display:"flex"}}>
              {["Web Design","Brand Identity","Motion Design","Frontend Dev","UI / UX","Digital Products","Visual Systems","Interaction Design","Roblox Trading","Rocket League"].map(t => (
                <div key={t} className="marquee-item">
                  <span className="marquee-dot" />{t}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="about">
        <div className="about-left reveal">
          <p className="section-label">About</p>
          <h2 className="about-heading">Designer.<br />Developer.<br /><span className="muted">Trader.</span></h2>
          <div className="about-body">
            <p>I&apos;m Sparkle — a <strong>web designer and developer</strong> building digital experiences that feel as good as they look. Precise code, sharp visuals, no compromise.</p>
            <p>Outside of design I&apos;m deep in the <strong>Roblox trading scene</strong> and freestyle in Rocket League. Everything I do runs on the same principle: attention to detail.</p>
            <p><strong>Open for projects</strong>, collaborations, and business opportunities.</p>
          </div>
          <div className="skills-grid">
            {["Next.js","TypeScript","Figma","Motion","UI/UX","Branding","Tailwind","React","CSS","Framer"].map(s => (
              <span key={s} className="skill-tag">{s}</span>
            ))}
          </div>
        </div>
        <div className="about-right">
          {[
            { num: "3+", label: "Years designing" },
            { num: "20+", label: "Projects shipped" },
            { num: "∞", label: "Limiteds traded" },
          ].map((s, i) => (
            <div key={s.label} className={`about-stat reveal reveal-d${i + 1}`}
              style={{transition:`opacity 0.85s ease ${i * 0.12}s, transform 0.85s ease ${i * 0.12}s, background 0.3s, padding-left 0.35s`}}>
              <div className="about-stat-num">{s.num}</div>
              <div className="about-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="work">
        <div className="work-header reveal">
          <p className="section-label">Selected Work</p>
          <span className="work-count">{works.length} projects</span>
        </div>
        <div>
          {works.map((w, i) => (
            <a key={w.num} href="#" className={`work-item reveal reveal-d${(i % 3) + 1}`}>
              <span className="work-num">{w.num}</span>
              <span className="work-title">{w.title}</span>
              <span className="work-tag">{w.tag}</span>
              <span className="work-year">{w.year}</span>
              <span className="work-item-arrow">↗</span>
            </a>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact">
        <div className="reveal">
          <p className="section-label">Contact</p>
          <h2 className="contact-heading">Let&apos;s<br /><span className="line2">build.</span></h2>
        </div>
        <div className="contact-right reveal reveal-d2">
          <p className="contact-desc">Open for web design projects, collaborations, and business opportunities. Reach out and let&apos;s make something great.</p>
          <div>
            <button className={`contact-link${copied ? " copied" : ""}`} onClick={handleCopy}>
              <div className="contact-link-left">
                <div className="contact-link-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" fill="#5865F2"/>
                  </svg>
                </div>
                <div>
                  <div className="contact-link-label">Discord</div>
                  <div className="contact-link-sub">{copied ? "✓ copied to clipboard" : "sw8tx.lol — click to copy"}</div>
                </div>
              </div>
              <span className="contact-link-arrow">↗</span>
            </button>
            <a className="contact-link" href="https://www.tiktok.com/@sw8tx" target="_blank" rel="noopener noreferrer">
              <div className="contact-link-left">
                <div className="contact-link-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-6.33 6.34 6.34 6.34 0 0 0 6.33 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z" fill="rgba(240,236,228,0.75)"/>
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
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="rgba(240,236,228,0.75)"/>
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

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-left">
          <div className="footer-logo-img">
            <Image src="/logo.png" alt="Sparkle" width={22} height={22} style={{objectFit:"cover",borderRadius:"3px"}} />
          </div>
          <span className="footer-copy">&copy; {new Date().getFullYear()} Sparkle (sw8tx) — All rights reserved</span>
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
