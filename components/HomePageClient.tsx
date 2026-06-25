"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

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
  dark?: boolean;
  image?: boolean;
};

const showcase: ShowcaseCard[] = [
  {
    id: "portfolio",
    kicker: "Portfolio",
    title: "Editorial structure",
    body: "Clear hierarchy, calmer spacing and enough motion to support the work.",
    category: "Web design",
    left: 4,
    top: 16,
    mobileLeft: 4,
    mobileTop: 0,
    rotate: -6,
    color: "#0050d8",
    color2: "#4db6e5",
    dark: true,
  },
  {
    id: "commerce",
    kicker: "Shop",
    title: "Sharper product pages",
    body: "Better product grouping, cleaner CTAs and less clutter between steps.",
    category: "Frontend",
    left: 59,
    top: 10,
    mobileLeft: 52,
    mobileTop: 8,
    rotate: 5,
    color: "#18bfa5",
    color2: "#9bd3ff",
  },
  {
    id: "studio",
    kicker: "Studio",
    title: "Brand-led layouts",
    body: "Sites that look specific to the team behind them, not borrowed from a template.",
    category: "Identity",
    left: 18,
    top: 56,
    mobileLeft: 6,
    mobileTop: 50,
    rotate: 4,
    color: "#4db6e5",
    color2: "#18bfa5",
  },
  {
    id: "build",
    kicker: "Build",
    title: "Clean Next.js handoff",
    body: "Responsive components, controlled motion and a build that holds up after launch.",
    category: "Implementation",
    left: 63,
    top: 54,
    mobileLeft: 50,
    mobileTop: 54,
    rotate: -5,
    color: "#0076f5",
    color2: "#0050d8",
    dark: true,
  },
  {
    id: "sparkle",
    kicker: "Sparkle",
    title: "A quieter signature",
    body: "Still dark, still sharp, just more deliberate and less performative.",
    category: "Direction",
    left: 34,
    top: 0,
    mobileLeft: 26,
    mobileTop: 76,
    rotate: 2,
    color: "#4db6e5",
    color2: "#9bd3ff",
    image: true,
  },
];

const process = [
  {
    num: "01",
    title: "Direction",
    body: "We define the visual tone, the audience and what the site needs to communicate first.",
  },
  {
    num: "02",
    title: "Layout",
    body: "Sections, hierarchy and responsive behavior are designed together instead of patched later.",
  },
  {
    num: "03",
    title: "Build",
    body: "The frontend is implemented with motion, spacing and performance in mind from the start.",
  },
  {
    num: "04",
    title: "Finish",
    body: "Final copy polish, mobile passes and launch cleanup so the site feels properly complete.",
  },
];

const proofStats = [
  { value: "Clarity", label: "First impression" },
  { value: "Pacing", label: "Controlled motion" },
  { value: "Craft", label: "Responsive detail" },
];

