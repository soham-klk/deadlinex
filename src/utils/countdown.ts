export interface CountdownParts {
  expired: boolean;
  urgent: boolean; // < 24h
  soon: boolean; // < 72h
  text: string;
}

export function getCountdown(deadline: string, now: number = Date.now()): CountdownParts {
  const target = new Date(deadline).getTime();
  const diff = target - now;

  if (diff <= 0) {
    return { expired: true, urgent: false, soon: false, text: "Expired" };
  }

  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  const urgent = diff < 24 * 3600 * 1000;
  const soon = diff < 72 * 3600 * 1000;

  let text: string;
  if (days > 0) {
    text = `${days}d ${String(hours).padStart(2, "0")}h left`;
  } else if (hours > 0) {
    text = `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m left`;
  } else {
    text = `${String(minutes).padStart(2, "0")}m left`;
  }

  return { expired: false, urgent, soon, text };
}

export function formatDate(deadline: string): string {
  return new Date(deadline).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const d = Math.floor(hrs / 24);
  return `${d}d ago`;
}
