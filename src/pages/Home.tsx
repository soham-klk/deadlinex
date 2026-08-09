import { useMemo } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Bookmark, CalendarClock, Flame, ArrowUpRight, Sparkles } from "lucide-react";
import { StatCard } from "../components/StatCard";
import { OpportunityCard } from "../components/OpportunityCard";
import { ScrollStory } from "../components/ScrollStory";
import { useAppData } from "../context/AppDataContext";
import { useModal } from "../context/ModalContext";
import { activeOpportunities } from "../data/opportunities";
import { getCountdown, timeAgo } from "../utils/countdown";

export default function Home() {
  const { tracked, activity, profileCompletion } = useAppData();
  const { open } = useModal();

  const trackedValues = Object.values(tracked);
  const appliedCount = trackedValues.filter((t) => t.status !== "saved").length;
  const savedCount = trackedValues.length;

  const upcomingDeadlines = useMemo(
    () => activeOpportunities.filter((o) => !getCountdown(o.deadline).expired && getCountdown(o.deadline).soon === false && new Date(o.deadline).getTime() - Date.now() < 14 * 86400000).length,
    []
  );

  const closingSoon = useMemo(() => {
    return [...activeOpportunities]
      .filter((o) => !getCountdown(o.deadline).expired)
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
      .slice(0, 6);
  }, []);

  const closingIn48h = useMemo(
    () => activeOpportunities.filter((o) => getCountdown(o.deadline).urgent).length,
    []
  );

  const trending = useMemo(() => activeOpportunities.slice(3, 9), []);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-surface)] via-[var(--color-surface)] to-[var(--color-accent-soft)] p-6 sm:p-10">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)] px-3 py-1 text-[11px] font-medium text-[var(--color-accent)]">
            <Sparkles size={12} /> Deadline-first discovery
          </span>
          <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-[var(--color-text)] sm:text-4xl">
            Turn Deadlines Into Opportunities.
          </h1>
          <p className="mt-3 text-sm text-[var(--color-text-muted)] sm:text-base">
            Discover jobs, internships, and hackathons before they close — and track every opportunity from one dashboard.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/jobs" className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-accent)]/85 transition-colors">
              Explore Opportunities <ArrowUpRight size={15} />
            </Link>
            <Link to="/recommendations" className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--color-border)] px-5 py-2.5 text-sm font-semibold text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-colors">
              View Recommendations
            </Link>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[var(--color-accent)]/20 blur-3xl" />
      </section>

      {/* Scroll-driven story: CHAOS -> DEADLINEX -> CONTROL */}
      <ScrollStory />

      {/* Profile completion CTA */}
      {profileCompletion < 100 && (
        <div className="flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <p className="font-display text-sm font-semibold text-[var(--color-text)]">Complete your profile</p>
            <p className="text-xs text-[var(--color-text-muted)]">Get better opportunity recommendations based on your skills and interests.</p>
            <div className="mt-2 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-[var(--color-surface-2)]">
              <div className="h-full rounded-full bg-[var(--color-accent)] transition-all" style={{ width: `${profileCompletion}%` }} />
            </div>
            <p className="mt-1 font-mono text-[11px] text-[var(--color-text-dim)]">{profileCompletion}% complete</p>
          </div>
          <Link to="/profile" className="shrink-0 inline-flex items-center gap-1 rounded-lg bg-[var(--color-accent)] px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--color-accent)]/85">
            Complete Profile <ArrowUpRight size={13} />
          </Link>
        </div>
      )}

      {/* Stats */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total Applied" value={appliedCount} icon={CheckCircle2} tone="success" />
        <StatCard label="Saved Opportunities" value={savedCount} icon={Bookmark} />
        <StatCard label="Upcoming Deadlines" value={upcomingDeadlines} icon={CalendarClock} />
        <StatCard label="Closing in 48 Hours" value={closingIn48h} icon={Flame} tone="urgent" />
      </section>

      {/* Closing soon */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-[var(--color-text)]">Closing Soon</h2>
          <Link to="/jobs" className="text-xs text-[var(--color-accent)] hover:underline">See all</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
          {closingSoon.map((o) => (
            <div key={o.id} className="min-w-[280px] sm:min-w-0">
              <OpportunityCard opp={o} onOpen={open} />
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Trending */}
        <section className="lg:col-span-2">
          <h2 className="mb-3 font-display text-lg font-semibold text-[var(--color-text)]">Trending Opportunities</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {trending.map((o) => (
              <OpportunityCard key={o.id} opp={o} onOpen={open} />
            ))}
          </div>
        </section>

        {/* Recent activity */}
        <section>
          <h2 className="mb-3 font-display text-lg font-semibold text-[var(--color-text)]">Recent Activity</h2>
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            {activity.length === 0 ? (
              <p className="py-8 text-center text-sm text-[var(--color-text-muted)]">No activity yet — save or apply to an opportunity to see it here.</p>
            ) : (
              <ul className="space-y-4">
                {activity.slice(0, 8).map((a) => (
                  <li key={a.id} className="flex items-start gap-3">
                    <div className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${a.kind === "applied" ? "bg-[var(--color-success)]" : a.kind === "removed" ? "bg-[var(--color-text-dim)]" : "bg-[var(--color-accent)]"}`} />
                    <div className="min-w-0">
                      <p className="text-xs text-[var(--color-text)]">{a.message}</p>
                      <p className="font-mono text-[10px] text-[var(--color-text-dim)]">{timeAgo(a.timestamp)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
