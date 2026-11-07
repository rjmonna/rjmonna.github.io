import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

export const experiments = [
  { to: '/experiments/afakelist', label: 'A fake list' },
  { to: '/experiments/aneditablelist', label: 'An editable list' },
  { to: '/experiments/resizablegrid', label: 'Resizable grid' },
]

const THEME_KEY = 'theme'

function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY))

  useEffect(() => {
    if (theme) {
      document.documentElement.dataset.theme = theme
      localStorage.setItem(THEME_KEY, theme)
    }
  }, [theme])

  const toggle = () => {
    const current =
      theme ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    setTheme(current === 'dark' ? 'light' : 'dark')
  }

  return toggle
}

export default function Layout() {
  const toggleTheme = useTheme()
  const { pathname } = useLocation()

  return (
    <div className="wrapper">
      <header>
        <h1>rjmonna</h1>
        <p>Web experiments and notes.</p>

        <nav aria-label="Main">
          <ul>
            <li>
              <NavLink to="/" end>Home</NavLink>
            </li>
            <li>
              <NavLink to="/experiments">Experiments</NavLink>
              {pathname.startsWith('/experiments') && (
                <ul aria-label="Experiments">
                  {experiments.map(({ to, label }) => (
                    <li key={to}>
                      <NavLink to={to}>{label}</NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </nav>

        <p>
          <a className="button" href="https://github.com/rjmonna/rjmonna.github.io">
            View on GitHub
          </a>
        </p>
        <button type="button" className="link-button" onClick={toggleTheme}>
          Toggle dark mode
        </button>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>Hosted on GitHub Pages</p>
      </footer>
    </div>
  )
}
