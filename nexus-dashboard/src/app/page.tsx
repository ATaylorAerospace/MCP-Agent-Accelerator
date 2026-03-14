// Author: A Taylor
// License: MIT
import Link from "next/link";
import { Search, Users, Database } from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";
import Card from "@/components/ui/Card";

const modules = [
  {
    href: "/web-search",
    icon: "🔍",
    lucide: Search,
    title: "Web Search",
    description: "Query the live web using the Anthropic API with real-time tool use.",
    status: "live" as const,
  },
  {
    href: "/crm",
    icon: "👥",
    lucide: Users,
    title: "CRM",
    description: "Salesforce-connected contact management and Kanban pipeline. MCP stub ready to activate.",
    status: "pending" as const,
  },
  {
    href: "/data-warehouse",
    icon: "🗄️",
    lucide: Database,
    title: "Data Warehouse",
    description: "Natural-language queries over Snowflake or BigQuery via MCP. Stub ready to activate.",
    status: "pending" as const,
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col hero-gradient">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-1 text-xs text-[var(--accent)]">
          MCP-Powered Intelligence
        </div>
        <h1 className="mb-4 text-5xl font-semibold tracking-tight text-[var(--text-1)]">
          Nexus Intelligence
        </h1>
        <p className="max-w-xl text-lg text-[var(--text-2)]">
          A production-ready AI dashboard connecting Web Search, CRM, and Data Warehouse
          through the Model Context Protocol.
        </p>
      </section>

      {/* Module cards */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map(({ href, icon, title, description, status }) => (
            <Link key={href} href={href} className="group block">
              <Card className="h-full transition-all group-hover:border-[var(--accent)]/50 group-hover:shadow-lg group-hover:shadow-[var(--accent)]/5">
                <div className="mb-3 flex items-start justify-between">
                  <span className="text-2xl">{icon}</span>
                  <StatusBadge status={status} />
                </div>
                <h2 className="mb-1 text-base font-semibold text-[var(--text-1)]">{title}</h2>
                <p className="text-sm text-[var(--text-2)]">{description}</p>
                <div className="mt-4 text-xs font-medium text-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100">
                  Open →
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-[var(--border)] py-6 text-center text-xs text-[var(--text-2)]">
        Built by A Taylor
      </footer>
    </div>
  );
}
