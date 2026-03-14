// Author: A Taylor
// License: MIT
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Users, Database } from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";
import clsx from "clsx";

const links = [
  { href: "/web-search",     label: "Web Search",      icon: Search,   badge: null },
  { href: "/crm",            label: "CRM",             icon: Users,    badge: "pending" as const },
  { href: "/data-warehouse", label: "Data Warehouse",  icon: Database, badge: "pending" as const },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="flex h-screen w-60 flex-col border-r border-[var(--border)] bg-[var(--surface)]">
      <div className="px-5 py-6">
        <Link href="/" className="text-base font-semibold tracking-tight text-[var(--text-1)] hover:text-[var(--accent)] transition-colors">
          Agent Accelerator
        </Link>
      </div>
      <nav className="flex-1 px-3 pb-4">
        {links.map(({ href, label, icon: Icon, badge }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm transition-all mb-1",
                active
                  ? "border-l-2 border-[var(--accent)] bg-[var(--accent)]/10 pl-[10px] text-[var(--text-1)]"
                  : "text-[var(--text-2)] hover:bg-white/5 hover:text-[var(--text-1)]"
              )}
            >
              <span className="flex items-center gap-2.5">
                <Icon size={16} />
                {label}
              </span>
              {badge && <StatusBadge status={badge} />}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
