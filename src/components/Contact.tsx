import { useState } from "react";
import { FiArrowUpRight, FiCheck, FiCopy, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
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

  const channels = [
    { label: "LinkedIn", href: profile.social.linkedin, icon: FiLinkedin, handle: "in/erlind-shpata" },
    { label: "GitHub", href: profile.social.github, icon: FiGithub, handle: `@${profile.username}` },
  ];

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line py-24 md:py-32">
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="container-x relative">
        <Reveal>
          <p className="label">
            <span className="text-accent">06</span> / Contact
          </p>
          <h2 className="mt-4 max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-balance">
            Building something with LLMs? <span className="text-muted">Let's talk.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            I'm happy to talk about retrieval and grounding, fine-tuning domain models, or making AI features hold up in production.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-accent px-6 font-medium text-on-accent transition-transform duration-200 hover:-translate-y-0.5"
            >
              <FiMail size={18} aria-hidden />
              {profile.email}
            </a>
            <button
              type="button"
              onClick={copy}
              aria-label="Copy email address"
              className="inline-flex min-h-[52px] cursor-pointer items-center gap-2 rounded-full border border-line bg-bg/60 px-5 text-sm font-medium text-muted backdrop-blur transition-colors duration-200 hover:border-fg hover:text-fg"
            >
              {copied ? <FiCheck size={16} aria-hidden className="text-accent" /> : <FiCopy size={16} aria-hidden />}
              <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-h-[80px] cursor-pointer items-center gap-4 bg-bg p-6 transition-colors duration-200 hover:bg-surface"
                >
                  <c.icon size={22} aria-hidden className="text-muted group-hover:text-accent" />
                  <span>
                    <span className="block font-medium">{c.label}</span>
                    <span className="block font-mono text-sm text-muted">{c.handle}</span>
                  </span>
                  <FiArrowUpRight
                    size={18}
                    aria-hidden
                    className="ml-auto text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
