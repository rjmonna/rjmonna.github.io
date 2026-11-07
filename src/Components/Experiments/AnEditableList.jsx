import { useState } from 'react'

const STORAGE_KEY = 'AnEditableListItems'

const initialItems = [
  { id: 1, value: 'A' },
  { id: 2, value: 'B' },
]

export default function AnEditableList() {
  const [items, setItems] = useState(initialItems)

  const add = () =>
    setItems((current) => [
      ...current,
      { id: Math.max(0, ...current.map((i) => i.id)) + 1, value: 'added' },
    ])

  const change = (id, value) =>
    setItems((current) => current.map((i) => (i.id === id ? { ...i, value } : i)))

  const remove = (id) => setItems((current) => current.filter((i) => i.id !== id))

  const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(items))

  const load = () => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) setItems(JSON.parse(stored))
  }

  return (
    <>
      <h2>An editable list</h2>
      <div className="toolbar">
        <button onClick={add}>Add</button>
        <button onClick={save}>Save localStorage</button>
        <button onClick={load}>Load localStorage</button>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input
              aria-label={`Item ${item.id}`}
              value={item.value}
              onChange={(e) => change(item.id, e.target.value)}
            />{' '}
            <button onClick={() => remove(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </>
  )
}
