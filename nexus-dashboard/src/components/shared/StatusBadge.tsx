// Author: A Taylor
// License: MIT
import clsx from "clsx";

interface StatusBadgeProps {
  status: "live" | "pending";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        status === "live"
          ? "bg-emerald-500/10 text-emerald-400"
          : "bg-amber-500/10 text-amber-400"
      )}
    >
      <span
        className={clsx(
          "h-1.5 w-1.5 rounded-full",
          status === "live" ? "bg-emerald-400" : "bg-amber-400"
        )}
      />
      {status === "live" ? "Live" : "Needs Setup"}
    </span>
  );
}
