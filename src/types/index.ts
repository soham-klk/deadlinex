export type OppType = "job" | "internship" | "hackathon";

export interface BaseOpportunity {
  id: string;
  type: OppType;
  title: string;
  org: string;
  orgInitial: string;
  deadline: string; // ISO date
  skills: string[];
  location: string;
  remote: boolean;
  description: string;
  eligibility: string;
  postedDaysAgo: number;
}

export interface Job extends BaseOpportunity {
  type: "job";
  jobType: "Full-time" | "Part-time" | "Remote";
  experience: "Fresher" | "Entry-level" | "1-2 years" | "2+ years";
  salary: string;
}

export interface Internship extends BaseOpportunity {
  type: "internship";
  duration: "1 month" | "2 months" | "3 months" | "6 months";
  paid: boolean;
  stipend: string;
  mode: "Remote" | "In-office" | "Hybrid";
  domain: string;
}

export interface Hackathon extends BaseOpportunity {
  type: "hackathon";
  soloFriendly: boolean;
  teamSize: string;
  mode: "Online" | "Offline" | "Hybrid";
  prizePool: string;
  beginnerFriendly: boolean;
  technology: string;
}

export type Opportunity = Job | Internship | Hackathon;

export type AppStatus =
  | "saved"
  | "applied"
  | "under_review"
  | "shortlisted"
  | "interview"
  | "selected"
  | "rejected";

export type PriorityLabel =
  | "High Priority"
  | "Apply Soon"
  | "Shortlisted"
  | "Research Later"
  | null;

export interface TrackedItem {
  oppId: string;
  status: AppStatus;
  priority: PriorityLabel;
  savedAt: string;
  updatedAt: string;
}

export interface ActivityEntry {
  id: string;
  message: string;
  timestamp: string;
  kind: "applied" | "saved" | "removed" | "status";
}

export interface UserProfile {
  name: string;
  year: "First Year" | "Second Year" | "Third Year" | "Final Year" | "Graduate";
  college: string;
  bio: string;
  skills: string[];
  interests: string[];
  resumeLinked: boolean;
  github: string;
  linkedin: string;
  portfolio: string;
  preferredTypes: OppType[];
  notifPrefs: {
    deadlineReminders: boolean;
    newRecommendations: boolean;
    savedUpdates: boolean;
    weeklyDigest: boolean;
  };
}
