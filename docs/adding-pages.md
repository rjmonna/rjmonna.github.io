# Adding pages and experiments

## New experiment

1. Create `src/Components/Experiments/MyExperiment.jsx` as a function component with a default export. Start the output with an `<h2>` title; the layout provides the rest.
2. Register the route in `src/main.jsx`:
   ```jsx
   import MyExperiment from './Components/Experiments/MyExperiment'
   // ...
   <Route path="experiments/myexperiment" element={<MyExperiment />} />
   ```
3. Add it to the `experiments` array in `src/Components/Layout.jsx`:
   ```js
   { to: '/experiments/myexperiment', label: 'My experiment' },
   ```
   This updates the sidebar submenu and the Experiments index page.

## New top-level page

1. Create the component in `src/Components/`.
2. Add a `<Route>` under the layout route in `src/main.jsx`.
3. Add a `<NavLink>` list item in the sidebar in `Layout.jsx`.

## Conventions

- Function components and hooks only; one component per file.
- Keep styling in `src/index.css`; reuse existing classes (`toolbar`, `card-list`, `chips`, `grid-row`) and CSS variables (`--bg`, `--fg`, `--link`, `--border`, …) so dark mode keeps working.
- Persisted state goes through `localStorage` with a descriptive key.
- Run `npm run lint` before pushing; CI fails the deploy on lint errors.
