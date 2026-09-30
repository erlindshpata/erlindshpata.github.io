import { education, languages, profile } from "../data/profile";
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
          A backend engineer who <em className="text-accent">grew into</em> AI.
        </>
      }
    >
      <div className="grid gap-12 xl:grid-cols-12">
        <Reveal className="xl:col-span-7">
          <blockquote className="border-l-2 border-accent pl-6 font-serif text-[1.9rem] italic leading-[1.2] text-fg text-balance">
            “Design AI for scale, cost and reliability, not just accuracy on a benchmark.”
          </blockquote>
          <div className="mt-10 space-y-5 text-[17px] leading-relaxed text-muted text-pretty">
            {profile.bio.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="xl:col-span-5">
          <div className="tile divide-y divide-line">
            <div className="p-6">
              <h3 className="label">Education</h3>
              <ul className="mt-4 space-y-4">
                {education.map((e) => (
                  <li key={e.degree} className="flex items-start justify-between gap-4">
                    <span>
                      <span className="block font-serif text-xl leading-tight">{e.degree}</span>
                      <span className="mt-1 block text-sm text-muted">{e.school}</span>
                    </span>
                    <span className="shrink-0 font-mono text-xs text-subtle">{e.period}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6">
              <h3 className="label">Languages</h3>
              <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
                {languages.map((l) => (
                  <li key={l.name} className="flex items-baseline justify-between gap-3 border-b border-dashed border-line pb-2">
                    <span>{l.name}</span>
                    <span className="font-mono text-xs text-subtle">{l.level}</span>
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
