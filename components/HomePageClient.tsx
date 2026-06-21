"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  type MotionStyle,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

const primaryEmail = "info@tylerosthoff.xyz";

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

const showcase: ShowcaseCard[] = [
  {
    id: "interfaces",
    kicker: "01 / Web",
    title: "Interface Systems",
    body: "Polished portfolio, shop and SaaS surfaces built around fast flows.",
    category: "Web",
    left: 7,
    top: 18,
    mobileLeft: 2,
    mobileTop: 6,
    rotate: -6,
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
    left: 64,
    top: 10,
    mobileLeft: 52,
    mobileTop: 12,
    rotate: 5,
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
    left: 12,
    top: 58,
    mobileLeft: 5,
    mobileTop: 46,
    rotate: 4,
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
    left: 61,
    top: 55,
    mobileLeft: 51,
    mobileTop: 52,
    rotate: -5,
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
    left: 35,
    top: 2,
    mobileLeft: 25,
    mobileTop: 75,
    rotate: 2,
    color: "#4db6e5",
    color2: "#9bd3ff",
    soft: "#eaf6ff",
    image: true,
  },
] as const;

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
] as const;

const proofStats = [
  { value: "20+", label: "Digital surfaces", color: "#0050d8" },
  { value: "3+", label: "Years designing", color: "#18bfa5" },
  { value: "3", label: "Contact routes", color: "#4db6e5" },
];

const heroLines = [
  ["Building", "websites"],
  ["people", "remember."],
];

const heroChips = [
  { label: "Awwwards Energy", left: "8%", top: "17%", rotate: "-8deg" },
  { label: "Motion First", left: "76%", top: "14%", rotate: "7deg" },
  { label: "Drag The Cards", left: "70%", top: "78%", rotate: "-6deg" },
] as const;

const heroParticles = [
  { size: 12, left: "14%", top: "24%", depth: 0.4, delay: "0s" },
  { size: 8, left: "22%", top: "68%", depth: 0.65, delay: "-1.2s" },
  { size: 16, left: "68%", top: "18%", depth: 0.35, delay: "-2.4s" },
  { size: 10, left: "82%", top: "38%", depth: 0.7, delay: "-0.8s" },
  { size: 14, left: "76%", top: "72%", depth: 0.5, delay: "-1.9s" },
  { size: 6, left: "42%", top: "14%", depth: 0.85, delay: "-2.8s" },
  { size: 9, left: "56%", top: "82%", depth: 0.58, delay: "-1.5s" },
] as const;

const rotatingTitles = [
  "Sparkle | Websites",
  "Sparkle | Coding",
  "Sparkle | Frontend",
  "Sparkle | Web Design",
  "Sparkle | UI/UX",
  "Sparkle | Brand Identity",
  "Sparkle | Landing Pages",
  "Sparkle | Motion Design",
  "Sparkle | Portfolio Systems",
  "Sparkle | Design Cleanup",
];

const loaderMessages = [
  "CALIBRATING THE CANVAS",
  "SCULPTING DEPTH AND LIGHT",
  "TUNING THE INTERACTIONS",
  "POLISHING THE FINAL PASS",
  "READY FOR THE REVEAL",
] as const;

const aboutSignals = [
  { label: "Clarity", value: "Structured layouts" },
  { label: "Motion", value: "Human rhythm" },
  { label: "Polish", value: "Premium finish" },
] as const;

const workSignals = [
  { label: "Depth", x: "10%", y: "16%" },
  { label: "Flow", x: "82%", y: "22%" },
  { label: "Trust", x: "72%", y: "78%" },
  { label: "Energy", x: "18%", y: "74%" },
] as const;

const contactNodes = [
  { x: "12%", y: "24%" },
  { x: "34%", y: "12%" },
  { x: "56%", y: "28%" },
  { x: "74%", y: "18%" },
  { x: "88%", y: "34%" },
] as const;

const marqueeWords = [...services, ...services, ...services];

