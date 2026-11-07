import { useState } from 'react'

const STORAGE_KEY = 'ResizableGridData'
const MAX_SIZE = 50

const clamp = (value) => Math.min(MAX_SIZE, Math.max(0, value))

export default function ResizableGrid() {
  const [size, setSize] = useState({ height: 1, width: 1 })

  const update = (key) => (e) => {
    const value = parseInt(e.target.value, 10)
    if (Number.isInteger(value)) setSize((s) => ({ ...s, [key]: clamp(value) }))
  }

  const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(size))

  const load = () => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) setSize(JSON.parse(stored))
  }

  return (
    <>
      <h2>Resizable grid</h2>
      <div className="toolbar">
        <button onClick={save}>Save localStorage</button>
        <button onClick={load}>Load localStorage</button>
      </div>
      <div className="toolbar">
        <label>
          Height{' '}
          <input type="number" min="0" max={MAX_SIZE} value={size.height} onChange={update('height')} />
        </label>
        <label>
          Width{' '}
          <input type="number" min="0" max={MAX_SIZE} value={size.width} onChange={update('width')} />
        </label>
      </div>
      {Array.from({ length: size.height }, (_, row) => (
        <div className="grid-row" key={row}>
          {Array.from({ length: size.width }, (_, column) => (
            <input key={column} aria-label={`Cell ${row},${column}`} defaultValue="test" />
          ))}
        </div>
      ))}
    </>
  )
}
