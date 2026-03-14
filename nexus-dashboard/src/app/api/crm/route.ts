// Author: A Taylor
// License: MIT
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call,
   @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return,
   @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

const CONNECTED = process.env.SALESFORCE_CONNECTED === "true";

const MOCK_CONTACTS = [
  { id: "1", name: "Alice Johnson", company: "Acme Corp",  stage: "Negotiation", value: 48000 },
  { id: "2", name: "Bob Martinez",  company: "Globex",     stage: "Proposal",    value: 23500 },
  { id: "3", name: "Carol White",   company: "Initech",    stage: "Closed Won",  value: 91000 },
  { id: "4", name: "Dan Lee",       company: "Umbrella",   stage: "Prospect",    value: 15000 },
];

export async function POST(req: NextRequest) {
  if (!CONNECTED) {
    return NextResponse.json({
      connected: false,
      mockData: { contacts: MOCK_CONTACTS },
      setupMessage:
        "To go live: set SALESFORCE_MCP_URL and SALESFORCE_CONNECTED=true in .env, then connect Salesforce MCP in Claude.ai → Settings → Integrations.",
    });
  }
  const body = (await req.json()) as { prompt?: string };
  const Anthropic = (await import("@anthropic-ai/sdk")).default;
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const res: any = await (client.messages.create as any)({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    mcp_servers: [{ type: "url", url: process.env.SALESFORCE_MCP_URL, name: "salesforce" }],
    messages: [{ role: "user", content: body.prompt ?? "" }],
  });
  const text: string = res.content
    .filter((b: any) => b.type === "text")
    .map((b: any) => b.text as string)
    .join("\n");
  return NextResponse.json({ connected: true, result: text });
}
