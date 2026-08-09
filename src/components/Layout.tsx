import { useState, type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Sparkles,
  Briefcase,
  GraduationCap,
  Trophy,
  Bookmark,
  Info,
  Menu,
  X,
  Bell,
  } from "lucide-react";
import { GlobalSearch } from "./GlobalSearch";
import { useAppData } from "../context/AppDataContext";

const navItems = [
  { to: "/", label: "Home", icon: LayoutDashboard },
  { to: "/recommendations", label: "Recommendations", icon: Sparkles },
  { to: "/jobs", label: "Jobs", icon: Briefcase },
  { to: "/internships", label: "Internships", icon: GraduationCap },
  { to: "/hackathons", label: "Hackathons", icon: Trophy },
  { to: "/saved", label: "Saved", icon: Bookmark },
  { to: "/about", label: "About", icon: Info },
];

function Logo() {
  return (
    <div className="flex items-center gap-2 px-1">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden">
  <img
    src="/logo.png"
    alt="DeadlineX logo"
    className="h-full w-full object-contain"
  />
</div>
      <span className="font-display text-[17px] font-semibold tracking-tight text-[var(--color-text)]">
        Deadline<span className="text-[var(--color-accent)]">X</span>
      </span>
    </div>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { profile } = useAppData();
  return (
    <div className="flex h-full flex-col">
      <div className="px-4 pt-5 pb-6">
        <Logo />
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                  : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text)]"
              }`
            }
          >
            <item.icon size={17} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-[var(--color-border-soft)] p-3">
        <NavLink
          to="/profile"
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive ? "bg-[var(--color-surface-2)] text-[var(--color-text)]" : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text)]"
            }`
          }
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-accent)]/20 text-[11px] font-display font-semibold text-[var(--color-accent)]">
            {profile.name.charAt(0)}
          </div>
          <span className="truncate">{profile.name}</span>
        </NavLink>
      </div>
    </div>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { profile } = useAppData();

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 border-r border-[var(--color-border-soft)] bg-[var(--color-bg)] lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-64 bg-[var(--color-bg)] border-r border-[var(--color-border-soft)]">
            <button onClick={() => setMobileOpen(false)} className="absolute right-3 top-4 text-[var(--color-text-dim)]">
              <X size={20} />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="lg:pl-60">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-[var(--color-border-soft)] bg-[var(--color-bg)]/90 backdrop-blur-md px-4 py-3 sm:px-6">
          <button onClick={() => setMobileOpen(true)} className="text-[var(--color-text-muted)] lg:hidden">
            <Menu size={22} />
          </button>
          <div className="lg:hidden">
            <Logo />
          </div>
          <div className="hidden flex-1 max-w-xl lg:block">
            <GlobalSearch />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button aria-label="Notifications" className="relative rounded-lg p-2 text-[var(--color-text-muted)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text)]">
              <Bell size={18} />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-urgent)]" />
            </button>
            <NavLink to="/profile" className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-accent)]/20 text-xs font-display font-semibold text-[var(--color-accent)]">
              {profile.name.charAt(0)}
            </NavLink>
          </div>
        </header>
        <div className="px-4 pb-3 pt-3 lg:hidden">
          <GlobalSearch compact />
        </div>

        <main className="px-4 py-6 sm:px-6 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
