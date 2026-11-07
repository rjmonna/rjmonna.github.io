# Architecture

## Overview

Single-page React 19 app built with Vite. `index.html` (repo root) loads `src/main.jsx`, which mounts the app on `#app` and declares every route.

```
index.html              Vite entry, mounts #app
vite.config.js          React plugin, dev server on port 8080
eslint.config.js        ESLint 9 flat config (React + hooks rules)
src/
  main.jsx              Router and route table
  index.css             All styling (CSS variables, layout, dark mode)
  Components/
    Layout.jsx          Sidebar + <Outlet />, theme toggle, `experiments` list
    Home/About/Contact  Simple pages
    Experiments.jsx     Index page listing the experiments
    Experiments/        One component per experiment
```

## Routing

- `HashRouter` is required: GitHub Pages serves static files only, so deep links like `/experiments/afakelist` would 404 with `BrowserRouter`. URLs look like `https://rjmonna.github.io/#/experiments/afakelist`.
- Every route is nested under a pathless layout route that renders `Layout`. Pages render into its `<Outlet />`.
- Use `<Link>` / `<NavLink>`; a plain `href="/about"` would leave the hash router.

## Layout and theming

- `Layout.jsx` owns the left sidebar (menu, Experiments submenu, GitHub button, theme toggle) and the main content area. The submenu is only shown while the path starts with `/experiments`.
- The exported `experiments` array is the single source for both the sidebar submenu and the Experiments index page.
- Theming uses CSS variables on `:root`. The default follows `prefers-color-scheme`; the toggle sets `data-theme="light|dark"` on `<html>` and stores the choice under the `theme` key in `localStorage`.
- The grid collapses to one column below 720px.

## Experiments

| Experiment | File | Notes |
| --- | --- | --- |
| A fake list | `Experiments/AFakeList.jsx` | Fetches from https://fakerapi.it/api/v2; type selector, quantity, custom field picker. Requests are keyed on the URL and aborted when it changes. |
| An editable list | `Experiments/AnEditableList.jsx` | In-memory list with add/edit/remove; save/load via `localStorage` key `AnEditableListItems`. |
| Resizable grid | `Experiments/ResizableGrid.jsx` | Height/width inputs (0–50); save/load via `localStorage` key `ResizableGridData`. |

Experiments are self-contained: state lives in the component, and the only persistence is `localStorage`.
