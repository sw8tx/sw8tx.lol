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
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
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
    id: "branding",
    kicker: "01",
    title: "Brand-first hero",
    body: "A homepage that says what you do immediately and still feels custom.",
    category: "Direction",
    left: 6,
    top: 17,
    mobileLeft: 4,
    mobileTop: 4,
    rotate: -6,
    color: "#0f5fff",
    color2: "#76a8ff",
    dark: true,
  },
  {
    id: "layout",
    kicker: "02",
    title: "Better structure",
    body: "Clear rhythm, better spacing and cleaner section pacing across the page.",
    category: "Layout",
    left: 62,
    top: 14,
    mobileLeft: 54,
    mobileTop: 10,
    rotate: 5,
    color: "#f4b400",
    color2: "#ffe188",
  },
  {
    id: "motion",
    kicker: "03",
    title: "Controlled motion",
    body: "Smooth reveals and hover movement that feel expensive instead of loud.",
    category: "Motion",
    left: 15,
    top: 57,
    mobileLeft: 6,
    mobileTop: 52,
    rotate: 4,
    color: "#ffcf4a",
    color2: "#fff0b3",
  },
  {
    id: "frontend",
    kicker: "04",
    title: "Frontend polish",
    body: "Responsive implementation that keeps the design sharp on every screen.",
    category: "Build",
    left: 63,
    top: 56,
    mobileLeft: 52,
    mobileTop: 56,
    rotate: -5,
    color: "#0a49c6",
    color2: "#1f7dff",
    dark: true,
  },
  {
    id: "sparkle",
    kicker: "05",
    title: "Sparkle identity",
    body: "The same logo and energy, just cleaner and more intentional.",
    category: "Signature",
    left: 34,
    top: 0,
    mobileLeft: 24,
    mobileTop: 76,
    rotate: 2,
    color: "#ffd866",
    color2: "#fff0b5",
    image: true,
  },
];

