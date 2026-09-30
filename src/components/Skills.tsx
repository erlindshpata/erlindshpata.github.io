import { skillGroups } from "../data/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Skills() {
  return (
    <Section
      id="stack"
      index="04"
      eyebrow="Stack"
      title={
        <>
          The <em className="text-accent">toolbox</em>.
        </>
      }
      intro="Python first. Google Cloud for AI workloads, AWS for event-driven backends."
    >
      <div className="grid border-t border-line sm:grid-cols-2 xl:grid-cols-4">
        {skillGroups.map((g, i) => (
          <Reveal
            key={g.name}
            delay={i * 70}
            className={`border-b border-line py-7 sm:px-6 ${i % 2 === 1 ? "sm:border-l" : ""} xl:border-l ${i === 0 ? "xl:border-l-0 xl:pl-0" : ""}`}
          >
            <h3 className="font-serif text-2xl">{g.name}</h3>
            <ul className="mt-5 space-y-2">
              {g.items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[15px] text-muted">
                  <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
