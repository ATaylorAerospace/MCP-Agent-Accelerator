# Contributing to MCP-Agent-Accelerator

Contributions are welcome from everyone. This guide covers setup, workflow, and standards for both the core TypeScript/Python framework and the Next.js Agent Accelerator Dashboard.

---

## Prerequisites

| Requirement | Version |
|---|---|
| Node.js | 18+ |
| npm | 8+ |
| Python | 3.9+ (for Python framework work) |
| Anthropic API Key | Required for dashboard development |

---

## Repository Structure

```
MCP-Agent-Accelerator/
├── src/              # Core TypeScript + Python framework
├── nexus-dashboard/  # Agent Accelerator Dashboard (Next.js 14)
└── ...               # Root config, Dockerfiles, docs
```

---

## Framework Setup (`src/`)

```bash
git clone https://github.com/ATaylorAerospace/MCP-Agent-Accelerator.git
cd MCP-Agent-Accelerator

# Install dependencies
npm install

# Verify setup
npm run typecheck
npm test
```

---

## Dashboard Setup (`nexus-dashboard/`)

```bash
# Install dashboard dependencies
npm run dashboard:install

# Create your local environment file
cd nexus-dashboard
cp .env.example .env.local
# Set ANTHROPIC_API_KEY in .env.local

# Start the dev server
cd ..
npm run dashboard
# Open http://localhost:3000
```

---

## Contribution Workflow

1. **Open an issue first** for any non-trivial change to align on approach before writing code.
2. **Fork** the repository and create a descriptive branch:
   - `feature/salesforce-mcp-live` for new features
   - `fix/search-timeout-handling` for bug fixes
   - `docs/dashboard-module-guide` for documentation
3. **Make your changes** following the standards below.
4. **Run all checks** before opening a pull request:

```bash
# Framework checks
npm run typecheck
npm run lint
npm test

# Dashboard checks
cd nexus-dashboard && npm run build && npm run lint
```

5. **Submit a pull request** with a clear description of the change and why it is needed.

---

## Code Standards

### TypeScript / Framework

- Strict TypeScript throughout — no `any` without explicit justification.
- Follow the existing ESLint and Prettier configuration (`.eslintrc.js`, `.prettierrc`).
- All public API surface must have JSDoc comments.
- New features need corresponding tests in `src/index.test.ts` or a dedicated test file.

### Dashboard (Next.js)

- All components must be TypeScript with explicit prop types.
- Use the shared UI components in `nexus-dashboard/src/components/ui/` before creating new ones.
- API routes live in `nexus-dashboard/src/app/api/`. Follow the existing pattern: environment-gated MCP call with mock data fallback.
- Respect the design system: use CSS custom properties from `globals.css` rather than hard-coded colour values.
- All new pages need a `McpSetupBanner` where MCP connectivity is optional.

---

## Areas for Contribution

- **New MCP Connectors** — Add server configurations for tools beyond Salesforce and Snowflake/BigQuery.
- **Dashboard Modules** — New intelligence panels following the existing web-search / crm / data-warehouse page pattern.
- **Orchestration Patterns** — Complex multi-agent workflow examples in `src/`.
- **Python Parity** — Bring `src/main.py` to feature parity with the TypeScript implementation.
- **Testing** — Expand test coverage for both the framework and API routes.
- **Documentation** — Clearer guides, architecture diagrams, and deployment walkthroughs.

---

## Reporting Issues

Use GitHub Issues. Include:

- A clear title and description.
- Steps to reproduce (for bugs).
- Environment details (Node version, OS, browser for dashboard issues).
- Relevant logs or error messages.

---

## Author

**A Taylor**

## License

By contributing you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
