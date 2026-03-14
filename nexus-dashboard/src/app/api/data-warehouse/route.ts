// Author: A Taylor
// License: MIT
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call,
   @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return,
   @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

const CONNECTED = process.env.DW_CONNECTED === "true";

const MOCK_TABLE = {
  columns: ["date", "revenue", "active_users", "region"],
  rows: [
    ["2026-01-01", "$128,400", "4,821", "NA"],
    ["2026-01-02", "$134,200", "5,003", "EU"],
    ["2026-01-03", "$98,700",  "3,960", "APAC"],
  ],
};

export async function POST(req: NextRequest) {
  if (!CONNECTED) {
    return NextResponse.json({
      connected: false,
      mockData: MOCK_TABLE,
      setupMessage: "To go live: set DW_MCP_URL and DW_CONNECTED=true in .env.",
    });
  }
  const body = (await req.json()) as { query?: string };
  const Anthropic = (await import("@anthropic-ai/sdk")).default;
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const res: any = await (client.messages.create as any)({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    mcp_servers: [{ type: "url", url: process.env.DW_MCP_URL, name: "data-warehouse" }],
    messages: [{ role: "user", content: body.query ?? "" }],
  });
  const text: string = res.content
    .filter((b: any) => b.type === "text")
    .map((b: any) => b.text as string)
    .join("\n");
  return NextResponse.json({ connected: true, result: text });
}
