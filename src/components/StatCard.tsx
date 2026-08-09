import type { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: string | number;
  icon: LucideIcon;
  tone?: "default" | "urgent" | "success";
}

export function StatCard({ label, value, icon: Icon, tone = "default" }: Props) {
  const toneClasses =
    tone === "urgent"
      ? "text-[var(--color-urgent)] bg-[var(--color-urgent-soft)]"
      : tone === "success"
      ? "text-[var(--color-success)] bg-[var(--color-success-soft)]"
      : "text-[var(--color-accent)] bg-[var(--color-accent-soft)]";

  return (
    <div className="fade-up flex items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${toneClasses}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="font-display font-mono text-2xl font-semibold text-[var(--color-text)]">{value}</p>
        <p className="text-xs text-[var(--color-text-muted)]">{label}</p>
      </div>
    </div>
  );
}
