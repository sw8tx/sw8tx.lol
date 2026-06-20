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
import { useEffect, useState } from "react";

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
}: {
  children: ReactNode;
  className: string;
  href: string;
}) {
  const magnetic = useMagnetic(8);

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
  return (
    <motion.button
      aria-label={`${card.category}: ${card.title}`}
      className={`hero-card${active ? " active" : ""}${card.dark ? " dark" : ""}`}
      onFocus={() => onActivate(card.id)}
      onMouseEnter={() => onActivate(card.id)}
      onTouchStart={() => onActivate(card.id)}
      style={{
        "--left": card.left,
        "--top": card.top,
        "--mobile-left": card.mobileLeft,
        "--mobile-top": card.mobileTop,
        "--rotate": `${card.rotate}deg`,
        "--drag-x": "0px",
        "--drag-y": "0px",
        "--card-color": card.color,
        "--card-color-2": card.color2,
        "--card-soft": card.soft,
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

function PortfolioProjects() {
  return (
    <div className="portfolio-grid reveal delay-1">
      {studioProjects.map((project, index) => (
        <article
          className="project-card"
          key={project.title}
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
        </article>
      ))}
    </div>
  );
}

function IntroLoader({ active }: { active: boolean }) {
  return (
    <div aria-hidden={!active} className={`load-gate${active ? " is-active" : " is-exiting"}`}>
      <div className="load-logo-build" role="presentation">
        {Array.from({ length: 5 }, (_, index) => (
          <span
            className={`load-logo-slice load-logo-slice-${index + 1}`}
            key={index}
            style={{ "--slice-delay": `${index * 90}ms` } as CSSProperties}
          >
            <Image src="/logo-transparent.png" alt="" fill priority sizes="180px" />
          </span>
        ))}
        <span className="load-logo-core">
          <Image src="/logo-transparent.png" alt="Sparkle logo" fill priority sizes="180px" />
        </span>
      </div>
      <p className="load-word">Sparkle</p>
      <span className="load-subline">crafting the reveal</span>
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
  const [activeShowcase, setActiveShowcase] = useState(showcase[0].id);
  const [isLoading, setIsLoading] = useState(true);
  const [navScrolled, setNavScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroCopyTargetY = useTransform(scrollYProgress, [0, 0.28], [0, -54]);
  const heroFieldTargetY = useTransform(scrollYProgress, [0, 0.28], [0, 70]);
  const heroGlowTargetScale = useTransform(scrollYProgress, [0, 0.28], [1, 1.12]);
  const heroCopyY = useSpring(heroCopyTargetY, { stiffness: 120, damping: 28 });
  const heroFieldY = useSpring(heroFieldTargetY, { stiffness: 120, damping: 30 });
  const heroGlowScale = useSpring(heroGlowTargetScale, { stiffness: 120, damping: 28 });
  const scrollProgressX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.24 });
  const heroGlowOpacity = useTransform(scrollYProgress, [0, 0.28], [0.92, 0.54]);
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
    if (reduceMotion) return;

    const timer = window.setTimeout(() => setIsLoading(false), 1800);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="site">
      <IntroLoader active={!reduceMotion && isLoading} />
      <motion.div aria-hidden="true" className="scroll-progress" style={{ scaleX: scrollProgressX }} />

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
          <MagneticAnchor className="nav-button magnetic-action" href="#contact">
            Contact Sparkle
          </MagneticAnchor>
        </div>
      </nav>

      <section className="hero" aria-label="Sparkle web designer portfolio">
        <motion.div aria-hidden="true" className="hero-parallax-field" style={{ opacity: heroGlowOpacity, scale: heroGlowScale, y: heroFieldY }} />
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
            <MagneticAnchor className="button primary magnetic-action" href={`mailto:${primaryEmail}`}>
              <span>Email Sparkle</span>
            </MagneticAnchor>
            <MagneticAnchor className="button magnetic-action" href="#work">
              <span>View Playground</span>
            </MagneticAnchor>
          </div>
        </motion.div>

        <div className="card-stage" aria-label="Sparkle service cards">
          {showcase.map((card, index) => (
            <HeroShowcaseCard
              active={activeShowcase === card.id}
              card={card}
              index={index}
              key={card.id}
              onActivate={setActiveShowcase}
            />
          ))}
        </div>
      </section>

      <div className="marquee-field" aria-hidden="true">
        <MarqueeLine row="near" speed={34} />
        <MarqueeLine direction="reverse" row="mid" speed={44} />
        <MarqueeLine row="far" speed={56} />
      </div>

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
            <h2 className="section-title">From idea to live site.</h2>
          </div>
          <ProcessStack items={[...process]} />
        </div>
      </section>

      <section className="section" id="work">
        <div className="section-grid work-grid">
          <div className="reveal">
            <p className="section-label">Work</p>
            <h2 className="section-title">Portfolio with proof.</h2>
          </div>
          <PortfolioProjects />
        </div>
      </section>

      <TestimonialsCarousel />

      <section className="contact" id="contact">
        <div className="contact-shell">
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
