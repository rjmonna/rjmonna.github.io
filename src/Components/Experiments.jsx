import React from 'react'
import {
  Link,
  Outlet
} from "react-router-dom"

class Experiments extends React.Component{
    render(){
        return(<React.Fragment>
            <p>These are my (simple) development experiments.</p>
                <nav>
                    <ul>
                        <li>
                            <Link to={`/experiments/afakelist`}>A fake list</Link>
                        </li>
                        <li>
                            <Link to={`/experiments/aneditablelist`}>An editable list</Link>
                        </li>
                        <li>
                            <Link to={`/experiments/resizablegrid`}>Resizable grid</Link>
                        </li>
                    </ul>
                </nav>
            <Outlet />
        </React.Fragment>)
    }
}

export default Experiments
