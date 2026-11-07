import React from 'react'

class AnEditableList extends React.Component{

    constructor(props) {
        super(props)

        this._anEditableListLocalStorageKey = 'AnEditableListItems'

        this.state = {
            error: null,
            isLoaded: false,
            items: {}
        }

        this.handleSaveLocalStorage = this.handleSaveLocalStorage.bind(this)
        this.handleLoadLocalStorage = this.handleLoadLocalStorage.bind(this)
        this.handleChangeValue = this.handleChangeValue.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleAddItem = this.handleAddItem.bind(this)
    }

    componentDidMount() {
        this.setState({
            isLoaded: true,
            items: { data: [{ id: 1, value: 'A' }, { id: 2, value: 'B' }] }
        })
    }

    handleAddItem() {
        const data = this.state.items.data

        const dataToPush = {id: Math.max(...data.map(i => i.id)) + 1, value: 'added'}

        data.push(dataToPush)

        this.setState({
            isLoaded: true,
            items: {
                data: data
            }
        })
    }

    handleSaveLocalStorage() {
        const data = this.state.items.data;

        window.localStorage.setItem(this._anEditableListLocalStorageKey, JSON.stringify(data))
    }

    handleLoadLocalStorage(){
        this.setState({
            isLoaded: true,
            items: {
                data: JSON.parse(window.localStorage.getItem(this._anEditableListLocalStorageKey))
            }
        })
    }

    handleChangeValue(e) {
        const data = this.state.items.data

        const found = data.find((dataItem) => dataItem.id == e.target.dataset.key)

        if (found) {
            found.value = e.target.value
        }

        this.setState({
            isLoaded: true,
            items: {
                data: data
            }
        })
    }

    handleDelete(e) {
        var data = this.state.items.data;

        data = data.filter((currentValue) => currentValue.id != e.target.dataset.key)

        this.setState({
            isLoaded: true,
            items: {
                data: data
            }
        })
    }

    render(){
        const { error, isLoaded, items } = this.state

        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <React.Fragment>
                    <button onClick={this.handleAddItem}>Add</button> <button onClick={this.handleSaveLocalStorage}>Save localStorage</button> <button onClick={this.handleLoadLocalStorage}>Load localStorage</button>
                    <br /><br />
                    <ul>
                        {items.data.map(item => (
                            <li key={item.id}><input data-key={item.id} defaultValue={item.value} onChange={this.handleChangeValue}></input> <button data-key={item.id} onClick={this.handleDelete}>Remove</button></li>
                        ))}
                    </ul>
                </React.Fragment>
            )
        }
    }
}

export default AnEditableList
