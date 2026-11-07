import React from 'react';
// import { useDrag } from 'react-dnd'
// import { ItemTypes } from './Constants'

import GridCell from './ResizableGrid/GridCell'

class ResizableGrid extends React.Component {

    constructor(props) {
        super(props)

        this._resizableGridLocalStorageKey = 'ResizableGridData'

        this.heightRef = React.createRef()
        this.widthRef = React.createRef()

        this.state = {
            height: 1,
            width: 1,
            error: false,
            isLoaded: false
        }

        this.handleSaveLocalStorage = this.handleSaveLocalStorage.bind(this)
        this.handleLoadLocalStorage = this.handleLoadLocalStorage.bind(this)
        this.handleUpdateHeight = this.handleUpdateHeight.bind(this)
        this.handleUpdateWidth = this.handleUpdateWidth.bind(this)
    }

    componentDidMount() {
        this.setState({
            isLoaded: true
        })
    }

    handleUpdateHeight(e) {
        const value = parseInt(e.target.value)
        
        if (Number.isInteger(value)) {
            this.setState({
                height: value
            })
        }
    }

    handleUpdateWidth(e) {
        const value = parseInt(e.target.value)
        
        if (Number.isInteger(value)) {
            this.setState({
                width: value
            })
        }
    }

    handleSaveLocalStorage() {
        const data = this.state;

        window.localStorage.setItem(this._resizableGridLocalStorageKey, JSON.stringify(data))
    }

    handleLoadLocalStorage() {
        this.setState({
            isLoaded: true,
            ...JSON.parse(window.localStorage.getItem(this._resizableGridLocalStorageKey))
        })
    }

    render(){
        const { height, width, error, isLoaded } = this.state

        var options = <div>
                        <label htmlFor="height">Height</label><input id="height" defaultValue="1" ref={this.heightRef} onChange={this.handleUpdateHeight}></input><br />
                        <label htmlFor="width">Width</label><input id="width" defaultValue="1" ref={this.widthRef} onChange={this.handleUpdateWidth}></input>
                    </div>

        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <React.Fragment>
                    <button onClick={this.handleSaveLocalStorage}>Save localStorage</button> <button onClick={this.handleLoadLocalStorage}>Load localStorage</button>
                    <br/><br/>
                        {options}
                    <br/>
                    {
                        [...Array(height).keys()].map((rowArray, rowIndex) => {
                            return(<div key={rowIndex}>
                                        {[...Array(width).keys()].map((columnArray, columnIndex) =>
                                            <GridCell key={`${rowIndex}_${columnIndex}`} x={rowIndex} y={columnIndex}></GridCell>
                                        )}
                                   </div>)
                        })
                    }
                </React.Fragment>
            )
        }
    }
}

export default ResizableGrid
