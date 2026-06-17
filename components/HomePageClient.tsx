"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FrozenCoreExperience } from "./FrozenCoreExperience";
import { ProjectCaseCard } from "./ProjectCaseCard";

const heroBadges = [
  { label: "01 / Web", title: "Interface Systems", body: "Polished portfolio, shop and SaaS surfaces built around fast flows." },
  { label: "02 / Motion", title: "Animated Details", body: "Micro-interactions, reveal systems, hover energy and page rhythm." },
  { label: "03 / Code", title: "Next.js Builds", body: "Responsive components with crisp implementation and clean handoff." },
];

const processSteps = [
  {
    num: "01",
    title: "Direction",
    body: "Mood, structure, colors and the exact feel of the site.",
  },
  {
    num: "02",
    title: "Design",
    body: "Visual systems in Figma-style thinking, then responsive layouts.",
  },
  {
    num: "03",
    title: "Build",
    body: "Next.js implementation with interaction polish and clean details.",
  },
  {
    num: "04",
    title: "Launch",
    body: "Final QA, copy pass, contact routes and handoff-ready files.",
  },
];

const projects = [
  {
    code: "PORTFOLIO_CO_01",
    title: "Nova Studio",
    category: "Creative Agency",
    summary: "Premium service website with a calmer structure, stronger trust and cleaner calls to action.",
    outcome: "A sharper conversion flow with motion that feels expensive instead of noisy.",
    duration: "Strategy, design, build and QA need real time so the result feels deliberate.",
    accent: "#7dbdff",
    screens: [
      { label: "Hero", note: "high-impact intro" },
      { label: "Services", note: "clear selling blocks" },
      { label: "Contact", note: "strong close" },
    ],
  },
  {
    code: "PORTFOLIO_CO_02",
    title: "Aura Commerce",
    category: "Beauty Ecommerce",
    summary: "Storefront concept with faster browsing, cleaner product hierarchy and more premium atmosphere.",
    outcome: "Customers move from first impression to product discovery with less friction.",
    duration: "Good ecommerce takes careful layout work, performance cleanup and responsive passes.",
    accent: "#7af0d7",
    screens: [
      { label: "Collection", note: "elevated browsing" },
      { label: "Product", note: "conversion detail" },
      { label: "Cart", note: "clean checkout feel" },
    ],
  },
  {
    code: "PORTFOLIO_CO_03",
    title: "Vertex SaaS",
    category: "B2B Software",
    summary: "SaaS website system that makes technical products feel clearer, lighter and easier to trust.",
    outcome: "A more readable product story that guides visitors toward demos and calls.",
    duration: "Professional builds take planning, revisions and polish across desktop and mobile.",
    accent: "#99cfff",
    screens: [
      { label: "Overview", note: "simple product story" },
      { label: "Features", note: "modular sections" },
      { label: "Demo CTA", note: "conversion finish" },
    ],
  },
];

const reviews = [
  "Working with him was one of the smoothest freelance experiences I've had. The final website looked significantly better than what we originally imagined and performed perfectly across all devices.",
  "The attention to detail was outstanding. Every animation felt purposeful and every section of the website reflected our brand perfectly.",
  "The final result feels premium without sacrificing usability. Every interaction feels smooth and refined.",
];

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.25 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