const studioProjects = [
  {
    title: "Nova Studio",
    category: "Creative Agency",
    summary: "Premium service website with a calmer structure, stronger trust and cleaner calls to action.",
    outcome: "A sharper conversion flow with motion that feels expensive instead of noisy.",
    duration: "Strategy, design, build and QA need real time so the result feels deliberate.",
    accent: "#0050d8",
    screens: [
      { label: "Hero", note: "high-impact intro", accent: "#0050d8" },
      { label: "Services", note: "clear selling blocks", accent: "#4db6e5" },
      { label: "Contact", note: "strong close", accent: "#18bfa5" },
    ],
  },
  {
    title: "Aura Commerce",
    category: "Beauty Ecommerce",
    summary: "Storefront concept with faster browsing, cleaner product hierarchy and more premium atmosphere.",
    outcome: "Customers move from first impression to product discovery with less friction.",
    duration: "Good ecommerce takes careful layout work, performance cleanup and responsive passes.",
    accent: "#18bfa5",
    screens: [
      { label: "Collection", note: "elevated browsing", accent: "#18bfa5" },
      { label: "Product", note: "conversion detail", accent: "#4db6e5" },
      { label: "Cart", note: "clean checkout feel", accent: "#0050d8" },
    ],
  },
  {
    title: "Vertex SaaS",
    category: "B2B Software",
    summary: "SaaS website system that makes technical products feel clearer, lighter and easier to trust.",
    outcome: "A more readable product story that guides visitors toward demos and calls.",
    duration: "Professional builds take planning, revisions and polish across desktop and mobile.",
    accent: "#4db6e5",
    screens: [
      { label: "Overview", note: "simple product story", accent: "#4db6e5" },
      { label: "Features", note: "modular sections", accent: "#0050d8" },
      { label: "Demo CTA", note: "conversion finish", accent: "#18bfa5" },
    ],
  },
];

const testimonials = [
  "Working with him was one of the smoothest freelance experiences I've had. The final website looked significantly better than what we originally imagined and performed perfectly across all devices.",
  "The attention to detail was outstanding. Every animation felt purposeful and every section of the website reflected our brand perfectly.",
  "The final result feels premium without sacrificing usability. Every interaction feels smooth and refined.",
];

type ProcessStep = (typeof process)[number];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function setCardSurfaceState(element: HTMLElement, clientX: number, clientY: number) {
  const rect = element.getBoundingClientRect();
  const ratioX = (clientX - rect.left) / rect.width;
  const ratioY = (clientY - rect.top) / rect.height;
  const centeredX = ratioX - 0.5;
  const centeredY = ratioY - 0.5;

  element.style.setProperty("--shine-x", `${Math.round(ratioX * 100)}%`);
  element.style.setProperty("--shine-y", `${Math.round(ratioY * 100)}%`);
  element.style.setProperty("--tilt-shadow-x", `${Math.round(centeredX * 18)}px`);
  element.style.setProperty("--tilt-shadow-y", `${Math.round(centeredY * 14)}px`);
  element.style.setProperty("--tilt-rotate-x", `${Number(-centeredY * 8).toFixed(2)}deg`);
  element.style.setProperty("--tilt-rotate-y", `${Number(centeredX * 10).toFixed(2)}deg`);
}

function resetCardSurfaceState(element: HTMLElement) {
  element.style.setProperty("--shine-x", "50%");
  element.style.setProperty("--shine-y", "50%");
  element.style.setProperty("--tilt-shadow-x", "0px");
  element.style.setProperty("--tilt-shadow-y", "0px");
  element.style.setProperty("--tilt-rotate-x", "0deg");
  element.style.setProperty("--tilt-rotate-y", "0deg");
}

function useMagnetic(strength = 8) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 360, damping: 26, mass: 0.22 });
  const springY = useSpring(y, { stiffness: 360, damping: 26, mass: 0.22 });

  const onPointerMove = <T extends HTMLElement>(event: ReactPointerEvent<T>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * strength * 2;
    const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * strength * 2;

    x.set(clamp(offsetX, -strength, strength));
    y.set(clamp(offsetY, -strength, strength));
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    style: { x: springX, y: springY },
    onPointerMove,
    onPointerLeave,
  };
}

function MagneticAnchor({
  children,
  className,
  href,
  strength = 8,
}: {
  children: ReactNode;
  className: string;
  href: string;
  strength?: number;
}) {
  const magnetic = useMagnetic(strength);

  return (
    <motion.a
      className={className}
      href={href}
      onPointerLeave={magnetic.onPointerLeave}
      onPointerMove={magnetic.onPointerMove}
      style={magnetic.style}
      whileHover={{ translateY: -2 }}
    >
      {children}
    </motion.a>
  );
}

function ProcessStack({ items }: { items: ProcessStep[] }) {
  return (
    <div className="process-line reveal delay-1">
      {items.map((item, index) => (
        <article
          className="process-line-card"
          key={item.title}
          style={{ "--process-color": item.color, "--process-soft": item.soft, "--process-index": index + 1 } as CSSProperties}
        >
          <span className="process-line-num">{item.num}</span>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </article>
      ))}
    </div>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div aria-hidden="true" className="section-divider reveal">
      <span className="section-divider-line" />
      <span className="section-divider-label">{label}</span>
      <span className="section-divider-line" />
    </div>
  );
}

