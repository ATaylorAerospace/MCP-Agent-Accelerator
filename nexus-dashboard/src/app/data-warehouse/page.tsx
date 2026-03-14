// Author: A Taylor
// License: MIT
"use client";

import { useState, useEffect, FormEvent } from "react";
import Header from "@/components/layout/Header";
import McpSetupBanner from "@/components/shared/McpSetupBanner";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface DwTable {
  columns: string[];
  rows: string[][];
}

interface DwResponse {
  connected: boolean;
  mockData?: DwTable;
  setupMessage?: string;
  result?: string;
}

export default function DataWarehousePage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [table, setTable] = useState<DwTable | null>(null);
  const [setupMessage, setSetupMessage] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    void fetch("/api/data-warehouse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then((r) => r.json() as Promise<DwResponse>)
      .then((data) => {
        if (data.mockData) { setTable(data.mockData); }
        if (data.setupMessage) {
          setSetupMessage(data.setupMessage);
          setShowBanner(true);
        }
      });
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!query.trim()) { return; }
    setLoading(true);
    setResult(null);
    void fetch("/api/data-warehouse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    })
      .then((r) => r.json() as Promise<DwResponse>)
      .then((data) => {
        if (data.result) {
          setResult(data.result);
        } else if (data.mockData) {
          setTable(data.mockData);
          setResult(data.setupMessage ?? null);
        }
      })
      .finally(() => { setLoading(false); });
  }

  return (
    <div className="flex h-full flex-col">
      <Header title="Data Warehouse" />
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {showBanner && setupMessage && (
          <McpSetupBanner
            service="Data Warehouse"
            setupMessage={setupMessage}
            onDismiss={() => { setShowBanner(false); }}
          />
        )}

        <form onSubmit={handleSubmit} className="flex gap-3">
          <textarea
            className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--text-1)] placeholder:text-[var(--text-2)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] resize-none"
            rows={2}
            placeholder="Describe what data you need… e.g. Show me revenue by region for January 2026"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type="submit" loading={loading} className="self-end">
            Query
          </Button>
        </form>

        {result && (
          <Card className="font-mono text-xs text-[var(--accent2)] whitespace-pre-wrap leading-relaxed">
            {result}
          </Card>
        )}

        {table && (
          <div className="overflow-hidden rounded-xl border border-[var(--border)]">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--surface)]">
                    {table.columns.map((col) => (
                      <th
                        key={col}
                        className="sticky top-0 bg-[var(--surface)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-2)]"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-[var(--bg)]" : "bg-[var(--surface)]"}
                    >
                      {row.map((cell, j) => (
                        <td key={j} className="px-4 py-3 font-mono text-xs text-[var(--text-1)]">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs text-[var(--text-2)]">
              {table.rows.length} row{table.rows.length !== 1 ? "s" : ""}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
