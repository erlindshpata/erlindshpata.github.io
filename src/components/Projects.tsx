import { FiArrowUpRight } from "react-icons/fi";
import { projects } from "../data/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Projects() {
  return (
    <Section
      id="projects"
      index="05"
      eyebrow="Projects"
      title={
        <>
          Selected <em className="text-accent">work</em>.
        </>
      }
      intro="My day job, plus the agents and apps I build to try out new ideas."
    >
      <ol className="border-t border-line">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 60}>
            <li className="border-b border-line">
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="group -mx-4 grid cursor-pointer gap-4 rounded-2xl px-4 py-8 transition-colors duration-200 hover:bg-surface sm:grid-cols-[64px_1fr_auto] sm:gap-6"
              >
                <span className="font-mono text-xs text-subtle sm:pt-3">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="font-serif text-4xl leading-none transition-colors duration-200 group-hover:text-accent md:text-5xl">
                      {p.title}
                    </h3>
                    <span className="label">{p.kind}</span>
                  </div>
                  <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted text-pretty">{p.description}</p>
                  <p className="mt-4 font-mono text-xs text-subtle">{p.tags.join("  ·  ")}</p>
                </div>
                <span className="inline-flex items-center gap-2 self-start text-sm text-muted transition-colors duration-200 group-hover:text-accent sm:pt-3">
                  {p.linkLabel}
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-line transition-all duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
                    <FiArrowUpRight size={17} aria-hidden />
                  </span>
                </span>
              </a>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
