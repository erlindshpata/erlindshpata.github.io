import { useEffect, useRef, useState } from "react";

/** Tracks whether the element is on screen. With `once`, stays true after the first hit. */
export function useInView<T extends Element>(options: { once?: boolean; rootMargin?: string } = {}) {
  const { once = false, rootMargin = "0px 0px -10% 0px" } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) io.disconnect();
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, rootMargin]);

  return { ref, inView };
}