const menuItems = [
  { href: "#about", label: "About" },
  { href: "#process", label: "Process" },
  { href: "#work", label: "Work" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
] as const;

const aboutPoints = [
  "Structure first, styling second.",
  "Motion used to guide, not to distract.",
  "Design and frontend handled as one system.",
];

const heroServices = ["Portfolio sites", "Marketing pages", "Concept-led redesigns"];

const studioProjects = [
  {
    title: "Nova Studio",
    category: "Creative agency redesign",
    label: "Selected case study",
    summary: "A studio site reworked to feel more confident, easier to scan and less dependent on visual noise.",
    approach: "A tighter hero, stronger service hierarchy and calmer motion created a clearer path into the enquiry flow.",
    result: "The site feels more editorial and easier to trust without losing personality.",
    accent: "#0050d8",
    screens: [
      { label: "Hero", note: "clean entry" },
      { label: "Services", note: "clear structure" },
      { label: "Contact", note: "better close" },
    ],
  },
  {
    title: "Aura Commerce",
    category: "Beauty storefront concept",
    label: "Concept project",
    summary: "A concept storefront focused on product grouping, cleaner merchandising and less friction between browsing and purchase.",
    approach: "The collection flow, product page and cart states were designed as one system instead of isolated screens.",
    result: "A more premium shopping feel with clearer decisions on desktop and mobile.",
    accent: "#18bfa5",
    screens: [
      { label: "Collection", note: "faster browse" },
      { label: "Product", note: "clean details" },
      { label: "Cart", note: "lighter checkout" },
    ],
  },
  {
    title: "Vertex SaaS",
    category: "B2B marketing concept",
    label: "Concept project",
    summary: "A SaaS landing page concept built to explain a technical product without sounding cold or overloaded.",
    approach: "The copy, section order and motion were simplified so the product story could carry more of the page.",
    result: "A clearer, more mature presentation that supports demo intent instead of visual clutter.",
    accent: "#4db6e5",
    screens: [
      { label: "Overview", note: "clear message" },
      { label: "Features", note: "modular blocks" },
      { label: "CTA", note: "focused close" },
    ],
  },
];

const testimonials = [
  "The site finally felt like our brand instead of a polished template. The work was thoughtful, not just flashy.",
  "Everything became easier to understand, especially on mobile. The design looked better, but it also made more sense.",
  "The biggest difference was the restraint. Nothing felt random, and the whole site felt more expensive because of it.",
];

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
  element.style.setProperty("--tilt-rotate-x", `${Number(-centeredY * 6).toFixed(2)}deg`);
  element.style.setProperty("--tilt-rotate-y", `${Number(centeredX * 8).toFixed(2)}deg`);
}

function resetCardSurfaceState(element: HTMLElement) {
  element.style.setProperty("--shine-x", "50%");
  element.style.setProperty("--shine-y", "50%");
  element.style.setProperty("--tilt-rotate-x", "0deg");
  element.style.setProperty("--tilt-rotate-y", "0deg");
}

function useMagnetic(strength = 10) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.25 });

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
  strength = 10,
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
      whileHover={{ y: -2 }}
    >
      {children}
    </motion.a>
  );
}

