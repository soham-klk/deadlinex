import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import { internships as allInternships, isExpired } from "../data/opportunities";
import { OpportunityCard } from "../components/OpportunityCard";
import { FilterChip } from "../components/FilterChip";
import { EmptyState } from "../components/EmptyState";
import { useModal } from "../context/ModalContext";
import type { Internship } from "../types";

const durations: Internship["duration"][] = ["1 month", "2 months", "3 months", "6 months"];
const modes: Internship["mode"][] = ["Remote", "In-office", "Hybrid"];

export default function Internships() {
  const [duration, setDuration] = useState<Internship["duration"] | "All">("All");
  const [paid, setPaid] = useState<"All" | "Paid" | "Unpaid">("All");
  const [mode, setMode] = useState<Internship["mode"] | "All">("All");
  const [search, setSearch] = useState("");
  const { open } = useModal();

  const filtered = useMemo(() => {
    let list = allInternships.filter((i) => !isExpired(i.deadline));
    if (duration !== "All") list = list.filter((i) => i.duration === duration);
    if (paid !== "All") list = list.filter((i) => (paid === "Paid" ? i.paid : !i.paid));
    if (mode !== "All") list = list.filter((i) => i.mode === mode);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (i) => i.title.toLowerCase().includes(q) || i.org.toLowerCase().includes(q) || i.skills.some((s) => s.toLowerCase().includes(q))
      );
    }
    return [...list].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  }, [duration, paid, mode, search]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-[var(--color-text)]">Internships</h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">Hands-on roles for students — filtered by what actually fits your schedule.</p>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search internship titles, companies, or skills..."
        className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] outline-none focus:border-[var(--color-accent)]/60"
      />

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] uppercase tracking-wide text-[var(--color-text-dim)] mr-1">Duration</span>
        <FilterChip label="All" active={duration === "All"} onClick={() => setDuration("All")} />
        {durations.map((d) => (
          <FilterChip key={d} label={d} active={duration === d} onClick={() => setDuration(d)} />
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] uppercase tracking-wide text-[var(--color-text-dim)] mr-1">Compensation</span>
        {(["All", "Paid", "Unpaid"] as const).map((p) => (
          <FilterChip key={p} label={p} active={paid === p} onClick={() => setPaid(p)} />
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] uppercase tracking-wide text-[var(--color-text-dim)] mr-1">Mode</span>
        <FilterChip label="All" active={mode === "All"} onClick={() => setMode("All")} />
        {modes.map((m) => (
          <FilterChip key={m} label={m} active={mode === m} onClick={() => setMode(m)} />
        ))}
      </div>

      <p className="text-xs text-[var(--color-text-dim)]">{filtered.length} opportunities</p>

      {filtered.length === 0 ? (
        <EmptyState icon={SearchX} title="No opportunities found" description="Try changing your filters or search terms." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((i) => (
            <OpportunityCard key={i.id} opp={i} onOpen={open} />
          ))}
        </div>
      )}
    </div>
  );
}