function HeroShowcaseCard({
  active,
  card,
  index,
  onActivate,
}: {
  active: boolean;
  card: ShowcaseCard;
  index: number;
  onActivate: (id: string) => void;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const dragStateRef = useRef<{ pointerId: number; startX: number; startY: number; originX: number; originY: number } | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isDragging) return;

    const handleWindowPointerMove = (event: PointerEvent) => {
      const element = cardRef.current;
      const dragState = dragStateRef.current;
      if (!element || !dragState) return;
      if (dragState.pointerId !== event.pointerId) return;

      setCardSurfaceState(element, event.clientX, event.clientY);

      const nextX = clamp(dragState.originX + (event.clientX - dragState.startX), -160, 160);
      const nextY = clamp(dragState.originY + (event.clientY - dragState.startY), -120, 120);
      setDragOffset({ x: nextX, y: nextY });
    };

    const finishDrag = (event: PointerEvent) => {
      const dragState = dragStateRef.current;
      if (!dragState || dragState.pointerId !== event.pointerId) return;
      dragStateRef.current = null;
      setIsDragging(false);
    };

    window.addEventListener("pointermove", handleWindowPointerMove);
    window.addEventListener("pointerup", finishDrag);
    window.addEventListener("pointercancel", finishDrag);

    return () => {
      window.removeEventListener("pointermove", handleWindowPointerMove);
      window.removeEventListener("pointerup", finishDrag);
      window.removeEventListener("pointercancel", finishDrag);
    };
  }, [isDragging]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const element = cardRef.current;
    if (!element) return;

    event.preventDefault();

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: dragOffset.x,
      originY: dragOffset.y,
    };

    setIsDragging(true);
    onActivate(card.id);
    setCardSurfaceState(element, event.clientX, event.clientY);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const element = cardRef.current;
    if (!element) return;

    setCardSurfaceState(element, event.clientX, event.clientY);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (dragStateRef.current?.pointerId !== event.pointerId) return;
    dragStateRef.current = null;
    setIsDragging(false);
  };

  const handlePointerLeave = () => {
    const element = cardRef.current;
    if (!element || dragStateRef.current) return;
    resetCardSurfaceState(element);
  };

  return (
    <motion.button
      aria-label={`${card.category}: ${card.title}`}
      className={`hero-card${active ? " active" : ""}${card.dark ? " dark" : ""}${isDragging ? " dragging" : ""}`}
      onDoubleClick={() => setDragOffset({ x: 0, y: 0 })}
      onFocus={() => onActivate(card.id)}
      onMouseEnter={() => onActivate(card.id)}
      onPointerCancel={handlePointerUp}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      ref={cardRef}
      style={{
        "--left": card.left,
        "--top": card.top,
        "--mobile-left": card.mobileLeft,
        "--mobile-top": card.mobileTop,
        "--rotate": `${card.rotate}deg`,
        "--drag-x": `${dragOffset.x}px`,
        "--drag-y": `${dragOffset.y}px`,
        "--magnet-x": "0px",
        "--magnet-y": "0px",
        "--card-color": card.color,
        "--card-color-2": card.color2,
        "--card-soft": card.soft,
        "--shine-x": "50%",
        "--shine-y": "50%",
        "--tilt-shadow-x": "0px",
        "--tilt-shadow-y": "0px",
        "--tilt-rotate-x": "0deg",
        "--tilt-rotate-y": "0deg",
        "--delay": `${220 + index * 90}ms`,
      } as CSSProperties}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      type="button"
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
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
    </motion.button>
  );
}

