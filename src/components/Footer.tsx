import { profile } from "../data/profile";

export function Footer() {
  return (
    <footer className="border-t border-line px-4 py-8 sm:px-6 md:px-10 lg:px-14">
      <div className="flex flex-col gap-2 font-mono text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <a href="#top" className="link-underline self-start hover:text-fg sm:self-auto">
          back to top ↑
        </a>
      </div>
    </footer>
  );
}
