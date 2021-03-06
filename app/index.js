import React from 'react'
import ReactDOM from 'react-dom'
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import About from './Components/About'
import Home from './Components/Home'
import Contact from './Components/Contact'
import Experiments from './Components/Experiments'

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
              <Link to={process.env.REACT_APP_URL + "/"}>Home</Link>
            </li>
            <li>
              <Link to={process.env.REACT_APP_URL + "/experiments"}>Experiments</Link>
            </li>
            <li>
              <Link to={process.env.REACT_APP_URL + "/about"}>About</Link>
            </li>
            <li>
              <Link to={`${process.env.REACT_APP_URL}/contact`}>Contact</Link>
            </li>
          </ul>
        </nav>

        <div>
            <Switch>
                <Route path="/experiments">
                    <Experiments />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/contact">
                    <Contact />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </div>
    </Router>)}
}

ReactDOM.render(
   <App />,
   document.getElementById('app')
)
