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
    <section id={id} className="border-t border-line py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <p className="label">
            <span className="text-accent">{index}</span> / {eyebrow}
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-balance md:text-5xl">
            {title}
          </h2>
          {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted text-pretty">{intro}</p>}
        </Reveal>
        <div className="mt-14 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
