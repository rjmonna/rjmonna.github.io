# Copilot instructions

Personal site (React 19 SPA) bundled with Webpack 5 and published to GitHub Pages. There is no test suite and no lint script.

## Commands

- `npm start` – webpack-dev-server on http://localhost:8080 (`webpack.dev.js`, development mode, inline source maps).
- `npm run build` – production bundle into `dist/` (`webpack.prod.js`). `predeploy` runs the same build.
- `npm run deploy` – manual publish of `dist/` to the `gh-pages` branch via `gh-pages`.
- Debugging: VS Code launch configs in `.vscode/launch.json` start the `start-dev-server` task first.

## Architecture

- Single entry `app/index.js`: creates the React root on `#app` and declares all routes. The nav and `<Routes>` live there; add new pages/experiments by creating a component under `app/Components/` and registering both a `<Route>` in `index.js` and a `<Link>` (in the nav, or in `Components/Experiments.js` for experiments).
- Routing uses `HashRouter` (required for GitHub Pages; there's no server-side fallback). Use `<Link to="...">`, not plain hrefs.
- Components are class components with default exports, one per file. Experiments are nested routes rendered through `<Outlet />` in `Experiments.js`; their code is in `app/Components/Experiments/`.
- Webpack config is split: `webpack.common.js` (entry, babel/css loaders, `HtmlWebpackPlugin` template `app/index.html`, `CleanWebpackPlugin`, browser polyfill aliases for `path`/`os`/`crypto`/`vm`/`stream`) merged with `webpack.dev.js` / `webpack.prod.js` through `webpack-merge`.
- `webpack.common.js` reads `.env` with `dotenv` and injects each key as `process.env.<KEY>` via `DefinePlugin`. `.env` is git-ignored; the config throws if no `.env` file exists, so create one (it may be empty of secrets, but must exist and parse) before building or starting.
- Babel config lives under `"babel"` in `package.json` (`preset-env` + `preset-react`); there is no TypeScript source despite the TS tooling in devDependencies.

## Deployment

- `.github/workflows/deploy.yml` runs on push to `master`: `npm ci` → `npm run build` → `peaceiris/actions-gh-pages` publishes `dist/` to the `gh-pages` branch. GitHub Pages must serve that branch.
- Day-to-day work happens on `develop`; merging to `master` deploys. `azure-staticwebapp.yml` also triggers on `master` pushes.
- Dependabot bumps npm dependencies weekly, and major bumps can break CI. The Node version in `deploy.yml` must satisfy the engines of the locked dependencies (Babel 8 and webpack-dev-server 6 need Node ≥ 22).
- `webpack.prod.js` sets `process.env.NODE_ENV = 'production'` at load time so Babel's React preset emits the production JSX runtime. Without it the deployed bundle fails with `jsxDEV is not a function`. Keep this when editing the prod config.
- `npm ci` uses `package-lock.json`; `yarn.lock` is not the source of truth.