function MarqueeLine({
  direction = "normal",
  row,
  speed,
}: {
  direction?: "normal" | "reverse";
  row: "near" | "mid" | "far";
  speed: number;
}) {
  const words = direction === "reverse" ? [...marqueeWords].reverse() : marqueeWords;

  return (
    <div className={`marquee marquee-${row}`} style={{ "--marquee-speed": `${speed}s` } as CSSProperties}>
      <div className="marquee-track">
        {[0, 1].map((group) => (
          <div className="marquee-row" key={group}>
            {words.map((service, index) => (
              <span className="marquee-item" key={`${row}-${group}-${service}-${index}`}>
                {service}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutSignalStrip() {
  return (
    <div className="about-signal-strip reveal delay-2" aria-hidden="true">
      {aboutSignals.map((signal) => (
        <div className="about-signal-card" key={signal.label}>
          <span>{signal.label}</span>
          <strong>{signal.value}</strong>
        </div>
      ))}
    </div>
  );
}

function WorkSignalField() {
  return (
    <div className="work-signal-field" aria-hidden="true">
      {workSignals.map((signal, index) => (
        <span
          className="work-signal-dot"
          key={signal.label}
          style={{ left: signal.x, top: signal.y, "--signal-delay": `${index * 0.8}s` } as CSSProperties}
        >
          <span>{signal.label}</span>
        </span>
      ))}
    </div>
  );
}

function ContactConstellation() {
  return (
    <div className="contact-constellation" aria-hidden="true">
      {contactNodes.map((node, index) => (
        <span
          className="contact-node"
          key={`${node.x}-${node.y}`}
          style={{ left: node.x, top: node.y, "--node-delay": `${index * 0.6}s` } as CSSProperties}
        />
      ))}
      <span className="contact-link contact-link-one" />
      <span className="contact-link contact-link-two" />
      <span className="contact-link contact-link-three" />
    </div>
  );
}

function PortfolioProjects() {
  return (
    <div className="portfolio-grid reveal delay-1">
      {studioProjects.map((project, index) => (
        <motion.article
          className="project-card"
          key={project.title}
          onPointerLeave={(event) => {
            event.currentTarget.style.setProperty("--project-x", "50%");
            event.currentTarget.style.setProperty("--project-y", "50%");
            event.currentTarget.style.setProperty("--project-tilt-x", "0deg");
            event.currentTarget.style.setProperty("--project-tilt-y", "0deg");
          }}
          onPointerMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const ratioX = (event.clientX - rect.left) / rect.width;
            const ratioY = (event.clientY - rect.top) / rect.height;
            const centeredX = ratioX - 0.5;
            const centeredY = ratioY - 0.5;

            event.currentTarget.style.setProperty("--project-x", `${Math.round(ratioX * 100)}%`);
            event.currentTarget.style.setProperty("--project-y", `${Math.round(ratioY * 100)}%`);
            event.currentTarget.style.setProperty("--project-tilt-x", `${Number(-centeredY * 6).toFixed(2)}deg`);
            event.currentTarget.style.setProperty("--project-tilt-y", `${Number(centeredX * 8).toFixed(2)}deg`);
          }}
          style={{ "--project-color": project.accent, "--project-delay": `${index * 90}ms` } as CSSProperties}
          whileHover={{ y: -10 }}
        >
          <div className="project-media" aria-hidden="true">
            {project.screens.map((screen) => (
              <div
                className="project-shot"
                key={`${project.title}-${screen.label}`}
                style={{ "--shot-accent": screen.accent } as CSSProperties}
              >
                <span className="project-shot-bar" />
                <span className="project-shot-chip">{screen.label}</span>
                <span className="project-shot-pane" />
                <span className="project-shot-caption">{screen.note}</span>
              </div>
            ))}
          </div>
          <div className="project-copy">
            <p>{project.category}</p>
            <h3>{project.title}</h3>
            <dl>
              <div>
                <dt>Goal</dt>
                <dd>{project.summary}</dd>
              </div>
              <div>
                <dt>Technologies</dt>
                <dd>{project.duration}</dd>
              </div>
              <div>
                <dt>Result</dt>
                <dd>{project.outcome}</dd>
              </div>
            </dl>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

function IntroLoader({ active, progress }: { active: boolean; progress: number }) {
  const glowPosition = Math.min(96, Math.max(4, progress));
  const loaderMessage = loaderMessages[Math.min(loaderMessages.length - 1, Math.floor(progress / 22))];
  const progressLabel = `${String(Math.round(progress)).padStart(2, "0")}%`;

  return (
    <div aria-hidden={!active} className={`load-gate${active ? " is-active" : " is-exiting"}`}>
      <div className="load-stage" role="presentation">
        <span className="load-orbit load-orbit-one" />
        <span className="load-orbit load-orbit-two" />
        <span className="load-spark load-spark-one" />
        <span className="load-spark load-spark-two" />
        <span className="load-spark load-spark-three" />
        <div className="load-logo-shell">
          <div className="load-logo-build">
            <Image src="/logo-transparent.png" alt="" width={272} height={272} priority />
          </div>
        </div>
      </div>
      <div className="load-footer">
        <p className="load-kicker">Sparkle experience</p>
        <div className="load-meta" aria-hidden="true">
          <span>{loaderMessage}</span>
          <span>{progressLabel}</span>
        </div>
        <div
          aria-label={`Loading progress ${progress} percent`}
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={progress}
          className="load-progress"
          role="progressbar"
        >
          <span className="load-progress-bar" style={{ transform: `scaleX(${progress / 100})` }}>
            <span className="load-progress-liquid" />
          </span>
          <span className="load-progress-glow" style={{ left: `${glowPosition}%` }} />
        </div>
        <p className="load-word" key={loaderMessage}>
          {loaderMessage}
        </p>
      </div>
      <div aria-hidden="true" className="load-curtain">
        <span className="load-curtain-band load-curtain-band-top" />
        <span className="load-curtain-band load-curtain-band-mid" />
        <span className="load-curtain-band load-curtain-band-base" />
      </div>
    </div>
  );
}

function TestimonialsCarousel() {
  const [[active, direction], setActive] = useState<[number, number]>([0, 0]);
  const review = testimonials[active];

  const paginate = (nextDirection: number) => {
    setActive(([current]) => [
      (current + nextDirection + testimonials.length) % testimonials.length,
      nextDirection,
    ]);
  };

  useEffect(() => {
    const interval = window.setInterval(() => paginate(1), 4800);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="section reviews-section" id="reviews">
      <div className="section-grid">
        <div className="reveal">
          <p className="section-label">Reviews</p>
          <h2 className="section-title">Clients feel the polish.</h2>
        </div>
        <div className="review-shell reveal delay-1">
          <div className="review-controls">
            <button aria-label="Previous review" type="button" onClick={() => paginate(-1)}>
              &larr;
            </button>
            <span>{String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}</span>
            <button aria-label="Next review" type="button" onClick={() => paginate(1)}>
              &rarr;
            </button>
          </div>
          <div className="review-viewport" aria-live="polite">
            <div className="review-orbit review-orbit-one" />
            <div className="review-orbit review-orbit-two" />
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.article
                className="review-card"
                custom={direction}
                key={review}
                initial={{ opacity: 0, x: direction >= 0 ? 54 : -54, rotate: direction >= 0 ? 1.8 : -1.8 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                exit={{ opacity: 0, x: direction >= 0 ? -54 : 54, rotate: direction >= 0 ? -1.8 : 1.8 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="review-head">
                  <span className="review-stars" aria-hidden="true">★★★★★</span>
                  <span className="review-score">5.0 / 5</span>
                </div>
                <p>{review}</p>
                <strong>Sparkle client</strong>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePageClient() {
  const reduceMotion = useReducedMotion();
  const siteRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeShowcase, setActiveShowcase] = useState(showcase[0].id);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const cursorAuraTargetX = useMotionValue(0);
  const cursorAuraTargetY = useMotionValue(0);
  const cursorAuraTargetOpacity = useMotionValue(0);
  const heroPointerX = useMotionValue(0);
  const heroPointerY = useMotionValue(0);
  const heroCopyTargetY = useTransform(scrollYProgress, [0, 0.28], [0, -54]);
  const heroFieldTargetY = useTransform(scrollYProgress, [0, 0.28], [0, 70]);
  const heroGlowTargetScale = useTransform(scrollYProgress, [0, 0.28], [1, 1.12]);
  const heroBackdropTargetY = useTransform(scrollYProgress, [0, 0.28], [0, 48]);
  const heroOrbitTargetY = useTransform(scrollYProgress, [0, 0.28], [0, -86]);
  const heroStageTargetRotate = useTransform(scrollYProgress, [0, 0.28], ["0deg", "5deg"]);
  const heroPointerXSmooth = useSpring(heroPointerX, { stiffness: 110, damping: 18, mass: 0.5 });
  const heroPointerYSmooth = useSpring(heroPointerY, { stiffness: 110, damping: 18, mass: 0.5 });
  const heroCopyY = useSpring(heroCopyTargetY, { stiffness: 120, damping: 28 });
  const heroFieldY = useSpring(heroFieldTargetY, { stiffness: 120, damping: 30 });
  const heroGlowScale = useSpring(heroGlowTargetScale, { stiffness: 120, damping: 28 });
  const heroBackdropY = useSpring(heroBackdropTargetY, { stiffness: 110, damping: 28 });
  const heroOrbitY = useSpring(heroOrbitTargetY, { stiffness: 120, damping: 30 });
  const heroStageRotate = useSpring(heroStageTargetRotate, { stiffness: 120, damping: 30 });
  const scrollProgressX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.24 });
  const cursorAuraX = useSpring(cursorAuraTargetX, { stiffness: 180, damping: 24, mass: 0.3 });
  const cursorAuraY = useSpring(cursorAuraTargetY, { stiffness: 180, damping: 24, mass: 0.3 });
  const cursorAuraOpacity = useSpring(cursorAuraTargetOpacity, { stiffness: 180, damping: 26, mass: 0.32 });
  const heroGlowOpacity = useTransform(scrollYProgress, [0, 0.28], [0.92, 0.54]);
  const heroRibbonShift = useTransform(heroPointerXSmooth, [-1, 1], [-28, 28]);
  const heroRibbonLift = useTransform(heroPointerYSmooth, [-1, 1], [16, -16]);
  const heroCopyTiltX = useTransform(heroPointerYSmooth, [-1, 1], [4, -4]);
  const heroCopyTiltY = useTransform(heroPointerXSmooth, [-1, 1], [-6, 6]);
  const heroChipDriftX = useTransform(heroPointerXSmooth, [-1, 1], [-18, 18]);
  const heroChipDriftY = useTransform(heroPointerYSmooth, [-1, 1], [14, -14]);
  const heroStageShift = useTransform(heroPointerXSmooth, [-1, 1], [-20, 20]);
  const heroParticleX = useTransform(heroPointerXSmooth, [-1, 1], [-30, 30]);
  const heroParticleY = useTransform(heroPointerYSmooth, [-1, 1], [20, -20]);
  const heroHaloRotate = useTransform(heroPointerXSmooth, [-1, 1], [-8, 8]);
  const year = new Date().getFullYear();

  useEffect(() => {
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -48px 0px" },
    );

    revealEls.forEach((el, index) => {
      el.style.setProperty("--reveal-delay", `${Math.min(index % 5, 4) * 70}ms`);
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      const reducedMotionTimer = window.setTimeout(() => {
        setLoadProgress(100);
        setIsLoading(false);
      }, 0);

      return () => window.clearTimeout(reducedMotionTimer);
    }

    const durationMs = 3200;
    const start = window.performance.now();
    let frame = 0;
    let exitTimer = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const raw = elapsed / durationMs;
      const clamped = Math.min(raw, 1);
      const eased =
        clamped < 0.68
          ? 0.72 * (1 - Math.pow(1 - clamped / 0.68, 2.35))
          : 0.72 + 0.28 * (1 - Math.pow(1 - (clamped - 0.68) / 0.32, 1.45));
      const nextProgress = Math.min(100, Math.round(eased * 100));
      setLoadProgress(nextProgress);

      if (raw < 1) {
        frame = window.requestAnimationFrame(tick);
        return;
      }

      setLoadProgress(100);
      exitTimer = window.setTimeout(() => setIsLoading(false), 420);
    };

    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(exitTimer);
    };
  }, [reduceMotion]);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const hero = heroRef.current;
    if (!hero) return;

    const updateHeroPointer = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const withinX = (event.clientX - rect.left) / rect.width;
      const withinY = (event.clientY - rect.top) / rect.height;

      heroPointerX.set(clamp(withinX * 2 - 1, -1, 1));
      heroPointerY.set(clamp(withinY * 2 - 1, -1, 1));
    };

    const resetHeroPointer = () => {
      heroPointerX.set(0);
      heroPointerY.set(0);
    };

    hero.addEventListener("pointermove", updateHeroPointer);
    hero.addEventListener("pointerleave", resetHeroPointer);

    return () => {
      hero.removeEventListener("pointermove", updateHeroPointer);
      hero.removeEventListener("pointerleave", resetHeroPointer);
      resetHeroPointer();
    };
  }, [heroPointerX, heroPointerY, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;

    const stage = stageRef.current;
    if (!stage) return;

    const cards = Array.from(stage.querySelectorAll(".hero-card")) as HTMLElement[];

    const handlePointerMove = (event: PointerEvent) => {
      cards.forEach((card) => {
        if (card.classList.contains("dragging")) return;

        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = event.clientX - centerX;
        const deltaY = event.clientY - centerY;
        const distance = Math.hypot(deltaX, deltaY);
        const radius = 260;

        if (distance > radius) {
          card.style.setProperty("--magnet-x", "0px");
          card.style.setProperty("--magnet-y", "0px");
          return;
        }

        const pull = (1 - distance / radius) ** 1.6;
        const magnetX = clamp(deltaX * 0.14 * pull, -26, 26);
        const magnetY = clamp(deltaY * 0.14 * pull, -20, 20);
        card.style.setProperty("--magnet-x", `${magnetX.toFixed(2)}px`);
        card.style.setProperty("--magnet-y", `${magnetY.toFixed(2)}px`);
      });
    };

    const resetCards = () => {
      cards.forEach((card) => {
        if (card.classList.contains("dragging")) return;
        card.style.setProperty("--magnet-x", "0px");
        card.style.setProperty("--magnet-y", "0px");
      });
    };

    stage.addEventListener("pointermove", handlePointerMove);
    stage.addEventListener("pointerleave", resetCards);

    return () => {
      stage.removeEventListener("pointermove", handlePointerMove);
      stage.removeEventListener("pointerleave", resetCards);
      resetCards();
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;

    const updatePointer = (event: PointerEvent) => {
      cursorAuraTargetX.set(event.clientX);
      cursorAuraTargetY.set(event.clientY);
      cursorAuraTargetOpacity.set(0.72);
      siteRef.current?.style.setProperty("--mx", `${event.clientX}px`);
      siteRef.current?.style.setProperty("--my", `${event.clientY}px`);
    };

    const resetPointer = () => {
      cursorAuraTargetOpacity.set(0);
      siteRef.current?.style.setProperty("--mx", "50vw");
      siteRef.current?.style.setProperty("--my", "40vh");
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerleave", resetPointer);

    return () => {
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerleave", resetPointer);
    };
  }, [cursorAuraTargetOpacity, cursorAuraTargetX, cursorAuraTargetY, reduceMotion]);

  useEffect(() => {
    let titleIndex = 0;
    document.title = rotatingTitles[titleIndex];

    const interval = window.setInterval(() => {
      titleIndex = (titleIndex + 1) % rotatingTitles.length;
      document.title = rotatingTitles[titleIndex];
    }, 1800);

    return () => {
      window.clearInterval(interval);
      document.title = "Sparkle Web Design";
    };
  }, []);

  return (
    <main className={`site${isLoading ? " site-loading" : " site-entered"}`} ref={siteRef}>
      <IntroLoader active={!reduceMotion && isLoading} progress={loadProgress} />
      <motion.div aria-hidden="true" className="scroll-progress" style={{ scaleX: scrollProgressX }} />
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="cursor-aura"
          style={{ x: cursorAuraX, y: cursorAuraY, opacity: cursorAuraOpacity }}
        />
      )}

      <nav className={`nav${navScrolled ? " scrolled" : ""}`}>
        <Link className="brand" href="/" aria-label="Sparkle home">
          <span className="brand-mark">
            <Image src="/logo-transparent.png" alt="" width={38} height={38} priority />
          </span>
          <span className="brand-name">Sparkle</span>
        </Link>
        <div className="nav-links">
          <a className="nav-link" href="#about">About</a>
          <a className="nav-link" href="#process">Process</a>
          <a className="nav-link" href="#work">Work</a>
          <a className="nav-link" href="#reviews">Reviews</a>
          <MagneticAnchor className="nav-button magnetic-action" href="#contact" strength={14}>
            Contact Sparkle
          </MagneticAnchor>
        </div>
      </nav>

      <section className="hero" aria-label="Sparkle web designer portfolio" ref={heroRef}>
        <motion.div aria-hidden="true" className="hero-backdrop-grid" style={{ y: heroBackdropY }} />
        <motion.div aria-hidden="true" className="hero-parallax-field" style={{ opacity: heroGlowOpacity, scale: heroGlowScale, y: heroFieldY }} />
        <motion.div aria-hidden="true" className="hero-light-column" style={{ x: heroRibbonShift, y: heroRibbonLift, rotate: heroHaloRotate }} />
        <motion.div aria-hidden="true" className="hero-halo hero-halo-one" style={{ x: heroParticleX, y: heroParticleY, rotate: heroHaloRotate }} />
        <motion.div aria-hidden="true" className="hero-halo hero-halo-two" style={{ x: heroRibbonShift, y: heroRibbonLift, rotate: heroHaloRotate }} />
        <motion.div aria-hidden="true" className="hero-depth-ribbon hero-depth-ribbon-one" style={{ x: heroRibbonShift, y: heroOrbitY }} />
        <motion.div aria-hidden="true" className="hero-depth-ribbon hero-depth-ribbon-two" style={{ x: heroRibbonShift, y: heroBackdropY }} />
        <motion.div aria-hidden="true" className="hero-orbit-shell" style={{ x: heroRibbonShift, y: heroOrbitY, rotate: heroStageRotate }}>
          <span className="hero-orbit hero-orbit-one" />
          <span className="hero-orbit hero-orbit-two" />
          <span className="hero-orbit hero-orbit-three" />
        </motion.div>
        <div aria-hidden="true" className="hero-particle-field">
          {heroParticles.map((particle, index) => (
            <motion.span
              className="hero-particle"
              key={`${particle.left}-${particle.top}`}
              style={{
                width: particle.size,
                height: particle.size,
                left: particle.left,
                top: particle.top,
                x: index % 2 === 0 ? heroParticleX : heroRibbonShift,
                y: index % 2 === 0 ? heroParticleY : heroRibbonLift,
                "--particle-depth": particle.depth,
                "--particle-delay": particle.delay,
              } as MotionStyle}
            />
          ))}
        </div>
        {heroChips.map((chip, index) => (
          <motion.div
            aria-hidden="true"
            className="hero-chip"
            key={chip.label}
            style={{
              left: chip.left,
              top: chip.top,
              rotate: chip.rotate,
              x: index % 2 === 0 ? heroChipDriftX : heroRibbonShift,
              y: index % 2 === 0 ? heroChipDriftY : heroRibbonLift,
            }}
          >
            {chip.label}
          </motion.div>
        ))}
        <motion.div className="hero-copy" style={{ rotateX: heroCopyTiltX, rotateY: heroCopyTiltY, y: heroCopyY }}>
          <p className="eyebrow">Web Designer and Frontend Developer</p>
          <div aria-hidden="true" className="hero-title-ghost">
            <span>SPARKLE</span>
            <span>SPARKLE</span>
          </div>
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
            <MagneticAnchor className="button primary magnetic-action" href={`mailto:${primaryEmail}`} strength={18}>
              <span>Email Sparkle</span>
            </MagneticAnchor>
            <MagneticAnchor className="button magnetic-action" href="#work" strength={18}>
              <span>View Playground</span>
            </MagneticAnchor>
          </div>
        </motion.div>

        <motion.div
          className="card-stage"
          aria-label="Sparkle service cards"
          ref={stageRef}
          style={{ x: heroStageShift, y: heroFieldY, rotate: heroStageRotate }}
        >
          {showcase.map((card, index) => (
            <HeroShowcaseCard
              active={activeShowcase === card.id}
              card={card}
              index={index}
              key={card.id}
              onActivate={setActiveShowcase}
            />
          ))}
        </motion.div>
      </section>

      <div className="marquee-field" aria-hidden="true">
        <MarqueeLine row="near" speed={34} />
        <MarqueeLine direction="reverse" row="mid" speed={44} />
        <MarqueeLine row="far" speed={56} />
      </div>

      <SectionDivider label="About Sparkle" />
      <section className="section" id="about">
        <div className="section-grid">
          <div className="reveal">
            <p className="section-label">About</p>
            <h2 className="section-title">Clean, sharp, animated.</h2>
          </div>
          <div className="reveal delay-1">
            <p className="section-text soft-copy">
              I design and build modern web experiences with a focus on motion, layout clarity
              and a strong first impression. The style is sharp and playful, but the code stays
              practical enough to ship.
            </p>
            <AboutSignalStrip />
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

      <SectionDivider label="Process" />
      <section className="section" id="process">
        <div className="section-grid">
          <div className="reveal">
            <p className="section-label">Process</p>
            <h2 className="section-title">From idea to live site.</h2>
          </div>
          <div className="process-shell">
            <div className="process-ambient process-ambient-one" aria-hidden="true" />
            <div className="process-ambient process-ambient-two" aria-hidden="true" />
            <ProcessStack items={[...process]} />
          </div>
        </div>
      </section>

      <SectionDivider label="Selected Work" />
      <section className="section" id="work">
        <div className="section-grid work-grid">
          <div className="reveal">
            <p className="section-label">Work</p>
            <h2 className="section-title">Portfolio with proof.</h2>
          </div>
          <div className="work-shell">
            <div className="work-aurora work-aurora-one" aria-hidden="true" />
            <div className="work-aurora work-aurora-two" aria-hidden="true" />
            <WorkSignalField />
            <PortfolioProjects />
          </div>
        </div>
      </section>

      <TestimonialsCarousel />

      <SectionDivider label="Contact" />
      <section className="contact" id="contact">
        <div className="contact-shell">
          <ContactConstellation />
          <div className="reveal">
            <p className="section-label">Contact</p>
            <h2 className="contact-title">Let&apos;s build.</h2>
          </div>
          <div className="contact-panel reveal delay-1">
            <p className="contact-note soft-copy">
              For web design, frontend builds, portfolio work, brand refreshes or collaborations,
              send a mail and let&apos;s make the next version feel intentional.
            </p>
            <MagneticAnchor className="email-row magnetic-action" href={`mailto:${primaryEmail}`}>
              <span className="email-main">
                <span className="email-label">Email</span>
                <span className="email-address">{primaryEmail}</span>
              </span>
              <span className="email-arrow">-&gt;</span>
            </MagneticAnchor>
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
    </main>
  );
}
