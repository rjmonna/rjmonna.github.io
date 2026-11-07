import { Link } from 'react-router-dom'
import { experiments } from './Layout'

export default function Experiments() {
  return (
    <>
      <h2>Experiments</h2>
      <p>These are my (simple) development experiments.</p>
      <ul>
        {experiments.map(({ to, label }) => (
          <li key={to}>
            <Link to={to}>{label}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
