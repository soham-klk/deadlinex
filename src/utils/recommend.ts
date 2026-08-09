import type { Opportunity, UserProfile, Hackathon, Internship } from "../types";

export interface ScoredOpportunity {
  opp: Opportunity;
  score: number;
  reason: string;
}

function domainOf(opp: Opportunity): string | null {
  if (opp.type === "hackathon") return (opp as Hackathon).technology;
  if (opp.type === "internship") return (opp as Internship).domain;
  return null;
}

export function scoreOpportunity(opp: Opportunity, profile: UserProfile): ScoredOpportunity {
  const normSkills = profile.skills.map((s) => s.toLowerCase());
  const normInterests = profile.interests.map((s) => s.toLowerCase());

  const matchedSkills = opp.skills.filter((s) => normSkills.includes(s.toLowerCase()));
  const skillScore = opp.skills.length ? matchedSkills.length / opp.skills.length : 0;

  const domain = domainOf(opp);
  const domainMatch = domain ? normInterests.includes(domain.toLowerCase()) : false;

  const typeMatch = profile.preferredTypes.includes(opp.type);

  let raw = skillScore * 55 + (domainMatch ? 30 : 0) + (typeMatch ? 15 : 0);
  raw = Math.min(98, Math.max(raw, matchedSkills.length > 0 ? 35 : 12));
  const score = Math.round(raw);

  let reason = "Open innovation — matches your general interests";
  if (matchedSkills.length > 0 && domainMatch) {
    reason = `Matches your ${matchedSkills.slice(0, 2).join(" + ")} skills and ${domain} interest`;
  } else if (matchedSkills.length > 0) {
    reason = `Matches your ${matchedSkills.slice(0, 2).join(" + ")} skills`;
  } else if (domainMatch) {
    reason = `Matches your ${domain} interest`;
  } else if (typeMatch) {
    reason = `Fits your ${opp.type} preference`;
  }

  return { opp, score, reason };
}

export function rankOpportunities(opps: Opportunity[], profile: UserProfile): ScoredOpportunity[] {
  return opps
    .map((o) => scoreOpportunity(o, profile))
    .sort((a, b) => b.score - a.score);
}

export function skillGapSuggestions(opps: Opportunity[], profile: UserProfile, topN = 3): string[] {
  const normSkills = new Set(profile.skills.map((s) => s.toLowerCase()));
  const counts = new Map<string, number>();
  opps.forEach((o) => {
    o.skills.forEach((s) => {
      if (!normSkills.has(s.toLowerCase())) {
        counts.set(s, (counts.get(s) ?? 0) + 1);
      }
    });
  });
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([skill]) => skill);
}
