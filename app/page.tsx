"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

const primaryEmail = "info@tylerosthoff.xyz";
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

type ProcessStep = (typeof process)[number];

const proofStats = [
  { value: "20+", label: "Digital surfaces", color: "#0050d8" },
  { value: "3+", label: "Years designing", color: "#18bfa5" },
  { value: "3", label: "Contact routes", color: "#4db6e5" },
];

type PreviewShot = {
  label: string;
  note: string;
  accent: string;
};

type StudioProject = {
  code: string;
  title: string;
  category: string;
  summary: string;
  outcome: string;
  duration: string;
  accent: string;
  accentSoft: string;
  screens: PreviewShot[];
};

const heroLines = [
  ["Building", "websites"],
  ["people", "remember."],
];

const marqueeWords = [...services, ...services, ...services];

const studioProjects: StudioProject[] = [
  {
    code: "PORTFOLIO_CO_01",
    title: "Nova Studio",
    category: "Creative Agency",
    summary: "Premium service website with a calmer structure, stronger trust and cleaner calls to action.",
    outcome: "A sharper conversion flow with motion that feels expensive instead of noisy.",
    duration: "Strategy, design, build and QA need real time so the result feels deliberate.",
    accent: "#0050d8",
    accentSoft: "#dcecff",
    screens: [
      { label: "Hero", note: "high-impact intro", accent: "#0050d8" },
      { label: "Services", note: "clear selling blocks", accent: "#4db6e5" },
      { label: "Contact", note: "strong close", accent: "#18bfa5" },
    ],
  },
  {
    code: "PORTFOLIO_CO_02",
    title: "Aura Commerce",
    category: "Beauty Ecommerce",
    summary: "Storefront concept with faster browsing, cleaner product hierarchy and more premium atmosphere.",
    outcome: "Customers move from first impression to product discovery with less friction.",
    duration: "Good ecommerce takes careful layout work, performance cleanup and responsive passes.",
    accent: "#18bfa5",
    accentSoft: "#def8f1",
    screens: [
      { label: "Collection", note: "elevated browsing", accent: "#18bfa5" },
      { label: "Product", note: "conversion detail", accent: "#4db6e5" },
      { label: "Cart", note: "clean checkout feel", accent: "#0050d8" },
    ],
  },
  {
    code: "PORTFOLIO_CO_03",
    title: "Vertex SaaS",
    category: "B2B Software",
    summary: "SaaS website system that makes technical products feel clearer, lighter and easier to trust.",
    outcome: "A more readable product story that guides visitors toward demos and calls.",
    duration: "Professional builds take planning, revisions and polish across desktop and mobile.",
    accent: "#4db6e5",
    accentSoft: "#e7f6ff",
    screens: [
      { label: "Overview", note: "simple product story", accent: "#4db6e5" },
      { label: "Features", note: "modular sections", accent: "#0050d8" },
      { label: "Demo CTA", note: "conversion finish", accent: "#18bfa5" },
    ],
  },
];

const studioFacts = [
  "Any website: portfolio, landing page, ecommerce or company site.",
  "Professional process from direction and design to build and launch.",
  "Quality needs time, so I work carefully instead of rushing details.",
];