function SectionTitle({ text }: { text: string }) {
  return <h2 className="section-title">{text}</h2>;
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
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const dragStateRef = useRef<{
    hasMoved: boolean;
    originX: number;
    originY: number;
    pointerId: number;
    startX: number;
    startY: number;
  } | null>(null);
  const snapBackTimerRef = useRef<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    dragOffsetRef.current = dragOffset;
  }, [dragOffset]);

  useEffect(() => {
    return () => {
      if (snapBackTimerRef.current) window.clearTimeout(snapBackTimerRef.current);
    };
  }, []);

  const finishDrag = useCallback((pointerId?: number) => {
    const element = cardRef.current;
    const dragState = dragStateRef.current;
    if (!dragState) return;
    if (typeof pointerId === "number" && dragState.pointerId !== pointerId) return;

    const shouldSnapBack = dragState.hasMoved;

    if (element?.hasPointerCapture(dragState.pointerId)) {
      element.releasePointerCapture(dragState.pointerId);
    }

    dragStateRef.current = null;
    setIsDragging(false);

    if (!shouldSnapBack) return;

    if (snapBackTimerRef.current) window.clearTimeout(snapBackTimerRef.current);
    snapBackTimerRef.current = window.setTimeout(() => {
      setDragOffset({ x: 0, y: 0 });
      snapBackTimerRef.current = null;
    }, 120);
  }, []);

  const updateDragFromPointer = useCallback((pointerId: number, clientX: number, clientY: number) => {
    const element = cardRef.current;
    const dragState = dragStateRef.current;
    if (!element || !dragState || dragState.pointerId !== pointerId) return false;

    setCardSurfaceState(element, clientX, clientY);

    const deltaX = clientX - dragState.startX;
    const deltaY = clientY - dragState.startY;

    if (!dragState.hasMoved && Math.hypot(deltaX, deltaY) < 7) return false;

    dragState.hasMoved = true;
    setIsDragging(true);
    setDragOffset({
      x: clamp(dragState.originX + deltaX, -132, 132),
      y: clamp(dragState.originY + deltaY, -96, 96),
    });

    return true;
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleWindowPointerMove = (event: PointerEvent) => {
      if (updateDragFromPointer(event.pointerId, event.clientX, event.clientY)) {
        event.preventDefault();
      }
    };

    const handleWindowPointerUp = (event: PointerEvent) => finishDrag(event.pointerId);

    window.addEventListener("pointermove", handleWindowPointerMove);
    window.addEventListener("pointerup", handleWindowPointerUp);
    window.addEventListener("pointercancel", handleWindowPointerUp);

    return () => {
      window.removeEventListener("pointermove", handleWindowPointerMove);
      window.removeEventListener("pointerup", handleWindowPointerUp);
      window.removeEventListener("pointercancel", handleWindowPointerUp);
    };
  }, [finishDrag, isDragging, updateDragFromPointer]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const element = cardRef.current;
    if (!element) return;

    const target = event.target;
    const isHandle = target instanceof Element && Boolean(target.closest(".card-handle"));

    event.stopPropagation();
    onActivate(card.id);
    setCardSurfaceState(element, event.clientX, event.clientY);

    if (event.pointerType !== "mouse" && !isHandle) return;
    if (snapBackTimerRef.current) window.clearTimeout(snapBackTimerRef.current);
    if (isHandle) event.preventDefault();

    dragStateRef.current = {
      hasMoved: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: dragOffsetRef.current.x,
      originY: dragOffsetRef.current.y,
    };

    element.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const element = cardRef.current;
    if (!element) return;

    if (updateDragFromPointer(event.pointerId, event.clientX, event.clientY)) {
      event.preventDefault();
      return;
    }

    setCardSurfaceState(element, event.clientX, event.clientY);
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
      onLostPointerCapture={() => finishDrag()}
      onPointerCancel={(event) => finishDrag(event.pointerId)}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      onPointerUp={(event) => finishDrag(event.pointerId)}
      ref={cardRef}
      style={
        {
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
          "--shine-x": "50%",
          "--shine-y": "50%",
          "--tilt-rotate-x": "0deg",
          "--tilt-rotate-y": "0deg",
          "--delay": `${180 + index * 80}ms`,
        } as CSSProperties
      }
      transition={isDragging ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      type="button"
      whileHover={isDragging ? undefined : { y: -8, scale: 1.015 }}
      whileTap={isDragging ? undefined : { scale: 0.99 }}
    >
      <span className="card-lift">
        {card.image && (
          <span className="card-logo">
            <Image src="/logo-transparent.png" alt="" width={44} height={44} />
          </span>
        )}
        <span className="card-top">
          <span className="card-kicker">{card.kicker}</span>
          <span className="card-handle" aria-hidden="true">
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
            event.currentTarget.style.setProperty("--project-tilt-x", `${Number(-centeredY * 4).toFixed(2)}deg`);
            event.currentTarget.style.setProperty("--project-tilt-y", `${Number(centeredX * 5).toFixed(2)}deg`);
          }}
          style={{ "--project-color": project.accent, "--project-delay": `${index * 90}ms` } as CSSProperties}
          whileHover={{ y: -8 }}
        >
          <div className="project-card-head">
            <span className="project-label">{project.label}</span>
            <p>{project.category}</p>
          </div>
          <div className="project-layout">
            <div className="project-media" aria-hidden="true">
              {project.screens.map((screen) => (
                <div
                  className="project-shot"
                  key={`${project.title}-${screen.label}`}
                  style={{ "--shot-accent": project.accent } as CSSProperties}
                >
                  <span className="project-shot-bar" />
                  <span className="project-shot-chip">{screen.label}</span>
                  <span className="project-shot-pane" />
                  <span className="project-shot-caption">{screen.note}</span>
                </div>
              ))}
            </div>
            <div className="project-copy">
              <h3>{project.title}</h3>
              <dl>
                <div>
                  <dt>Summary</dt>
                  <dd>{project.summary}</dd>
                </div>
                <div>
                  <dt>Approach</dt>
                  <dd>{project.approach}</dd>
                </div>
                <div>
                  <dt>Result</dt>
                  <dd>{project.result}</dd>
                </div>
              </dl>
            </div>
          </div>
        </motion.article>
      ))}
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
    const interval = window.setInterval(() => paginate(1), 5200);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="section reviews-section" id="reviews">
      <div className="section-grid">
        <div className="reveal">
          <p className="section-label">Reviews</p>
          <SectionTitle text="What people noticed after the redesign." />
        </div>
        <div className="review-shell reveal delay-1">
          <div className="review-controls">
            <button aria-label="Previous review" type="button" onClick={() => paginate(-1)}>
              &larr;
            </button>
            <span>
              {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </span>
            <button aria-label="Next review" type="button" onClick={() => paginate(1)}>
              &rarr;
            </button>
          </div>
          <div className="review-viewport" aria-live="polite">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.article
                animate={{ opacity: 1, x: 0 }}
                className="review-card"
                custom={direction}
                exit={{ opacity: 0, x: direction >= 0 ? -44 : 44 }}
                initial={{ opacity: 0, x: direction >= 0 ? 44 : -44 }}
                key={review}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="review-head">
                  <span aria-hidden="true" className="review-stars">
                    {"★★★★★"}
                  </span>
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

function Loader() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      aria-hidden="true"
      className="load-gate"
      exit={{ opacity: 0, transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] } }}
      initial={{ opacity: 1 }}
    >
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="load-shell"
        initial={{ opacity: 0, y: 14 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="load-logo">
          <Image src="/logo-transparent.png" alt="" width={68} height={68} priority />
        </div>
        <div className="load-copy">
          <span className="load-word">Sparkle</span>
          <span className="load-note">Web design and frontend</span>
        </div>
        <div className="load-line">
          <motion.span
            animate={{ scaleX: 1 }}
            initial={{ scaleX: 0 }}
            transition={{ duration: 0.72, ease: [0.33, 1, 0.68, 1] }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function HomePageClient() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeShowcase, setActiveShowcase] = useState(showcase[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [showLoader, setShowLoader] = useState(() => !reduceMotion);
  const { scrollYProgress } = useScroll();
  const heroPointerX = useMotionValue(0);
  const heroPointerY = useMotionValue(0);

  const heroCopyTargetY = useTransform(scrollYProgress, [0, 0.24], [0, -40]);
  const heroStageTargetY = useTransform(scrollYProgress, [0, 0.24], [0, 54]);
  const heroGlowTargetScale = useTransform(scrollYProgress, [0, 0.28], [1, 1.05]);
  const heroGlowOpacity = useTransform(scrollYProgress, [0, 0.28], [0.62, 0.28]);
  const heroPointerXSmooth = useSpring(heroPointerX, { stiffness: 110, damping: 22, mass: 0.55 });
  const heroPointerYSmooth = useSpring(heroPointerY, { stiffness: 110, damping: 22, mass: 0.55 });
  const heroCopyY = useSpring(heroCopyTargetY, { stiffness: 120, damping: 30 });
  const heroStageY = useSpring(heroStageTargetY, { stiffness: 120, damping: 30 });
  const heroGlowScale = useSpring(heroGlowTargetScale, { stiffness: 120, damping: 30 });
  const heroGlowX = useTransform(heroPointerXSmooth, [-1, 1], [-24, 24]);
  const heroGlowY = useTransform(heroPointerYSmooth, [-1, 1], [20, -20]);
  const heroCopyTiltX = useTransform(heroPointerYSmooth, [-1, 1], [2, -2]);
  const heroCopyTiltY = useTransform(heroPointerXSmooth, [-1, 1], [-3, 3]);
  const heroStageShift = useTransform(heroPointerXSmooth, [-1, 1], [-14, 14]);
  const year = new Date().getFullYear();

  useEffect(() => {
    if (reduceMotion) return;

    const timer = window.setTimeout(() => setShowLoader(false), 900);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

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

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    if (reduceMotion) return;

    const hero = heroRef.current;
    if (!hero) return;

    const updateHeroPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

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
      if (event.pointerType !== "mouse") return;

      cards.forEach((card) => {
        if (card.classList.contains("dragging")) return;

        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = event.clientX - centerX;
        const deltaY = event.clientY - centerY;
        const distance = Math.hypot(deltaX, deltaY);
        const radius = 240;

        if (distance > radius) {
          card.style.setProperty("--magnet-x", "0px");
          card.style.setProperty("--magnet-y", "0px");
          return;
        }

        const pull = (1 - distance / radius) ** 1.5;
        card.style.setProperty("--magnet-x", `${clamp(deltaX * 0.11 * pull, -18, 18).toFixed(2)}px`);
        card.style.setProperty("--magnet-y", `${clamp(deltaY * 0.11 * pull, -16, 16).toFixed(2)}px`);
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

  return (
    <>
      <AnimatePresence>{showLoader ? <Loader /> : null}</AnimatePresence>

      <main className="site">
        <nav className={`nav${navScrolled ? " scrolled" : ""}`}>
          <Link className="brand" href="/" aria-label="Sparkle home">
            <span className="brand-mark">
              <Image src="/logo-transparent.png" alt="" width={38} height={38} priority />
            </span>
            <span className="brand-name">Sparkle</span>
          </Link>

          <div className="nav-desktop-links" aria-label="Section navigation">
            {menuItems.map((item) => (
              <a className="nav-link" href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </div>

          <motion.button
            aria-controls="site-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className={`menu-toggle${menuOpen ? " is-open" : ""}`}
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="menu-toggle-label">{menuOpen ? "Close" : "Menu"}</span>
            <span className="menu-toggle-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </motion.button>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              animate={{ opacity: 1 }}
              className="menu-overlay"
              exit={{ opacity: 0 }}
              id="site-menu"
              initial={{ opacity: 0 }}
            >
              <motion.div
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="menu-film"
                exit={{ opacity: 0, scale: 0.98, y: 14 }}
                initial={{ opacity: 0, scale: 0.98, y: 14 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="menu-topbar">
                  <span className="menu-badge">Navigation</span>
                  <button
                    aria-label="Close menu"
                    className="menu-close"
                    onClick={() => setMenuOpen(false)}
                    type="button"
                  >
                    <span>Close</span>
                    <span className="menu-close-x" aria-hidden="true">
                      <span />
                      <span />
                    </span>
                  </button>
                </div>
                <div className="menu-panel">
                  {menuItems.map((item, index) => (
                    <motion.a
                      animate={{ opacity: 1, x: 0 }}
                      className="menu-link"
                      href={item.href}
                      initial={{ opacity: 0, x: -18 }}
                      key={item.href}
                      onClick={() => setMenuOpen(false)}
                      transition={{ delay: index * 0.04, duration: 0.24 }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                  <div className="menu-footer">
                    <div className="menu-legal-links">
                      <Link className="menu-legal-link" href="/tos" onClick={() => setMenuOpen(false)}>
                        Terms of Service
                      </Link>
                      <Link className="menu-legal-link" href="/privacy" onClick={() => setMenuOpen(false)}>
                        Privacy
                      </Link>
                      <Link className="menu-legal-link" href="/refund" onClick={() => setMenuOpen(false)}>
                        Refund
                      </Link>
                    </div>
                    <div className="menu-footer-note">Sparkle portfolio, {year}</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <section className="hero" aria-label="Sparkle portfolio hero" ref={heroRef}>
          <motion.div
            aria-hidden="true"
            className="hero-glow"
            style={{ opacity: heroGlowOpacity, scale: heroGlowScale, x: heroGlowX, y: heroGlowY }}
          />

          <motion.div className="hero-copy" style={{ rotateX: heroCopyTiltX, rotateY: heroCopyTiltY, y: heroCopyY }}>
            <p className="eyebrow">Web designer and frontend developer</p>
            <h1 className="hero-title">Custom websites with a sharper eye for pacing, clarity and finish.</h1>
            <p className="hero-text">
              I design and build portfolio sites, marketing pages and concept-led redesigns that
              feel more specific to the brand and less like a dressed-up template.
            </p>
            <div className="hero-actions">
              <MagneticAnchor className="button primary" href={`mailto:${primaryEmail}`} strength={16}>
                <span>Start a project</span>
              </MagneticAnchor>
              <MagneticAnchor className="button" href="#work" strength={16}>
                <span>See selected work</span>
              </MagneticAnchor>
            </div>
            <div className="hero-meta reveal visible">
              <div className="hero-service-list" aria-label="Services">
                {heroServices.map((service) => (
                  <span key={service}>{service}</span>
                ))}
              </div>
              <p className="hero-caption">
                Based around clean design systems, responsive frontend work and motion that stays in
                service of the content.
              </p>
            </div>
          </motion.div>

          <motion.div className="hero-visual" style={{ x: heroStageShift, y: heroStageY }}>
            <motion.div className="hero-panel depth-surface" whileHover={reduceMotion ? undefined : { y: -4 }}>
              <div className="hero-panel-header">
                <span className="hero-panel-label">Current direction</span>
                <span className="hero-panel-state">Sparkle</span>
              </div>
              <h2>Design that feels deliberate at first glance.</h2>
              <p>
                Dark, clean and animated where it counts. The visual identity stays intact, but the
                presentation feels calmer, more premium and easier to trust.
              </p>
              <ul className="hero-panel-points">
                <li>Better hierarchy in the first screen</li>
                <li>Less decorative filler and fake system language</li>
                <li>Smoother transforms, softer reveals, cleaner case studies</li>
              </ul>
            </motion.div>

            <motion.div
              aria-label="Sparkle service cards"
              className="card-stage"
              ref={stageRef}
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
          </motion.div>
        </section>

        <section className="section" id="about">
          <div className="section-grid">
            <div className="reveal">
              <p className="section-label">About</p>
              <SectionTitle text="A portfolio should say what you do before it shows off how much CSS you know." />
            </div>
            <div className="reveal delay-1">
              <p className="section-text">
                My work sits between visual design and frontend execution. That usually means
                stronger spacing, clearer section rhythm, better responsive decisions and motion that
                helps the page breathe instead of fighting for attention.
              </p>
              <div className="about-points">
                {aboutPoints.map((point) => (
                  <div className="about-point" key={point}>
                    <span aria-hidden="true" />
                    <p>{point}</p>
                  </div>
                ))}
              </div>
              <div className="proof-grid">
                {proofStats.map((proof) => (
                  <motion.div className="proof depth-card" key={proof.label} whileHover={reduceMotion ? undefined : { y: -4 }}>
                    <strong>{proof.value}</strong>
                    <span>{proof.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="process">
          <div className="section-grid">
            <div className="reveal">
              <p className="section-label">Process</p>
              <SectionTitle text="A straightforward process with room for taste and iteration." />
            </div>
            <div className="process-shell reveal delay-1">
              <div className="process-line">
                {process.map((item) => (
                  <motion.article className="process-line-card depth-card" key={item.title} whileHover={reduceMotion ? undefined : { y: -4 }}>
                    <span className="process-line-num">{item.num}</span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="work">
          <div className="section-grid">
            <div className="reveal">
              <p className="section-label">Work</p>
              <SectionTitle text="Selected work and concept projects." />
            </div>
            <div className="work-shell">
              <p className="section-text reveal delay-1">
                Some projects shown here are concept-led explorations. They are labeled clearly so
                the work reads honestly, like a real portfolio should.
              </p>
              <PortfolioProjects />
            </div>
          </div>
        </section>

        <TestimonialsCarousel />

        <section className="contact" id="contact">
          <div className="contact-shell">
            <div className="reveal">
              <p className="section-label">Contact</p>
              <SectionTitle text="Need a site that feels more considered and less generic?" />
            </div>
            <motion.div className="contact-panel reveal delay-1 depth-surface" whileHover={reduceMotion ? undefined : { y: -4 }}>
              <p className="contact-note">
                Send a short note with what you are building, what feels off right now and whether
                you need design, frontend, or both.
              </p>
              <MagneticAnchor className="email-row" href={`mailto:${primaryEmail}`}>
                <span className="email-main">
                  <span className="email-label">Email</span>
                  <span className="email-address">{primaryEmail}</span>
                </span>
                <span className="email-arrow">-&gt;</span>
              </MagneticAnchor>
            </motion.div>
          </div>
        </section>

        <footer className="footer">
          <span>(C) {year} Sparkle / Tyler Osthoff</span>
          <div className="footer-links">
            <Link className="footer-link" href="/tos">
              Terms
            </Link>
            <Link className="footer-link" href="/privacy">
              Privacy
            </Link>
            <Link className="footer-link" href="/refund">
              Refund
            </Link>
          </div>
        </footer>
      </main>
    </>
  );
}
