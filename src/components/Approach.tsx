import { pipeline } from "../data/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Approach() {
  return (
    <Section
      id="approach"
      index="03"
      eyebrow="Approach"
      title={
        <>
          From raw PDFs to grounded answers, <span className="text-muted">and every layer in between.</span>
        </>
      }
      intro="I own the whole path a question takes through ReN. Each stage is designed to hold up under production load."
    >
      <ol className="relative grid gap-4 md:grid-cols-5 md:gap-0">
        <svg
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 top-[27px] hidden h-2 w-full text-accent/50 md:block"
          preserveAspectRatio="none"
          viewBox="0 0 100 2"
        >
          <line x1="10" y1="1" x2="90" y2="1" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" className="flow" />
        </svg>
        {pipeline.map((p, i) => (
          <Reveal key={p.step} delay={i * 90}>
            <li className="relative flex gap-4 md:flex-col md:items-center md:px-3 md:text-center">
              <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-line bg-surface font-mono text-sm text-accent shadow-sm">
                {p.step}
              </span>
              <div className="md:mt-5">
                <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.body}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
