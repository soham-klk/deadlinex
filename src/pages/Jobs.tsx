import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import { jobs as allJobs, isExpired } from "../data/opportunities";
import { OpportunityCard } from "../components/OpportunityCard";
import { FilterChip } from "../components/FilterChip";
import { EmptyState } from "../components/EmptyState";
import { useModal } from "../context/ModalContext";
import type { Job } from "../types";

const jobTypes: Job["jobType"][] = ["Full-time", "Part-time", "Remote"];
const experiences: Job["experience"][] = ["Fresher", "Entry-level", "1-2 years", "2+ years"];
type SortKey = "deadline" | "newest" | "relevance";

export default function Jobs() {
  const [jobType, setJobType] = useState<Job["jobType"] | "All">("All");
  const [experience, setExperience] = useState<Job["experience"] | "All">("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("deadline");
  const { open } = useModal();

  const filtered = useMemo(() => {
    let list = allJobs.filter((j) => !isExpired(j.deadline));
    if (jobType !== "All") list = list.filter((j) => j.jobType === jobType);
    if (experience !== "All") list = list.filter((j) => j.experience === experience);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (j) => j.title.toLowerCase().includes(q) || j.org.toLowerCase().includes(q) || j.skills.some((s) => s.toLowerCase().includes(q))
      );
    }
    if (sort === "deadline") list = [...list].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    if (sort === "newest") list = [...list].sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
    return list;
  }, [jobType, experience, search, sort]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-[var(--color-text)]">Find Your Next Opportunity</h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">Fresher and entry-level roles, sorted by what's closing soon.</p>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search job titles, companies, or skills..."
        className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] outline-none focus:border-[var(--color-accent)]/60"
      />

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] uppercase tracking-wide text-[var(--color-text-dim)] mr-1">Type</span>
        <FilterChip label="All" active={jobType === "All"} onClick={() => setJobType("All")} />
        {jobTypes.map((t) => (
          <FilterChip key={t} label={t} active={jobType === t} onClick={() => setJobType(t)} />
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] uppercase tracking-wide text-[var(--color-text-dim)] mr-1">Experience</span>
        <FilterChip label="All" active={experience === "All"} onClick={() => setExperience("All")} />
        {experiences.map((t) => (
          <FilterChip key={t} label={t} active={experience === t} onClick={() => setExperience(t)} />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-[var(--color-text-dim)]">{filtered.length} opportunities</p>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1.5 text-xs text-[var(--color-text-muted)] outline-none"
        >
          <option value="deadline">Sort: Deadline</option>
          <option value="newest">Sort: Newest</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={SearchX} title="No opportunities found" description="Try changing your filters or search terms." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((j) => (
            <OpportunityCard key={j.id} opp={j} onOpen={open} />
          ))}
        </div>
      )}
    </div>
  );
}