const testimonials = [
  {
    name: "Noah M.",
    text: "Working with him was one of the smoothest freelance experiences I've had. The communication was clear from day one, timelines were respected and every design decision felt intentional. The final website looked significantly better than what we originally imagined and performed perfectly across all devices.",
  },
  {
    name: "Sarah R.",
    text: "The attention to detail was outstanding. Every animation felt purposeful and every section of the website reflected our brand perfectly. We received positive feedback from clients immediately after launch and saw a noticeable increase in engagement.",
  },
  {
    name: "Ethan K.",
    text: "From concept to delivery the entire process felt highly professional. The design quality exceeded our expectations and the implementation was extremely polished. The site feels fast, modern and memorable.",
  },
  {
    name: "Olivia T.",
    text: "What impressed us most was the combination of creativity and technical skill. The final result feels premium without sacrificing usability. Every interaction feels smooth and refined.",
  },
  {
    name: "Liam D.",
    text: "Excellent communication, strong design sense and flawless execution. The website instantly elevated our online presence and made our business appear far more established.",
  },
  {
    name: "Emma S.",
    text: "The project moved quickly without ever feeling rushed. Every detail was carefully considered and the final experience feels comparable to websites from much larger agencies.",
  },
  {
    name: "Jacob W.",
    text: "The animations are subtle but impactful and the overall user experience feels incredibly polished. We could not be happier with the result and would absolutely collaborate again.",
  },
  {
    name: "Chloe P.",
    text: "The website perfectly communicates our brand and has become one of our strongest marketing assets. The quality of work exceeded expectations in every area.",
  },
  {
    name: "Daniel H.",
    text: "Professional, responsive and extremely talented. The final product combines beautiful visuals with strong performance and excellent usability.",
  },
  {
    name: "Ava B.",
    text: "Every interaction feels thoughtfully designed and the final website stands out immediately from competitors. One of the best investments we made for our business.",
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function useMagnetic(strength = 8) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 420, damping: 28, mass: 0.22 });
  const springY = useSpring(y, { stiffness: 420, damping: 28, mass: 0.22 });

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

function MagneticButton({
  ariaLabel,
  children,
  className,
  onClick,
  strength = 8,
}: {
  ariaLabel?: string;
  children: ReactNode;
  className: string;
  onClick: () => void;
  strength?: number;
}) {
  const magnetic = useMagnetic(strength);

  return (
    <motion.button
      aria-label={ariaLabel}
      className={className}
      onClick={onClick}
      onPointerLeave={magnetic.onPointerLeave}
      onPointerMove={magnetic.onPointerMove}
      style={magnetic.style}
      type="button"
      whileHover={{ translateY: -2 }}
    >
      {children}
    </motion.button>
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

function HeroShowcaseCard({
  active,
  card,
  dragging,
  index,
  offset,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: {
  active: boolean;
  card: ShowcaseCard;
  dragging: boolean;
  index: number;
  offset: DragOffset;
  onPointerDown: (event: ReactPointerEvent<HTMLButtonElement>, id: string) => void;
  onPointerMove: (event: ReactPointerEvent<HTMLButtonElement>) => void;
  onPointerUp: (event: ReactPointerEvent<HTMLButtonElement>) => void;
}) {
  const reduceMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const shineX = useMotionValue(50);
  const shineY = useMotionValue(50);
  const shadowX = useMotionValue(0);
  const shadowY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { stiffness: 260, damping: 24, mass: 0.34 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 260, damping: 24, mass: 0.34 });
  const smoothShadowX = useSpring(shadowX, { stiffness: 260, damping: 24, mass: 0.34 });
  const smoothShadowY = useSpring(shadowY, { stiffness: 260, damping: 24, mass: 0.34 });
  const shineXPercent = useTransform(shineX, (value) => `${value}%`);
  const shineYPercent = useTransform(shineY, (value) => `${value}%`);
  const shadowXPx = useTransform(smoothShadowX, (value) => `${value}px`);
  const shadowYPx = useTransform(smoothShadowY, (value) => `${value}px`);

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
    shineX.set(50);
    shineY.set(50);
    shadowX.set(0);
    shadowY.set(0);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    onPointerMove(event);
    if (reduceMotion || event.pointerType !== "mouse") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const percentX = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    const percentY = clamp((event.clientY - rect.top) / rect.height, 0, 1);

    rotateX.set((0.5 - percentY) * 11);
    rotateY.set((percentX - 0.5) * 13);
    shineX.set(percentX * 100);
    shineY.set(percentY * 100);
    shadowX.set((percentX - 0.5) * 18);
    shadowY.set((percentY - 0.5) * 14);
  };

  return (
    <button
      aria-label={`${card.category}: ${card.title}`}
      className={`hero-card${active ? " active" : ""}${dragging ? " dragging" : ""}${card.dark ? " dark" : ""}`}
      key={card.id}
      onPointerCancel={onPointerUp}
      onPointerDown={(event) => onPointerDown(event, card.id)}
      onPointerLeave={resetTilt}
      onPointerMove={handlePointerMove}
      onPointerUp={onPointerUp}
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
      type="button"
    >
      <motion.span
        className="card-lift"
        style={{
          "--shine-x": shineXPercent,
          "--shine-y": shineYPercent,
          "--tilt-shadow-x": shadowXPx,
          "--tilt-shadow-y": shadowYPx,
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
        } as MotionStyle}
      >
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
      </motion.span>
    </button>
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

function PortfolioProjects() {
  const reduceMotion = useReducedMotion();

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100);
    const y = clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100);

    event.currentTarget.style.setProperty("--project-x", `${x}%`);
    event.currentTarget.style.setProperty("--project-y", `${y}%`);
    event.currentTarget.style.setProperty("--project-tilt-x", `${(50 - y) / 7}deg`);
    event.currentTarget.style.setProperty("--project-tilt-y", `${(x - 50) / 6}deg`);
  };

  const resetTilt = (event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--project-x", "50%");
    event.currentTarget.style.setProperty("--project-y", "50%");
    event.currentTarget.style.setProperty("--project-tilt-x", "0deg");
    event.currentTarget.style.setProperty("--project-tilt-y", "0deg");
  };

  return (
    <div className="portfolio-grid reveal delay-1">
      {studioProjects.map((project, index) => (
        <article
          className="project-card"
          key={project.title}
          onPointerLeave={resetTilt}
          onPointerMove={handlePointerMove}
          style={{ "--project-color": project.accent, "--project-delay": `${index * 90}ms` } as CSSProperties}
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
                <dt>Summary</dt>
                <dd>{project.summary}</dd>
              </div>
              <div>
                <dt>Outcome</dt>
                <dd>{project.outcome}</dd>
              </div>
              <div>
                <dt>Timing</dt>
                <dd>{project.duration}</dd>
              </div>
            </dl>
          </div>
        </article>
      ))}
    </div>
  );
}

