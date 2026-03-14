// Author: A Taylor
// License: MIT
"use client";

import { useState, FormEvent } from "react";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

interface ContentBlock {
  type: string;
  text?: string;
}

interface Usage {
  input_tokens: number;
  output_tokens: number;
}

interface SearchResult {
  blocks: ContentBlock[];
  usage: Usage;
}

interface SearchResponse {
  blocks?: ContentBlock[];
  usage?: Usage;
  error?: string;
}

export default function WebSearchPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!query.trim()) { return; }
    setLoading(true);
    setError(null);
    setResult(null);
    fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json() as Promise<SearchResponse>)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else if (data.blocks && data.usage) {
          setResult({ blocks: data.blocks, usage: data.usage });
        }
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Unknown error");
      })
      .finally(() => { setLoading(false); });
  }

  const textBlocks = result?.blocks.filter((b) => b.type === "text") ?? [];

  return (
    <div className="flex h-full flex-col">
      <Header title="Web Search" />
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input
            placeholder="Ask anything — searches the live web…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" loading={loading}>
            Search
          </Button>
        </form>

        {loading && (
          <div className="space-y-3">
            {[100, 80, 60, 90, 70].map((w, i) => (
              <div key={i} className="skeleton h-4" style={{ width: `${w}%` }} />
            ))}
          </div>
        )}

        {error && (
          <Card className="border-red-500/30 bg-red-500/10 text-red-400 text-sm">
            {error}
          </Card>
        )}

        {!loading && textBlocks.length > 0 && (
          <div className="space-y-4">
            {textBlocks.map((block, i) => (
              <Card key={i}>
                <p className="whitespace-pre-wrap text-sm text-[var(--text-1)] leading-relaxed">
                  {block.text}
                </p>
              </Card>
            ))}

            {result?.usage && (
              <div className="flex items-center gap-4 rounded-lg border border-[var(--border)] px-4 py-2 text-xs text-[var(--text-2)]">
                <span>
                  Input tokens:{" "}
                  <span className="font-mono text-[var(--accent)]">
                    {result.usage.input_tokens.toLocaleString()}
                  </span>
                </span>
                <span className="h-3 w-px bg-[var(--border)]" />
                <span>
                  Output tokens:{" "}
                  <span className="font-mono text-[var(--accent2)]">
                    {result.usage.output_tokens.toLocaleString()}
                  </span>
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
