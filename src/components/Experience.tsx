import { experience } from "../data/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section id="experience" index="04" eyebrow="Experience" title="Where I've built.">
      <ol className="border-t border-line">
        {experience.map((e, i) => (
          <Reveal key={e.role + e.company} delay={i * 60}>
            <li className="grid gap-4 border-b border-line py-10 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-4">
                <p className="font-mono text-sm text-accent">{e.period}</p>
                <p className="mt-2 text-sm text-muted">{e.location}</p>
              </div>
              <div className="md:col-span-8">
                <h3 className="font-display text-2xl font-semibold tracking-tight">{e.role}</h3>
                <p className="mt-1 text-muted">{e.company}</p>
                {e.note && <p className="mt-1 text-sm italic text-subtle">{e.note}</p>}
                <p className="mt-4 leading-relaxed text-muted text-pretty">{e.summary}</p>
                {e.highlights && (
                  <ul className="mt-5 space-y-2.5">
                    {e.highlights.map((h) => (
                      <li key={h.slice(0, 32)} className="flex gap-3 leading-relaxed text-muted">
                        <span aria-hidden className="mt-[0.7em] h-1 w-3 shrink-0 rounded-full bg-accent" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {e.stack && (
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack">
                    {e.stack.map((s) => (
                      <li key={s} className="chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
