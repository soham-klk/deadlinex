import { useEffect, useRef, useState } from "react";

const BG_VIDEO_URL =
  "https://zxdefgavgwfxastwmmjm.supabase.co/storage/v1/object/public/assets/hourglass.mp4";

/**
 * Scroll-driven "CHAOS -> DEADLINEX -> CONTROL" story.
 *
 * A tall scroll runway pins a section in place while an ambient background
 * video loops behind it (not scroll-scrubbed — it just autoplays). Captions
 * cross-fade based on scroll progress through the pinned section, so
 * scrolling up reverses the captions for free — there's no one-shot
 * animation to reset, just a function of scroll position. Only
 * `transform`/`opacity` are mutated per frame to stay GPU-friendly.
 */

const STAGES = [
  {
    key: "chaos",
    label: "Chaos",
    lines: ["Too many tabs.", "Too many opportunities.", "Too many missed deadlines."],
    range: [0, 0.3] as const,
  },
  {
    key: "deadlinex",
    label: "DeadlineX",
    lines: ["One place.", "Every opportunity.", "Every deadline."],
    range: [0.32, 0.68] as const,
  },
  {
    key: "control",
    label: "Control",
    lines: ["From discovery to action.", "Track every opportunity.", "Never miss the next one."],
    range: [0.7, 1] as const,
  },
];

function captionOpacity(progress: number, [start, end]: readonly [number, number]) {
  const fade = 0.08;
  if (progress < start - fade || progress > end + fade) return 0;
  if (progress < start) return (progress - (start - fade)) / fade;
  if (progress > end) return 1 - (progress - end) / fade;
  return 1;
}

export function ScrollStory() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafId = useRef<number | null>(null);
  const activeStageRef = useRef(0);
  const [videoReady, setVideoReady] = useState(false);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function update() {
      rafId.current = null;
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;

      STAGES.forEach((stage, i) => {
        const el = captionRefs.current[i];
        if (!el) return;
        const op = captionOpacity(progress, stage.range);
        el.style.opacity = String(op);
        el.style.transform = reduceMotion ? "none" : `translateY(${(1 - op) * 16}px)`;
      });

      const nextActive = progress < 0.32 ? 0 : progress < 0.68 ? 1 : 2;
      if (nextActive !== activeStageRef.current) {
        activeStageRef.current = nextActive;
        setActiveStage(nextActive);
      }
    }

    function onScroll() {
      if (rafId.current == null) rafId.current = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <section ref={wrapperRef} className="relative h-[220vh] sm:h-[280vh] lg:h-[320vh]">
      <div className="sticky top-16 h-[calc(100vh-5rem)] max-h-[680px] overflow-hidden rounded-3xl border border-[var(--color-border)] bg-black">
        <video
          src={BG_VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoReady(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25" />

        {!videoReady && (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-[var(--color-text-dim)]">
            Loading story…
          </div>
        )}

        {STAGES.map((stage, i) => (
          <div
            key={stage.key}
            ref={(el) => {
              captionRefs.current[i] = el;
            }}
            className="pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center px-6 text-center opacity-0 sm:bottom-14"
            style={{ willChange: "opacity, transform" }}
          >
            <span className="mb-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--color-accent)]">
              {stage.label}
            </span>
            {stage.lines.map((line) => (
              <p key={line} className="font-display text-lg font-semibold leading-snug text-white sm:text-2xl">
                {line}
              </p>
            ))}
          </div>
        ))}

        <div className="pointer-events-none absolute right-6 top-6 hidden gap-1.5 sm:flex">
          {STAGES.map((stage, i) => (
            <span
              key={stage.key}
              className={`h-1.5 w-6 rounded-full transition-colors duration-300 ${
                activeStage === i ? "bg-[var(--color-accent)]" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
