import { profile } from "../data/profile";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-x flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <p className="font-mono text-xs">
          built with React + Tailwind · <a href="#top" className="link-underline hover:text-fg">back to top ↑</a>
        </p>
      </div>
    </footer>
  );
}
