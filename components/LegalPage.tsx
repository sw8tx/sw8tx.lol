import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

export type LegalSection = {
  title: string;
  content: string;
  listNote?: string;
  list?: string[];
  listFooter?: string;
  contact?: string;
};

type LegalPageProps = {
  tone: "terms" | "privacy" | "refund";
  label: string;
  title: string;
  updated: string;
  intro?: string;
  sections: LegalSection[];
};

const sectionColors = ["#0050d8", "#4db6e5", "#18bfa5", "#9bd3ff", "#2f9cff"];

export function LegalPage({ tone, label, title, updated, intro, sections }: LegalPageProps) {
  const year = new Date().getFullYear();

  return (
    <main className={`legal-page ${tone}`}>
      <nav className="legal-nav">
        <Link href="/" className="legal-brand" aria-label="Sparkle home">
          <span className="legal-brand-mark">
            <Image src="/logo-transparent.png" alt="" width={40} height={40} />
          </span>
          <span className="legal-brand-name">Sparkle</span>
        </Link>
        <div className="legal-links">
          <Link className="legal-link terms" href="/tos">Terms</Link>
          <Link className="legal-link privacy" href="/privacy">Privacy</Link>
          <Link className="legal-link refund" href="/refund">Refund</Link>
        </div>
      </nav>

      <section className="legal-shell">
        <span className="legal-kicker">{label}</span>
        <h1 className="legal-title">{title}</h1>
        <span className="legal-updated">{updated}</span>
        {intro && <p className="legal-intro">{intro}</p>}

        <div className="legal-sections">
          {sections.map((section, index) => (
            <article
              className="legal-section"
              key={section.title}
              style={{
                "--section-color": sectionColors[index % sectionColors.length],
                "--section-delay": `${220 + index * 58}ms`,
              } as CSSProperties}
            >
              <h2>{section.title}</h2>
              <p>{section.content}</p>
              {section.contact && (
                <a className="legal-contact" href={`mailto:${section.contact}`}>
                  {section.contact}
                </a>
              )}
              {section.listNote && <p className="legal-list-note">{section.listNote}</p>}
              {section.list && (
                <ul className="legal-list">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.listFooter && <p className="legal-list-footer">{section.listFooter}</p>}
            </article>
          ))}
        </div>
      </section>

      <footer className="legal-footer">
        <span>(C) {year} Sparkle / Tyler Osthoff</span>
        <div className="footer-links">
          <Link className="terms" href="/tos">Terms</Link>
          <Link className="privacy" href="/privacy">Privacy</Link>
          <Link className="refund" href="/refund">Refund</Link>
        </div>
      </footer>
    </main>
  );
}
