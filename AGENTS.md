# Copilot instructions

Personal site (React 19 SPA) bundled with Vite and published to GitHub Pages through the official Pages Actions flow. Details live in [docs/](docs/); read the relevant file before changing that area.

## Commands

- `npm run dev` (or `npm start`) – Vite dev server on http://localhost:8080.
- `npm run build` – production bundle into `dist/`; `npm run preview` serves it.
- `npm run lint` – ESLint flat config. CI runs it before the build. There is no test suite.

## Key rules

- Routing uses `HashRouter` (GitHub Pages has no server-side fallback). Use `<Link>`/`<NavLink>`, never plain hrefs.
- All routes render inside `src/Components/Layout.jsx`; its exported `experiments` array drives both the sidebar submenu and the Experiments index page.
- Function components with hooks only, one per file with a default export. Plain CSS in `src/index.css` with CSS variables for light/dark theming.
- Pushing to `master` deploys (`.github/workflows/deploy.yml`); work happens on `develop`. The workflow's Node version must satisfy the locked dependencies' engines (Vite 8 needs Node ≥ 22.18), and `@eslint/js` stays on 9 to match ESLint 9.

## Docs

- [docs/architecture.md](docs/architecture.md) – file layout, routing, layout/theming, experiments overview.
- [docs/adding-pages.md](docs/adding-pages.md) – steps and conventions for adding an experiment or page.
- [docs/development.md](docs/development.md) – setup, scripts, VS Code debugging, Playwright MCP, linting.
- [docs/deployment.md](docs/deployment.md) – Pages workflow, repository setting, dependency/Node pitfalls, troubleshooting.
