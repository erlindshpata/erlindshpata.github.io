import { useEffect, useState } from "react";
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail, FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { profile, sections } from "../data/profile";
import { useActiveSection } from "../hooks/useActiveSection";
import { useLocalTime } from "../hooks/useLocalTime";
import { useTheme } from "../hooks/useTheme";

const ids = sections.map((s) => s.id);

const socials = [
  { label: "GitHub", href: profile.social.github, icon: FiGithub },
  { label: "LinkedIn", href: profile.social.linkedin, icon: FiLinkedin },
  { label: "Email", href: `mailto:${profile.email}`, icon: FiMail },
];

function ThemeButton() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-fg hover:text-fg"
    >
      {theme === "dark" ? <FiSun size={17} aria-hidden /> : <FiMoon size={17} aria-hidden />}
    </button>
  );
}

function IndexNav({ active, onNavigate }: { active: string; onNavigate?: () => void }) {
  return (
    <ol className="space-y-1">
      {sections.map((s, i) => {
        const on = active === s.id;
        return (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              onClick={onNavigate}
              aria-current={on ? "true" : undefined}
              className="group flex min-h-[40px] items-center gap-4 py-1"
            >
              <span className={`font-mono text-xs transition-colors ${on ? "text-accent" : "text-subtle"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden
                className={`h-px bg-current transition-all duration-300 ease-out ${
                  on ? "w-14 text-fg" : "w-6 text-line group-hover:w-10 group-hover:text-muted"
                }`}
              />
              <span
                className={`text-sm transition-colors duration-200 ${on ? "text-fg" : "text-muted group-hover:text-fg"}`}
              >
                {s.label}
              </span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}

export function Sidebar() {
  const active = useActiveSection(ids);
  const time = useLocalTime(profile.timeZoneId);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Desktop: sticky dossier column */}
      <aside className="sticky top-0 hidden h-screen w-[340px] shrink-0 flex-col justify-between border-r border-line px-10 py-12 lg:flex xl:w-[380px]">
        <div className="animate-[fadeUp_700ms_both]">
          <a href="#top" className="inline-block">
            <p className="label">Portfolio · {new Date().getFullYear()}</p>
            <p className="mt-4 font-serif text-[3.4rem] leading-[0.95] tracking-[-0.01em]">
              Erlind
              <br />
              Shpata<span className="text-accent">.</span>
            </p>
          </a>
          <p className="mt-5 font-serif text-xl italic leading-snug text-muted">{profile.title}</p>
          <p className="mt-4 max-w-[260px] text-sm leading-relaxed text-muted">{profile.tagline}</p>

          <nav aria-label="Sections" className="mt-12">
            <IndexNav active={active} />
          </nav>
        </div>

        <div className="space-y-6">
          <p className="flex items-center gap-2.5 text-sm text-muted">
            <span className="relative grid h-2 w-2 place-items-center">
              <span className="pulse-ring absolute h-2 w-2 rounded-full bg-accent motion-reduce:hidden" />
              <span className="h-2 w-2 rounded-full bg-accent" />
            </span>
            {profile.location} · <span className="font-mono text-fg">{time}</span>
          </p>
          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-fg hover:text-fg"
              >
                <s.icon size={17} aria-hidden />
              </a>
            ))}
            <span className="mx-1 h-6 w-px bg-line" aria-hidden />
            <ThemeButton />
          </div>
        </div>
      </aside>

      {/* Mobile / tablet: compact top bar */}
      <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between px-4 py-2 sm:px-6">
          <a href="#top" className="flex min-h-[44px] items-center font-serif text-2xl">
            Erlind Shpata<span className="text-accent">.</span>
          </a>
          <div className="flex items-center gap-2">
            <ThemeButton />
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-index"
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line text-muted transition-colors hover:text-fg"
            >
              {open ? <FiX size={18} aria-hidden /> : <FiMenu size={18} aria-hidden />}
            </button>
          </div>
        </div>
        {open && (
          <nav id="mobile-index" aria-label="Sections" className="border-t border-line px-4 py-4 animate-[fadeUp_250ms_both] sm:px-6">
            <IndexNav active={active} onNavigate={() => setOpen(false)} />
            <div className="mt-4 flex gap-4 border-t border-line pt-4 text-sm">
              {socials.map((s) => (
                <a key={s.label} href={s.href} className="inline-flex min-h-[44px] items-center gap-1 text-muted hover:text-fg">
                  {s.label}
                  <FiArrowUpRight size={14} aria-hidden />
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
