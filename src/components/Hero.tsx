import { useEffect, useRef, useState, type CSSProperties } from "react";
import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";
import { profile } from "../data/profile";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { HeroScene } from "./HeroScene";

const meta = [
  { label: "Currently", value: `${profile.shortTitle} at ${profile.currentCompany}` },
  { label: "Based in", value: `${profile.location} · ${profile.timezone}` },
  { label: "Focus", value: "RAG, fine-tuning, agentic systems" },
];

const roles = ["RAG pipelines", "domain-specific LLMs", "agentic tool-calling", "streaming AI backends"];

const tokens: { text: string; x: string; y: string; depth: number; dur: number; hideSm?: boolean }[] = [
  { text: "async def", x: "4%", y: "14%", depth: 18, dur: 15 },
  { text: "top_k=8", x: "66%", y: "15%", depth: -12, dur: 18, hideSm: true },
  { text: "yield", x: "62%", y: "80%", depth: 24, dur: 13, hideSm: true },
  { text: "{ }", x: "92%", y: "8%", depth: -20, dur: 17 },
  { text: "tool_call()", x: "2%", y: "84%", depth: 10, dur: 19, hideSm: true },
  { text: "[1]", x: "54%", y: "90%", depth: -16, dur: 14 },
  { text: "SSE", x: "88%", y: "93%", depth: 14, dur: 16, hideSm: true },
  { text: "embed()", x: "2%", y: "48%", depth: -8, dur: 20, hideSm: true },
];

function useTypeOnce(length: number, enabled: boolean, speed = 110, startDelay = 300) {
  const [count, setCount] = useState(enabled ? 0 : length);
  useEffect(() => {
    if (!enabled || count >= length) return;
    const id = setTimeout(() => setCount((c) => c + 1), count === 0 ? startDelay : speed);
    return () => clearTimeout(id);
  }, [count, length, enabled, speed, startDelay]);
  return enabled ? count : length;
}

function useTypewriter(words: string[], enabled: boolean) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(enabled ? "" : words[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const word = words[index];
    let delay = deleting ? 35 : 70;
    if (!deleting && text === word) delay = 1800;
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

export function Hero() {
  const reduced = useReducedMotion();
  const role = useTypewriter(roles, !reduced);
  const [firstName, lastName] = profile.name.split(" ");
  const typed = useTypeOnce(firstName.length + lastName.length + 1, !reduced);
  const firstTyped = Math.min(typed, firstName.length);
  const lastTyped = Math.max(0, typed - firstName.length);
  const done = typed > firstName.length + lastName.length;
  const cursor = (
    <span
      className={`inline-block h-[0.75em] w-[0.08em] translate-y-[0.04em] bg-accent motion-reduce:hidden ${
        done ? "blink ml-2" : "ml-[0.04em]"
      }`}
    />
  );
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || !matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        el.style.setProperty("--mx", (x * 2 - 1).toFixed(3));
        el.style.setProperty("--my", (y * 2 - 1).toFixed(3));
        el.style.setProperty("--px", `${(x * 100).toFixed(1)}%`);
        el.style.setProperty("--py", `${(y * 100).toFixed(1)}%`);
      });
    };
    el.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
    };
  }, [reduced]);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden">
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
      <div aria-hidden className="hero-spot pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
        {tokens.map((tk) => (
          <span
            key={tk.text}
            className={`parallax absolute ${tk.hideSm ? "hidden md:block" : ""}`}
            style={{ left: tk.x, top: tk.y, "--depth": tk.depth } as CSSProperties}
          >
            <span
              className="drift block font-mono text-sm text-subtle/40 md:text-base"
              style={{ "--dur": `${tk.dur}s`, "--delay": `-${tk.dur / 3}s` } as CSSProperties}
            >
              {tk.text}
            </span>
          </span>
        ))}
      </div>

      <div className="container-x relative pb-20 pt-32 md:pb-28 md:pt-40">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 animate-[fadeUp_700ms_both]">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover ring-1 ring-line"
                />
              ) : (
                <span
                  aria-hidden
                  className="grid h-10 w-10 place-items-center rounded-full bg-fg font-display text-sm font-semibold text-bg ring-1 ring-line"
                >
                  ES
                </span>
              )}
              <span className="inline-flex items-center gap-2 text-sm text-muted">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Leading AI engineering at {profile.currentCompany}
              </span>
            </div>

            <h1
              aria-label={profile.name}
              className="mt-8 text-[clamp(3.25rem,10vw,8rem)] font-semibold leading-[0.9] tracking-[-0.05em]"
            >
              <span aria-hidden className="block">
                {firstName.slice(0, firstTyped)}
                {typed < firstName.length && cursor}
                <span className="invisible">{firstName.slice(firstTyped)}</span>
              </span>
              <span aria-hidden className="block">
                {lastName.slice(0, lastTyped)}
                {typed >= firstName.length && !done && cursor}
                <span className="invisible">{lastName.slice(lastTyped)}</span>
                <span className={`text-accent ${done ? "" : "invisible"}`}>.</span>
                {done && cursor}
              </span>
            </h1>

            <p
              className="mt-8 font-mono text-base text-muted md:text-lg animate-[fadeUp_800ms_120ms_both]"
              aria-label={`Building ${roles.join(", ")}`}
            >
              <span aria-hidden>
                <span className="text-accent">&gt;</span> building <span className="text-fg">{role}</span>
                <span className="blink ml-0.5 inline-block h-[1.1em] w-[0.55ch] translate-y-[0.2em] bg-fg/70 motion-reduce:hidden" />
              </span>
            </p>

            <p className="mt-6 max-w-xl text-xl leading-relaxed text-muted text-pretty animate-[fadeUp_800ms_200ms_both]">
              <span className="text-fg">{profile.title}.</span> {profile.tagline}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3 animate-[fadeUp_800ms_280ms_both]">
              <a
                href="#experience"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-fg px-6 font-medium text-bg transition-transform duration-200 ease-out hover:-translate-y-0.5"
              >
                See my work
                <FiArrowDownRight size={18} aria-hidden />
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-line bg-bg/60 px-6 font-medium backdrop-blur transition-colors duration-200 hover:border-fg"
              >
                Get in touch
              </a>
              <a
                href={profile.social.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[48px] items-center gap-1.5 px-3 font-medium text-muted transition-colors hover:text-fg"
              >
                GitHub
                <FiArrowUpRight size={16} aria-hidden />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 animate-[fadeUp_900ms_200ms_both]">
            <HeroScene />
          </div>
        </div>

        <dl className="mt-16 grid border-t border-line md:mt-20 md:grid-cols-3">
          {meta.map((m, i) => (
            <div key={m.label} className={`border-b border-line py-5 md:border-b-0 ${i > 0 ? "md:border-l md:pl-6" : ""}`}>
              <dt className="label">{m.label}</dt>
              <dd className="mt-2 text-fg">{m.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
