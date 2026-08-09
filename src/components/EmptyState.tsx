import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, actionTo }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)]/50 px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-surface-2)] text-[var(--color-text-dim)]">
        <Icon size={22} />
      </div>
      <h3 className="font-display text-base font-semibold text-[var(--color-text)]">{title}</h3>
      <p className="max-w-sm text-sm text-[var(--color-text-muted)]">{description}</p>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="mt-2 rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--color-accent)]/85 transition-colors"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
