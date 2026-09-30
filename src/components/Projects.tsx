import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { projects, type Project } from "../data/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

function ProjectCard({ p }: { p: Project }) {
  const isRepo = p.url.includes("github.com");
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noreferrer"
      className={`group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors duration-200 hover:border-accent/60 md:p-8 ${
        p.featured ? "md:min-h-[320px]" : ""
      }`}
    >
      {p.featured && (
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      )}
      <div className="relative flex items-start justify-between gap-4">
        <p className="label">{p.kind}</p>
        <span className="inline-flex shrink-0 items-center gap-1.5 text-sm text-muted transition-colors duration-200 group-hover:text-accent">
          {isRepo && <FiGithub size={15} aria-hidden />}
          {p.linkLabel}
          <FiArrowUpRight
            size={16}
            aria-hidden
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>
      <h3 className={`relative mt-6 font-display font-semibold tracking-tight ${p.featured ? "text-4xl md:text-5xl" : "text-2xl"}`}>
        {p.title}
      </h3>
      <p className={`relative mt-4 leading-relaxed text-muted text-pretty ${p.featured ? "max-w-2xl text-lg" : ""}`}>
        {p.description}
      </p>
      <ul className="relative mt-auto flex flex-wrap gap-2 pt-6" aria-label="Technologies">
        {p.tags.map((t) => (
          <li key={t} className="chip">
            {t}
          </li>
        ))}
      </ul>
    </a>
  );
}

export function Projects() {
  const [featured, ...rest] = projects;
  return (
    <Section
      id="projects"
      index="05"
      eyebrow="Projects"
      title="Selected work."
      intro="My day job, plus the agents and apps I build outside it to try out new ideas."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <Reveal className="md:col-span-3">
          <ProjectCard p={featured} />
        </Reveal>
        {rest.map((p, i) => (
          <Reveal key={p.title} delay={i * 80} className="h-full">
            <ProjectCard p={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
