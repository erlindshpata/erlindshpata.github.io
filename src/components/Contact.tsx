import { useState } from "react";
import { FiArrowUpRight, FiCheck, FiCopy } from "react-icons/fi";
import { profile } from "../data/profile";
import { Reveal } from "./Reveal";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const links = [
    { label: "LinkedIn", href: profile.social.linkedin },
    { label: "GitHub", href: profile.social.github },
  ];

  return (
    <section id="contact" className="border-t border-line px-4 py-20 sm:px-6 md:px-10 lg:px-14 lg:py-28">
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-accent">§ 06</span>
          <span className="h-px w-10 bg-line" aria-hidden />
          <span className="label">Contact</span>
        </div>
        <h2 className="mt-6 max-w-4xl font-serif text-[clamp(2.8rem,7vw,6rem)] leading-[0.95] tracking-[-0.015em] text-balance">
          Building something with LLMs? <em className="text-accent">Let's talk.</em>
        </h2>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-14 tile p-6 md:p-8">
          <p className="label">Write to</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="link-underline font-serif text-[clamp(1.6rem,4vw,2.75rem)] leading-tight transition-colors hover:text-accent"
            >
              {profile.email}
            </a>
            <button
              type="button"
              onClick={copy}
              aria-label="Copy email address"
              className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border border-line px-4 font-mono text-xs text-muted transition-colors duration-200 hover:border-fg hover:text-fg"
            >
              {copied ? <FiCheck size={14} aria-hidden className="text-accent" /> : <FiCopy size={14} aria-hidden />}
              <span aria-live="polite">{copied ? "copied" : "copy"}</span>
            </button>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-h-[48px] items-center gap-2 rounded-full border border-line px-5 text-[15px] transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                {l.label}
                <FiArrowUpRight
                  size={16}
                  aria-hidden
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
