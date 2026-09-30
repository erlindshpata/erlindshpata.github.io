import { useEffect, useState } from "react";

/** Current time in the given IANA zone, refreshed every 30s. Renders a placeholder until mounted. */
export function useLocalTime(timeZone: string) {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
    setTime(format());
    const id = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return time;
}
