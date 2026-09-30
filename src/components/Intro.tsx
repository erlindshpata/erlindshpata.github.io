import { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import { profile, stats } from "../data/profile";
import { useLocalTime } from "../hooks/useLocalTime";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { TraceCard } from "./TraceCard";

const now = [
  "fine-tuning a domain-specific LLM",
  "routing queries across RAG + live data",
  "wiring tools in over MCP",
  "streaming answers with citations",
];

function useTypewriter(words: string[], enabled: boolean) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(enabled ? "" : words[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const word = words[index];
    let delay = deleting ? 28 : 60;
    if (!deleting && text === word) delay = 2000;
    if (deleting && text === "") delay = 300;

    const id = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(id);
  }, [text, deleting, index, words, enabled]);

  return enabled ? text : words[0];
}

export function Intro() {
  const reduced = useReducedMotion();
  const current = useTypewriter(now, !reduced);
  const time = useLocalTime(profile.timeZoneId);

  return (
    <section id="top" className="px-4 pb-20 pt-10 sm:px-6 md:px-10 lg:px-14 lg:pb-28 lg:pt-16">
      <div className="flex items-baseline gap-2 animate-[fadeUp_600ms_both]">
        <span aria-hidden className="text-[11px] text-accent">●</span>
        <h1 className="label">
          {profile.name} · {profile.title} · {profile.location}
        </h1>
      </div>

      <p className="mt-6 max-w-4xl font-serif text-[clamp(2.9rem,7vw,6rem)] leading-[0.95] tracking-[-0.015em] text-balance animate-[fadeUp_700ms_80ms_both]">
        I build AI that <em className="text-accent">shows its sources</em>, and holds up in production.
      </p>

      <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted text-pretty animate-[fadeUp_700ms_160ms_both]">
        I lead AI and backend engineering at ReN, a financial intelligence platform built on a domain-specific language
        model. My work spans retrieval, grounding, fine-tuning and agentic tool-calling, plus keeping the whole system fast
        and affordable.
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-3 animate-[fadeUp_700ms_220ms_both]">
        <a
          href="#experience"
          className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-fg px-6 text-[15px] font-medium text-bg transition-colors duration-200 hover:bg-accent hover:text-on-accent"
        >
          Read the dossier
          <FiArrowDown size={17} aria-hidden />
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-line px-6 text-[15px] font-medium transition-colors duration-200 hover:border-fg"
        >
          Email me
          <FiArrowUpRight size={16} aria-hidden />
        </a>
      </div>

      {/* bento */}
      <div className="mt-14 grid gap-4 md:grid-cols-6 animate-[fadeUp_800ms_280ms_both]">
        <div className="md:col-span-6 xl:col-span-4 xl:row-span-2">
          <TraceCard />
        </div>

        <div className="tile flex flex-col justify-between p-6 md:col-span-3 xl:col-span-2">
          <p className="label">Now</p>
          <p className="mt-6 font-mono text-[15px] leading-relaxed" aria-label={`Currently: ${now.join(", ")}`}>
            <span aria-hidden>
              <span className="text-accent">$ </span>
              {current}
              <span className="blink ml-0.5 inline-block h-[1.05em] w-[0.55ch] translate-y-[0.2em] bg-fg/70 motion-reduce:hidden" />
            </span>
          </p>
        </div>

        <div className="tile flex flex-col justify-between p-6 md:col-span-3 xl:col-span-2">
          <p className="label">Local time · Tirana</p>
          <p className="mt-6 flex items-baseline gap-3">
            <span className="font-serif text-6xl leading-none">{time}</span>
            <span className="font-mono text-xs text-subtle">{profile.timezone}</span>
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-4 md:col-span-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="tile p-5">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-serif text-5xl leading-none">{s.value}</span>
                <span className="mt-3 block text-sm leading-snug text-muted">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
