import { useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { allOpportunities, isExpired } from "../data/opportunities";
import type { OppType } from "../types";
import { useModal } from "../context/ModalContext";

const typeFilters: { key: OppType | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "job", label: "Jobs" },
  { key: "internship", label: "Internships" },
  { key: "hackathon", label: "Hackathons" },
];

export function GlobalSearch({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<OppType | "all">("all");
  const [focused, setFocused] = useState(false);
  const { open } = useModal();
  const containerRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allOpportunities
      .filter((o) => !isExpired(o.deadline))
      .filter((o) => type === "all" || o.type === type)
      .filter(
        (o) =>
          o.title.toLowerCase().includes(q) ||
          o.org.toLowerCase().includes(q) ||
          o.skills.some((s) => s.toLowerCase().includes(q))
      )
      .slice(0, 6);
  }, [query, type]);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 focus-within:border-[var(--color-accent)]/60 transition-colors">
        <Search size={16} className="shrink-0 text-[var(--color-text-dim)]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search jobs, internships, hackathons..."
          className="w-full bg-transparent text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] outline-none"
        />
        {query && (
          <button onClick={() => setQuery("")} className="shrink-0 text-[var(--color-text-dim)] hover:text-[var(--color-text)]">
            <X size={14} />
          </button>
        )}
        {!compact && (
          <div className="hidden md:flex shrink-0 items-center gap-1 border-l border-[var(--color-border)] pl-2">
            {typeFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => setType(f.key)}
                className={`rounded-md px-2 py-1 text-[11px] font-medium transition-colors ${
                  type === f.key ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)]" : "text-[var(--color-text-dim)] hover:text-[var(--color-text)]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {focused && query && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] shadow-2xl shadow-black/50">
          {results.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-[var(--color-text-muted)]">No opportunities found.</p>
          ) : (
            results.map((o) => (
              <button
                key={o.id}
                onMouseDown={() => {
                  open(o);
                  setQuery("");
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-[var(--color-surface)] transition-colors"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-display font-semibold">
                  {o.orgInitial}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-[var(--color-text)]">{o.title}</p>
                  <p className="truncate text-xs text-[var(--color-text-dim)]">{o.org} · {o.type}</p>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
