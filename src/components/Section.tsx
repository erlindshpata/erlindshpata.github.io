import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
};

export function Section({ id, index, eyebrow, title, intro, children }: Props) {
  return (
    <section id={id} className="border-t border-line px-4 py-20 sm:px-6 md:px-10 lg:px-14 lg:py-28">
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-accent">§ {index}</span>
          <span className="h-px w-10 bg-line" aria-hidden />
          <span className="label">{eyebrow}</span>
        </div>
        <h2 className="mt-6 max-w-3xl font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1] tracking-[-0.01em] text-balance">
          {title}
        </h2>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted text-pretty">{intro}</p>}
      </Reveal>
      <div className="mt-12 lg:mt-16">{children}</div>
    </section>
  );
}
