"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useRef, useState } from "react";

const emails = ["info@sw8tx.lol", "info@tylerosthoff.xyz"];

type ShowcaseCard = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  category: string;
  left: number;
  top: number;
  mobileLeft: number;
  mobileTop: number;
  rotate: number;
  color: string;
  color2: string;
  soft: string;
  dark?: boolean;
  image?: boolean;
};

type DragOffset = {
  x: number;
  y: number;
};

const showcase: ShowcaseCard[] = [
  {
    id: "interfaces",
    kicker: "01 / Web",
    title: "Interface Systems",
    body: "Polished portfolio, shop and SaaS surfaces built around fast flows.",
    category: "Web",
    left: 7,
    top: 20,
    mobileLeft: 4,
    mobileTop: 6,
    rotate: -7,
    color: "#0050d8",
    color2: "#6b7cff",
    soft: "#dbefff",
    dark: true,
  },
  {
    id: "brand",
    kicker: "02 / Brand",
    title: "Brand Identity Kits",
    body: "Logos, palettes, type systems and launch-ready social assets.",
    category: "Brand",
    left: 69,
    top: 15,
    mobileLeft: 52,
    mobileTop: 11,
    rotate: 6,
    color: "#ff9d2e",
    color2: "#ffe6a1",
    soft: "#fff6d9",
  },
  {
    id: "motion",
    kicker: "03 / Motion",
    title: "Animated Details",
    body: "Micro-interactions, reveal systems, hover energy and page rhythm.",
    category: "Motion",
    left: 18,
    top: 67,
    mobileLeft: 6,
    mobileTop: 42,
    rotate: 5,
    color: "#19ad76",
    color2: "#9bf1ff",
    soft: "#dffbf2",
  },
  {
    id: "frontend",
    kicker: "04 / Code",
    title: "Next.js Builds",
    body: "Responsive components with crisp implementation and clean handoff.",
    category: "Code",
    left: 73,
    top: 64,
    mobileLeft: 52,
    mobileTop: 49,
    rotate: -6,
    color: "#4b5bff",
    color2: "#0050d8",
    soft: "#e7ecff",
    dark: true,
  },
  {
    id: "identity",
    kicker: "Sparkle",
    title: "Visual Identity",
    body: "A compact design language for sites that need to feel memorable.",
    category: "Look",
    left: 42,
    top: 9,
    mobileLeft: 27,
    mobileTop: 74,
    rotate: 3,
    color: "#ff4f87",
    color2: "#9bd3ff",
    soft: "#ffe8f0",
    image: true,
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
  {
    num: "01",
    title: "Direction",
    body: "Mood, structure, colors and the exact feel of the site.",
    color: "#0050d8",
    soft: "#e0f1ff",
  },
  {
    num: "02",
    title: "Design",
    body: "Visual systems in Figma-style thinking, then responsive layouts.",
    color: "#ff9d2e",
    soft: "#fff2cf",
  },
  {
    num: "03",
    title: "Build",
    body: "Next.js implementation with interaction polish and clean details.",
    color: "#19ad76",
    soft: "#ddfaef",
  },
  {
    num: "04",
    title: "Launch",
    body: "Final QA, copy pass, contact routes and handoff-ready files.",
    color: "#ff4f87",
    soft: "#ffe4ef",
  },
];

const proofStats = [
  { value: "20+", label: "Digital surfaces", color: "#0050d8" },
  { value: "3+", label: "Years designing", color: "#19ad76" },
  { value: "2", label: "Direct inboxes", color: "#ff4f87" },
];

const heroLines = [
  ["Sparkle"],
  ["sites", "move"],
];

const marqueeWords = [...services, ...services, ...services];

function writingText(parts: { text: string; accent?: boolean }[]) {
  let order = 0;

  return parts.map((part, partIndex) => (
    <span className={`write-part${part.accent ? " accent-text" : ""}`} key={`${part.text}-${partIndex}`}>
      {part.text.split(" ").map((word, wordIndex) => (
        <span className="write-word" key={`${part.text}-${word}-${wordIndex}`}>
          {word.split("").map((letter, letterIndex) => {
            const current = order++;

            return (
              <span
                className="write-char"
                key={`${part.text}-${word}-${letter}-${letterIndex}`}
                style={{ "--char-delay": `${current * 22}ms` } as CSSProperties}
              >
                {letter}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  ));
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [copied, setCopied] = useState("");
  const [activeShowcase, setActiveShowcase] = useState(showcase[0].id);
  const [draggingCard, setDraggingCard] = useState("");
  const [cardOffsets, setCardOffsets] = useState<Record<string, DragOffset>>({});
  const dragRef = useRef<{
    id: string;
    startX: number;
    startY: number;
    origin: DragOffset;
  } | null>(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    const revealEls = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -48px 0px" },
    );

    window.addEventListener("scroll", onScroll, { passive: true });
    revealEls.forEach((el) => observer.observe(el));
    window.requestAnimationFrame(onScroll);

    return () => {
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
      const fallbackLink = document.createElement("a");
      fallbackLink.href = `mailto:${email}`;
      fallbackLink.click();
    }
  };

  const updatePointer = (event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--mx", `${event.clientX}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY}px`);
  };

  const startDrag = (event: ReactPointerEvent<HTMLButtonElement>, id: string) => {
    event.preventDefault();
    const origin = cardOffsets[id] ?? { x: 0, y: 0 };

    setActiveShowcase(id);
    setDraggingCard(id);
    dragRef.current = {
      id,
      startX: event.clientX,
      startY: event.clientY,
      origin,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag) return;

    const next = {
      x: drag.origin.x + event.clientX - drag.startX,
      y: drag.origin.y + event.clientY - drag.startY,
    };

    setCardOffsets((current) => ({
      ...current,
      [drag.id]: next,
    }));
  };

  const endDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!dragRef.current) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragRef.current = null;
    setDraggingCard("");
  };

  return (
    <main className="site" onPointerMove={updatePointer}>
      <nav className={`nav${scrollY > 60 ? " scrolled" : ""}`}>
        <Link className="brand" href="/" aria-label="Sparkle home">
          <span className="brand-mark">
            <Image src="/logo-transparent.png" alt="" width={38} height={38} priority />
          </span>
          <span className="brand-name">Sparkle</span>
        </Link>
        <div className="nav-links">
          <a className="nav-link" href="#about">About</a>
          <a className="nav-link" href="#process">Process</a>
          <a className="nav-link" href="#contact">Contact</a>
          <button className="nav-button" type="button" onClick={() => setPopupOpen(true)}>
            Contact Sparkle
          </button>
        </div>
      </nav>

      <section className="hero" aria-label="Sparkle web designer portfolio">
        <div className="hero-copy" style={{ transform: `translateY(${-scrollY * 0.04}px)` }}>
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
                            "--letter-delay": `${lineIndex * 190 + wordIndex * 120 + letterIndex * 38}ms`,
                            "--letter-x": `${direction * (12 + letterIndex * 3)}px`,
                            "--letter-y": `${-28 + (letterIndex % 3) * 18}px`,
                            "--letter-r": `${direction * (8 + letterIndex)}deg`,
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
            I am Sparkle, building custom websites, animated interfaces, portfolio systems and
            clean Next.js experiences for brands that need their own look.
          </p>
          <div className="hero-actions">
            <a className="button primary" href={`mailto:${emails[0]}`}>
              <span>Email Sparkle</span>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a className="button" href="#work">
              <span>View playground</span>
            </a>
          </div>
        </div>

        <div className="card-stage" aria-label="Sparkle service cards">
          {showcase.map((card, index) => {
            const offset = cardOffsets[card.id] ?? { x: 0, y: 0 };

            return (
              <button
                key={card.id}
                type="button"
                className={`hero-card${activeShowcase === card.id ? " active" : ""}${draggingCard === card.id ? " dragging" : ""}${card.dark ? " dark" : ""}`}
                aria-label={`${card.category}: ${card.title}`}
                onPointerDown={(event) => startDrag(event, card.id)}
                onPointerMove={moveDrag}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                style={{
                  "--left": card.left,
                  "--top": card.top,
                  "--mobile-left": card.mobileLeft,
                  "--mobile-top": card.mobileTop,
                  "--rotate": `${card.rotate}deg`,
                  "--drag-x": `${offset.x}px`,
                  "--drag-y": `${offset.y}px`,
                  "--card-color": card.color,
                  "--card-color-2": card.color2,
                  "--card-soft": card.soft,
                  "--delay": `${220 + index * 90}ms`,
                } as CSSProperties}
              >
                <span className="card-lift">
                  {card.image && (
                    <span className="card-logo">
                      <Image src="/logo-transparent.png" alt="" width={58} height={58} />
                    </span>
                  )}
                  <span className="card-top">
                    <span className="card-kicker">{card.kicker}</span>
                    <span className="card-handle" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </span>
                  </span>
                  <span className="card-category">{card.category}</span>
                  <span className="card-title">{card.title}</span>
                  <span className="card-body">{card.body}</span>
                </span>
              </button>
            );
          })}
        </div>
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
              {[...marqueeWords].reverse().map((service, index) => (
                <span className="marquee-item" key={`${group}-${service}-${index}`}>{service}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="section" id="about">
        <div className="section-grid">
          <div className="reveal">
            <p className="section-label">About</p>
            <h2 className="section-title">{writingText([{ text: "Clean, sharp," }, { text: "animated.", accent: true }])}</h2>
          </div>
          <div className="reveal delay-1">
            <p className="section-text soft-copy">
              I design and build modern web experiences with a focus on motion, layout clarity
              and a strong first impression. The style is sharp and playful, but the code stays
              practical enough to ship.
            </p>
            <div className="proof-grid">
              {proofStats.map((proof) => (
                <div className="proof" key={proof.label} style={{ "--proof-color": proof.color } as CSSProperties}>
                  <strong>{proof.value}</strong>
                  <span>{proof.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="process">
        <div className="section-grid">
          <div className="reveal">
            <p className="section-label">Process</p>
            <h2 className="section-title">{writingText([{ text: "From idea" }, { text: "to live site.", accent: true }])}</h2>
          </div>
          <div className="process reveal delay-1">
            {process.map((item, index) => (
              <article
                className="process-item"
                key={item.title}
                style={{
                  "--process-color": item.color,
                  "--process-soft": item.soft,
                  "--process-delay": `${index * 90}ms`,
                } as CSSProperties}
              >
                <span className="process-num">{item.num}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
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
            <h2 className="section-title">{writingText([{ text: "Pieces that" }, { text: "build.", accent: true }])}</h2>
          </div>
          <p className="section-text reveal delay-1 soft-copy">
            The hero stacks itself in motion, the cards respond to your hand, and the page
            keeps a calmer sky palette running underneath every section. The direction stays direct:
            designer portfolio first, useful contact flow always visible.
          </p>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-shell">
          <div className="reveal">
            <p className="section-label">Contact</p>
            <h2 className="contact-title">{writingText([{ text: "Let's" }, { text: "build.", accent: true }])}</h2>
          </div>
          <div className="contact-panel reveal delay-1">
            <p className="contact-note soft-copy">
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
        <span>(C) {year} Sparkle / Tyler Osthoff</span>
        <div className="footer-links">
          <Link className="footer-link terms" href="/tos">Terms</Link>
          <Link className="footer-link privacy" href="/privacy">Privacy</Link>
          <Link className="footer-link refund" href="/refund">Refund</Link>
        </div>
      </footer>

      <div
        className={`popup-backdrop${popupOpen ? " open" : ""}`}
        onClick={(event) => event.target === event.currentTarget && setPopupOpen(false)}
      >
        <div className="popup" role="dialog" aria-modal="true" aria-labelledby="contact-title">
          <div className="popup-head">
            <h2 id="contact-title">Contact Sparkle</h2>
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
  );
}
