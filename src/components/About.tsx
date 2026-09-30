import { education, languages, profile, stats } from "../data/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function About() {
  return (
    <Section
      id="about"
      index="01"
      eyebrow="About"
      title={
        <>
          Systems-first AI engineering, <span className="text-muted">built for scale, cost and reliability.</span>
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="space-y-5 text-lg leading-relaxed text-muted text-pretty lg:col-span-7">
          {profile.bio.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Reveal>

        <Reveal delay={120} className="lg:col-span-5">
          <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`bg-surface p-6 ${i % 2 === 1 ? "border-l border-line" : ""} ${i > 1 ? "border-t border-line" : ""}`}
              >
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-4xl font-semibold tracking-tight">{s.value}</span>
                  <span className="mt-2 block text-sm text-muted">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div>
              <h3 className="label">Education</h3>
              <ul className="mt-3 space-y-3">
                {education.map((e) => (
                  <li key={e.degree}>
                    <p className="text-fg">{e.degree}</p>
                    <p className="text-sm text-muted">
                      {e.school} · {e.period}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="label">Languages</h3>
              <ul className="mt-3 space-y-1.5">
                {languages.map((l) => (
                  <li key={l.name} className="flex justify-between gap-4 text-sm">
                    <span className="text-fg">{l.name}</span>
                    <span className="text-muted">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
