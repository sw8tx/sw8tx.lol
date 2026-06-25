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
import type { PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useRef, useState } from "react";

const primaryEmail = "info@tylerosthoff.xyz";

const menuItems = [
  { href: "#about", label: "About" },
  { href: "#process", label: "Process" },
  { href: "#work", label: "Work" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
] as const;

const proofItems = ["Animated portfolios", "Landing pages", "Brand sites"] as const;

const heroNotes = [
  {
    name: "Portfolio Refresh",
    label: "Sharper hierarchy",
    body: "Clearer first screens, stronger sections and cleaner pacing across the whole page.",
  },
  {
    name: "Launch Page",
    label: "Motion direction",
    body: "Smooth reveals, subtle parallax and hover states that support the brand instead of distracting from it.",
  },
] as const;

const process = [
  {
    num: "01",
    title: "Direction before decoration",
    body: "We define the brand feeling, references and visual hierarchy first, so the design has a point of view from the beginning.",
  },
  {
    num: "02",
    title: "Design that feels owned",
    body: "Layouts, type rhythm and supporting visuals are built around the brand instead of looking borrowed from a generic template.",
  },
  {
    num: "03",
    title: "Clean build and polish",
    body: "Responsive frontend, controlled motion and final spacing passes that keep the site sharp on desktop and mobile.",
  },
] as const;

const projects = [
  {
    title: "Nova Studio",
    category: "Creative portfolio",
    summary: "A calmer studio site with bigger type, stronger project framing and motion that feels expensive instead of busy.",
  },
  {
    title: "Orbis Homes",
    category: "Brand landing page",
    summary: "A dark launch page focused on clear messaging, cleaner content flow and a more premium conversion path.",
  },
  {
    title: "Axis Club",
    category: "Personal brand site",
    summary: "A custom portfolio system for a creator who needed a stronger online presence without fake tech styling.",
  },
] as const;

const testimonials = [
  "The site finally looked custom instead of looking like it came from a trendy template folder.",
  "What changed most was the first impression. It felt professional before people even started reading.",
  "The motion added confidence to the brand instead of trying to be the whole brand.",
] as const;

function setSurfacePosition(element: HTMLElement, clientX: number, clientY: number) {
  const rect = element.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * 100;
  const y = ((clientY - rect.top) / rect.height) * 100;

  element.style.setProperty("--pointer-x", `${x.toFixed(2)}%`);
  element.style.setProperty("--pointer-y", `${y.toFixed(2)}%`);
}

function resetSurfacePosition(element: HTMLElement) {
  element.style.setProperty("--pointer-x", "50%");
  element.style.setProperty("--pointer-y", "50%");
}

function Loader() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      aria-hidden="true"
      className="load-gate"
      exit={{ opacity: 0, transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] } }}
      initial={{ opacity: 1 }}
    >
      <div className="load-noise" />
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="load-shell"
        initial={{ opacity: 0, y: 18 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="load-mark">
          <Image src="/logo-transparent.png" alt="" width={70} height={70} priority />
        </div>
        <div className="load-copy">
          <span className="load-title">Sparkle</span>
          <span className="load-status">Preparing Sparkle Studio...</span>
        </div>
        <div className="load-line" aria-hidden="true">
          <motion.span
            animate={{ scaleX: 1 }}
            initial={{ scaleX: 0 }}
            transition={{ duration: 0.88, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </motion.div>
      <motion.div
        animate={{ scaleY: 1 }}
        className="load-wipe"
        initial={{ scaleY: 0 }}
        transition={{ delay: 0.82, duration: 0.34, ease: [0.76, 0, 0.24, 1] }}
      />
    </motion.div>
  );
}

export function HomePageClient() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [showLoader, setShowLoader] = useState(() => {
    if (typeof window === "undefined") return false;
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const { scrollYProgress } = useScroll();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const heroCopyY = useSpring(useTransform(scrollYProgress, [0, 0.22], [0, -18]), {
    stiffness: 120,
    damping: 26,
  });
  const visualY = useSpring(useTransform(scrollYProgress, [0, 0.22], [0, 28]), {
    stiffness: 118,
    damping: 28,
  });
  const visualX = useTransform(pointerX, [-1, 1], [-12, 12]);
  const visualRotate = useTransform(pointerX, [-1, 1], [-2, 2]);
  const visualTilt = useTransform(pointerY, [-1, 1], [1.6, -1.6]);
  const wordmarkY = useTransform(pointerY, [-1, 1], [16, -16]);
  const wordmarkX = useTransform(pointerX, [-1, 1], [-16, 16]);
  const year = new Date().getFullYear();

  useEffect(() => {
    if (reduceMotion || !showLoader) return;

    const timer = window.setTimeout(() => setShowLoader(false), 1180);
    return () => window.clearTimeout(timer);
  }, [reduceMotion, showLoader]);

  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -48px 0px" },
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setReviewIndex((current) => (current + 1) % testimonials.length);
    }, 5400);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const hero = heroRef.current;
    if (!hero) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      const rect = hero.getBoundingClientRect();
      const withinX = (event.clientX - rect.left) / rect.width;
      const withinY = (event.clientY - rect.top) / rect.height;

      pointerX.set(Math.min(1, Math.max(-1, withinX * 2 - 1)));
      pointerY.set(Math.min(1, Math.max(-1, withinY * 2 - 1)));
    };

    const resetPointer = () => {
      pointerX.set(0);
      pointerY.set(0);
    };

    hero.addEventListener("pointermove", handlePointerMove);
    hero.addEventListener("pointerleave", resetPointer);

    return () => {
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", resetPointer);
      resetPointer();
    };
  }, [pointerX, pointerY, reduceMotion]);

  function handleSurfaceMove(event: ReactPointerEvent<HTMLElement>) {
    if (reduceMotion) return;
    setSurfacePosition(event.currentTarget, event.clientX, event.clientY);
  }

  function handleSurfaceLeave(event: ReactPointerEvent<HTMLElement>) {
    resetSurfacePosition(event.currentTarget);
  }

  return (
    <>
      <AnimatePresence>{showLoader ? <Loader /> : null}</AnimatePresence>

      <main className="site">
        <nav className="nav">
          <Link className="brand" href="/" aria-label="Sparkle home">
            <span className="brand-mark">
              <Image src="/logo-transparent.png" alt="" width={36} height={36} priority />
            </span>
            <span className="brand-name">Sparkle</span>
          </Link>

          <motion.button
            aria-controls="site-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className={`menu-toggle${menuOpen ? " is-open" : ""}`}
            onClick={() => setMenuOpen((open) => !open)}
            onPointerLeave={handleSurfaceLeave}
            onPointerMove={handleSurfaceMove}
            type="button"
            whileHover={reduceMotion ? undefined : { y: -2, scale: 1.01 }}
            whileTap={reduceMotion ? undefined : { scale: 0.99 }}
          >
            <span className="menu-toggle-label">{menuOpen ? "Close" : "Menu"}</span>
            <span className="menu-toggle-icon" aria-hidden="true">
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
                transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="menu-topbar">
                  <span className="menu-badge">Sparkle Studio</span>
                  <button className="menu-close" onClick={() => setMenuOpen(false)} type="button">
                    Close
                  </button>
                </div>
                <div className="menu-panel">
                  {menuItems.map((item, index) => (
                    <motion.a
                      animate={{ opacity: 1, x: 0 }}
                      className="menu-link"
                      href={item.href}
                      initial={{ opacity: 0, x: -14 }}
                      key={item.href}
                      onClick={() => setMenuOpen(false)}
                      transition={{ delay: index * 0.04, duration: 0.22 }}
                    >
                      <span className="menu-link-meta" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="menu-link-text">{item.label}</span>
                      <span className="menu-link-arrow" aria-hidden="true">
                        ↗
                      </span>
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
          <div className="hero-background" aria-hidden="true" />
          <motion.div
            aria-hidden="true"
            className="hero-wordmark"
            style={{ x: reduceMotion ? 0 : wordmarkX, y: reduceMotion ? 0 : wordmarkY }}
          >
            <span>SPARKLE</span>
            <span>SPARKLE</span>
          </motion.div>

          <div className="hero-grid">
            <motion.div
              className="hero-copy"
              style={{ y: reduceMotion ? 0 : heroCopyY }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.p
                animate={{ opacity: 1, y: 0 }}
                className="eyebrow"
                initial={{ opacity: 0, y: 16 }}
                transition={{ delay: showLoader ? 0.1 : 0, duration: 0.45 }}
              >
                Sparkle Studio / Web design and frontend
              </motion.p>
              <motion.h1
                animate={{ opacity: 1, y: 0 }}
                className="hero-title"
                initial={{ opacity: 0, y: 24 }}
                transition={{ delay: showLoader ? 0.16 : 0.04, duration: 0.56, ease: [0.16, 1, 0.3, 1] }}
              >
                Websites that feel custom from the first second.
              </motion.h1>
              <motion.p
                animate={{ opacity: 1, y: 0 }}
                className="hero-text"
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: showLoader ? 0.22 : 0.08, duration: 0.5 }}
              >
                Animated portfolios, landing pages and brand sites built to stand out. Sharp design,
                clean code, smooth motion.
              </motion.p>
              <motion.p
                animate={{ opacity: 1, y: 0 }}
                className="hero-support"
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: showLoader ? 0.28 : 0.12, duration: 0.48 }}
              >
                For creators, brands and businesses that need a stronger online presence without the
                fake futuristic template look.
              </motion.p>
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="hero-actions"
                initial={{ opacity: 0, y: 18 }}
                transition={{ delay: showLoader ? 0.32 : 0.14, duration: 0.45 }}
              >
                <motion.a
                  className="button primary"
                  href={`mailto:${primaryEmail}`}
                  onPointerLeave={handleSurfaceLeave}
                  onPointerMove={handleSurfaceMove}
                  whileHover={reduceMotion ? undefined : { y: -3, scale: 1.01 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                >
                  Start a project
                </motion.a>
                <motion.a
                  className="button secondary"
                  href="#work"
                  onPointerLeave={handleSurfaceLeave}
                  onPointerMove={handleSurfaceMove}
                  whileHover={reduceMotion ? undefined : { y: -3, scale: 1.01 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                >
                  View work
                </motion.a>
              </motion.div>
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="hero-proof"
                initial={{ opacity: 0, y: 18 }}
                transition={{ delay: showLoader ? 0.36 : 0.16, duration: 0.45 }}
              >
                {proofItems.map((item) => (
                  <span className="proof-pill" key={item}>
                    {item}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="hero-visual"
              style={{
                x: reduceMotion ? 0 : visualX,
                y: reduceMotion ? 0 : visualY,
                rotateZ: reduceMotion ? 0 : visualRotate,
                rotateX: reduceMotion ? 0 : visualTilt,
              }}
            >
              <div className="visual-orbit orbit-left" aria-hidden="true" />
              <div className="visual-orbit orbit-right" aria-hidden="true" />

              <motion.article
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="feature-frame"
                initial={{ opacity: 0, scale: 0.96, y: 22 }}
                onPointerLeave={handleSurfaceLeave}
                onPointerMove={handleSurfaceMove}
                transition={{ delay: showLoader ? 0.22 : 0.06, duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="frame-topbar">
                  <span className="frame-dot" />
                  <span className="frame-dot" />
                  <span className="frame-dot" />
                </div>
                <div className="frame-copy">
                  <span className="frame-kicker">Selected direction</span>
                  <h2>Dark, bold and polished without looking overproduced.</h2>
                  <p>
                    The first screen carries the brand. Motion supports it, visuals frame it and the
                    layout gives it room to land.
                  </p>
                </div>
                <div className="frame-preview" aria-hidden="true">
                  <div className="preview-grid">
                    <span className="preview-block large" />
                    <span className="preview-block" />
                    <span className="preview-block" />
                    <span className="preview-line short" />
                    <span className="preview-line" />
                    <span className="preview-line wide" />
                  </div>
                </div>
              </motion.article>

              {heroNotes.map((note, index) => (
                <motion.article
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`floating-note note-${index + 1}`}
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  key={note.name}
                  onPointerLeave={handleSurfaceLeave}
                  onPointerMove={handleSurfaceMove}
                  transition={{
                    delay: showLoader ? 0.3 + index * 0.08 : 0.14 + index * 0.05,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <span className="note-name">{note.name}</span>
                  <strong>{note.label}</strong>
                  <p>{note.body}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="section-grid">
            <div className="reveal">
              <p className="section-label">About</p>
              <h2 className="section-title">A stronger first impression starts with design choices that feel intentional.</h2>
            </div>
            <div className="reveal delay-1">
              <p className="section-text">
                Sparkle sits between design and frontend, so the concept and the actual build stay in
                sync. The result is cleaner structure, better mobile behavior, smoother motion and a
                site that feels genuinely custom.
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="process">
          <div className="section-grid">
            <div className="reveal">
              <p className="section-label">Process</p>
              <h2 className="section-title">Sharp design, clean code, smooth motion.</h2>
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
              <h2 className="section-title">Selected directions for brands that need more presence online.</h2>
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
              <h2 className="section-title">What people tend to notice first.</h2>
            </div>
            <div className="review-shell reveal delay-1">
              <span className="review-score">Client feedback</span>
              <p>{testimonials[reviewIndex]}</p>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="section-grid">
            <div className="reveal">
              <p className="section-label">Contact</p>
              <h2 className="section-title">If your site feels generic, we can fix the first impression.</h2>
            </div>
            <div className="contact-panel reveal delay-1">
              <p className="contact-note">
                Send a short note with what you are building and what currently feels off. I will come
                back with a direction that feels sharper and more custom.
              </p>
              <a
                className="email-row"
                href={`mailto:${primaryEmail}`}
                onPointerLeave={handleSurfaceLeave}
                onPointerMove={handleSurfaceMove}
              >
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
