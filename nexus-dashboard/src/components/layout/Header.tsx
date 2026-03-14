// Author: A Taylor
// License: MIT
interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-6">
      <h1 className="text-sm font-semibold text-[var(--text-1)]">{title}</h1>
      <span className="text-xs font-medium text-[var(--text-2)]">A Taylor</span>
    </header>
  );
}
