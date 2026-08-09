import { X, MapPin, Users, Bookmark, ArrowUpRight, Sparkles } from "lucide-react";
import { useModal } from "../context/ModalContext";
import { useAppData } from "../context/AppDataContext";
import { useToast } from "../context/ToastContext";
import { CountdownBadge } from "./CountdownBadge";
import { formatDate } from "../utils/countdown";
import type { Job, Internship, Hackathon } from "../types";

export function OpportunityDetailModal() {
  const { active, close } = useModal();
  const { save, unsave, markApplied, isSaved, isApplied, profile } = useAppData();
  const { showToast } = useToast();

  if (!active) return null;
  const opp = active;
  const saved = isSaved(opp.id);
  const applied = isApplied(opp.id);
  const matchedSkills = opp.skills.filter((s) => profile.skills.map((p) => p.toLowerCase()).includes(s.toLowerCase()));

  const typeSpecific = () => {
    if (opp.type === "job") {
      const j = opp as Job;
      return [
        { label: "Salary", value: j.salary },
        { label: "Experience", value: j.experience },
        { label: "Job Type", value: j.jobType },
      ];
    }
    if (opp.type === "internship") {
      const i = opp as Internship;
      return [
        { label: "Stipend", value: i.stipend },
        { label: "Duration", value: i.duration },
        { label: "Mode", value: i.mode },
      ];
    }
    const h = opp as Hackathon;
    return [
      { label: "Prize Pool", value: h.prizePool },
      { label: "Team Size", value: h.teamSize },
      { label: "Mode", value: h.mode },
    ];
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
      onClick={close}
    >
      <div
        className="fade-up w-full sm:max-w-lg max-h-[88vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] font-display text-base font-semibold">
              {opp.orgInitial}
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-lg font-semibold text-[var(--color-text)] truncate">{opp.title}</h2>
              <p className="text-sm text-[var(--color-text-muted)] truncate">{opp.org}</p>
            </div>
          </div>
          <button onClick={close} aria-label="Close" className="shrink-0 rounded-lg p-2 text-[var(--color-text-dim)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text)]">
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <CountdownBadge deadline={opp.deadline} />
          <span className="text-xs text-[var(--color-text-dim)]">Closes {formatDate(opp.deadline)}</span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)]">{opp.description}</p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {typeSpecific().map((f) => (
            <div key={f.label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] p-3">
              <p className="text-[10px] uppercase tracking-wide text-[var(--color-text-dim)]">{f.label}</p>
              <p className="mt-1 text-xs font-medium text-[var(--color-text)] font-mono">{f.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
          <span className="inline-flex items-center gap-1"><MapPin size={13} />{opp.remote ? "Remote" : opp.location}</span>
          <span className="inline-flex items-center gap-1"><Users size={13} />{opp.eligibility}</span>
        </div>

        <div className="mt-4">
          <p className="text-xs font-medium text-[var(--color-text-muted)] mb-2">Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {opp.skills.map((s) => {
              const matched = matchedSkills.includes(s);
              return (
                <span
                  key={s}
                  className={`rounded-md px-2 py-1 text-[11px] ${matched ? "bg-[var(--color-success-soft)] text-[var(--color-success)]" : "bg-[var(--color-surface-2)] text-[var(--color-text-muted)]"}`}
                >
                  {s}
                </span>
              );
            })}
          </div>
        </div>

        {matchedSkills.length > 0 && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)] p-3">
            <Sparkles size={15} className="mt-0.5 shrink-0 text-[var(--color-accent)]" />
            <p className="text-xs text-[var(--color-text)]">
              <span className="font-semibold">Why this opportunity?</span> Matches your {matchedSkills.join(", ")} skill{matchedSkills.length > 1 ? "s" : ""}.
            </p>
          </div>
        )}

        <div className="mt-6 flex items-center gap-2">
          <button
            onClick={() => {
              if (saved) {
                unsave(opp);
                showToast("Removed from saved.");
              } else {
                save(opp);
                showToast("Opportunity saved.");
              }
            }}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
              saved
                ? "border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            <Bookmark size={15} fill={saved ? "currentColor" : "none"} />
            {saved ? "Saved" : "Save Opportunity"}
          </button>
          <button
            onClick={() => {
              markApplied(opp);
              showToast("Application tracked.");
            }}
            disabled={Boolean(applied)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
              applied
                ? "bg-[var(--color-success-soft)] text-[var(--color-success)] cursor-default"
                : "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent)]/85"
            }`}
          >
            {applied ? "Applied" : opp.type === "hackathon" ? "Register Now" : "Apply Now"}
            {!applied && <ArrowUpRight size={15} />}
          </button>
        </div>
      </div>
    </div>
  );
}
