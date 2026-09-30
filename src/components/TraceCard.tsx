import { useEffect, useState } from "react";
import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";

/*
 * An illustrative observability trace of one grounded RAG request, drawn as a
 * latency waterfall. A single real-time clock `t` drives everything: the query
 * types in, spans grow along the trace timeline (some in parallel), the
 * answer streams with citation markers, then the sources land.
 */

const QUERY = "What are the key risk factors in Apple's latest 10-K?";

type Span = { name: string; start: number; dur: number; depth: number };
const TRACE_TOTAL = 1800; // trace-time ms
const SPANS: Span[] = [
  { name: "route.intent", start: 0, dur: 120, depth: 0 },
  { name: "retrieve.filings", start: 120, dur: 260, depth: 1 },
  { name: "mcp.market_data", start: 120, dur: 190, depth: 1 },
  { name: "llm.generate", start: 400, dur: 1400, depth: 0 },
  { name: "ground.citations", start: 560, dur: 1240, depth: 1 },
];

type Piece = { text: string } | { cite: number };
const ANSWER: Piece[] = [
  { text: "Apple flags supply-chain concentration in Asia" },
  { cite: 1 },
  { text: ", regulatory pressure on the App Store" },
  { cite: 2 },
  { text: " and foreign-exchange exposure." },
  { cite: 3 },
];
const UNITS: Piece[] = ANSWER.flatMap((p): Piece[] =>
  "cite" in p ? [p] : p.text.split(/(?<=\s)/).map((w) => ({ text: w })),
);
const SOURCES = ["Item 1A · Risk Factors", "Item 1A · Legal & Regulatory", "Item 7A · Market Risk"];

// Real-time schedule (ms)
const TYPE_START = 300;
const TYPE_SPEED = 32;
const TRACE_START = TYPE_START + QUERY.length * TYPE_SPEED + 250;
const SCALE = 2; // 1 trace-ms = 2 real-ms
const TRACE_END = TRACE_START + TRACE_TOTAL * SCALE;
const STREAM_START = TRACE_START + 400 * SCALE;
const WORD_SPEED = (TRACE_END - STREAM_START) / UNITS.length;
const LOOP = TRACE_END + 5200;

