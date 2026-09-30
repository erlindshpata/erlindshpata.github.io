import { useEffect, useState } from "react";
import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";

/*
 * An illustrative loop of a grounded RAG request: the query is typed, the
 * router/retrieval/tool steps log in, the answer streams word by word with
 * citation chips, then the sources land. Everything is derived from a single
 * clock `t` (ms), which only advances while the card is on screen.
 */

const QUERY = "Summarise the key risk factors in Apple's latest 10-K";

const LOGS = [
  { tag: "router", text: "intent → filings + market", at: 2900 },
  { tag: "search", text: "10-K · 8 passages · 142ms", at: 3500 },
  { tag: "mcp", text: "market_data.quote(AAPL)", at: 4100 },
  { tag: "stream", text: "sse · first token 380ms", at: 4700 },
];

type Piece = { text: string } | { cite: number };
const ANSWER: Piece[] = [
  { text: "Apple flags supply-chain concentration in Asia" },
  { cite: 1 },
  { text: ", regulatory pressure on the App Store" },
  { cite: 2 },
  { text: " and foreign-exchange exposure across its markets" },
  { cite: 3 },
  { text: "." },
];

const SOURCES = ["10-K · Item 1A · Risk Factors", "10-K · Item 1A · Legal & Regulatory", "10-K · Item 7A · Market Risk"];

const TYPE_START = 400;
const TYPE_SPEED = 42;
const STREAM_START = 5100;
const WORD_SPEED = 85;
const LOOP = 14000;

// Flatten the answer into streamable units (words and citation chips).
const UNITS: Piece[] = ANSWER.flatMap((p): Piece[] =>
  "cite" in p ? [p] : p.text.split(/(?<=\s)/).map((w) => ({ text: w })),
);
const STREAM_END = STREAM_START + UNITS.length * WORD_SPEED;
const SOURCES_AT = STREAM_END + 400;

export function HeroScene() {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: "0px" });
  const [t, setT] = useState(reduced ? LOOP - 1 : 0);

  useEffect(() => {
    if (reduced) {
      setT(LOOP - 1);
      return;
    }
    if (!inView) return;
    const id = setInterval(() => setT((v) => (v + 50) % LOOP), 50);
    return () => clearInterval(id);
  }, [inView, reduced]);

  const typed = Math.max(0, Math.min(QUERY.length, Math.floor((t - TYPE_START) / TYPE_SPEED)));
  const typing = typed < QUERY.length;
  const streamed = Math.max(0, Math.min(UNITS.length, Math.floor((t - STREAM_START) / WORD_SPEED)));
  const streaming = t >= STREAM_START && streamed < UNITS.length;
  const showSources = t >= SOURCES_AT;
  const fading = t > LOOP - 600;

  return (
    <div
      ref={ref}
      aria-label="Illustration: a question about a 10-K filing is routed, retrieved, and answered with inline citations."
      role="img"
      className="relative mx-auto w-full max-w-[460px]"
    >
      <div aria-hidden className="absolute -inset-6 rounded-[2rem] bg-accent/10 blur-3xl" />
      <div
        aria-hidden
        className={`relative overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_60px_-25px_rgb(0_0_0/0.35)] transition-opacity duration-500 ${
          fading ? "opacity-60" : "opacity-100"
        }`}
      >
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          <span className="ml-3 font-mono text-xs text-subtle">ren · assistant</span>
          <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[11px] text-subtle">
            <span className={`h-1.5 w-1.5 rounded-full ${streaming || typing ? "bg-accent" : "bg-subtle/60"}`} />
            {streaming ? "streaming" : typing ? "typing" : "ready"}
          </span>
        </div>

        <div className="space-y-4 p-4 font-mono text-[12.5px] leading-relaxed sm:p-5 sm:text-[13px]">
          {/* query */}
          <div className="rounded-xl bg-fg/[0.04] px-3.5 py-3">
            <span className="text-accent">❯ </span>
            <span className="text-fg">{QUERY.slice(0, typed)}</span>
            {typing && <span className="blink ml-0.5 inline-block h-[1.05em] w-[0.55ch] translate-y-[0.2em] bg-fg/70" />}
          </div>

          {/* pipeline log */}
          <ul className="min-h-[92px] space-y-1">
            {LOGS.map(
              (l) =>
                t >= l.at && (
                  <li key={l.tag} className="line-in flex gap-3 text-muted">
                    <span className="w-14 shrink-0 text-subtle">{l.tag}</span>
                    <span>
                      <span className="text-accent">✓</span> {l.text}
                    </span>
                  </li>
                ),
            )}
          </ul>

          {/* streamed answer */}
          <div className="min-h-[76px] border-t border-dashed border-line pt-4 font-sans text-[14px] leading-7 text-fg">
            {UNITS.slice(0, streamed).map((u, i) =>
              "cite" in u ? (
                <sup
                  key={i}
                  className="mx-0.5 inline-grid h-[18px] min-w-[18px] -translate-y-0.5 place-items-center rounded-md bg-info/15 px-1 font-mono text-[10px] font-medium text-info"
                >
                  {u.cite}
                </sup>
              ) : (
                <span key={i}>{u.text}</span>
              ),
            )}
            {streaming && <span className="blink ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-accent" />}
          </div>

          {/* sources */}
          <ul className="min-h-[78px] space-y-1.5">
            {showSources &&
              SOURCES.map((s, i) => (
                <li
                  key={s}
                  className="line-in flex items-center gap-2 text-[11.5px] text-muted"
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  <span className="grid h-[18px] min-w-[18px] place-items-center rounded-md bg-info/15 text-[10px] text-info">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
