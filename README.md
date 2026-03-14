# 🤖 MCP-Agent-Accelerator 🚀

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stars](https://img.shields.io/github/stars/ATaylorAerospace/MCP-Agent-Accelerator?style=social)](https://github.com/ATaylorAerospace/MCP-Agent-Accelerator)
[![Language](https://img.shields.io/badge/Languages-TypeScript%20%7C%20Python%20%7C%20Next.js-brightgreen)](https://github.com/ATaylorAerospace/MCP-Agent-Accelerator)

A production-ready framework for building AI agents using the [Model Context Protocol (MCP)](https://www.anthropic.com/news/model-context-protocol), paired with a full-featured Next.js 14 intelligence dashboard. The accelerator eliminates integration boilerplate, provides robust agent orchestration, and ships with a working UI out of the box.

> 🚧 **Status:** Core framework stable · Dashboard live

---

## 🤔 The Problem

Building AI agents is more than just connecting to an LLM. Developers face real hurdles when making agents interact with production tools:

- **💥 Complex Connections:** Every new tool requires a custom, brittle integration.
- **🌀 Coordination Chaos:** Making multiple agents collaborate is a major challenge.
- **⚠️ Production Pitfalls:** Moving from demo to reliable, production-grade system is hard.
- **🔥 Error Handling Hell:** Managing failures and retries across services is a nightmare.

---

## 💡 The Solution

**MCP-Agent-Accelerator** provides the infrastructure layer that handles complex integrations, allowing focus on unique agent logic and business value. The included **Agent Accelerator Dashboard** delivers a working AI interface immediately — no UI build required.

---

## 📁 Repository Layout

```
MCP-Agent-Accelerator/
├── src/                        # Core TypeScript/Python framework
│   ├── main.ts                 # AgentAccelerator class (TypeScript)
│   ├── main.py                 # AgentAccelerator class (Python)
│   └── index.test.ts           # Jest unit tests
├── nexus-dashboard/            # Agent Accelerator Dashboard (Next.js 14)
│   └── src/
│       ├── app/                # App Router pages + API routes
│       ├── components/         # Shared UI components
│       └── lib/                # Anthropic SDK client
├── Dockerfile                  # Multi-stage build for the core framework
├── Dockerfile.dashboard        # Standalone build for the Next.js dashboard
└── package.json                # Root workspace scripts
```

---

## 🖥️ Agent Accelerator Dashboard

The `nexus-dashboard/` directory contains a production-ready Next.js 14 web application with three intelligence modules:

| Module | Status | Description |
|---|---|---|
| 🔍 Web Search | ✅ Live | Real-time web search powered by Anthropic's `web_search` tool |
| 👥 CRM | ⚠️ Needs Setup | Salesforce contact list + Kanban pipeline — MCP stub ready to activate |
| 🗄️ Data Warehouse | ⚠️ Needs Setup | Natural-language queries over Snowflake/BigQuery — MCP stub ready to activate |

**⚡ Dashboard quick start:**

```bash
cd nexus-dashboard
npm install
cp .env.example .env.local
# Set ANTHROPIC_API_KEY in .env.local
npm run dev
# Open http://localhost:3000
```

Or from the root with the workspace script:

```bash
npm run dashboard:install
npm run dashboard
```

### 🔗 Activating CRM (Salesforce MCP)

In `nexus-dashboard/.env.local`:

```env
SALESFORCE_MCP_URL=https://mcp.salesforce.com/sse
SALESFORCE_CONNECTED=true
```

Restart the server. The CRM page will route live prompts through the MCP server.

### 🗄️ Activating Data Warehouse (Snowflake / BigQuery MCP)

In `nexus-dashboard/.env.local`:

```env
DW_MCP_URL=https://your-dw-mcp-url/sse
DW_CONNECTED=true
```

Restart the server. Natural-language queries will be sent to the MCP server.

---

## ✨ Core Framework Capabilities

- **🔧 Universal Tool Integration:** Connect to anything with an MCP server. Pre-configured connections for GitHub, databases, and local file systems.
- **🤝 Advanced Multi-Agent Orchestration:** Sophisticated workflows with teams of specialized agents that collaborate to solve complex problems.
- **⚡ Production-Ready from Day One:** Comprehensive logging (Winston), monitoring hooks, and full type safety throughout.
- **📦 Containerized and Scalable:** Docker multi-stage builds for both the framework and the dashboard.

---

## ▶️ Framework Example Usage

```typescript
import AgentAccelerator, { ServerConfig, WorkflowOptions } from './src/main';

const servers: ServerConfig[] = [
  { name: "github" },
  { name: "sonarqube", url: "http://localhost:9000" },
  { name: "eslint" },
  { name: "jest" }
];

const accelerator = new AgentAccelerator();
accelerator.registerServers(servers);

const options: WorkflowOptions = { timeout: 30000, retries: 3 };
accelerator.runWorkflow("code-review-workflow", options);
```

---

## 🏁 Getting Started

### Prerequisites

- ✅ Node.js 18+
- ✅ npm 8+
- ✅ Anthropic API Key (for the dashboard and Anthropic-powered workflows)
- ✅ GitHub Token (for GitHub MCP integration)
- ✅ Docker (optional)

### 🛠️ Framework Setup

```bash
# Clone the repository
git clone https://github.com/ATaylorAerospace/MCP-Agent-Accelerator.git
cd MCP-Agent-Accelerator

# Install framework dependencies
npm install

# Type-check
npm run typecheck

# Build
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### 🖥️ Dashboard Setup

```bash
# Install dashboard dependencies
npm run dashboard:install

# Start the dashboard dev server
npm run dashboard

# Build the dashboard for production
npm run dashboard:build
```

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| 🔤 Framework languages | TypeScript, Python |
| 🖥️ Dashboard | Next.js 14 (App Router), React 18, Tailwind CSS |
| 🤖 AI provider | Anthropic (`claude-sonnet-4-20250514`) |
| 📡 Protocols | MCP, gRPC, REST |
| 🎨 Icons | Lucide React |
| 🔤 Fonts | DM Sans, JetBrains Mono |
| 📋 Logging | Winston (structured JSON) |
| 🧪 Testing | Jest + ts-jest |
| 🐳 Infrastructure | Docker, Kubernetes |

---

## 🏛️ Architecture

The project separates concerns across two distinct layers:

**⚙️ Framework core (`src/`)** — Protocol-agnostic agent orchestration. The `AgentAccelerator` class handles MCP server registration, workflow routing, and structured logging. Python and TypeScript implementations share the same interface contract.

**🖥️ Dashboard (`nexus-dashboard/`)** — A Next.js 14 App Router application that consumes the Anthropic SDK directly from API routes and connects to MCP-enabled services (Salesforce, Snowflake/BigQuery) via environment-gated server stubs. The UI uses a dark design system built on CSS custom properties, Tailwind CSS, and a shared component library.

---

## 🙏 Contributing

Contributions of all kinds are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

- **🔌 New Connectors:** Help integrate more tools via MCP.
- **🤝 Orchestration Patterns:** Share workflow ideas.
- **🖥️ Dashboard Modules:** Add new intelligence panels.
- **📖 Examples and Docs:** Improve developer experience.
- **🚀 Performance Tuning:** Make the framework faster and more efficient.

---

## 👤 Author

**A Taylor**

## 📄 License

MIT © A Taylor
