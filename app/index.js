import React from 'react'
import {createRoot} from 'react-dom/client'
import {
  HashRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"

import About from './Components/About'
import Home from './Components/Home'
import Contact from './Components/Contact'
import Experiments from './Components/Experiments'
import AFakeList from './Components/Experiments/AFakeList'
import AnEditableList from './Components/Experiments/AnEditableList'
import ResizableGrid from './Components/Experiments/ResizableGrid'

import './index.css'

class App extends React.Component{
    render(){
      if (process.env.NODE_ENV !== 'production') {
        console.log('Looks like we are in development mode!')
      }

      return(<Router>
        <nav>
          <ul>
            <li>
              <Link to={``}>Home</Link>
            </li>
            <li>
              <Link to={`experiments`}>Experiments</Link>
            </li>
            <li>
              <Link to={`about`}>About</Link>
            </li>
            <li>
              <Link to={`contact`}>Contact</Link>
            </li>
          </ul>
        </nav>

        <div>
            <Routes>
                <Route path="experiments" element={<Experiments />}>
                    <Route path={`afakelist`} element={<AFakeList />}>
                    </Route>
                    <Route path={`aneditablelist`} element={<AnEditableList />}>
                    </Route>
                    <Route path={`resizablegrid`} element={<ResizableGrid />}>
                    </Route>
                </Route>
                <Route path="about" element={<About />}>
                </Route>
                <Route path="contact" element={<Contact />}>
                </Route>
                <Route index element={<Home />}>
                </Route>
            </Routes>
        </div>
    </Router>)}
}

const root = createRoot(document.getElementById("app"));
root.render(<App />);
