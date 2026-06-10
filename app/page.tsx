"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

const primaryEmail = "info@sw8tx.lol";
const discordHandle = "ylhj";
const tiktokUrl = "https://www.tiktok.com/@sw8tx";
const emails = [primaryEmail];

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

type ContactKind = "discord" | "tiktok" | "email";

type ContactItem = {
  kind: ContactKind;
  label: string;
  detail: string;
  action: string;
  href?: string;
  copyValue?: string;
};

const contactItems: ContactItem[] = [
  {
    kind: "discord",
    label: "Discord",
    detail: discordHandle,
    action: "Click to copy username",
    copyValue: discordHandle,
  },
  {
    kind: "tiktok",
    label: "TikTok",
    detail: "@sw8tx",
    action: "Open profile",
    href: tiktokUrl,
  },
  {
    kind: "email",
    label: "Email",
    detail: primaryEmail,
    action: "Click to copy email",
    copyValue: primaryEmail,
  },
];

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
    color2: "#4db6e5",
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
    color: "#1aaed8",
    color2: "#9bd3ff",
    soft: "#e7f8ff",
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
    color: "#18bfa5",
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
    color: "#0076f5",
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
    color: "#4db6e5",
    color2: "#9bd3ff",
    soft: "#eaf6ff",
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
    color: "#4db6e5",
    soft: "#eaf6ff",
  },
  {
    num: "03",
    title: "Build",
    body: "Next.js implementation with interaction polish and clean details.",
    color: "#18bfa5",
    soft: "#ddfaef",
  },
  {
    num: "04",
    title: "Launch",
    body: "Final QA, copy pass, contact routes and handoff-ready files.",
    color: "#0097d7",
    soft: "#e7f8ff",
  },
];

const proofStats = [
  { value: "20+", label: "Digital surfaces", color: "#0050d8" },
  { value: "3+", label: "Years designing", color: "#18bfa5" },
  { value: "3", label: "Contact routes", color: "#4db6e5" },
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

function ContactIcon({ kind }: { kind: ContactKind }) {
  const commonProps = {
    className: "connect-icon-svg",
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };

  if (kind === "discord") {
    return (
      <svg {...commonProps}>
        <path
          fill="currentColor"
          d="M19.5 5.3A15.2 15.2 0 0 0 15.7 4l-.2.4c1.3.4 1.9.9 2.5 1.4-1.1-.6-2.2-1-3.4-1.2a12.8 12.8 0 0 0-5.3.2c-.3.1-1.5.4-3 1.2.3-.3 1.1-.9 2.6-1.5L8.7 4a15.1 15.1 0 0 0-3.8 1.3C2.5 8.8 1.8 12.2 2.1 15.5c1.6 1.2 3.1 1.9 4.6 2.4l1-1.7c-.6-.2-1.1-.5-1.6-.8l.4-.3c3 1.4 6.4 1.4 9.3 0l.4.3c-.5.3-1 .6-1.6.8l1 1.7c1.5-.5 3-1.2 4.6-2.4.4-3.9-.7-7.2-2.7-10.2ZM8.7 14.3c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8Zm6.6 0c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8Z"
        />
      </svg>
    );
  }

  if (kind === "tiktok") {
    return (
      <svg {...commonProps}>
        <path
          fill="currentColor"
          d="M16.3 3c.3 2.1 1.5 3.4 3.6 3.5v3.1a6.8 6.8 0 0 1-3.6-1.1v5.9c0 3-2 5.6-5.6 5.6A5.4 5.4 0 0 1 5 14.5C5 11.2 7.6 9 10.8 9c.4 0 .8 0 1.1.1v3.3a3.2 3.2 0 0 0-1.2-.2c-1.4 0-2.4.9-2.4 2.2 0 1.4 1 2.2 2.3 2.2 1.5 0 2.4-.8 2.4-2.7V3h3.3Z"
        />
      </svg>
    );
  }

  return (
    <svg {...commonProps} fill="none">
      <path
        d="M4.5 6.5h15v11h-15v-11Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="m5 7 7 5.4L19 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function renderContactContent(item: ContactItem, copied: string): ReactNode {
  return (
    <>
      <span className="connect-icon">
        <ContactIcon kind={item.kind} />
      </span>
      <span className="connect-copy">
        <strong>{item.label}</strong>
        <span>{copied === item.copyValue ? "Copied" : item.action}</span>
      </span>
      <span className="connect-detail">{item.detail}</span>
    </>
  );
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
  const popupDismissedRef = useRef(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -48px 0px" },
    );
    const popupTimer = window.setTimeout(() => {
      if (!popupDismissedRef.current) setPopupOpen(true);
    }, 5000);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      popupDismissedRef.current = true;
      setPopupOpen(false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    revealEls.forEach((el, index) => {
      el.style.setProperty("--reveal-delay", `${Math.min(index % 5, 4) * 70}ms`);
      observer.observe(el);
    });
    window.requestAnimationFrame(onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(popupTimer);
      observer.disconnect();
    };
  }, []);

  const closePopup = () => {
    popupDismissedRef.current = true;
    setPopupOpen(false);
  };

  const copyContact = async (value: string, fallbackHref?: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      window.setTimeout(() => setCopied(""), 2200);
    } catch {
      if (!fallbackHref) return;
      const fallbackLink = document.createElement("a");
      fallbackLink.href = fallbackHref;
      fallbackLink.click();
    }
  };

  const copyEmail = (email: string) => copyContact(email, `mailto:${email}`);

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
              send a mail or use one of the direct contact routes.
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
        onClick={(event) => event.target === event.currentTarget && closePopup()}
      >
        <div className="popup" role="dialog" aria-modal="true" aria-labelledby="contact-title">
          <div className="popup-head">
            <div>
              <p className="popup-kicker">sw8tx.lol</p>
              <h2 id="contact-title">Stay connected</h2>
            </div>
            <button className="popup-close" type="button" onClick={closePopup} aria-label="Close contact popup">
              x
            </button>
          </div>
          <div className="popup-body">
            <p>Join the community or reach out directly for business.</p>
            <div className="connect-list">
              {contactItems.map((item) => {
                if (item.href) {
                  return (
                    <a
                      className="connect-card"
                      href={item.href}
                      key={item.kind}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {renderContactContent(item, copied)}
                    </a>
                  );
                }

                return (
                  <button
                    className="connect-card"
                    key={item.kind}
                    type="button"
                    onClick={() => copyContact(item.copyValue ?? item.detail, item.kind === "email" ? `mailto:${item.detail}` : undefined)}
                  >
                    {renderContactContent(item, copied)}
                  </button>
                );
              })}
            </div>
            <button className="popup-dismiss" type="button" onClick={closePopup}>
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
