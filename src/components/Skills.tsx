import { skillGroups } from "../data/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Skills() {
  return (
    <Section
      id="stack"
      index="02"
      eyebrow="Stack"
      title="The tools I reach for."
      intro="Python is my primary language. I use Google Cloud for AI workloads and AWS for event-driven backends."
    >
      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
        {skillGroups.map((g, i) => (
          <Reveal key={g.name} delay={i * 80} className="h-full">
            <div className="h-full bg-bg p-6 md:p-8">
              <h3 className="font-display text-lg font-semibold">{g.name}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
