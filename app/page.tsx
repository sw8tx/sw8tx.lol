"use client";

import Image from "next/image";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useState } from "react";

const emails = ["info@sw8tx.lol", "info@tylerosthoff.xyz"];

const showcase = [
  {
    id: "interfaces",
    kicker: "01 / Web",
    title: "Interface Systems",
    body: "Polished portfolio, shop and SaaS surfaces built around fast flows.",
    left: 6,
    top: 18,
    rotate: -9,
    tone: "solid",
  },
  {
    id: "brand",
    kicker: "02 / Brand",
    title: "Brand Identity Kits",
    body: "Logos, palettes, type systems and launch-ready social assets.",
    left: 68,
    top: 16,
    rotate: 8,
    tone: "pale",
  },
  {
    id: "motion",
    kicker: "03 / Motion",
    title: "Animated Details",
    body: "Micro-interactions, reveal systems, hover energy and page rhythm.",
    left: 18,
    top: 66,
    rotate: 7,
    tone: "glass",
  },
  {
    id: "frontend",
    kicker: "04 / Code",
    title: "Next.js Builds",
    body: "Responsive components with crisp implementation and clean handoff.",
    left: 72,
    top: 64,
    rotate: -7,
    tone: "solid",
  },
  {
    id: "logo",
    kicker: "sw8tx",
    title: "Visual Identity",
    body: "A compact design language for sites that need to feel memorable.",
    left: 42,
    top: 8,
    rotate: 4,
    tone: "image",
  },
];

const services = [
  "Web Design",
  "Frontend Development",
  "Motion Direction",
  "Brand Identity",
  "Landing Pages",
  "Portfolio Systems",
  "UI/UX",
  "Design Cleanup",
  "Shop Interfaces",
  "Animated Launches",
  "Creator Pages",
  "Visual Systems",
];

const process = [
  ["01", "Direction", "Mood, structure, colors and the exact feel of the site."],
  ["02", "Design", "Visual systems in Figma-style thinking, then responsive layouts."],
  ["03", "Build", "Next.js implementation with interaction polish and clean details."],
  ["04", "Launch", "Final QA, copy pass, contact routes and handoff-ready files."],
];

const heroLines = [
  ["Design"],
  ["that", "moves"],
];

