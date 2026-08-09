import { Bookmark, MapPin, Users, IndianRupee, ArrowUpRight } from "lucide-react";
import type { Opportunity, Job, Internship, Hackathon } from "../types";
import { CountdownBadge } from "./CountdownBadge";
import { useAppData } from "../context/AppDataContext";
import { useToast } from "../context/ToastContext";

const typeColors: Record<string, string> = {
  job: "text-[var(--color-cyan)] bg-[var(--color-cyan-soft)] border-[var(--color-cyan)]/30",
  internship: "text-[var(--color-accent)] bg-[var(--color-accent-soft)] border-[var(--color-accent)]/30",
  hackathon: "text-[var(--color-amber)] bg-[var(--color-amber)]/10 border-[var(--color-amber)]/30",
};

interface Props {
  opp: Opportunity;
  onOpen?: (opp: Opportunity) => void;
  score?: number;
  reason?: string;
}

export function OpportunityCard({ opp, onOpen, score, reason }: Props) {
  const { save, unsave, markApplied, isSaved, isApplied } = useAppData();
  const { showToast } = useToast();
  const saved = isSaved(opp.id);
  const applied = isApplied(opp.id);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      unsave(opp);
      showToast("Removed from saved.");
    } else {
      save(opp);
      showToast("Opportunity saved.");
    }
  };

  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    markApplied(opp);
    showToast("Application tracked.");
  };

  const subline = () => {
    if (opp.type === "job") {
      const j = opp as Job;
      return (
        <>
          <span className="inline-flex items-center gap-1"><IndianRupee size={12} />{j.salary}</span>
          <span className="text-[var(--color-border)]">•</span>
          <span>{j.experience}</span>
        </>
      );
    }
    if (opp.type === "internship") {
      const i = opp as Internship;
      return (
        <>
          <span className="inline-flex items-center gap-1"><IndianRupee size={12} />{i.stipend}</span>
          <span className="text-[var(--color-border)]">•</span>
          <span>{i.duration}</span>
        </>
      );
    }
    const h = opp as Hackathon;
    return (
      <>
        <span>{h.prizePool}</span>
        <span className="text-[var(--color-border)]">•</span>
        <span className="inline-flex items-center gap-1"><Users size={12} />{h.teamSize}</span>
      </>
    );
  };

  return (
    <div
      onClick={() => onOpen?.(opp)}
      className="group relative flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-all hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-surface-2)] cursor-pointer"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] font-display text-sm font-semibold text-[var(--color-text)]">
            {opp.orgInitial}
          </div>
          <div className="min-w-0">
            <h3 className="truncate font-display text-[15px] font-semibold text-[var(--color-text)]">{opp.title}</h3>
            <p className="truncate text-xs text-[var(--color-text-muted)]">{opp.org}</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          aria-label={saved ? "Remove from saved" : "Save opportunity"}
          className={`shrink-0 rounded-lg p-2 transition-colors ${saved ? "text-[var(--color-accent)] bg-[var(--color-accent-soft)]" : "text-[var(--color-text-dim)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)]"}`}
        >
          <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${typeColors[opp.type]}`}>
          {opp.type}
        </span>
        {opp.type === "hackathon" && (opp as Hackathon).soloFriendly && (
          <span className="rounded-full border border-[var(--color-success)]/30 bg-[var(--color-success-soft)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-success)]">
            SOLO FRIENDLY
          </span>
        )}
        {opp.type === "hackathon" && (opp as Hackathon).beginnerFriendly && (
          <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-text-muted)]">
            BEGINNER FRIENDLY
          </span>
        )}
        {typeof score === "number" && (
          <span className="ml-auto rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] px-2 py-0.5 text-[10px] font-mono font-semibold text-[var(--color-accent)]">
            {score}% match
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-1">
        {opp.skills.slice(0, 3).map((s) => (
          <span key={s} className="rounded-md bg-[var(--color-surface-2)] px-2 py-0.5 text-[10px] text-[var(--color-text-muted)]">
            {s}
          </span>
        ))}
      </div>

      {reason && <p className="text-[11px] text-[var(--color-text-dim)] italic">{reason}</p>}

      <div className="flex items-center gap-2 text-[11px] text-[var(--color-text-muted)] font-mono">
        {subline()}
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 pt-1">
        <div className="flex items-center gap-2 text-[11px] text-[var(--color-text-muted)]">
          <MapPin size={12} />
          <span className="truncate max-w-[110px]">{opp.remote ? "Remote" : opp.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <CountdownBadge deadline={opp.deadline} size="sm" />
          <button
            onClick={handleApply}
            disabled={applied}
            className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-colors ${
              applied
                ? "bg-[var(--color-success-soft)] text-[var(--color-success)] cursor-default"
                : "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent)]/85"
            }`}
          >
            {applied ? "Applied" : opp.type === "hackathon" ? "Register" : "Apply"}
            {!applied && <ArrowUpRight size={12} />}
          </button>
        </div>
      </div>
    </div>
  );
}
