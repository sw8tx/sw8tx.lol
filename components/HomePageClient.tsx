"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useState } from "react";

const primaryEmail = "info@tylerosthoff.xyz";

const languageOptions = [
  { code: "en", label: "English", short: "EN" },
  { code: "de", label: "Deutsch", short: "DE" },
] as const;
type Locale = (typeof languageOptions)[number]["code"];

const floatingLogoSlots = Array.from({ length: 8 }, (_, index) => `float-logo-${index + 1}`);

const siteCopy = {
  en: {
    loaderStatus: "Materializing shapes...",
    loaderFooter: "sw8tx.lol - EST 2026",
    languageLabel: "LANGUAGE",
    menuButton: { open: "Menu", close: "Close", openLabel: "Open menu", closeLabel: "Close menu" },
    menuBadge: "sw8tx.lol",
    menuItems: [
      { href: "#about", label: "About" },
      { href: "#process", label: "Process" },
      { href: "#work", label: "Past work" },
      { href: "#reviews", label: "Feedback" },
      { href: "#contact", label: "Contact" },
    ],
    legal: { terms: "Terms", privacy: "Privacy", refund: "Refund" },
    hero: {
      eyebrow: "Web design and frontend",
      title: "Sparkle Studio",
      tagline: "Websites with soul",
      text:
        "Custom animated portfolios, landing pages and brand sites for people who want their first impression to feel expensive, personal and smooth.",
      ctaPrimary: "Start a project",
      ctaSecondary: "Past work",
      scroll: "Scroll",
      cards: [
        {
          action: "Show next detail",
          variants: [
            {
              label: "Animated portfolios",
              title: "Presence that moves",
              body: "A stronger first screen, careful pacing and motion that makes the brand feel alive.",
            },
            {
              label: "Recent projects",
              title: "Built like a signature",
              body: "Project sections, hover moments and scroll rhythm designed around your actual work.",
            },
          ],
        },
        {
          action: "Show next detail",
          variants: [
            {
              label: "Landing pages",
              title: "Pages that sell the vibe",
              body: "Clear sections, custom visual direction and frontend polish that stays smooth on mobile.",
            },
            {
              label: "Launch polish",
              title: "Smooth before people scroll",
              body: "Fast first loads, responsive spacing and motion that feels intentional instead of heavy.",
            },
          ],
        },
      ],
    },
    marqueeIntro: "A calm studio site can still feel alive. This is the mix I build around.",
    marqueeRows: [
      ["Recent projects", "Portfolio refresh", "Landing pages", "Brand sites"],
      ["Clean frontend", "Smooth motion", "Responsive polish", "Custom visuals"],
      ["First impression", "Past work", "Launch pages", "Creator sites"],
    ],
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
          body: "We define the brand feeling, references and hierarchy first, so the design has a clear point of view from the beginning.",
        },
        {
          num: "02",
          title: "Design that feels owned",
          body: "Layouts, type rhythm and supporting visuals are built around the brand instead of looking borrowed from a generic template.",
        },
        {
          num: "03",
          title: "Clean build and polish",
          body: "Responsive frontend, controlled motion and final spacing passes keep the site sharp on desktop and mobile.",
        },
      ],
    },
    work: {
      label: "Past work",
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
            "A launch page focused on clear messaging, cleaner content flow and a more premium conversion path.",
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
      label: "Feedback",
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
    loaderStatus: "Materializing shapes...",
    loaderFooter: "sw8tx.lol - EST 2026",
    languageLabel: "LANGUAGE",
    menuButton: {
      open: "Menue",
      close: "Close",
      openLabel: "Menue oeffnen",
      closeLabel: "Menue schliessen",
    },
    menuBadge: "sw8tx.lol",
    menuItems: [
      { href: "#about", label: "Ueberblick" },
      { href: "#process", label: "Prozess" },
      { href: "#work", label: "Past work" },
      { href: "#reviews", label: "Feedback" },
      { href: "#contact", label: "Kontakt" },
    ],
    legal: { terms: "AGB", privacy: "Datenschutz", refund: "Rueckerstattung" },
    hero: {
      eyebrow: "Webdesign und Frontend",
      title: "Sparkle Studio",
      tagline: "Websites mit Charakter",
      text:
        "Custom animierte Portfolios, Landingpages und Brand-Sites fuer Menschen, deren erster Eindruck hochwertig, persoenlich und smooth wirken soll.",
      ctaPrimary: "Projekt starten",
      ctaSecondary: "Past work",
      scroll: "Scroll",
      cards: [
        {
          action: "Naechstes Detail zeigen",
          variants: [
            {
              label: "Animierte Portfolios",
              title: "Praesenz, die sich bewegt",
              body: "Ein staerkerer First Screen, sauberer Rhythmus und Motion, die die Marke lebendig macht.",
            },
            {
              label: "Recent projects",
              title: "Gebaut wie eine Signatur",
              body: "Projektbereiche, Hover-Momente und Scroll-Rhythmus, die um deine echten Arbeiten gebaut sind.",
            },
          ],
        },
        {
          action: "Naechstes Detail zeigen",
          variants: [
            {
              label: "Landingpages",
              title: "Seiten, die den Vibe verkaufen",
              body: "Klare Sections, eigene visuelle Richtung und Frontend-Polish, der auch mobil ruhig bleibt.",
            },
            {
              label: "Launch polish",
              title: "Smooth bevor man scrollt",
              body: "Schnelle First Loads, responsive Abstaende und Motion, die bewusst statt schwer wirkt.",
            },
          ],
        },
      ],
    },
    marqueeIntro: "Eine ruhige Studio-Seite kann trotzdem lebendig wirken. Darum dreht sich mein Build.",
    marqueeRows: [
      ["Recent projects", "Portfolio refresh", "Landing pages", "Brand sites"],
      ["Clean frontend", "Smooth motion", "Responsive polish", "Custom visuals"],
      ["First impression", "Past work", "Launch pages", "Creator sites"],
    ],
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
          body: "Responsives Frontend, kontrollierte Motion und finale Spacing-Paesse halten die Seite auf Desktop und Mobile stark.",
        },
      ],
    },
    work: {
      label: "Past work",
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
            "Eine Launch-Page mit klarerer Message, saubererem Content-Flow und einem hochwertigeren Conversion-Pfad.",
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

function nextPaint() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

function waitForHeroImages() {
  const visibleImages = Array.from(document.images).filter((image) => {
    const rect = image.getBoundingClientRect();
    return rect.top < window.innerHeight * 1.4 && rect.bottom > -window.innerHeight * 0.2;
  });

  return Promise.all(
    visibleImages.map((image) => {
      if (image.complete && image.naturalWidth !== 0) return Promise.resolve();
      if (typeof image.decode === "function") return image.decode().catch(() => undefined);

      return new Promise<void>((resolve) => {
        image.addEventListener("load", () => resolve(), { once: true });
        image.addEventListener("error", () => resolve(), { once: true });
      });
    }),
  );
}

function Loader({ status, footer }: { status: string; footer: string }) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="load-gate"
      exit={{
        clipPath: "inset(0 0 100% 0)",
        opacity: 0.88,
        transition: { duration: 0.72, ease: [0.76, 0, 0.24, 1] },
      }}
      initial={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
      role="status"
    >
      <div className="load-grain" aria-hidden="true" />
      <div className="load-cut-lines" aria-hidden="true" />
      <div className="load-center">
        <div className="load-mark" aria-hidden="true">
          <Image src="/logo-transparent.png" alt="" width={62} height={62} loading="eager" />
        </div>
        <span className="load-status">{status}</span>
      </div>
      <span className="load-footer">{footer}</span>
    </motion.div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: readonly string[]; reverse?: boolean }) {
  const rowItems = [...items, ...items, ...items];

  return (
    <div className={`marquee-row${reverse ? " is-reverse" : ""}`} aria-hidden="true">
      <div className="marquee-track">
        {rowItems.map((item, index) => (
          <span className="marquee-item" key={`${item}-${index}`}>
            {item}
            <Image className="marquee-logo" src="/logo-transparent.png" alt="" width={46} height={46} />
          </span>
        ))}
      </div>
    </div>
  );
}

