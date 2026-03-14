// Author: A Taylor
// License: MIT
import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={clsx(
        "rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5",
        className
      )}
    >
      {children}
    </div>
  );
}
