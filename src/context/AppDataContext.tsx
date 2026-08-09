import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { AppStatus, PriorityLabel, TrackedItem, ActivityEntry, UserProfile, Opportunity } from "../types";

const defaultProfile: UserProfile = {
  name: "Alex Rivera",
  year: "Third Year",
  college: "Not set",
  bio: "Student exploring a path into tech — figuring out what fits.",
  skills: ["JavaScript", "Networking"],
  interests: ["Cybersecurity", "Web Development"],
  resumeLinked: false,
  github: "",
  linkedin: "",
  portfolio: "",
  preferredTypes: ["job", "internship", "hackathon"],
  notifPrefs: {
    deadlineReminders: true,
    newRecommendations: true,
    savedUpdates: false,
    weeklyDigest: true,
  },
};

interface AppDataContextValue {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
  tracked: Record<string, TrackedItem>;
  activity: ActivityEntry[];
  save: (opp: Opportunity) => void;
  unsave: (opp: Opportunity) => void;
  markApplied: (opp: Opportunity) => void;
  setStatus: (opp: Opportunity, status: AppStatus) => void;
  setPriority: (oppId: string, label: PriorityLabel) => void;
  isSaved: (oppId: string) => boolean;
  isApplied: (oppId: string) => boolean;
  profileCompletion: number;
}

const AppDataContext = createContext<AppDataContextValue | null>(null);

function addEntry(list: ActivityEntry[], message: string, kind: ActivityEntry["kind"]): ActivityEntry[] {
  const entry: ActivityEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    message,
    timestamp: new Date().toISOString(),
    kind,
  };
  return [entry, ...list].slice(0, 30);
}

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useLocalStorage<UserProfile>("dx_profile", defaultProfile);
  const [tracked, setTracked] = useLocalStorage<Record<string, TrackedItem>>("dx_tracked", {});
  const [activity, setActivity] = useLocalStorage<ActivityEntry[]>("dx_activity", []);

  const now = () => new Date().toISOString();

  const save = (opp: Opportunity) => {
    setTracked((prev) => ({
      ...prev,
      [opp.id]: prev[opp.id]
        ? { ...prev[opp.id], status: prev[opp.id].status === "applied" ? "applied" : "saved" }
        : { oppId: opp.id, status: "saved", priority: null, savedAt: now(), updatedAt: now() },
    }));
    setActivity((prev) => addEntry(prev, `Saved ${opp.title}`, "saved"));
  };

  const unsave = (opp: Opportunity) => {
    setTracked((prev) => {
      const next = { ...prev };
      delete next[opp.id];
      return next;
    });
    setActivity((prev) => addEntry(prev, `Removed ${opp.title} from saved`, "removed"));
  };

  const markApplied = (opp: Opportunity) => {
    setTracked((prev) => ({
      ...prev,
      [opp.id]: {
        oppId: opp.id,
        status: "applied",
        priority: prev[opp.id]?.priority ?? null,
        savedAt: prev[opp.id]?.savedAt ?? now(),
        updatedAt: now(),
      },
    }));
    setActivity((prev) => addEntry(prev, `Applied to ${opp.title}`, "applied"));
  };

  const setStatus = (opp: Opportunity, status: AppStatus) => {
    setTracked((prev) => ({
      ...prev,
      [opp.id]: {
        oppId: opp.id,
        status,
        priority: prev[opp.id]?.priority ?? null,
        savedAt: prev[opp.id]?.savedAt ?? now(),
        updatedAt: now(),
      },
    }));
    setActivity((prev) => addEntry(prev, `${opp.title} moved to ${status.replace("_", " ")}`, "status"));
  };

  const setPriority = (oppId: string, label: PriorityLabel) => {
    setTracked((prev) =>
      prev[oppId] ? { ...prev, [oppId]: { ...prev[oppId], priority: label, updatedAt: now() } } : prev
    );
  };

  const isSaved = (oppId: string) => Boolean(tracked[oppId]);
  const isApplied = (oppId: string) => tracked[oppId]?.status && tracked[oppId].status !== "saved";

  const profileCompletion = useMemo(() => {
    const checks = [
      profile.name.trim().length > 0,
      profile.college.trim().length > 0 && profile.college !== "Not set",
      profile.bio.trim().length > 0,
      profile.skills.length >= 3,
      profile.interests.length >= 1,
      profile.resumeLinked,
      profile.github.trim().length > 0,
      profile.preferredTypes.length > 0,
    ];
    const pct = Math.round((checks.filter(Boolean).length / checks.length) * 100);
    return pct;
  }, [profile]);

  return (
    <AppDataContext.Provider
      value={{
        profile,
        setProfile,
        tracked,
        activity,
        save,
        unsave,
        markApplied,
        setStatus,
        setPriority,
        isSaved,
        isApplied,
        profileCompletion,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used within AppDataProvider");
  return ctx;
}
