import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'

import Layout from './Components/Layout'
import Home from './Components/Home'
import About from './Components/About'
import Contact from './Components/Contact'
import Experiments from './Components/Experiments'
import AFakeList from './Components/Experiments/AFakeList'
import AnEditableList from './Components/Experiments/AnEditableList'
import ResizableGrid from './Components/Experiments/ResizableGrid'

import './index.css'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="experiments" element={<Experiments />} />
          <Route path="experiments/afakelist" element={<AFakeList />} />
          <Route path="experiments/aneditablelist" element={<AnEditableList />} />
          <Route path="experiments/resizablegrid" element={<ResizableGrid />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

createRoot(document.getElementById('app')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
