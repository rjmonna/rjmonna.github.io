# Deployment

## Flow

`.github/workflows/deploy.yml` runs on every push to `master` (and manually via *workflow_dispatch*):

1. **build** – checkout, Node 24 with npm cache, `npm ci`, `npm run lint`, `npm run build`, then `actions/upload-pages-artifact` uploads `dist/`.
2. **deploy** – `actions/deploy-pages` publishes the artifact to the `github-pages` environment.

This Vite workflow is the only Pages deployment workflow. Do not deploy the repository root with a Jekyll workflow: it publishes the uncompiled `index.html` and JSX instead of `dist/`.

Day-to-day work happens on `develop`; merging into `master` deploys.

## One-time repository setting

Settings → Pages → **Source: GitHub Actions**. With the old "Deploy from a branch" source, the workflow's output is never served. The legacy `gh-pages` branch is no longer used and can be deleted.

## Dependencies and Node version

- Dependabot opens weekly npm update PRs; major bumps can break the build. Check the CI result before merging.
- The Node version in `deploy.yml` must satisfy the `engines` of the locked dependencies (Vite 8 needs Node ≥ 22.18). A too-old Node shows up as `ERR_REQUIRE_ESM` or engine errors during the build.
- `@eslint/js` is pinned to 9 to match ESLint 9; version 10 needs ESLint 10.
- `npm ci` installs from `package-lock.json`; keep it committed and in sync with `package.json`.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Deploy job fails with a Pages/permissions error | Pages source is not set to GitHub Actions. |
| Build fails in CI but works locally | Node version mismatch, or `package-lock.json` out of date (`npm ci` is strict). |
| Browser blocks `/src/main.jsx` with a MIME type error | Pages is serving the source `index.html` rather than the Vite build. Check for another Pages deployment workflow and redeploy using `Deploy to GitHub Pages`. |
| Blank page after deploy | Check the browser console. Assets must load from the site root; do not set a `base` in `vite.config.js` for a user site (`rjmonna.github.io`). |
| 404 on a deep link | A route was linked without the hash router (`<a href>` instead of `<Link>`). |

## Local verification

```
npm run build
npm run preview
```

`preview` serves the production bundle from `dist/`, which is what GitHub Pages will serve.
