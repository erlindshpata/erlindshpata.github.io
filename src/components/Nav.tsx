import { useEffect, useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { useTheme } from "../hooks/useTheme";

const links = [
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#approach", label: "Approach" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-4">
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-3 py-2 transition-colors duration-300 sm:px-4 ${
          scrolled || open ? "border-line bg-bg/80 shadow-sm backdrop-blur-md" : "border-transparent bg-transparent"
        }`}
      >
        <a href="#top" className="flex min-h-[44px] items-center gap-2 rounded-full px-2 font-mono text-sm font-medium">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-fg text-[11px] font-bold text-bg">es</span>
          <span>
            erlind<span className="text-accent">.</span>shpata
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={active === l.href ? "true" : undefined}
                className={`rounded-full px-3 py-2 text-sm transition-colors duration-200 hover:text-fg ${
                  active === l.href ? "bg-fg/[0.06] text-fg" : "text-muted"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-full text-muted transition-colors duration-200 hover:bg-fg/[0.06] hover:text-fg"
          >
            {theme === "dark" ? <FiSun size={18} aria-hidden /> : <FiMoon size={18} aria-hidden />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:text-fg md:hidden"
          >
            {open ? <FiX size={20} aria-hidden /> : <FiMenu size={20} aria-hidden />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="mx-auto mt-2 max-w-6xl rounded-3xl border border-line bg-bg/95 p-2 shadow-lg backdrop-blur-md animate-[fadeUp_250ms_both] md:hidden"
        >
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[48px] items-center rounded-2xl px-4 text-base text-muted transition-colors hover:bg-fg/[0.05] hover:text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
