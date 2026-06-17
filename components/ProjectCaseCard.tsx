import type { CSSProperties } from "react";

type ProjectCaseCardProps = {
  code: string;
  title: string;
  category: string;
  summary: string;
  outcome: string;
  duration: string;
  accent: string;
  screens: Array<{ label: string; note: string }>;
};

export function ProjectCaseCard({
  code,
  title,
  category,
  summary,
  outcome,
  duration,
  accent,
  screens,
}: ProjectCaseCardProps) {
  return (
    <article className="case-card" style={{ "--case-accent": accent } as CSSProperties}>
      <div className="case-card-head">
        <span>{code}</span>
        <p>{category}</p>
      </div>
      <div className="case-card-body">
        <div className="case-card-copy">
          <h3>{title}</h3>
          <p>{summary}</p>
          <dl>
            <div>
              <dt>Outcome</dt>
              <dd>{outcome}</dd>
            </div>
            <div>
              <dt>Timing</dt>
              <dd>{duration}</dd>
            </div>
          </dl>
          <a className="case-card-cta" href="#contact">View case</a>
        </div>
        <div className="case-card-shots" aria-hidden="true">
          {screens.map((screen) => (
            <div className="case-shot" key={`${title}-${screen.label}`}>
              <span className="case-shot-top" />
              <strong>{screen.label}</strong>
              <span className="case-shot-body" />
              <small>{screen.note}</small>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