function StarRating() {
  return (
    <div className="review-stars" aria-label="5 stars">
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="m12 2.7 2.83 5.74 6.34.92-4.59 4.47 1.08 6.31L12 17.15 6.34 20.14l1.08-6.31-4.59-4.47 6.34-.92L12 2.7Z" />
        </svg>
      ))}
    </div>
  );
}

function StudioCenterpiece() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [16, 4, -12]), {
    stiffness: 120,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [-28, 0, 28]), {
    stiffness: 120,
    damping: 24,
  });
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [48, 0, -52]), {
    stiffness: 120,
    damping: 24,
  });
  const glowScale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1.04, 0.98]), {
    stiffness: 120,
    damping: 24,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActiveIndex(clamp(Math.floor(latest * studioProjects.length), 0, studioProjects.length - 1));
  });

  const activeProject = studioProjects[activeIndex];

  return (
    <section className="section studio-section" id="studio">
      <div className="studio-scroll" ref={sectionRef}>
        <div className="studio-sticky">
          <div className="studio-copy reveal">
            <p className="section-label">Centerpiece</p>
            <h2 className="section-title">
              {writingText([{ text: "A scroll-led" }, { text: "3D middle.", accent: true }])}
            </h2>
            <p className="section-text soft-copy">
              The center stays alive while you scroll on phone or desktop. It gives the page a
              stronger identity and shows that the work is not just pretty, but carefully built.
            </p>
            <div className="studio-facts">
              {studioFacts.map((fact) => (
                <div className="studio-fact" key={fact}>
                  {fact}
                </div>
              ))}
            </div>
          </div>

          <div className="studio-stage reveal delay-1">
            <div className="studio-overlay studio-overlay-left">
              <p>{activeProject.code}</p>
              <strong>{activeProject.title}</strong>
              <span>{activeProject.category}</span>
            </div>

            <motion.div className="studio-aura" style={{ scale: glowScale }} />

            <motion.div
              className="studio-crystal-wrap"
              style={
                {
                  rotateX,
                  rotateY,
                  y: translateY,
                  "--studio-accent": activeProject.accent,
                  "--studio-soft": activeProject.accentSoft,
                } as MotionStyle
              }
            >
              <div className="studio-crystal">
                <span className="studio-crystal-edge edge-one" />
                <span className="studio-crystal-edge edge-two" />
                <span className="studio-crystal-edge edge-three" />
                <AnimatePresence mode="wait">
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="studio-screen"
                    exit={{ opacity: 0, y: 18 }}
                    initial={{ opacity: 0, y: 18 }}
                    key={activeProject.code}
                    transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="studio-screen-kicker">{activeProject.category}</span>
                    <strong>{activeProject.title}</strong>
                    <p>{activeProject.summary}</p>
                    <div className="studio-screen-links">
                      <span>custom build</span>
                      <span>responsive</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            <div className="studio-overlay studio-overlay-right">
              <p>SCROLL / DRAG FEEL</p>
              <strong>Professional websites</strong>
              <span>{activeProject.duration}</span>
            </div>

            <div className="studio-bottom">
              <div className="studio-bottom-copy">
                <span className="studio-bottom-label">Outcome</span>
                <p>{activeProject.outcome}</p>
              </div>
              <div className="studio-progress" aria-hidden="true">
                {studioProjects.map((project, index) => (
                  <span
                    className={`studio-progress-dot${index === activeIndex ? " active" : ""}`}
                    key={project.code}
                    style={{ "--dot-color": project.accent } as CSSProperties}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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

  const onKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") paginate(-1);
    if (event.key === "ArrowRight") paginate(1);
  };

  return (
    <section className="section reviews-section" id="reviews" onKeyDown={onKeyDown} tabIndex={-1}>
      <div className="section-grid">
        <div className="reveal">
          <p className="section-label">Reviews</p>
          <h2 className="section-title">{writingText([{ text: "Clients feel" }, { text: "the polish.", accent: true }])}</h2>
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
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.article
                className="review-card"
                custom={direction}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                key={review.name}
                initial={{ opacity: 0, x: direction >= 0 ? 54 : -54, rotate: direction >= 0 ? 1.8 : -1.8 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                exit={{ opacity: 0, x: direction >= 0 ? -54 : 54, rotate: direction >= 0 ? -1.8 : 1.8 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) paginate(1);
                  if (info.offset.x > 70) paginate(-1);
                }}
              >
                <div className="review-head">
                  <StarRating />
                  <span className="review-score">5.0 / 5</span>
                </div>
                <p>{review.text}</p>
                <strong>{review.name}</strong>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

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
  const [navScrolled, setNavScrolled] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [copied, setCopied] = useState("");
  const [activeShowcase, setActiveShowcase] = useState(showcase[0].id);
  const [draggingCard, setDraggingCard] = useState("");
  const [cardOffsets, setCardOffsets] = useState<Record<string, DragOffset>>({});
  const siteRef = useRef<HTMLElement | null>(null);
  const pointerFrameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef<{
    id: string;
    startX: number;
    startY: number;
    origin: DragOffset;
  } | null>(null);
  const popupDismissedRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroCopyTargetY = useTransform(scrollYProgress, [0, 0.28], [0, -66]);
  const heroFieldTargetY = useTransform(scrollYProgress, [0, 0.28], [0, 110]);
  const heroGlowTargetScale = useTransform(scrollYProgress, [0, 0.28], [1, 1.2]);
  const heroCopyY = useSpring(heroCopyTargetY, {
    stiffness: 120,
    damping: 28,
  });
  const heroFieldY = useSpring(heroFieldTargetY, {
    stiffness: 120,
    damping: 28,
  });
  const heroGlowScale = useSpring(heroGlowTargetScale, {
    stiffness: 120,
    damping: 28,
  });
  const scrollProgressX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.24,
  });
  const heroGlowOpacity = useTransform(scrollYProgress, [0, 0.28], [0.92, 0.48]);
  const morphY = useTransform(scrollYProgress, [0.1, 0.9], [-80, 260]);
  const morphRotate = useTransform(scrollYProgress, [0.1, 0.9], [-8, 16]);
  const morphScaleX = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.95, 1.18, 0.9]);
  const year = new Date().getFullYear();

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60);
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
      if (pointerFrameRef.current !== null) window.cancelAnimationFrame(pointerFrameRef.current);
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
    if (event.pointerType !== "mouse") return;

    pointerRef.current = { x: event.clientX, y: event.clientY };
    if (pointerFrameRef.current !== null) return;

    pointerFrameRef.current = window.requestAnimationFrame(() => {
      pointerFrameRef.current = null;
      siteRef.current?.style.setProperty("--mx", `${pointerRef.current.x}px`);
      siteRef.current?.style.setProperty("--my", `${pointerRef.current.y}px`);
    });
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
    <main className="site" onPointerMove={updatePointer} ref={siteRef}>
      <motion.div aria-hidden="true" className="scroll-progress" style={{ scaleX: scrollProgressX }} />
      <motion.div
        aria-hidden="true"
        className="load-gate"
        initial={{ opacity: reduceMotion ? 0 : 1 }}
        animate={{ opacity: 0, pointerEvents: "none" }}
        transition={{ delay: reduceMotion ? 0 : 1.16, duration: reduceMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="load-logo"
          initial={{ scale: 0.72, opacity: 0, rotate: -8 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.44, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image src="/logo-transparent.png" alt="" width={84} height={84} priority />
        </motion.div>
        <motion.span
          className="load-word"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ delay: 0.32, duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
        >
          Sparkle
        </motion.span>
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="section-morpher"
        style={{ rotate: morphRotate, scaleX: morphScaleX, y: morphY }}
      />
      <div aria-hidden="true" className="noise-layer" />

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
          <a className="nav-link" href="#reviews">Reviews</a>
          <a className="nav-link" href="#contact">Contact</a>
          <MagneticButton className="nav-button magnetic-action" onClick={() => setPopupOpen(true)} strength={7}>
            Contact Sparkle
          </MagneticButton>
        </div>
      </nav>

      <section className="hero" aria-label="Sparkle web designer portfolio">
        <motion.div
          aria-hidden="true"
          className="hero-parallax-field"
          style={{ opacity: heroGlowOpacity, scale: heroGlowScale, y: heroFieldY }}
        />
        <motion.div className="hero-copy" style={{ y: heroCopyY }}>
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
            <MagneticAnchor className="button primary magnetic-action" href={`mailto:${emails[0]}`} strength={8}>
              <span>Email Sparkle</span>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticAnchor>
            <MagneticAnchor className="button magnetic-action" href="#work" strength={8}>
              <span>View Playground</span>
            </MagneticAnchor>
          </div>
        </motion.div>

        <div className="card-stage" aria-label="Sparkle service cards">
          {showcase.map((card, index) => {
            const offset = cardOffsets[card.id] ?? { x: 0, y: 0 };

            return (
              <HeroShowcaseCard
                active={activeShowcase === card.id}
                card={card}
                dragging={draggingCard === card.id}
                index={index}
                key={card.id}
                offset={offset}
                onPointerDown={startDrag}
                onPointerMove={moveDrag}
                onPointerUp={endDrag}
              />
            );
          })}
        </div>
      </section>

      <div className="marquee-field" aria-hidden="true">
        <MarqueeLine row="near" speed={32} />
        <MarqueeLine direction="reverse" row="mid" speed={42} />
        <MarqueeLine row="far" speed={54} />
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
          <ProcessStack items={process} />
        </div>
      </section>

      <StudioCenterpiece />

      <section className="section" id="work">
        <div className="section-grid work-grid">
          <div className="reveal">
            <p className="section-label">Work</p>
            <h2 className="section-title">{writingText([{ text: "Portfolio" }, { text: "with proof.", accent: true }])}</h2>
          </div>
          <PortfolioProjects />
        </div>
      </section>

      <TestimonialsCarousel />

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
              <MagneticButton className="email-row magnetic-action" key={email} onClick={() => copyEmail(email)} strength={7}>
                <span className="email-main">
                  <span className="email-label">{copied === email ? "Copied" : "Email"}</span>
                  <span className="email-address">{email}</span>
                </span>
                <span className="email-arrow">-&gt;</span>
              </MagneticButton>
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
