import { useMemo, useState } from "react";
import { SearchX, Users } from "lucide-react";
import { hackathons as allHackathons, isExpired } from "../data/opportunities";
import { OpportunityCard } from "../components/OpportunityCard";
import { FilterChip } from "../components/FilterChip";
import { EmptyState } from "../components/EmptyState";
import { useModal } from "../context/ModalContext";
import type { Hackathon } from "../types";

const modes: Hackathon["mode"][] = ["Online", "Offline", "Hybrid"];
const techs = ["AI/ML", "Cybersecurity", "Web Development", "Blockchain", "Open Innovation"];

export default function Hackathons() {
  const [soloOnly, setSoloOnly] = useState(false);
  const [mode, setMode] = useState<Hackathon["mode"] | "All">("All");
  const [tech, setTech] = useState<string | "All">("All");
  const [beginnerOnly, setBeginnerOnly] = useState(false);
  const [search, setSearch] = useState("");
  const { open } = useModal();

  const filtered = useMemo(() => {
    let list = allHackathons.filter((h) => !isExpired(h.deadline));
    if (soloOnly) list = list.filter((h) => h.soloFriendly);
    if (mode !== "All") list = list.filter((h) => h.mode === mode);
    if (tech !== "All") list = list.filter((h) => h.technology === tech);
    if (beginnerOnly) list = list.filter((h) => h.beginnerFriendly);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (h) => h.title.toLowerCase().includes(q) || h.org.toLowerCase().includes(q) || h.skills.some((s) => s.toLowerCase().includes(q))
      );
    }
    return [...list].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  }, [soloOnly, mode, tech, beginnerOnly, search]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-[var(--color-text)]">Find Your Next Hackathon</h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">Discover hackathons you can actually participate in — solo or with a team.</p>
      </div>

      {/* Signature solo-friendly toggle */}
      <button
        onClick={() => setSoloOnly((s) => !s)}
        className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-colors sm:w-auto ${
          soloOnly
            ? "border-[var(--color-success)]/40 bg-[var(--color-success-soft)]"
            : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-success)]/30"
        }`}
      >
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${soloOnly ? "bg-[var(--color-success)]/20 text-[var(--color-success)]" : "bg-[var(--color-surface-2)] text-[var(--color-text-muted)]"}`}>
          <Users size={18} />
        </div>
        <div className="flex-1">
          <p className="font-display text-sm font-semibold text-[var(--color-text)]">Solo Friendly</p>
          <p className="text-xs text-[var(--color-text-muted)]">Show only hackathons you can enter without a team.</p>
        </div>
        <div className={`h-6 w-11 shrink-0 rounded-full p-0.5 transition-colors ${soloOnly ? "bg-[var(--color-success)]" : "bg-[var(--color-surface-2)]"}`}>
          <div className={`h-5 w-5 rounded-full bg-white transition-transform ${soloOnly ? "translate-x-5" : "translate-x-0"}`} />
        </div>
      </button>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search hackathon names, organizers, or skills..."
        className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] outline-none focus:border-[var(--color-accent)]/60"
      />

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] uppercase tracking-wide text-[var(--color-text-dim)] mr-1">Mode</span>
        <FilterChip label="All" active={mode === "All"} onClick={() => setMode("All")} />
        {modes.map((m) => (
          <FilterChip key={m} label={m} active={mode === m} onClick={() => setMode(m)} />
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] uppercase tracking-wide text-[var(--color-text-dim)] mr-1">Technology</span>
        <FilterChip label="All" active={tech === "All"} onClick={() => setTech("All")} />
        {techs.map((t) => (
          <FilterChip key={t} label={t} active={tech === t} onClick={() => setTech(t)} />
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <FilterChip label="Beginner Friendly" active={beginnerOnly} onClick={() => setBeginnerOnly((b) => !b)} />
      </div>

      <p className="text-xs text-[var(--color-text-dim)]">{filtered.length} hackathons · sorted by deadline, soonest first</p>

      {filtered.length === 0 ? (
        <EmptyState icon={SearchX} title="No hackathons found" description="Try changing your filters or search terms." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((h) => (
            <OpportunityCard key={h.id} opp={h} onOpen={open} />
          ))}
        </div>
      )}
    </div>
  );
}
