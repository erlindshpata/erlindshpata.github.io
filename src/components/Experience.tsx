import { experience } from "../data/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section
      id="experience"
      index="03"
      eyebrow="Experience"
      title={
        <>
          Seven years, <em className="text-accent">three chapters</em>.
        </>
      }
    >
      <ol className="relative border-l border-line pl-6 sm:pl-10">
        {experience.map((e, i) => (
          <Reveal key={e.role + e.company} delay={i * 60}>
            <li className={`relative ${i < experience.length - 1 ? "pb-16" : ""}`}>
              <span
                aria-hidden
                className={`absolute -left-[31px] top-2 h-3 w-3 rounded-full border-2 sm:-left-[47px] ${
                  i === 0 ? "border-accent bg-accent" : "border-line bg-bg"
                }`}
              />
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
                {e.period} <span className="text-subtle">· {e.location}</span>
              </p>
              <h3 className="mt-3 font-serif text-[2rem] leading-tight">{e.role}</h3>
              <p className="mt-1 text-muted">{e.company}</p>
              {e.note && <p className="mt-1 font-mono text-xs text-subtle">↳ {e.note}</p>}
              <p className="mt-5 max-w-3xl text-[17px] leading-relaxed text-muted text-pretty">{e.summary}</p>
              {e.highlights && (
                <ul className="mt-6 max-w-3xl divide-y divide-line border-y border-line">
                  {e.highlights.map((h, j) => (
                    <li key={h.slice(0, 32)} className="flex gap-4 py-3.5 text-[15px] leading-relaxed text-muted">
                      <span className="shrink-0 font-mono text-xs leading-6 text-subtle">{String(j + 1).padStart(2, "0")}</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
              {e.stack && (
                <p className="mt-5 font-mono text-xs leading-relaxed text-subtle">
                  <span className="text-muted">stack ▸ </span>
                  {e.stack.join(" / ")}
                </p>
              )}
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
