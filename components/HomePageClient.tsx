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
const supportedLocales = ["en", "de"] as const;
type Locale = (typeof supportedLocales)[number];

const siteCopy = {
  en: {
    loaderStatus: "Preparing Sparkle Studio...",
    menuButton: { open: "Menu", close: "Close", openLabel: "Open menu", closeLabel: "Close menu" },
    menuBadge: "Sparkle Studio",
    close: "Close",
    menuItems: [
      { href: "#about", label: "About" },
      { href: "#process", label: "Process" },
      { href: "#work", label: "Work" },
      { href: "#reviews", label: "Reviews" },
      { href: "#contact", label: "Contact" },
    ],
    legal: { terms: "Terms", privacy: "Privacy", refund: "Refund" },
    hero: {
      eyebrow: "Sparkle Studio / Web design and frontend",
      title: "Websites that feel custom from the first second.",
      text:
        "Animated portfolios, landing pages and brand sites built to stand out. Sharp design, clean code, smooth motion.",
      support:
        "For creators, brands and businesses that need a stronger online presence without the fake futuristic template look.",
      ctaPrimary: "Start a project",
      ctaSecondary: "View work",
      proofItems: ["Animated portfolios", "Landing pages", "Brand sites"],
      frameKicker: "Selected direction",
      frameTitle: "Dark, bold and polished without looking overproduced.",
      frameBody:
        "The first screen carries the brand. Motion supports it, visuals frame it and the layout gives it room to land.",
      notes: [
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
      ],
    },
    about: {
      label: "About",
      title: "A stronger first impression starts with design choices that feel intentional.",
      text:
        "Sparkle sits between design and frontend, so the concept and the actual build stay in sync. The result is cleaner structure, better mobile behavior, smoother motion and a site that feels genuinely custom.",
    },
    process: {
      label: "Process",
      title: "Sharp design, clean code, smooth motion.",
      items: [
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
      ],
    },
    work: {
      label: "Work",
      title: "Selected directions for brands that need more presence online.",
      items: [
        {
          title: "Nova Studio",
          category: "Creative portfolio",
          summary:
            "A calmer studio site with bigger type, stronger project framing and motion that feels expensive instead of busy.",
        },
        {
          title: "Orbis Homes",
          category: "Brand landing page",
          summary:
            "A dark launch page focused on clear messaging, cleaner content flow and a more premium conversion path.",
        },
        {
          title: "Axis Club",
          category: "Personal brand site",
          summary:
            "A custom portfolio system for a creator who needed a stronger online presence without fake tech styling.",
        },
      ],
    },
    reviews: {
      label: "Reviews",
      title: "What people tend to notice first.",
      score: "Client feedback",
      items: [
        "The site finally looked custom instead of looking like it came from a trendy template folder.",
        "What changed most was the first impression. It felt professional before people even started reading.",
        "The motion added confidence to the brand instead of trying to be the whole brand.",
      ],
    },
    contact: {
      label: "Contact",
      title: "If your site feels generic, we can fix the first impression.",
      text:
        "Send a short note with what you are building and what currently feels off. I will come back with a direction that feels sharper and more custom.",
      emailLabel: "Email",
    },
  },
  de: {
    loaderStatus: "Sparkle Studio wird vorbereitet...",
    menuButton: {
      open: "Menue",
      close: "Schliessen",
      openLabel: "Menue oeffnen",
      closeLabel: "Menue schliessen",
    },
    menuBadge: "Sparkle Studio",
    close: "Schliessen",
    menuItems: [
      { href: "#about", label: "Ueberblick" },
      { href: "#process", label: "Prozess" },
      { href: "#work", label: "Arbeiten" },
      { href: "#reviews", label: "Feedback" },
      { href: "#contact", label: "Kontakt" },
    ],
    legal: { terms: "AGB", privacy: "Datenschutz", refund: "Rueckerstattung" },
    hero: {
      eyebrow: "Sparkle Studio / Webdesign und Frontend",
      title: "Websites, die vom ersten Moment an custom wirken.",
      text:
        "Animierte Portfolios, Landingpages und Brand-Sites, die direkt herausstechen. Scharfes Design, sauberer Code, weiche Motion.",
      support:
        "Fuer Creator, Marken und Businesses, die online staerker auftreten wollen, ohne wie ein futuristisches Template zu wirken.",
      ctaPrimary: "Projekt starten",
      ctaSecondary: "Arbeiten ansehen",
      proofItems: ["Animierte Portfolios", "Landingpages", "Brand-Sites"],
      frameKicker: "Ausgewaehlte Richtung",
      frameTitle: "Dunkel, bold und hochwertig, ohne ueberproduziert zu wirken.",
      frameBody:
        "Der erste Screen traegt die Marke. Motion stuetzt ihn, Visuals rahmen ihn ein und das Layout gibt ihm Raum zu wirken.",
      notes: [
        {
          name: "Portfolio Refresh",
          label: "Staerkere Hierarchie",
          body: "Klarere First Screens, staerkere Sections und ein saubererer Rhythmus ueber die ganze Seite.",
        },
        {
          name: "Launch Page",
          label: "Gezielte Motion",
          body: "Sanfte Reveals, subtiler Parallax und Hover States, die die Marke unterstuetzen statt von ihr abzulenken.",
        },
      ],
    },
    about: {
      label: "Ueberblick",
      title: "Ein starker erster Eindruck beginnt mit Designentscheidungen, die bewusst wirken.",
      text:
        "Sparkle sitzt zwischen Design und Frontend, damit Konzept und echter Build zusammenpassen. Das Ergebnis ist klarere Struktur, besseres Mobile-Verhalten, ruhigere Motion und eine Seite, die wirklich custom wirkt.",
    },
    process: {
      label: "Prozess",
      title: "Scharfes Design, sauberer Code, weiche Motion.",
      items: [
        {
          num: "01",
          title: "Richtung vor Deko",
          body: "Wir definieren zuerst Markenwirkung, Referenzen und visuelle Hierarchie, damit das Design von Anfang an eine klare Haltung hat.",
        },
        {
          num: "02",
          title: "Design, das sich eigen anfuehlt",
          body: "Layout, Typorhythmus und unterstuetzende Visuals werden um die Marke herum gebaut und nicht aus einem generischen Template geliehen.",
        },
        {
          num: "03",
          title: "Sauber bauen und polieren",
          body: "Responsives Frontend, kontrollierte Motion und finale Spacing-Paesse, damit die Seite auf Desktop und Mobile stark bleibt.",
        },
      ],
    },
    work: {
      label: "Arbeiten",
      title: "Ausgewaehlte Richtungen fuer Marken mit Anspruch auf mehr Praesenz online.",
      items: [
        {
          title: "Nova Studio",
          category: "Kreatives Portfolio",
          summary:
            "Eine ruhigere Studio-Site mit groesserer Typografie, staerkerem Projekt-Frame und Motion, die hochwertig statt hektisch wirkt.",
        },
        {
          title: "Orbis Homes",
          category: "Brand-Landingpage",
          summary:
            "Eine dunkle Launch-Page mit klarerer Message, saubererem Content-Flow und einem hochwertigeren Conversion-Pfad.",
        },
        {
          title: "Axis Club",
          category: "Personal Brand Site",
          summary:
            "Ein custom Portfolio-System fuer einen Creator, der online staerker auftreten wollte, ohne Fake-Tech-Look.",
        },
      ],
    },
    reviews: {
      label: "Feedback",
      title: "Was Menschen meistens sofort bemerken.",
      score: "Kundenfeedback",
      items: [
        "Die Seite sah endlich custom aus und nicht mehr wie aus einem trendigen Template-Ordner.",
        "Am meisten veraendert hat sich der erste Eindruck. Es wirkte professionell, bevor man ueberhaupt viel gelesen hat.",
        "Die Motion hat der Marke Selbstbewusstsein gegeben, statt selbst die ganze Marke sein zu wollen.",
      ],
    },
    contact: {
      label: "Kontakt",
      title: "Wenn deine Seite generisch wirkt, koennen wir den ersten Eindruck fixen.",
      text:
        "Schick eine kurze Nachricht mit dem, was du baust, und was sich aktuell falsch anfuehlt. Ich komme dann mit einer Richtung zurueck, die schaerfer und custom wirkt.",
      emailLabel: "E-Mail",
    },
  },
} as const;

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