export function HomePageClient() {
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [locale, setLocale] = useState<Locale>("en");
  const [serviceCardPages, setServiceCardPages] = useState([0, 0]);
  const [menuClosing, setMenuClosing] = useState(false);
  const copy = siteCopy[locale];
  const activeLanguage = languageOptions.find((item) => item.code === locale) ?? languageOptions[0];
  const year = new Date().getFullYear();

  useEffect(() => {
    const id = window.setTimeout(() => {
      const stored = window.localStorage.getItem("sparkle-locale");
      const nextLocale =
        stored === "en" || stored === "de"
          ? stored
          : window.navigator.language.toLowerCase().startsWith("de")
            ? "de"
            : "en";

      setLocale(nextLocale);
    }, 0);

    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      const id = window.setTimeout(() => setShowLoader(false), 0);
      return () => window.clearTimeout(id);
    }

    let cancelled = false;
    const waitForWindow = new Promise<void>((resolve) => {
      if (document.readyState === "complete") {
        resolve();
        return;
      }

      window.addEventListener("load", () => resolve(), { once: true });
    });
    const waitForFonts = document.fonts?.ready.catch(() => undefined) ?? Promise.resolve();
    const minimumTime = new Promise<void>((resolve) => window.setTimeout(resolve, 1050));
    const hardLimit = new Promise<void>((resolve) => window.setTimeout(resolve, 2600));

    const readyForFirstPaint = Promise.all([waitForWindow, waitForFonts, minimumTime])
      .then(() => waitForHeroImages())
      .then(() => nextPaint());

    Promise.race([readyForFirstPaint, hardLimit]).then(() => {
      if (!cancelled) setShowLoader(false);
    });

    return () => {
      cancelled = true;
    };
  }, [reduceMotion]);

  useEffect(() => {
    document.body.classList.toggle("is-loading", showLoader);
    return () => document.body.classList.remove("is-loading");
  }, [showLoader]);

  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -56px 0px" },
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
    }, 5200);

    return () => window.clearInterval(interval);
  }, [copy.reviews.items.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      setLanguageOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function handleSurfaceMove(event: ReactPointerEvent<HTMLElement>) {
    if (reduceMotion) return;
    setSurfacePosition(event.currentTarget, event.clientX, event.clientY);
  }

  function handleSurfaceLeave(event: ReactPointerEvent<HTMLElement>) {
    resetSurfacePosition(event.currentTarget);
  }

  function selectLocale(nextLocale: Locale) {
    setLocale(nextLocale);
    setLanguageOpen(false);
  }

  function closeMenuWithSpin() {
    if (menuClosing) return;
    setMenuClosing(true);
    window.setTimeout(() => {
      setMenuOpen(false);
      setMenuClosing(false);
    }, 360);
  }

  function cycleServiceCard(cardIndex: number, variantCount: number) {
    setServiceCardPages((current) => {
      const next = [...current];
      next[cardIndex] = ((next[cardIndex] ?? 0) + 1) % variantCount;
      return next;
    });
  }

  return (
    <>
      <AnimatePresence>{showLoader ? <Loader footer={copy.loaderFooter} status={copy.loaderStatus} /> : null}</AnimatePresence>

      <main className="site">
        <nav className="nav">
          <div className="nav-left">
            <Link className="brand" href="/" aria-label="sw8tx.lol home">
              <span className="brand-mark">
                <Image src="/logo-transparent.png" alt="" width={40} height={40} loading="eager" />
              </span>
              <span className="brand-name">sw8tx.lol</span>
            </Link>

            <div className={`language-picker${languageOpen ? " is-open" : ""}`}>
              <button
                aria-expanded={languageOpen}
                aria-haspopup="menu"
                className="language-button"
                onClick={() => setLanguageOpen((open) => !open)}
                type="button"
              >
                <span>{copy.languageLabel}</span>
                <span className="language-current">{activeLanguage.short}</span>
                <span className="language-chevron" aria-hidden="true" />
              </button>

              <AnimatePresence>
                {languageOpen ? (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="language-menu"
                    exit={{ opacity: 0, y: -8 }}
                    initial={{ opacity: 0, y: -8 }}
                    role="menu"
                    transition={{ duration: 0.18 }}
                  >
                    {languageOptions.map((item) => (
                      <button
                        aria-current={locale === item.code ? "true" : undefined}
                        className="language-option"
                        key={item.code}
                        onClick={() => selectLocale(item.code)}
                        role="menuitem"
                        type="button"
                      >
                        <span className="language-chip">{item.short}</span>
                        {item.label}
                      </button>
                    ))}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
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
            whileHover={reduceMotion ? undefined : { y: -2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          >
            <span className="menu-toggle-text">{menuOpen ? copy.menuButton.close : copy.menuButton.open}</span>
            <span className="mini-x" aria-hidden="true">
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
              transition={{ duration: 0.2 }}
            >
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="menu-sheet"
                exit={{ opacity: 0, y: 16 }}
                initial={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="menu-topbar">
                  <span className="menu-badge">{copy.menuBadge}</span>
                  <button
                    className={`menu-sheet-close${menuClosing ? " is-closing" : ""}`}
                    onClick={closeMenuWithSpin}
                    type="button"
                  >
                    <span className="visually-hidden">{copy.menuButton.closeLabel}</span>
                    <span className="mini-x is-cross" aria-hidden="true">
                      <span />
                      <span />
                    </span>
                  </button>
                </div>

                <div className="menu-panel">
                  {copy.menuItems.map((item, index) => (
                    <motion.a
                      animate={{ opacity: 1, y: 0 }}
                      className="menu-link"
                      href={item.href}
                      initial={{ opacity: 0, y: 14 }}
                      key={item.href}
                      onClick={() => setMenuOpen(false)}
                      transition={{ delay: 0.04 + index * 0.045, duration: 0.28 }}
                    >
                      <span className="menu-link-meta">{String(index + 1).padStart(2, "0")}</span>
                      <span>{item.label}</span>
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

        <section className="hero" id="home">
          <div className="floating-logo-field" aria-hidden="true">
            {floatingLogoSlots.map((slot) => (
              <span className={`float-logo ${slot}`} key={slot}>
                <Image
                  src="/logo-transparent.png"
                  alt=""
                  width={170}
                  height={170}
                  loading="eager"
                />
              </span>
            ))}
          </div>

          <div className="hero-stage">
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="eyebrow"
              initial={{ opacity: 0, y: 14 }}
              transition={{ delay: showLoader ? 0.12 : 0, duration: 0.42 }}
            >
              {copy.hero.eyebrow}
            </motion.p>
            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              className="hero-title"
              initial={{ opacity: 0, y: 18 }}
              transition={{ delay: showLoader ? 0.18 : 0.04, duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
            >
              {copy.hero.title}
            </motion.h1>
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="hero-tagline"
              initial={{ opacity: 0, y: 14 }}
              transition={{ delay: showLoader ? 0.24 : 0.08, duration: 0.48 }}
            >
              {copy.hero.tagline}
            </motion.p>
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="hero-text"
              initial={{ opacity: 0, y: 14 }}
              transition={{ delay: showLoader ? 0.3 : 0.12, duration: 0.48 }}
            >
              {copy.hero.text}
            </motion.p>

            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="hero-actions"
              initial={{ opacity: 0, y: 14 }}
              transition={{ delay: showLoader ? 0.34 : 0.14, duration: 0.44 }}
            >
              <motion.a
                className="button primary"
                href={`mailto:${primaryEmail}`}
                onPointerLeave={handleSurfaceLeave}
                onPointerMove={handleSurfaceMove}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                {copy.hero.ctaPrimary}
              </motion.a>
              <motion.a
                className="button secondary"
                href="#work"
                onPointerLeave={handleSurfaceLeave}
                onPointerMove={handleSurfaceMove}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                {copy.hero.ctaSecondary}
              </motion.a>
            </motion.div>

            <div className="hero-products" aria-label="Services">
              {copy.hero.cards.map((card, index) => (
                <motion.article
                  animate={{ opacity: 1, y: 0 }}
                  className="service-card"
                  initial={{ opacity: 0, y: 20 }}
                  key={`service-${index}`}
                  onPointerLeave={handleSurfaceLeave}
                  onPointerMove={handleSurfaceMove}
                  transition={{ delay: showLoader ? 0.38 + index * 0.08 : 0.18 + index * 0.05, duration: 0.46 }}
                >
                  <button
                    aria-label={card.action}
                    className="mouse-toggle"
                    onClick={() => cycleServiceCard(index, card.variants.length)}
                    type="button"
                  >
                    <span className="mouse-icon" aria-hidden="true">
                      <span />
                    </span>
                  </button>
                  <AnimatePresence mode="wait" initial={false}>
                    {(() => {
                      const activeIndex = serviceCardPages[index] ?? 0;
                      const activeCard = card.variants[activeIndex] ?? card.variants[0];

                      return (
                        <motion.div className="service-card-inner" key={`${index}-${activeIndex}`}>
                          <motion.div
                            animate={{ opacity: 1, rotateX: 0, y: 0 }}
                            aria-hidden="true"
                            className="jar-visual"
                            exit={{ opacity: 0, rotateX: -62, y: -12 }}
                            initial={{ opacity: 0, rotateX: 62, y: 12 }}
                            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <span className="jar-lid" />
                            <span className="jar-glass">
                              <Image src="/logo-transparent.png" alt="" width={86} height={86} loading="eager" />
                            </span>
                          </motion.div>
                          <motion.div
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            className="service-card-copy"
                            exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                            initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <span className="service-index">{String(activeIndex + 1).padStart(2, "0")}</span>
                            <span className="service-label">{activeCard.label}</span>
                            <h2>{activeCard.title}</h2>
                            <p>{activeCard.body}</p>
                          </motion.div>
                        </motion.div>
                      );
                    })()}
                  </AnimatePresence>
                </motion.article>
              ))}
            </div>

            <a className="scroll-cue" href="#motion-strip">
              <span className="visually-hidden">{copy.hero.scroll}</span>
              <span aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="motion-strip" id="motion-strip">
          <p className="strip-intro">{copy.marqueeIntro}</p>
          {copy.marqueeRows.map((row, index) => (
            <MarqueeRow items={row} key={row.join("-")} reverse={index % 2 === 1} />
          ))}
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
          <span>(C) {year} sw8tx.lol - EST 2026</span>
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
