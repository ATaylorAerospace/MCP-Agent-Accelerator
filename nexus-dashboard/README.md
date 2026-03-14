# Agent Accelerator Dashboard

A production-ready AI dashboard built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.
It connects three intelligence modules through the Model Context Protocol (MCP):
live Web Search via the Anthropic API, a Salesforce CRM panel, and a Data Warehouse query interface.

---

## Features

| Module | Status | Description |
|---|---|---|
| 🔍 Web Search | ✅ Live | Real-time web search powered by Anthropic's `web_search` tool |
| 👥 CRM | ⚠️ Needs Setup | Salesforce contact list + Kanban pipeline — MCP stub ready to activate |
| 🗄️ Data Warehouse | ⚠️ Needs Setup | Natural-language queries over Snowflake/BigQuery — MCP stub ready to activate |

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment template and add your Anthropic API key
cp .env.example .env.local
# Edit .env.local — set ANTHROPIC_API_KEY=sk-ant-...

# 3. Run the dev server
npm run dev
# Open http://localhost:3000
```

---

## Activating CRM (Salesforce MCP)

1. Obtain a Salesforce MCP endpoint URL.
2. In `.env.local` set:
   ```
   SALESFORCE_MCP_URL=https://mcp.salesforce.com/sse
   SALESFORCE_CONNECTED=true
   ```
3. Restart the server. The CRM page will route live prompts through the MCP server.

---

## Activating Data Warehouse (Snowflake / BigQuery MCP)

1. Obtain your data warehouse MCP endpoint URL.
2. In `.env.local` set:
   ```
   DW_MCP_URL=https://your-dw-mcp-url/sse
   DW_CONNECTED=true
   ```
3. Restart the server. Natural-language queries will be sent to the MCP server.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS custom properties
- **AI:** Anthropic SDK (`claude-sonnet-4-20250514`)
- **Icons:** Lucide React
- **Fonts:** DM Sans · JetBrains Mono (Google Fonts)

---

## Author

**A Taylor**

*Claude Code was used as an AI coding tool during development.
All code and intellectual property belongs to the author above.*

## License

MIT © A Taylor
