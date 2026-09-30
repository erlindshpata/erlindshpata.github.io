import { pipeline } from "../data/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

const spans = ["md:col-span-3", "md:col-span-3", "md:col-span-2", "md:col-span-2", "md:col-span-2"];

export function Approach() {
  return (
    <Section
      id="approach"
      index="02"
      eyebrow="Approach"
      title={
        <>
          From raw PDFs to <em className="text-accent">grounded answers</em>.
        </>
      }
      intro="I own the whole path a question takes through ReN, and each stage is built for production load."
    >
      <ol className="grid gap-4 md:grid-cols-6">
        {pipeline.map((p, i) => (
          <Reveal key={p.step} delay={i * 70} className={`${spans[i]} h-full`}>
            <li className="tile group relative flex h-full flex-col overflow-hidden p-7 transition-colors duration-200 hover:border-accent/50">
              <div className="flex items-baseline justify-between">
                <span className="font-serif text-6xl italic leading-none text-accent/90">{p.step}</span>
                {i < pipeline.length - 1 && (
                  <span aria-hidden className="font-mono text-xs text-subtle transition-transform duration-200 group-hover:translate-x-1">
                    next →
                  </span>
                )}
              </div>
              <h3 className="mt-8 font-serif text-3xl leading-none">{p.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
