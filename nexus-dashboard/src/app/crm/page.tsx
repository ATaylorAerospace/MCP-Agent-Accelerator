// Author: A Taylor
// License: MIT
"use client";

import { useState, useEffect, FormEvent } from "react";
import Header from "@/components/layout/Header";
import McpSetupBanner from "@/components/shared/McpSetupBanner";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

interface Contact {
  id: string;
  name: string;
  company: string;
  stage: string;
  value: number;
}

interface CrmResponse {
  connected: boolean;
  mockData?: { contacts: Contact[] };
  setupMessage?: string;
  result?: string;
}

const STAGES = ["Prospect", "Proposal", "Negotiation", "Closed Won"];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function CrmPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [setupMessage, setSetupMessage] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);

  useEffect(() => {
    void fetch("/api/crm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then((r) => r.json() as Promise<CrmResponse>)
      .then((data) => {
        if (data.mockData) { setContacts(data.mockData.contacts); }
        if (data.setupMessage) {
          setSetupMessage(data.setupMessage);
          setShowBanner(true);
        }
      });
  }, []);

  function handleAiSubmit(e: FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) { return; }
    setAiLoading(true);
    setAiResult(null);
    void fetch("/api/crm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    })
      .then((r) => r.json() as Promise<CrmResponse>)
      .then((data) => {
        setAiResult(data.result ?? data.setupMessage ?? "No response.");
      })
      .finally(() => { setAiLoading(false); });
  }

  return (
    <div className="flex h-full flex-col">
      <Header title="CRM" />
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {showBanner && setupMessage && (
          <McpSetupBanner
            service="Salesforce"
            setupMessage={setupMessage}
            onDismiss={() => { setShowBanner(false); }}
          />
        )}

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Contact list */}
          <Card className="lg:col-span-1">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-2)]">
              Contacts ({contacts.length})
            </h2>
            <ul className="space-y-3">
              {contacts.map((c) => (
                <li key={c.id} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/20 text-xs font-semibold text-[var(--accent)]">
                    {initials(c.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-[var(--text-1)]">{c.name}</p>
                    <p className="truncate text-xs text-[var(--text-2)]">{c.company}</p>
                  </div>
                  <span className="text-xs font-mono text-[var(--accent2)]">
                    ${c.value.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Kanban board */}
          <div className="grid grid-cols-2 gap-3 lg:col-span-2 lg:grid-cols-4">
            {STAGES.map((stage) => {
              const cards = contacts.filter((c) => c.stage === stage);
              return (
                <div
                  key={stage}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3"
                >
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-2)]">
                    {stage}
                    <span className="ml-1.5 rounded-full bg-[var(--border)] px-1.5 py-0.5 text-[10px]">
                      {cards.length}
                    </span>
                  </h3>
                  <div className="space-y-2">
                    {cards.map((c) => (
                      <div
                        key={c.id}
                        className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-2.5 text-xs"
                      >
                        <p className="font-medium text-[var(--text-1)]">{c.name}</p>
                        <p className="text-[var(--text-2)]">{c.company}</p>
                        <p className="mt-1 font-mono text-[var(--accent2)]">
                          ${c.value.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI prompt bar */}
        <form onSubmit={handleAiSubmit} className="flex gap-3">
          <Input
            placeholder="Ask about your CRM…"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" loading={aiLoading}>
            Ask AI
          </Button>
        </form>
        {aiResult && (
          <Card>
            <p className="whitespace-pre-wrap text-sm text-[var(--text-1)]">{aiResult}</p>
          </Card>
        )}
      </div>
    </div>
  );
}