function Loader({ status }: { status: string }) {
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
          <span className="load-status">{status}</span>
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
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") return "en";
    const stored = window.localStorage.getItem("sparkle-locale");
    if (stored === "en" || stored === "de") return stored;
    return window.navigator.language.toLowerCase().startsWith("de") ? "de" : "en";
  });
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
  const copy = siteCopy[locale];

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
    window.localStorage.setItem("sparkle-locale", locale);
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setReviewIndex((current) => (current + 1) % copy.reviews.items.length);
    }, 5400);

    return () => window.clearInterval(interval);
  }, [copy.reviews.items.length]);

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
      <AnimatePresence>{showLoader ? <Loader status={copy.loaderStatus} /> : null}</AnimatePresence>

      <main className="site">
        <nav className="nav">
          <div className="nav-left">
            <div className="locale-switch" role="group" aria-label="Language selector">
              {supportedLocales.map((item) => (
                <button
                  aria-pressed={locale === item}
                  className={`locale-option${locale === item ? " is-active" : ""}`}
                  key={item}
                  onClick={() => setLocale(item)}
                  type="button"
                >
                  {item === "en" ? "English" : "German"}
                </button>
              ))}
            </div>

            <Link className="brand" href="/" aria-label="Sparkle home">
              <span className="brand-mark">
                <Image src="/logo-transparent.png" alt="" width={36} height={36} priority />
              </span>
              <span className="brand-name">Sparkle</span>
            </Link>
          </div>

          <motion.button
            aria-controls="site-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? copy.menuButton.closeLabel : copy.menuButton.openLabel}
            className={`menu-toggle${menuOpen ? " is-open" : ""}`}
            onClick={() => setMenuOpen((open) => !open)}
            onPointerLeave={handleSurfaceLeave}
            onPointerMove={handleSurfaceMove}
            type="button"
            whileHover={reduceMotion ? undefined : { y: -2, scale: 1.01 }}
            whileTap={reduceMotion ? undefined : { scale: 0.99 }}
          >
            <span className="menu-toggle-label">{menuOpen ? copy.menuButton.close : copy.menuButton.open}</span>
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
                  <span className="menu-badge">{copy.menuBadge}</span>
                  <button className="menu-close" onClick={() => setMenuOpen(false)} type="button">
                    {copy.close}
                  </button>
                </div>
                <div className="menu-panel">
                  {copy.menuItems.map((item, index) => (
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
                        -&gt;
                      </span>
                    </motion.a>
                  ))}
                  <div className="menu-footer">
                    <Link className="menu-legal-link" href="/tos" onClick={() => setMenuOpen(false)}>
                      {copy.legal.terms}
                    </Link>
                    <Link className="menu-legal-link" href="/privacy" onClick={() => setMenuOpen(false)}>
                      {copy.legal.privacy}
                    </Link>
                    <Link className="menu-legal-link" href="/refund" onClick={() => setMenuOpen(false)}>
                      {copy.legal.refund}
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
                {copy.hero.eyebrow}
              </motion.p>
              <motion.h1
                animate={{ opacity: 1, y: 0 }}
                className="hero-title"
                initial={{ opacity: 0, y: 24 }}
                transition={{ delay: showLoader ? 0.16 : 0.04, duration: 0.56, ease: [0.16, 1, 0.3, 1] }}
              >
                {copy.hero.title}
              </motion.h1>
              <motion.p
                animate={{ opacity: 1, y: 0 }}
                className="hero-text"
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: showLoader ? 0.22 : 0.08, duration: 0.5 }}
              >
                {copy.hero.text}
              </motion.p>
              <motion.p
                animate={{ opacity: 1, y: 0 }}
                className="hero-support"
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: showLoader ? 0.28 : 0.12, duration: 0.48 }}
              >
                {copy.hero.support}
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
                  {copy.hero.ctaPrimary}
                </motion.a>
                <motion.a
                  className="button secondary"
                  href="#work"
                  onPointerLeave={handleSurfaceLeave}
                  onPointerMove={handleSurfaceMove}
                  whileHover={reduceMotion ? undefined : { y: -3, scale: 1.01 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                >
                  {copy.hero.ctaSecondary}
                </motion.a>
              </motion.div>
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="hero-proof"
                initial={{ opacity: 0, y: 18 }}
                transition={{ delay: showLoader ? 0.36 : 0.16, duration: 0.45 }}
              >
                {copy.hero.proofItems.map((item) => (
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
                  <span className="frame-kicker">{copy.hero.frameKicker}</span>
                  <h2>{copy.hero.frameTitle}</h2>
                  <p>{copy.hero.frameBody}</p>
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

              {copy.hero.notes.map((note, index) => (
                <motion.article
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`floating-note note-${index + 1}`}
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  key={`${locale}-${note.name}`}
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
              <p className="section-label">{copy.about.label}</p>
              <h2 className="section-title">{copy.about.title}</h2>
            </div>
            <div className="reveal delay-1">
              <p className="section-text">{copy.about.text}</p>
            </div>
          </div>
        </section>

        <section className="section" id="process">
          <div className="section-grid">
            <div className="reveal">
              <p className="section-label">{copy.process.label}</p>
              <h2 className="section-title">{copy.process.title}</h2>
            </div>
            <div className="process-grid reveal delay-1">
              {copy.process.items.map((item) => (
                <article className="process-card" key={`${locale}-${item.title}`}>
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
              <p className="section-label">{copy.work.label}</p>
              <h2 className="section-title">{copy.work.title}</h2>
            </div>
            <div className="work-grid reveal delay-1">
              {copy.work.items.map((project) => (
                <article className="work-card" key={`${locale}-${project.title}`}>
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
              <p className="section-label">{copy.reviews.label}</p>
              <h2 className="section-title">{copy.reviews.title}</h2>
            </div>
            <div className="review-shell reveal delay-1">
              <span className="review-score">{copy.reviews.score}</span>
              <p>{copy.reviews.items[reviewIndex]}</p>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="section-grid">
            <div className="reveal">
              <p className="section-label">{copy.contact.label}</p>
              <h2 className="section-title">{copy.contact.title}</h2>
            </div>
            <div className="contact-panel reveal delay-1">
              <p className="contact-note">{copy.contact.text}</p>
              <a
                className="email-row"
                href={`mailto:${primaryEmail}`}
                onPointerLeave={handleSurfaceLeave}
                onPointerMove={handleSurfaceMove}
              >
                <span className="email-label">{copy.contact.emailLabel}</span>
                <span className="email-address">{primaryEmail}</span>
              </a>
            </div>
          </div>
        </section>

        <footer className="footer">
          <span>(C) {year} Sparkle / Tyler Osthoff</span>
          <div className="footer-links">
            <Link className="footer-link" href="/tos">
              {copy.legal.terms}
            </Link>
            <Link className="footer-link" href="/privacy">
              {copy.legal.privacy}
            </Link>
            <Link className="footer-link" href="/refund">
              {copy.legal.refund}
            </Link>
          </div>
        </footer>
      </main>
    </>
  );
}