export function HomePageClient() {
  return (
    <main className="spark-site">
      <div className="spark-noise" aria-hidden="true" />

      <header className="spark-nav">
        <Link className="spark-brand" href="/" aria-label="Sparkle home">
          <Image src="/logo-transparent.png" alt="" width={42} height={42} priority />
          <span>Sparkle</span>
        </Link>

        <nav className="spark-nav-links" aria-label="Primary">
          <a href="#about">About</a>
          <a href="#process">Process</a>
          <a href="#centerpiece">Centerpiece</a>
          <a href="#work">Work</a>
          <a href="#reviews">Reviews</a>
          <a className="spark-nav-cta" href="#contact">Contact</a>
        </nav>
      </header>

      <section className="spark-hero" aria-label="Sparkle web designer portfolio">
        <div className="spark-hero-copy">
          <Reveal className="spark-hero-inner">
            <p className="spark-eyebrow">Web Designer and Frontend Developer</p>
            <h1 className="spark-title">
              <span>Building websites</span>
              <span>people remember.</span>
            </h1>
            <p className="spark-hero-text">
              I am Sparkle, building custom websites, animated interfaces, portfolio systems and
              clean Next.js experiences for brands that need their own look.
            </p>
            <div className="spark-hero-actions">
              <a className="spark-button spark-button-primary" href="mailto:info@tylerosthoff.xyz">
                Email Sparkle
              </a>
              <a className="spark-button" href="#centerpiece">View Frozen Core</a>
            </div>
          </Reveal>
        </div>

        <Reveal className="spark-hero-aside" delay={0.08}>
          <div className="spark-hero-frame">
            <div className="spark-hero-logo">
              <Image src="/logo-transparent.png" alt="" width={108} height={108} priority />
            </div>
            <div className="spark-hero-grid">
              {heroBadges.map((badge) => (
                <article className="spark-badge-card" key={badge.title}>
                  <span>{badge.label}</span>
                  <h2>{badge.title}</h2>
                  <p>{badge.body}</p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="spark-marquee" aria-hidden="true">
        <div className="spark-marquee-track">
          <span>Web Design</span>
          <span>Frontend Development</span>
          <span>Motion Direction</span>
          <span>Portfolio Systems</span>
          <span>Landing Pages</span>
          <span>Responsive Builds</span>
          <span>Web Design</span>
          <span>Frontend Development</span>
          <span>Motion Direction</span>
          <span>Portfolio Systems</span>
        </div>
      </section>

      <section className="spark-section" id="about">
        <Reveal className="spark-section-heading">
          <p className="spark-section-label">About</p>
          <h2>Clean, sharp, animated.</h2>
        </Reveal>
        <div className="spark-about-grid">
          <Reveal className="spark-body-copy" delay={0.08}>
            <p>
              I design and build modern web experiences with a focus on motion, layout clarity
              and a strong first impression. The style is sharp and premium, but the code stays
              practical enough to ship.
            </p>
          </Reveal>
          <Reveal className="spark-proof-grid" delay={0.12}>
            <article>
              <strong>20+</strong>
              <span>Digital surfaces</span>
            </article>
            <article>
              <strong>3+</strong>
              <span>Years designing</span>
            </article>
            <article>
              <strong>3</strong>
              <span>Contact routes</span>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="spark-section" id="process">
        <Reveal className="spark-section-heading">
          <p className="spark-section-label">Process</p>
          <h2>From idea to live site.</h2>
        </Reveal>
        <div className="spark-process-grid">
          {processSteps.map((step, index) => (
            <Reveal className="spark-process-card" delay={0.06 * index} key={step.title}>
              <span>{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <FrozenCoreExperience />

      <section className="spark-section" id="work">
        <Reveal className="spark-section-heading">
          <p className="spark-section-label">Work</p>
          <h2>Portfolio with proof.</h2>
        </Reveal>
        <div className="spark-project-grid">
          {projects.map((project, index) => (
            <Reveal delay={0.08 * index} key={project.title}>
              <ProjectCaseCard {...project} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="spark-section" id="reviews">
        <Reveal className="spark-section-heading">
          <p className="spark-section-label">Reviews</p>
          <h2>Clients feel the polish.</h2>
        </Reveal>
        <div className="spark-review-grid">
          {reviews.map((review, index) => (
            <Reveal className="spark-review-card" delay={0.08 * index} key={review}>
              <div className="spark-review-stars" aria-hidden="true">★★★★★</div>
              <p>{review}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="spark-contact" id="contact">
        <Reveal className="spark-contact-copy">
          <p className="spark-section-label">Contact</p>
          <h2>Let&apos;s build.</h2>
          <p>
            For web design, frontend builds, portfolio work, brand refreshes or collaborations,
            send a mail or use one of the direct contact routes.
          </p>
        </Reveal>
        <Reveal className="spark-contact-panel" delay={0.08}>
          <a className="spark-contact-row" href="mailto:info@tylerosthoff.xyz">
            <span>Email</span>
            <strong>info@tylerosthoff.xyz</strong>
          </a>
          <a className="spark-contact-row" href="https://www.tiktok.com/@sw8tx" rel="noreferrer" target="_blank">
            <span>TikTok</span>
            <strong>@sw8tx</strong>
          </a>
          <div className="spark-contact-row">
            <span>Discord</span>
            <strong>ylhj</strong>
          </div>
        </Reveal>
      </section>

      <footer className="spark-footer">
        <span>(C) 2026 Sparkle / Tyler Osthoff</span>
        <div className="spark-footer-links">
          <Link href="/tos">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/refund">Refund</Link>
        </div>
      </footer>
    </main>
  );
}
