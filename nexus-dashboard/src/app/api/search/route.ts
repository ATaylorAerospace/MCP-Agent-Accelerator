// Author: A Taylor
// License: MIT
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextRequest, NextResponse } from "next/server";
import { anthropic } from "@/lib/anthropic";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { query?: string };
  const query = body.query;
  if (!query?.trim()) {
    return NextResponse.json({ error: "query required" }, { status: 400 });
  }
  const res = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2048,
    tools: [{ type: "web_search_20250305", name: "web_search" }],
    messages: [{ role: "user", content: query }],
  });
  return NextResponse.json({ blocks: res.content, usage: res.usage });
}
