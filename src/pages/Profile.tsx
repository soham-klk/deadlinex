import { useState } from "react";
import { Plus, X, Upload, LogOut, Code2, Link2, Globe, CheckCircle2, Bookmark } from "lucide-react";
import { useAppData } from "../context/AppDataContext";
import { useToast } from "../context/ToastContext";
import type { OppType } from "../types";

const interestOptions = ["Web Development", "AI/ML", "Cybersecurity", "Data Science", "Design", "Business", "Marketing"];
const typeOptions: { key: OppType; label: string }[] = [
  { key: "job", label: "Jobs" },
  { key: "internship", label: "Internships" },
  { key: "hackathon", label: "Hackathons" },
];
const notifLabels: { key: keyof ReturnType<typeof defaultNotifs>; label: string }[] = [
  { key: "deadlineReminders", label: "Deadline reminders" },
  { key: "newRecommendations", label: "New recommendations" },
  { key: "savedUpdates", label: "Saved opportunity updates" },
  { key: "weeklyDigest", label: "Weekly opportunity digest" },
];
function defaultNotifs() {
  return { deadlineReminders: true, newRecommendations: true, savedUpdates: false, weeklyDigest: true };
}

export default function Profile() {
  const { profile, setProfile, tracked, profileCompletion } = useAppData();
  const { showToast } = useToast();
  const [draft, setDraft] = useState(profile);
  const [skillInput, setSkillInput] = useState("");

  const appliedCount = Object.values(tracked).filter((t) => t.status !== "saved").length;
  const savedCount = Object.keys(tracked).length;

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !draft.skills.includes(s)) setDraft({ ...draft, skills: [...draft.skills, s] });
    setSkillInput("");
  };

  const toggleInterest = (i: string) =>
    setDraft({ ...draft, interests: draft.interests.includes(i) ? draft.interests.filter((x) => x !== i) : [...draft.interests, i] });

  const toggleType = (t: OppType) =>
    setDraft({ ...draft, preferredTypes: draft.preferredTypes.includes(t) ? draft.preferredTypes.filter((x) => x !== t) : [...draft.preferredTypes, t] });

  const saveChanges = () => {
    setProfile(draft);
    showToast("Profile updated.");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-accent)]/20 font-display text-2xl font-semibold text-[var(--color-accent)]">
          {draft.name.charAt(0)}
        </div>
        <div>
          <h1 className="font-display text-xl font-semibold text-[var(--color-text)]">{draft.name}</h1>
          <p className="text-xs text-[var(--color-text-muted)]">{draft.year} · {draft.college}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="font-mono text-lg font-semibold text-[var(--color-accent)]">{profileCompletion}%</p>
          <p className="text-[10px] text-[var(--color-text-dim)]">Profile complete</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
          <CheckCircle2 size={18} className="text-[var(--color-success)]" />
          <div><p className="font-mono text-lg font-semibold text-[var(--color-text)]">{appliedCount}</p><p className="text-[10px] text-[var(--color-text-dim)]">Applied</p></div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
          <Bookmark size={18} className="text-[var(--color-accent)]" />
          <div><p className="font-mono text-lg font-semibold text-[var(--color-text)]">{savedCount}</p><p className="text-[10px] text-[var(--color-text-dim)]">Saved</p></div>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs text-[var(--color-text-muted)]">Name</label>
            <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2 text-sm text-[var(--color-text)] outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-[var(--color-text-muted)]">College</label>
            <input value={draft.college === "Not set" ? "" : draft.college} onChange={(e) => setDraft({ ...draft, college: e.target.value })} placeholder="Your college name" className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-[var(--color-text-muted)]">Year</label>
            <select value={draft.year} onChange={(e) => setDraft({ ...draft, year: e.target.value as typeof draft.year })} className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2 text-sm text-[var(--color-text)] outline-none">
              {["First Year", "Second Year", "Third Year", "Final Year", "Graduate"].map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-[var(--color-text-muted)]">GitHub</label>
            <div className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2">
              <Code2 size={14} className="text-[var(--color-text-dim)]" />
              <input value={draft.github} onChange={(e) => setDraft({ ...draft, github: e.target.value })} placeholder="github.com/you" className="w-full bg-transparent text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] outline-none" />
            </div>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs text-[var(--color-text-muted)]">Bio</label>
          <textarea value={draft.bio} onChange={(e) => setDraft({ ...draft, bio: e.target.value })} rows={2} className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2 text-sm text-[var(--color-text)] outline-none resize-none" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs text-[var(--color-text-muted)]">LinkedIn</label>
            <div className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2">
              <Link2 size={14} className="text-[var(--color-text-dim)]" />
              <input value={draft.linkedin} onChange={(e) => setDraft({ ...draft, linkedin: e.target.value })} placeholder="linkedin.com/in/you" className="w-full bg-transparent text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] outline-none" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs text-[var(--color-text-muted)]">Portfolio</label>
            <div className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2">
              <Globe size={14} className="text-[var(--color-text-dim)]" />
              <input value={draft.portfolio} onChange={(e) => setDraft({ ...draft, portfolio: e.target.value })} placeholder="yourportfolio.com" className="w-full bg-transparent text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] outline-none" />
            </div>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-[var(--color-text-muted)]">Skills</label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {draft.skills.map((s) => (
              <span key={s} className="flex items-center gap-1 rounded-full bg-[var(--color-accent-soft)] px-2.5 py-1 text-xs text-[var(--color-accent)]">
                {s}
                <button onClick={() => setDraft({ ...draft, skills: draft.skills.filter((x) => x !== s) })}><X size={11} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addSkill()} placeholder="Add a skill" className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] outline-none" />
            <button onClick={addSkill} className="rounded-lg bg-[var(--color-accent)] px-3 py-2 text-white"><Plus size={15} /></button>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-[var(--color-text-muted)]">Interests</label>
          <div className="flex flex-wrap gap-1.5">
            {interestOptions.map((i) => (
              <button key={i} onClick={() => toggleInterest(i)} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${draft.interests.includes(i) ? "border-[var(--color-accent)]/50 bg-[var(--color-accent-soft)] text-[var(--color-accent)]" : "border-[var(--color-border)] text-[var(--color-text-muted)]"}`}>
                {i}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-[var(--color-text-muted)]">Opportunity preference</label>
          <div className="flex gap-1.5">
            {typeOptions.map((t) => (
              <button key={t.key} onClick={() => toggleType(t.key)} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${draft.preferredTypes.includes(t.key) ? "border-[var(--color-accent)]/50 bg-[var(--color-accent-soft)] text-[var(--color-accent)]" : "border-[var(--color-border)] text-[var(--color-text-muted)]"}`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2.5">
          <span className="text-xs text-[var(--color-text-muted)]">{draft.resumeLinked ? "resume.pdf attached" : "No resume uploaded"}</span>
          <button
            onClick={() => {
              setDraft({ ...draft, resumeLinked: true });
              showToast("Resume attached.");
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-text)] hover:bg-[var(--color-surface)]"
          >
            <Upload size={13} /> Upload Resume
          </button>
        </div>

        <div>
          <label className="mb-2 block text-xs text-[var(--color-text-muted)]">Notification preferences</label>
          <div className="space-y-2">
            {notifLabels.map((n) => (
              <div key={n.key} className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2">
                <span className="text-xs text-[var(--color-text)]">{n.label}</span>
                <button
                  onClick={() => setDraft({ ...draft, notifPrefs: { ...draft.notifPrefs, [n.key]: !draft.notifPrefs[n.key] } })}
                  className={`h-5 w-9 shrink-0 rounded-full p-0.5 transition-colors ${draft.notifPrefs[n.key] ? "bg-[var(--color-accent)]" : "bg-[var(--color-border)]"}`}
                >
                  <div className={`h-4 w-4 rounded-full bg-white transition-transform ${draft.notifPrefs[n.key] ? "translate-x-4" : "translate-x-0"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button onClick={saveChanges} className="flex-1 rounded-xl bg-[var(--color-accent)] py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-accent)]/85">
            Save Changes
          </button>
          <button
            onClick={() => showToast("Logged out (demo mode).")}
            className="flex items-center gap-1.5 rounded-xl border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)]"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}
