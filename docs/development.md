# Development

## Setup

```
npm install
npm run dev        # http://localhost:8080
```

Node ≥ 22.18 is required (see `engines` in `package.json`).

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` / `npm start` | Vite dev server with hot reload on port 8080. |
| `npm run build` | Production bundle into `dist/`. |
| `npm run preview` | Serve `dist/` locally. |
| `npm run lint` | ESLint over the whole repo. |

There is no test suite.

## Debugging in VS Code

`.vscode/launch.json` has Edge and Firefox configurations. Both run the `start-dev-server` task (`.vscode/tasks.json`) first, which treats the dev server as ready once Vite prints `Local:`.

## Browser checks with Playwright MCP

`.vscode/mcp.json` registers `@playwright/mcp`. Start `npm run dev`, then open `http://localhost:8080/#/…` (note the `#`). If the Playwright server complains that Chrome is missing, run `npx playwright install chrome`.

## Linting

`eslint.config.js` combines `@eslint/js` recommended rules, `eslint-plugin-react` (with the automatic JSX runtime preset) and `eslint-plugin-react-hooks`. `react/prop-types` is off. `dist/` is ignored.

## Environment variables

The Webpack-era `.env` injection is gone. Vite only exposes variables prefixed with `VITE_` through `import.meta.env`; nothing currently uses them. Never put secrets in client-side variables; they end up in the public bundle.
