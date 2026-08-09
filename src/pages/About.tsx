import { Clock, LayoutGrid, Users, Sparkles, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "../context/ToastContext";

const features = [
  { icon: Clock, title: "Deadline First", desc: "See what's closing soon instead of what was posted most recently." },
  { icon: LayoutGrid, title: "One Dashboard", desc: "Track every saved and applied opportunity in a single view." },
  { icon: Users, title: "Solo Hackathons", desc: "Find hackathons that don't require a team to enter." },
  { icon: Sparkles, title: "Smart Recommendations", desc: "Discover opportunities scored against your actual skills." },
];

const roadmap = [
  { phase: "Phase 1 — Current", items: ["Opportunity aggregation", "Application tracking", "Recommendations", "Solo hackathon discovery"] },
  { phase: "Phase 2", items: ["Email deadline reminders", "Calendar integration", "Advanced AI recommendations"] },
  { phase: "Phase 3", items: ["Browser extension", "Automated opportunity discovery", "AI resume matching"] },
];

export default function About() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setForm({ name: "", email: "", message: "" });
    showToast("Thanks — your feedback was sent.");
  };

  return (
    <div className="max-w-3xl space-y-10">
      <section>
        <h1 className="font-display text-2xl font-semibold text-[var(--color-text)]">Our Mission</h1>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
          Make sure the next great opportunity doesn't get lost in another browser tab.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-[var(--color-text)]">The Problem</h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
          Students currently jump between LinkedIn, Internshala, Unstop, Devfolio, company career pages, college groups,
          and Discord/Telegram communities just to keep up. That creates information overload, missed deadlines,
          repeated searching, and no real way to track what they've already applied to.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-[var(--color-text)]">Our Solution</h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
          DeadlineX brings jobs, internships, and hackathons into one deadline-first platform — with a built-in
          tracker so you always know exactly where you stand.
        </p>
      </section>

      <section>
        <h2 className="mb-3 font-display text-lg font-semibold text-[var(--color-text)]">Why DeadlineX?</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                <f.icon size={17} />
              </div>
              <p className="mt-3 font-display text-sm font-semibold text-[var(--color-text)]">{f.title}</p>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-[var(--color-text)]">Why We Built DeadlineX</h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
          Built by a student who kept discovering hackathons and internships days after applications had closed —
          usually buried in a WhatsApp group or a feed that had already moved on. DeadlineX exists so that doesn't
          happen again.
        </p>
      </section>

      <section>
        <h2 className="mb-3 font-display text-lg font-semibold text-[var(--color-text)]">What's Next?</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {roadmap.map((r) => (
            <div key={r.phase} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <p className="font-display text-xs font-semibold text-[var(--color-accent)]">{r.phase}</p>
              <ul className="mt-2 space-y-1.5">
                {r.items.map((i) => (
                  <li key={i} className="text-xs text-[var(--color-text-muted)]">{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-display text-lg font-semibold text-[var(--color-text)]">Feedback</h2>
        <form onSubmit={submit} className="space-y-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] outline-none" />
          <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] outline-none" />
          <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Message" rows={3} className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] outline-none resize-none" />
          <button type="submit" className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--color-accent)]/85">
            <Send size={14} /> Send Feedback
          </button>
        </form>
      </section>
    </div>
  );
}
