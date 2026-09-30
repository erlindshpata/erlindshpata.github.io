import { useCallback, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

// The theme lives on <html data-theme>, set before paint by the inline script
// in index.html. Every consumer subscribes to that attribute, so all toggles
// stay in sync, and prerendering falls back to "dark".
function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

const getSnapshot = () => (document.documentElement.dataset.theme as Theme) || "dark";
const getServerSnapshot = (): Theme => "dark";

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((m) => m.setAttribute("content", next === "dark" ? "#13120F" : "#F3EFE6"));
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable */
    }
  }, []);

  return { theme, toggle };
}
