// Author: A Taylor
// License: MIT
import clsx from "clsx";

export default function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={clsx(
        "inline-block h-5 w-5 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]",
        className
      )}
    />
  );
}
