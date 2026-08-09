import { useMemo, useState } from "react";
import { Sparkles, Plus, X, TrendingUp } from "lucide-react";
import { activeOpportunities } from "../data/opportunities";
import { OpportunityCard } from "../components/OpportunityCard";
import { useAppData } from "../context/AppDataContext";
import { useModal } from "../context/ModalContext";
import { rankOpportunities, skillGapSuggestions } from "../utils/recommend";
import type { OppType } from "../types";

const interestOptions = ["Web Development", "AI/ML", "Cybersecurity", "Data Science", "Design", "Business"];
const typeOptions: { key: OppType; label: string }[] = [
  { key: "job", label: "Jobs" },
  { key: "internship", label: "Internships" },
  { key: "hackathon", label: "Hackathons" },
];

export default function Recommendations() {
  const { profile, setProfile, profileCompletion } = useAppData();
  const { open } = useModal();
  const [showForm, setShowForm] = useState(profileCompletion < 40);
  const [skillInput, setSkillInput] = useState("");

  const ranked = useMemo(() => rankOpportunities(activeOpportunities, profile), [profile]);
  const top = ranked.slice(0, 9);
  const gaps = useMemo(() => skillGapSuggestions(activeOpportunities, profile), [profile]);

  const topInterest = profile.interests[0];
  const trendingInDomain = useMemo(() => {
    if (!topInterest) return [];
    return activeOpportunities
      .filter((o) => o.skills.some((s) => s.toLowerCase() === topInterest.toLowerCase()) || o.description.toLowerCase().includes(topInterest.toLowerCase()))
      .slice(0, 4);
  }, [topInterest]);

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !profile.skills.includes(s)) {
      setProfile({ ...profile, skills: [...profile.skills, s] });
    }
    setSkillInput("");
  };

  const toggleInterest = (interest: string) => {
    setProfile({
      ...profile,
      interests: profile.interests.includes(interest)
        ? profile.interests.filter((i) => i !== interest)
        : [...profile.interests, interest],
    });
  };

  const toggleType = (t: OppType) => {
    setProfile({
      ...profile,
      preferredTypes: profile.preferredTypes.includes(t)
        ? profile.preferredTypes.filter((x) => x !== t)
        : [...profile.preferredTypes, t],
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-[var(--color-text)]">Recommended For You</h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">Opportunities matched to your skills, interests, and goals.</p>
      </div>

      {showForm ? (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <h2 className="font-display text-base font-semibold text-[var(--color-text)]">Tell us what you're looking for</h2>
          <div className="mt-4 space-y-4">
            <div>
              <p className="mb-1.5 text-xs text-[var(--color-text-muted)]">Year</p>
              <select
                value={profile.year}
                onChange={(e) => setProfile({ ...profile, year: e.target.value as typeof profile.year })}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2 text-sm text-[var(--color-text)] outline-none"
              >
                {["First Year", "Second Year", "Third Year", "Final Year", "Graduate"].map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div>
              <p className="mb-1.5 text-xs text-[var(--color-text-muted)]">Skills</p>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {profile.skills.map((s) => (
                  <span key={s} className="flex items-center gap-1 rounded-full bg-[var(--color-accent-soft)] px-2.5 py-1 text-xs text-[var(--color-accent)]">
                    {s}
                    <button onClick={() => setProfile({ ...profile, skills: profile.skills.filter((x) => x !== s) })}><X size={11} /></button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSkill()}
                  placeholder="Add a skill (e.g. Python)"
                  className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] outline-none"
                />
                <button onClick={addSkill} className="rounded-lg bg-[var(--color-accent)] px-3 py-2 text-white"><Plus size={15} /></button>
              </div>
            </div>
            <div>
              <p className="mb-1.5 text-xs text-[var(--color-text-muted)]">Interests</p>
              <div className="flex flex-wrap gap-1.5">
                {interestOptions.map((i) => (
                  <button
                    key={i}
                    onClick={() => toggleInterest(i)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      profile.interests.includes(i) ? "border-[var(--color-accent)]/50 bg-[var(--color-accent-soft)] text-[var(--color-accent)]" : "border-[var(--color-border)] text-[var(--color-text-muted)]"
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-1.5 text-xs text-[var(--color-text-muted)]">Opportunity preference</p>
              <div className="flex gap-1.5">
                {typeOptions.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => toggleType(t.key)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      profile.preferredTypes.includes(t.key) ? "border-[var(--color-accent)]/50 bg-[var(--color-accent-soft)] text-[var(--color-accent)]" : "border-[var(--color-border)] text-[var(--color-text-muted)]"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={() => setShowForm(false)} className="w-full rounded-xl bg-[var(--color-accent)] py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-accent)]/85">
              Generate Recommendations
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowForm(true)} className="text-xs text-[var(--color-accent)] hover:underline">
          Edit preferences
        </button>
      )}

      {gaps.length > 0 && (
        <div className="flex items-start gap-3 rounded-2xl border border-[var(--color-amber)]/30 bg-[var(--color-amber)]/5 p-4">
          <Sparkles size={18} className="mt-0.5 shrink-0 text-[var(--color-amber)]" />
          <div>
            <p className="font-display text-sm font-semibold text-[var(--color-text)]">Improve Your Match Score</p>
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
              Adding <span className="font-semibold text-[var(--color-text)]">{gaps.join(", ")}</span> could unlock more opportunities matched to you.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-2 rounded-lg border border-[var(--color-amber)]/30 px-3 py-1.5 text-xs font-medium text-[var(--color-amber)] hover:bg-[var(--color-amber)]/10"
            >
              Add Skills
            </button>
          </div>
        </div>
      )}

      <section>
        <h2 className="mb-3 font-display text-lg font-semibold text-[var(--color-text)]">Top Matches</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {top.map(({ opp, score, reason }) => (
            <OpportunityCard key={opp.id} opp={opp} onOpen={open} score={score} reason={reason} />
          ))}
        </div>
      </section>

      {trendingInDomain.length > 0 && (
        <section>
          <div className="mb-3 flex items-center gap-2">
            <TrendingUp size={16} className="text-[var(--color-accent)]" />
            <h2 className="font-display text-lg font-semibold text-[var(--color-text)]">Trending in {topInterest}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trendingInDomain.map((o) => (
              <OpportunityCard key={o.id} opp={o} onOpen={open} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
