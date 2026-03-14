// Author: A Taylor
// License: MIT
import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "ghost";
  loading?: boolean;
}

export default function Button({ children, variant = "primary", loading, className, disabled, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg)] disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "primary" &&
          "bg-[var(--accent)] text-white hover:bg-[var(--accent)]/80 focus:ring-[var(--accent)]",
        variant === "ghost" &&
          "bg-transparent border border-[var(--border)] text-[var(--text-2)] hover:text-[var(--text-1)] hover:border-[var(--accent)] focus:ring-[var(--accent)]",
        className
      )}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      ) : null}
      {children}
    </button>
  );
}