const fmt = (ms: number) => (ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${Math.round(ms)}ms`);

export function TraceCard() {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: "0px" });
  const [t, setT] = useState(reduced ? LOOP - 1 : 0);

  useEffect(() => {
    if (reduced) {
      setT(LOOP - 1);
      return;
    }
    if (!inView) return;
    const id = setInterval(() => setT((v) => (v + 40) % LOOP), 40);
    return () => clearInterval(id);
  }, [inView, reduced]);

  const typed = Math.max(0, Math.min(QUERY.length, Math.floor((t - TYPE_START) / TYPE_SPEED)));
  const typing = typed < QUERY.length;
  const traceNow = Math.max(0, Math.min(TRACE_TOTAL, (t - TRACE_START) / SCALE));
  const running = t >= TRACE_START && t < TRACE_END;
  const done = t >= TRACE_END;
  const streamed = Math.max(0, Math.min(UNITS.length, Math.floor((t - STREAM_START) / WORD_SPEED)));
  const fading = t > LOOP - 500;

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Illustration: an observability trace of a question about a 10-K filing, showing routing, retrieval, a market-data tool call and generation, with a cited answer."
      className={`tile flex h-full flex-col overflow-hidden transition-opacity duration-500 ${fading ? "opacity-50" : ""}`}
    >
      <div aria-hidden className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
        <span className="font-mono text-xs text-subtle">
          trace <span className="text-muted">#7f3a·c21e</span>
        </span>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] ${
            done ? "bg-info/10 text-info" : running ? "bg-accent/10 text-accent" : "bg-fg/5 text-subtle"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full bg-current ${running ? "blink" : ""}`} />
          {done ? `ok · ${fmt(TRACE_TOTAL)}` : running ? `running · ${fmt(traceNow)}` : "idle"}
        </span>
      </div>

      <div aria-hidden className="flex flex-1 flex-col gap-5 p-5">
        <p className="font-serif text-[1.35rem] italic leading-snug text-fg">
          “{QUERY.slice(0, typed)}
          {typing ? <span className="blink ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.1em] bg-accent" /> : "”"}
        </p>

        {/* waterfall */}
        <div>
          <div className="mb-2 grid grid-cols-[128px_1fr] gap-2 font-mono text-[10px] text-subtle sm:grid-cols-[150px_1fr] sm:gap-3">
            <span>span</span>
            <span className="flex justify-between">
              <span>0ms</span>
              <span>{fmt(TRACE_TOTAL / 2)}</span>
              <span>{fmt(TRACE_TOTAL)}</span>
            </span>
          </div>
          <ul className="space-y-1.5">
            {SPANS.map((s) => {
              const progress = Math.max(0, Math.min(1, (traceNow - s.start) / s.dur));
              const started = traceNow > s.start || done;
              const isGen = s.name.startsWith("llm");
              return (
                <li key={s.name} className="grid grid-cols-[128px_1fr] items-center gap-2 sm:grid-cols-[150px_1fr] sm:gap-3">
                  <span
                    className={`truncate font-mono text-[10.5px] transition-colors sm:text-[11px] ${started ? "text-muted" : "text-subtle/50"}`}
                    style={{ paddingLeft: s.depth * 10 }}
                  >
                    {s.depth > 0 && <span className="text-subtle/60">└ </span>}
                    {s.name}
                  </span>
                  <span className="relative h-[18px] rounded bg-fg/[0.04]">
                    <span
                      className={`absolute inset-y-0 origin-left rounded ${isGen ? "bg-accent" : "bg-info/75"}`}
                      style={{
                        left: `${(s.start / TRACE_TOTAL) * 100}%`,
                        width: `${(s.dur / TRACE_TOTAL) * 100}%`,
                        transform: `scaleX(${progress})`,
                      }}
                    />
                    {progress >= 1 && (
                      <span
                        className="absolute inset-y-0 flex items-center"
                        style={
                          s.start + s.dur > TRACE_TOTAL * 0.7
                            ? { right: `calc(${100 - ((s.start + s.dur) / TRACE_TOTAL) * 100}% + 6px)` }
                            : { left: `calc(${((s.start + s.dur) / TRACE_TOTAL) * 100}% + 6px)` }
                        }
                      >
                        <span
                          className={`line-in font-mono text-[10px] ${
                            s.start + s.dur > TRACE_TOTAL * 0.7 ? "font-medium text-bg" : "text-muted"
                          }`}
                        >
                          {fmt(s.dur)}
                        </span>
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* streamed answer */}
        <div className="min-h-[84px] rounded-xl border border-dashed border-line p-4 text-[14px] leading-7 text-fg">
          {streamed === 0 && <span className="font-mono text-xs text-subtle">awaiting first token…</span>}
          {UNITS.slice(0, streamed).map((u, i) =>
            "cite" in u ? (
              <sup
                key={i}
                className="mx-0.5 inline-grid h-[18px] min-w-[18px] -translate-y-0.5 place-items-center rounded bg-info/15 px-1 font-mono text-[10px] font-medium text-info"
              >
                {u.cite}
              </sup>
            ) : (
              <span key={i}>{u.text}</span>
            ),
          )}
          {streamed > 0 && streamed < UNITS.length && (
            <span className="blink ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-accent" />
          )}
        </div>

        <ul className="mt-auto flex min-h-[26px] flex-wrap gap-x-4 gap-y-1.5">
          {done &&
            SOURCES.map((s, i) => (
              <li
                key={s}
                className="line-in flex items-center gap-1.5 font-mono text-[11px] text-muted"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <span className="text-info">[{i + 1}]</span> 10-K · {s}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
