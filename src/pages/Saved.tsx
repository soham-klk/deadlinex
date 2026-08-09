import { useMemo, useState } from "react";
import { Bookmark } from "lucide-react";
import { allOpportunities } from "../data/opportunities";
import { OpportunityCard } from "../components/OpportunityCard";
import { FilterChip } from "../components/FilterChip";
import { EmptyState } from "../components/EmptyState";
import { useAppData } from "../context/AppDataContext";
import { useModal } from "../context/ModalContext";
import type { OppType, PriorityLabel } from "../types";
import { CountdownBadge } from "../components/CountdownBadge";

type SortKey = "deadline-soon" | "deadline-late" | "recent";

const priorityOptions: PriorityLabel[] = ["High Priority", "Apply Soon", "Shortlisted", "Research Later"];

export default function Saved() {
  const { tracked, setPriority } = useAppData();
  const { open } = useModal();
  const [typeFilter, setTypeFilter] = useState<OppType | "All">("All");
  const [sort, setSort] = useState<SortKey>("deadline-soon");
  const [search, setSearch] = useState("");

  const savedOpps = useMemo(() => {
    const ids = Object.keys(tracked);
    let list = allOpportunities.filter((o) => ids.includes(o.id));
    if (typeFilter !== "All") list = list.filter((o) => o.type === typeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((o) => o.title.toLowerCase().includes(q) || o.org.toLowerCase().includes(q));
    }
    if (sort === "deadline-soon") list = [...list].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    if (sort === "deadline-late") list = [...list].sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime());
    if (sort === "recent") list = [...list].sort((a, b) => new Date(tracked[b.id].savedAt).getTime() - new Date(tracked[a.id].savedAt).getTime());
    return list;
  }, [tracked, typeFilter, search, sort]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-[var(--color-text)]">Saved Opportunities</h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">Keep track of opportunities you don't want to miss.</p>
      </div>

      {Object.keys(tracked).length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="Nothing saved yet"
          description="Browse opportunities and save the ones you want to track."
          actionLabel="Browse Opportunities"
          actionTo="/jobs"
        />
      ) : (
        <>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search saved opportunities..."
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] outline-none focus:border-[var(--color-accent)]/60"
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {(["All", "job", "internship", "hackathon"] as const).map((t) => (
                <FilterChip key={t} label={t === "All" ? "All" : t.charAt(0).toUpperCase() + t.slice(1) + "s"} active={typeFilter === t} onClick={() => setTypeFilter(t)} />
              ))}
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1.5 text-xs text-[var(--color-text-muted)] outline-none"
            >
              <option value="deadline-soon">Deadline — Soonest</option>
              <option value="deadline-late">Deadline — Latest</option>
              <option value="recent">Recently Saved</option>
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {savedOpps.map((o) => (
              <div key={o.id} className="flex flex-col gap-2">
                <OpportunityCard opp={o} onOpen={open} />
                <div className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2">
                  <select
                    value={tracked[o.id]?.priority ?? ""}
                    onChange={(e) => setPriority(o.id, (e.target.value || null) as PriorityLabel)}
                    className="bg-transparent text-[11px] text-[var(--color-text-muted)] outline-none"
                  >
                    <option value="">No label</option>
                    {priorityOptions.map((p) => (
                      <option key={p} value={p ?? ""}>{p}</option>
                    ))}
                  </select>
                  <CountdownBadge deadline={o.deadline} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