const marqueeWords = [...services, ...services, ...services];

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [copied, setCopied] = useState("");
  const [activeShowcase, setActiveShowcase] = useState(showcase[0].id);
  const year = new Date().getFullYear();

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    const popupTimer = window.setTimeout(() => setPopupOpen(true), 5200);
    const revealEls = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" },
    );

    window.addEventListener("scroll", onScroll, { passive: true });
    revealEls.forEach((el) => observer.observe(el));

    return () => {
      window.clearTimeout(popupTimer);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const copyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(email);
      window.setTimeout(() => setCopied(""), 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const updatePointer = (event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--mx", `${event.clientX}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY}px`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          background: #f2fbff;
          color: #04162f;
          font-family: "Space Grotesk", Arial, sans-serif;
          overflow-x: hidden;
        }
        button, a { font: inherit; }

        :root {
          --sky: #f2fbff;
          --blue: #0050d8;
          --blue-soft: #9bd3ff;
          --blue-mid: #4db6e5;
          --coral: #ff4f87;
          --green: #19ad76;
          --gold: #ffb12b;
          --violet: #7768ff;
          --ink: #04162f;
          --muted: rgba(4, 22, 47, 0.62);
          --line: rgba(0, 80, 216, 0.16);
          --white: rgba(255, 255, 255, 0.82);
          --mono: "Space Mono", monospace;
        }

        .site {
          --mx: 50vw;
          --my: 40vh;
          min-height: 100vh;
          position: relative;
          background:
            radial-gradient(circle at var(--mx) var(--my), rgba(0, 80, 216, 0.16), transparent 260px),
            radial-gradient(circle at 14% 78%, rgba(255, 79, 135, 0.13), transparent 260px),
            radial-gradient(circle at 86% 22%, rgba(25, 173, 118, 0.13), transparent 280px),
            linear-gradient(rgba(0, 80, 216, 0.11) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 80, 216, 0.11) 1px, transparent 1px),
            var(--sky);
          background-size: auto, auto, auto, 72px 72px, 72px 72px, auto;
        }
        .site::before {
          content: "";
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            linear-gradient(115deg, transparent 0 34%, rgba(255,255,255,0.42) 48%, transparent 62%),
            linear-gradient(180deg, transparent, rgba(0,80,216,0.05));
          transform: translateX(-120%);
          animation: pageSweep 8s cubic-bezier(.16,1,.3,1) infinite;
        }
        .hero,
        .marquee,
        .section,
        .contact,
        .footer {
          position: relative;
          z-index: 1;
        }

        .nav {
          position: fixed;
          inset: 0 0 auto;
          z-index: 80;
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 20px 34px;
          transition: background 280ms ease, border-color 280ms ease, padding 280ms ease;
        }
        .nav.scrolled {
          padding: 13px 34px;
          background: rgba(232, 245, 255, 0.8);
          border-bottom: 1px solid var(--line);
          backdrop-filter: blur(20px);
        }
        .brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--ink);
          text-decoration: none;
          font-weight: 800;
          letter-spacing: 0;
        }
        .brand-mark {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 8px;
          background: linear-gradient(135deg, var(--blue), var(--coral), var(--green));
          box-shadow: 0 12px 34px rgba(0, 80, 216, 0.25);
          overflow: hidden;
          animation: markPulse 5s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        .brand-mark img {
          width: 34px;
          height: 34px;
          animation: logoSpin 7s linear infinite;
          transform-origin: center;
          will-change: transform;
        }
        .brand:hover .brand-mark img {
          animation-duration: 900ms;
        }
        .brand-name { font-size: 18px; }
        .nav-links {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .nav-link,
        .nav-button {
          border: 0;
          border-radius: 999px;
          color: var(--ink);
          background: rgba(255, 255, 255, 0.46);
          text-decoration: none;
          padding: 9px 15px;
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0;
          cursor: pointer;
          transition: transform 220ms ease, background 220ms ease, color 220ms ease, box-shadow 220ms ease;
        }
        .nav-link:hover,
        .nav-button:hover {
          transform: translateY(-2px);
          color: #fff;
          background: var(--ink);
          box-shadow: 0 14px 30px rgba(4, 22, 47, 0.22);
        }

        .hero {
          min-height: 100vh;
          position: relative;
          display: grid;
          place-items: center;
          padding: 120px 28px 74px;
          overflow: hidden;
        }
        .hero::before {
          content: "";
          position: absolute;
          width: 54vmin;
          aspect-ratio: 1;
          border: 1px solid rgba(0, 80, 216, 0.18);
          border-radius: 50%;
          transform: translate3d(-34vw, 10vh, 0);
          animation: orbitSlow 18s linear infinite;
        }
        .hero::after {
          content: "";
          position: absolute;
          inset: 14% 8%;
          border-radius: 999px;
          border: 1px solid rgba(255, 79, 135, 0.22);
          transform: rotate(-10deg) scaleX(.2);
          opacity: 0;
          animation: buildRing 1200ms cubic-bezier(.16,1,.3,1) forwards 620ms;
        }
        .hero-copy {
          position: relative;
          z-index: 10;
          max-width: 940px;
          text-align: center;
          pointer-events: none;
        }
        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin: 0 0 18px;
          color: var(--coral);
          font-family: var(--mono);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          opacity: 0;
          animation: liftIn 720ms cubic-bezier(.16,1,.3,1) forwards 100ms;
        }
        .eyebrow::before,
        .eyebrow::after {
          content: "";
          width: 28px;
          height: 2px;
          background: currentColor;
        }
        .hero-title {
          display: grid;
          gap: 0.02em;
          margin: 0;
          color: var(--blue);
          font-size: clamp(58px, 14vw, 180px);
          line-height: 0.85;
          font-weight: 800;
          letter-spacing: 0;
          text-transform: uppercase;
        }
        .title-line {
          display: flex;
          justify-content: center;
          gap: 0.16em;
          flex-wrap: wrap;
          overflow: visible;
        }
        .title-word {
          display: inline-flex;
          overflow: visible;
        }
        .title-letter {
          display: inline-block;
          opacity: 0;
          transform: translate3d(var(--letter-x), var(--letter-y), 0) rotate(var(--letter-r)) scale(.72);
          filter: blur(12px);
          animation: letterFly 940ms cubic-bezier(.16,1,.3,1) forwards;
          animation-delay: calc(130ms + var(--letter-delay));
          will-change: transform, opacity, filter;
        }
        .title-line:nth-child(2) .title-letter {
          color: var(--ink);
        }
        .title-line:nth-child(2) .title-word:nth-child(2) .title-letter {
          color: var(--coral);
        }
        .hero-text {
          max-width: 690px;
          margin: 28px auto 0;
          color: var(--muted);
          font-size: clamp(17px, 2.2vw, 23px);
          line-height: 1.45;
          opacity: 0;
          animation: liftIn 760ms cubic-bezier(.16,1,.3,1) forwards 420ms;
        }
        .hero-actions {
          pointer-events: auto;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 30px;
          opacity: 0;
          animation: liftIn 760ms cubic-bezier(.16,1,.3,1) forwards 560ms;
        }
        .button {
          min-height: 46px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 1px solid var(--line);
          border-radius: 999px;
          padding: 12px 19px;
          color: var(--ink);
          background: rgba(255, 255, 255, 0.64);
          text-decoration: none;
          cursor: pointer;
          transition: transform 220ms ease, background 220ms ease, color 220ms ease, box-shadow 220ms ease;
        }
        .button.primary {
          color: #fff;
          background: var(--blue);
          border-color: var(--blue);
          box-shadow: 0 18px 44px rgba(0, 80, 216, 0.26);
        }
        .button:hover {
          transform: translateY(-3px);
          color: #fff;
          background: #003fb0;
          box-shadow: 0 16px 34px rgba(0, 80, 216, 0.22);
        }
        .button svg { width: 17px; height: 17px; }

        .hero-card {
          position: absolute;
          z-index: 15;
          left: calc(var(--left) * 1%);
          top: calc(var(--top) * 1%);
          width: clamp(154px, 17vw, 240px);
          min-height: 154px;
          border: 1px solid rgba(0, 80, 216, 0.2);
          border-radius: 8px;
          padding: 16px;
          color: var(--ink);
          text-align: left;
          cursor: pointer;
          user-select: none;
          touch-action: manipulation;
          transform:
            rotate(var(--rotate))
            translateY(calc(var(--float) * 1px));
          box-shadow: 0 22px 50px rgba(0, 80, 216, 0.18);
          transition: transform 220ms ease, box-shadow 220ms ease, scale 220ms ease, border-color 220ms ease, filter 220ms ease;
          animation: cardIn 780ms cubic-bezier(.16,1,.3,1) both, floatCard 5.4s ease-in-out infinite;
          animation-delay: var(--delay), calc(var(--delay) + 780ms);
        }
        .hero-card:hover,
        .hero-card.active {
          transform: rotate(var(--rotate)) translateY(-14px) scale(1.045);
          border-color: rgba(0, 80, 216, 0.48);
          box-shadow: 0 34px 70px rgba(0, 80, 216, 0.24);
          filter: saturate(1.08);
        }
        .hero-card:focus-visible {
          outline: 3px solid rgba(255, 79, 135, 0.42);
          outline-offset: 4px;
        }
        .hero-card.active { z-index: 35; }
        .hero-card.solid {
          color: #fff;
          background:
            radial-gradient(circle at 20% 0%, rgba(255,255,255,0.3), transparent 34%),
            linear-gradient(135deg, var(--blue), var(--violet));
        }
        .hero-card.pale {
          background:
            linear-gradient(135deg, rgba(255,255,255,0.98), rgba(255, 177, 43, 0.32), rgba(155,211,255,0.72)),
            var(--sky);
        }
        .hero-card.glass {
          background:
            linear-gradient(145deg, rgba(255,255,255,0.86), rgba(25,173,118,0.14), rgba(232,245,255,0.72));
          backdrop-filter: blur(16px);
        }
        .hero-card.image {
          background:
            radial-gradient(circle at 80% 20%, rgba(255,79,135,0.22), transparent 38%),
            radial-gradient(circle at 20% 90%, rgba(0,80,216,0.2), transparent 42%),
            rgba(255,255,255,0.88);
        }
        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 26px;
        }
        .card-kicker {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.02em;
          opacity: 0.74;
        }
        .card-handle {
          display: grid;
          grid-template-columns: repeat(3, 3px);
          gap: 3px;
          padding: 5px;
          border-radius: 999px;
          background: rgba(255,255,255,0.34);
          animation: signalBlink 2.2s ease-in-out infinite;
        }
        .card-handle span {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.72;
        }
        .hero-card h2 {
          margin: 0;
          font-size: clamp(21px, 2.2vw, 32px);
          line-height: 0.98;
          letter-spacing: 0;
        }
        .hero-card p {
          margin: 14px 0 0;
          font-size: 13px;
          line-height: 1.45;
          opacity: 0.78;
        }
        .card-logo {
          width: 54px;
          height: 54px;
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 18px;
          box-shadow: 0 16px 32px rgba(0,80,216,0.22);
        }

        .marquee {
          overflow: hidden;
          border-block: 1px solid var(--line);
          background: rgba(255,255,255,0.38);
          backdrop-filter: blur(12px);
        }
        .marquee-reverse {
          border-top: 0;
          background: rgba(255,255,255,0.26);
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 38s linear infinite;
          will-change: transform;
        }
        .marquee-reverse .marquee-track {
          animation-direction: reverse;
          animation-duration: 44s;
        }
        .marquee:hover .marquee-track {
          animation-play-state: paused;
        }
        .marquee-row {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          min-width: max-content;
        }
        .marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 18px;
          padding: 15px 24px;
          color: var(--blue);
          font-family: var(--mono);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .marquee-item::before {
          content: "";
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--coral);
          box-shadow: 0 0 18px rgba(255, 79, 135, 0.62);
        }

        .section {
          max-width: 1180px;
          margin: 0 auto;
          padding: 104px 28px;
        }
        .section-grid {
          display: grid;
          grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr);
          gap: clamp(34px, 7vw, 90px);
          align-items: start;
        }
        .section-label {
          margin: 0 0 18px;
          color: var(--blue);
          font-family: var(--mono);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .section-title {
          margin: 0;
          color: var(--ink);
          font-size: clamp(38px, 7vw, 84px);
          line-height: 0.92;
          font-weight: 800;
          letter-spacing: 0;
        }
        .section-title .accent-text { color: var(--blue); }
        .section-text {
          margin: 0;
          color: var(--muted);
          font-size: clamp(18px, 2.2vw, 24px);
          line-height: 1.48;
        }
        .proof-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          margin-top: 34px;
        }
        .proof {
          min-height: 124px;
          padding: 17px;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: rgba(255,255,255,0.54);
          box-shadow: 0 18px 44px rgba(0, 80, 216, 0.08);
          transition: transform 240ms ease, background 240ms ease;
        }
        .proof:hover {
          transform: translateY(-6px);
          background: #fff;
        }
        .proof strong {
          display: block;
          color: var(--blue);
          font-size: 38px;
          line-height: 1;
        }
        .proof span {
          display: block;
          margin-top: 12px;
          color: var(--muted);
          font-family: var(--mono);
          font-size: 11px;
          text-transform: uppercase;
        }

        .process {
          display: grid;
          gap: 12px;
        }
        .process-item {
          position: relative;
          display: grid;
          grid-template-columns: 72px 1fr;
          gap: 18px;
          padding: 22px;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: rgba(255,255,255,0.5);
          overflow: hidden;
          transition: transform 260ms ease, border-color 260ms ease, background 260ms ease;
        }
        .process-item::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(0,80,216,0.16), transparent 60%);
          transform: translateX(-100%);
          transition: transform 420ms cubic-bezier(.16,1,.3,1);
        }
        .process-item:hover {
          transform: translateX(8px);
          border-color: rgba(0,80,216,0.34);
          background: rgba(255,255,255,0.78);
        }
        .process-item:hover::before { transform: translateX(0); }
        .process-num {
          position: relative;
          color: var(--blue);
          font-family: var(--mono);
          font-size: 12px;
          font-weight: 700;
        }
        .process-item h3,
        .process-item p {
          position: relative;
        }
        .process-item h3 {
          margin: 0;
          color: var(--ink);
          font-size: 24px;
          line-height: 1;
        }
        .process-item p {
          margin: 8px 0 0;
          color: var(--muted);
          line-height: 1.55;
        }

        .contact {
          position: relative;
          isolation: isolate;
          margin-top: 16px;
          padding-bottom: 120px;
        }
        .contact-shell {
          max-width: 1180px;
          margin: 0 auto;
          padding: 76px 28px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 420px;
          gap: clamp(28px, 6vw, 80px);
          align-items: center;
          border-top: 1px solid var(--line);
        }
        .contact-title {
          margin: 0;
          color: var(--blue);
          font-size: clamp(48px, 10vw, 122px);
          line-height: 0.87;
          font-weight: 800;
          letter-spacing: 0;
          text-transform: uppercase;
        }
        .contact-title span { color: var(--ink); }
        .contact-panel {
          border: 1px solid var(--line);
          border-radius: 8px;
          background: rgba(255,255,255,0.62);
          box-shadow: 0 28px 70px rgba(0,80,216,0.12);
          overflow: hidden;
        }
        .contact-note {
          margin: 0;
          padding: 22px;
          color: var(--muted);
          line-height: 1.55;
          border-bottom: 1px solid var(--line);
        }
        .email-row {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          border: 0;
          border-bottom: 1px solid var(--line);
          background: transparent;
          color: var(--ink);
          padding: 20px 22px;
          text-decoration: none;
          cursor: pointer;
          transition: background 220ms ease, color 220ms ease, padding-left 220ms ease;
        }
        .email-row:last-child { border-bottom: 0; }
        .email-row:hover {
          padding-left: 30px;
          color: #fff;
          background: var(--blue);
        }
        .email-main {
          min-width: 0;
          display: grid;
          gap: 5px;
          text-align: left;
        }
        .email-label {
          font-family: var(--mono);
          color: inherit;
          opacity: 0.62;
          font-size: 11px;
          text-transform: uppercase;
        }
        .email-address {
          overflow-wrap: anywhere;
          font-size: 18px;
          font-weight: 700;
        }
        .email-arrow {
          flex: 0 0 auto;
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: rgba(0,80,216,0.1);
          transition: transform 220ms ease, background 220ms ease;
        }
        .email-row:hover .email-arrow {
          transform: translate(4px, -4px);
          background: rgba(255,255,255,0.2);
        }

        .footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 28px;
          color: rgba(4,22,47,0.58);
          border-top: 1px solid var(--line);
          font-family: var(--mono);
          font-size: 11px;
        }
        .footer-links {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .footer a {
          color: inherit;
          text-decoration: none;
        }
        .footer a:hover { color: var(--blue); }

        .popup-backdrop {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: grid;
          place-items: center;
          padding: 24px;
          background: rgba(3, 16, 35, 0.42);
          backdrop-filter: blur(12px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 260ms ease;
        }
        .popup-backdrop.open {
          opacity: 1;
          pointer-events: auto;
        }
        .popup {
          width: min(430px, 100%);
          border: 1px solid rgba(0,80,216,0.24);
          border-radius: 8px;
          background: rgba(232,245,255,0.96);
          color: var(--ink);
          box-shadow: 0 34px 90px rgba(0,24,72,0.28);
          transform: translateY(22px) scale(.98);
          transition: transform 320ms cubic-bezier(.16,1,.3,1);
          overflow: hidden;
        }
        .popup-backdrop.open .popup { transform: translateY(0) scale(1); }
        .popup-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 20px 22px;
          color: #fff;
          background: var(--blue);
        }
        .popup-head h2 {
          margin: 0;
          font-size: 22px;
          line-height: 1;
        }
        .popup-close {
          width: 34px;
          height: 34px;
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          color: #fff;
          background: transparent;
          cursor: pointer;
          transition: transform 200ms ease, background 200ms ease;
        }
        .popup-close:hover {
          transform: rotate(90deg);
          background: rgba(255,255,255,0.16);
        }
        .popup-body { padding: 22px; }
        .popup-body p {
          margin: 0 0 16px;
          color: var(--muted);
          line-height: 1.55;
        }
        .popup-actions {
          display: grid;
          gap: 9px;
        }

        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 780ms cubic-bezier(.16,1,.3,1), transform 780ms cubic-bezier(.16,1,.3,1);
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .delay-1 { transition-delay: 90ms; }
        .delay-2 { transition-delay: 180ms; }
        .delay-3 { transition-delay: 270ms; }

        @keyframes revealTitle {
          to { transform: translateY(0); }
        }
        @keyframes liftIn {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translate3d(var(--dx), calc(var(--dy) + 38px), 0) rotate(var(--rotate)) scale(.92); }
          to { opacity: 1; transform: translate3d(var(--dx), var(--dy), 0) rotate(var(--rotate)) scale(1); }
        }
        @keyframes floatCard {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -10px; }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes orbitSlow {
          from { rotate: 0deg; }
          to { rotate: 360deg; }
        }
        @keyframes markPulse {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-2px) rotate(4deg); }
        }

        @media (max-width: 920px) {
          .section-grid,
          .contact-shell {
            grid-template-columns: 1fr;
          }
          .hero-card {
            width: clamp(132px, 31vw, 190px);
            min-height: 132px;
            padding: 13px;
          }
          .hero-card p { display: none; }
          .proof-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 680px) {
          .nav {
            padding: 14px 16px;
          }
          .nav.scrolled {
            padding: 10px 16px;
          }
          .nav-link:nth-child(2),
          .nav-link:nth-child(3) {
            display: none;
          }
          .brand-name { font-size: 16px; }
          .hero {
            min-height: 92vh;
            padding-inline: 16px;
          }
          .hero-card {
            opacity: 0.86;
          }
          .hero-card:nth-of-type(3),
          .hero-card:nth-of-type(5) {
            display: none;
          }
          .hero-text { font-size: 17px; }
          .section { padding: 78px 18px; }
          .process-item { grid-template-columns: 46px 1fr; padding: 18px; }
          .contact-shell { padding: 66px 18px; }
          .footer {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <main className="site" onPointerMove={updatePointer}>
        <nav className={`nav${scrollY > 60 ? " scrolled" : ""}`}>
          <a className="brand" href="https://sw8tx.lol">
            <span className="brand-mark">
              <Image src="/logo.png" alt="sw8tx logo" width={34} height={34} />
            </span>
            <span className="brand-name">sw8tx</span>
          </a>
          <div className="nav-links">
            <a className="nav-link" href="#about">About</a>
            <a className="nav-link" href="#process">Process</a>
            <a className="nav-link" href="#contact">Contact</a>
            <button className="nav-button" type="button" onClick={() => setPopupOpen(true)}>
              Get in touch
            </button>
          </div>
        </nav>

        <section className="hero" aria-label="sw8tx web designer portfolio">
          <div className="hero-copy" style={{ transform: `translateY(${-scrollY * 0.05}px)` }}>
            <p className="eyebrow">Web Designer and Frontend Developer</p>
            <h1 className="hero-title">
              {heroLines.map((line, lineIndex) => (
                <span className="title-line" key={line.join("-")}>
                  {line.map((word, wordIndex) => (
                    <span className="title-word" key={word}>
                      {word.split("").map((letter, letterIndex) => {
                        const direction = (letterIndex + lineIndex + wordIndex) % 2 === 0 ? -1 : 1;
                        return (
                          <span
                            className="title-letter"
                            key={`${word}-${letter}-${letterIndex}`}
                            style={{
                              "--letter-delay": `${lineIndex * 180 + wordIndex * 120 + letterIndex * 42}ms`,
                              "--letter-x": `${direction * (18 + letterIndex * 4)}px`,
                              "--letter-y": `${-34 + (letterIndex % 3) * 21}px`,
                              "--letter-r": `${direction * (10 + letterIndex * 2)}deg`,
                            } as CSSProperties}
                          >
                            {letter}
                          </span>
                        );
                      })}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
            <p className="hero-text">
              I am Tyler / sw8tx, building custom websites, animated interfaces,
              portfolio systems and clean Next.js experiences for brands that need their own look.
            </p>
            <div className="hero-actions">
              <a className="button primary" href={`mailto:${emails[0]}`}>
                Email sw8tx
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a className="button" href="#work">View playground</a>
            </div>
          </div>

          {showcase.map((card, index) => (
              <button
                key={card.id}
                type="button"
                className={`hero-card ${card.tone}${activeShowcase === card.id ? " active" : ""}`}
                aria-label={`Highlight ${card.title}`}
                onClick={() => setActiveShowcase(card.id)}
                style={{
                  "--left": card.left,
                  "--top": card.top,
                  "--rotate": `${card.rotate}deg`,
                  "--float": index % 2 === 0 ? -4 : 4,
                  "--delay": `${220 + index * 90}ms`,
                  "--entry-x": `${index % 2 === 0 ? -80 : 80}px`,
                  "--entry-y": `${index < 2 ? -70 : 70}px`,
                } as CSSProperties}
              >
                {card.tone === "image" && (
                  <div className="card-logo">
                    <Image src="/logo.png" alt="" width={54} height={54} />
                  </div>
                )}
                <div className="card-top">
                  <span className="card-kicker">{card.kicker}</span>
                  <span className="card-handle" aria-hidden="true">
                    <span /><span /><span /><span /><span /><span />
                  </span>
                </div>
                <h2>{card.title}</h2>
                <p>{card.body}</p>
              </button>
          ))}
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((group) => (
              <div className="marquee-row" key={group}>
                {marqueeWords.map((service, index) => (
                  <span className="marquee-item" key={`${group}-${service}-${index}`}>{service}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="marquee marquee-reverse" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((group) => (
              <div className="marquee-row" key={group}>
                {marqueeWords.toReversed().map((service, index) => (
                  <span className="marquee-item" key={`${group}-${service}`}>{service}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section className="section" id="about">
          <div className="section-grid">
            <div className="reveal">
              <p className="section-label">About</p>
              <h2 className="section-title">Clean, sharp, <span className="accent-text">animated.</span></h2>
            </div>
            <div className="reveal delay-1">
              <p className="section-text">
                I design and build modern web experiences with a focus on motion, layout clarity
                and a strong first impression. The style is sharp and playful, but the code stays
                practical enough to ship.
              </p>
              <div className="proof-grid">
                <div className="proof"><strong>20+</strong><span>Digital surfaces</span></div>
                <div className="proof"><strong>3+</strong><span>Years designing</span></div>
                <div className="proof"><strong>2</strong><span>Direct inboxes</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="process">
          <div className="section-grid">
            <div className="reveal">
              <p className="section-label">Process</p>
              <h2 className="section-title">From idea to <span className="accent-text">live site.</span></h2>
            </div>
            <div className="process reveal delay-1">
              {process.map(([num, title, body], index) => (
                <article className={`process-item delay-${index}`} key={title}>
                  <span className="process-num">{num}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="work">
          <div className="section-grid">
            <div className="reveal">
              <p className="section-label">Playground</p>
              <h2 className="section-title">Pieces that <span className="accent-text">build.</span></h2>
            </div>
            <p className="section-text reveal delay-1">
              The hero stacks itself in motion, the cards react when selected, and the page
              keeps small animated details running in the background. The direction stays direct:
              designer portfolio first, useful contact flow always visible.
            </p>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-shell">
            <div className="reveal">
              <p className="section-label">Contact</p>
              <h2 className="contact-title">Let's<br /><span>build.</span></h2>
            </div>
            <div className="contact-panel reveal delay-1">
              <p className="contact-note">
                For web design, frontend builds, portfolio work, brand refreshes or collaborations,
                send a mail to either inbox.
              </p>
              {emails.map((email) => (
                <button className="email-row" type="button" key={email} onClick={() => copyEmail(email)}>
                  <span className="email-main">
                    <span className="email-label">{copied === email ? "Copied" : "Email"}</span>
                    <span className="email-address">{email}</span>
                  </span>
                  <span className="email-arrow">-&gt;</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <footer className="footer">
          <span>(C) {year} sw8tx / Tyler Osthoff</span>
          <div className="footer-links">
            <a href="/tos">Terms</a>
            <a href="/privacy">Privacy</a>
            <a href="/refund">Refund</a>
          </div>
        </footer>

        <div
          className={`popup-backdrop${popupOpen ? " open" : ""}`}
          onClick={(event) => event.target === event.currentTarget && setPopupOpen(false)}
        >
          <div className="popup" role="dialog" aria-modal="true" aria-labelledby="contact-title">
            <div className="popup-head">
              <h2 id="contact-title">Start a project</h2>
              <button className="popup-close" type="button" onClick={() => setPopupOpen(false)} aria-label="Close contact popup">
                x
              </button>
            </div>
            <div className="popup-body">
              <p>Pick the inbox that fits. Click copies the address, or use your mail app from the hero button.</p>
              <div className="popup-actions">
                {emails.map((email) => (
                  <button className="email-row" type="button" key={email} onClick={() => copyEmail(email)}>
                    <span className="email-main">
                      <span className="email-label">{copied === email ? "Copied" : "Copy email"}</span>
                      <span className="email-address">{email}</span>
                    </span>
                    <span className="email-arrow">-&gt;</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