const menuItems = [
  { href: "#about", label: "About" },
  { href: "#process", label: "Process" },
  { href: "#work", label: "Work" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
] as const;

const process = [
  {
    num: "01",
    title: "Direction first",
    body: "We lock the tone, hierarchy and references before adding visual extras.",
  },
  {
    num: "02",
    title: "Custom layout",
    body: "The page is shaped around the brand instead of forcing it into a template.",
  },
  {
    num: "03",
    title: "Build clean",
    body: "Responsive frontend, calmer motion and details that hold up in production.",
  },
  {
    num: "04",
    title: "Polish pass",
    body: "Final copy, spacing and mobile refinement so the whole thing feels finished.",
  },
];

const projects = [
  {
    title: "Nova Studio",
    category: "Selected project",
    summary: "Creative agency site with a calmer first screen, stronger hierarchy and cleaner sections.",
  },
  {
    title: "Aura Commerce",
    category: "Concept project",
    summary: "Storefront concept focused on better product grouping and less clutter between actions.",
  },
  {
    title: "Vertex SaaS",
    category: "Concept project",
    summary: "Landing page concept for a technical product with simpler messaging and steadier pacing.",
  },
];

const testimonials = [
  "It finally felt like our brand instead of a shiny template.",
  "The site looks cleaner, but more importantly it makes sense faster.",
  "The motion feels premium now because it knows when to stay quiet.",
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
  element.style.setProperty("--tilt-rotate-y", `${Number(centeredX * 7).toFixed(2)}deg`);
}

function resetCardSurfaceState(element: HTMLElement) {
  element.style.setProperty("--shine-x", "50%");
  element.style.setProperty("--shine-y", "50%");
  element.style.setProperty("--tilt-rotate-x", "0deg");
  element.style.setProperty("--tilt-rotate-y", "0deg");
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
    }, 140);
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
      x: clamp(dragState.originX + deltaX, -138, 138),
      y: clamp(dragState.originY + deltaY, -104, 104),
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
          "--delay": `${220 + index * 90}ms`,
        } as CSSProperties
      }
      transition={isDragging ? { duration: 0 } : { duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      type="button"
      whileHover={isDragging ? undefined : { y: -7, scale: 1.015 }}
      whileTap={isDragging ? undefined : { scale: 0.99 }}
    >
      <span className="card-lift">
        {card.image ? (
          <span className="card-logo">
            <Image src="/logo-transparent.png" alt="" width={42} height={42} />
          </span>
        ) : null}
        <span className="card-top">
          <span className="card-kicker">{card.kicker}</span>
          <span className="card-handle" aria-hidden="true">
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

function Loader() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      aria-hidden="true"
      className="load-gate"
      exit={{ opacity: 0, transition: { duration: 0.32, ease: [0.4, 0, 0.2, 1] } }}
      initial={{ opacity: 1 }}
    >
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="load-shell"
        initial={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="load-logo">
          <Image src="/logo-transparent.png" alt="" width={78} height={78} priority />
        </div>
        <div className="load-copy">
          <span className="load-word">Sparkle</span>
          <span className="load-note">Web Design</span>
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeShowcase, setActiveShowcase] = useState(showcase[0].id);
  const [showLoader, setShowLoader] = useState(() => !reduceMotion);
  const [reviewIndex, setReviewIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const heroPointerX = useMotionValue(0);
  const heroPointerY = useMotionValue(0);

  const heroTitleY = useSpring(useTransform(scrollYProgress, [0, 0.24], [0, -34]), {
    stiffness: 120,
    damping: 28,
  });
  const heroStageY = useSpring(useTransform(scrollYProgress, [0, 0.24], [0, 44]), {
    stiffness: 120,
    damping: 30,
  });
  const heroWordmarkX = useTransform(heroPointerX, [-1, 1], [-18, 18]);
  const heroWordmarkY = useTransform(heroPointerY, [-1, 1], [12, -12]);
  const heroCopyTiltX = useTransform(heroPointerY, [-1, 1], [2, -2]);
  const heroCopyTiltY = useTransform(heroPointerX, [-1, 1], [-2, 2]);
  const heroStageShift = useTransform(heroPointerX, [-1, 1], [-14, 14]);
  const year = new Date().getFullYear();

  useEffect(() => {
    if (reduceMotion) return;

    const timer = window.setTimeout(() => setShowLoader(false), 1100);
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
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" },
    );

    revealEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setReviewIndex((current) => (current + 1) % testimonials.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, []);

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
        const radius = 250;

        if (distance > radius) {
          card.style.setProperty("--magnet-x", "0px");
          card.style.setProperty("--magnet-y", "0px");
          return;
        }

        const pull = (1 - distance / radius) ** 1.45;
        card.style.setProperty("--magnet-x", `${clamp(deltaX * 0.12 * pull, -18, 18).toFixed(2)}px`);
        card.style.setProperty("--magnet-y", `${clamp(deltaY * 0.12 * pull, -16, 16).toFixed(2)}px`);
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
        <nav className="nav">
          <Link className="brand" href="/" aria-label="Sparkle home">
            <span className="brand-mark">
              <Image src="/logo-transparent.png" alt="" width={38} height={38} priority />
            </span>
            <span className="brand-name">Sparkle</span>
          </Link>

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
          {menuOpen ? (
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
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="menu-topbar">
                  <span className="menu-badge">Sparkle</span>
                  <button className="menu-close" onClick={() => setMenuOpen(false)} type="button">
                    <span>Close</span>
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
                      transition={{ delay: index * 0.04, duration: 0.22 }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                  <div className="menu-footer">
                    <Link className="menu-legal-link" href="/tos" onClick={() => setMenuOpen(false)}>
                      Terms
                    </Link>
                    <Link className="menu-legal-link" href="/privacy" onClick={() => setMenuOpen(false)}>
                      Privacy
                    </Link>
                    <Link className="menu-legal-link" href="/refund" onClick={() => setMenuOpen(false)}>
                      Refund
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <section className="hero" ref={heroRef}>
          <motion.div aria-hidden="true" className="hero-wordmark" style={{ x: heroWordmarkX, y: heroWordmarkY }}>
            <span>SPARKLE</span>
            <span>WEB DESIGN</span>
          </motion.div>

          <motion.div className="hero-copy" style={{ rotateX: heroCopyTiltX, rotateY: heroCopyTiltY, y: heroTitleY }}>
            <p className="eyebrow">Web designer and frontend developer</p>
            <h1 className="hero-title">Clean, custom websites that feel designed on purpose.</h1>
            <p className="hero-text">
              Portfolio sites, landing pages and redesign concepts with stronger hierarchy, calmer
              motion and a more polished first impression.
            </p>
            <div className="hero-actions">
              <a className="button primary" href={`mailto:${primaryEmail}`}>
                Start a project
              </a>
              <a className="button secondary" href="#work">
                View work
              </a>
            </div>
          </motion.div>

          <motion.div className="card-stage" ref={stageRef} style={{ x: heroStageShift, y: heroStageY }}>
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

        <section className="section" id="about">
          <div className="section-grid">
            <div className="reveal">
              <p className="section-label">About</p>
              <h2 className="section-title">The goal is a site that looks custom fast, not futuristic loud.</h2>
            </div>
            <div className="reveal delay-1">
              <p className="section-text">
                I work between design and frontend, so the visual idea and the actual build stay in
                sync. That usually means cleaner spacing, clearer sections, better mobile behavior
                and less filler pretending to be quality.
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="process">
          <div className="section-grid">
            <div className="reveal">
              <p className="section-label">Process</p>
              <h2 className="section-title">Simple process, sharper result.</h2>
            </div>
            <div className="process-grid reveal delay-1">
              {process.map((item) => (
                <article className="process-card" key={item.title}>
                  <span className="process-line-num">{item.num}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="work">
          <div className="section-grid">
            <div className="reveal">
              <p className="section-label">Work</p>
              <h2 className="section-title">Real portfolio framing, not fake case study fluff.</h2>
            </div>
            <div className="work-grid reveal delay-1">
              {projects.map((project) => (
                <article className="work-card" key={project.title}>
                  <p className="project-label">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section reviews-section" id="reviews">
          <div className="section-grid">
            <div className="reveal">
              <p className="section-label">Reviews</p>
              <h2 className="section-title">What people usually notice first.</h2>
            </div>
            <div className="review-shell reveal delay-1">
              <span className="review-score">5 / 5</span>
              <p>{testimonials[reviewIndex]}</p>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="section-grid">
            <div className="reveal">
              <p className="section-label">Contact</p>
              <h2 className="section-title">If the current site feels generic, that is fixable.</h2>
            </div>
            <div className="contact-panel reveal delay-1">
              <p className="contact-note">
                Send a short note with what you need and what currently feels off.
              </p>
              <a className="email-row" href={`mailto:${primaryEmail}`}>
                <span className="email-label">Email</span>
                <span className="email-address">{primaryEmail}</span>
              </a>
            </div>
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
