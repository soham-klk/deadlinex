import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { getCountdown } from "../utils/countdown";

export function CountdownBadge({ deadline, size = "md" }: { deadline: string; size?: "sm" | "md" }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(id);
  }, []);

  const c = getCountdown(deadline);
  void tick;

  const base = size === "sm" ? "text-[11px] px-2 py-0.5" : "text-xs px-2.5 py-1";

  if (c.expired) {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-dim)] font-mono ${base}`}>
        Expired
      </span>
    );
  }

  const colorClasses = c.urgent
    ? "border-[var(--color-urgent)]/40 bg-[var(--color-urgent-soft)] text-[var(--color-urgent)]"
    : c.soon
    ? "border-[var(--color-amber)]/30 bg-[var(--color-amber)]/10 text-[var(--color-amber)]"
    : "border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-muted)]";

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-mono font-medium ${colorClasses} ${base}`}>
      {c.urgent ? (
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-urgent)] pulse-dot" />
      ) : (
        <Clock size={size === "sm" ? 11 : 12} />
      )}
      {c.text}
    </span>
  );
}
