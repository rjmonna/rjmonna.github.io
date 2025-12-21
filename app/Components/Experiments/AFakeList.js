import React from 'react'

class AFakeList extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            error: null,
            isLoaded: false,
            numberOfItems: 10,
            items: {},
            itemType: 'images',
            selectedCustomTypes: []
        }

        this.handleChangeNumberOfItems = this.handleChangeNumberOfItems.bind(this)
        this.handleChangeType = this.handleChangeType.bind(this)
        this.handleCustomTypeChange = this.handleCustomTypeChange.bind(this)
    }

    renderValue(value) {
        if (value === null) return 'null';
        if (value === undefined) return 'undefined';
        if (typeof value === 'object') {
            return JSON.stringify(value);
        }
        return value;
    }

    handleCustomTypeChange(type, checked) {
        if (checked) {
            this.setState(prevState => ({
                selectedCustomTypes: [...prevState.selectedCustomTypes, type]
            }), () => this.updateList());
        } else {
            this.setState(prevState => ({
                selectedCustomTypes: prevState.selectedCustomTypes.filter(t => t !== type)
            }), () => this.updateList());
        }
    }

    componentDidMount() {
        this.updateList()
    }

    renderItem(type, item, index) {
        switch(type) {
            case 'addresses':
                return (
                    <li key={index}>
                        <strong>{item.street}, {item.city}, {item.zipcode}</strong><br />
                        Country: {item.country} ({item.country_code})<br />
                        Lat: {item.latitude}, Lon: {item.longitude}
                    </li>
                )
            case 'books':
                return (
                    <li key={index}>
                        <strong>{item.title}</strong> by {item.author}<br />
                        Genre: {item.genre} | Publisher: {item.publisher} | Published: {item.published}<br />
                        ISBN: {item.isbn}<br />
                        <img src={item.image} alt={item.title} style={{width: '100px'}} /><br />
                        {item.description}
                    </li>
                )
            case 'companies':
                return (
                    <li key={index}>
                        <strong>{item.name}</strong><br />
                        Email: {item.email} | Phone: {item.phone} | VAT: {item.vat}<br />
                        Country: {item.country} | Website: <a href={item.website}>{item.website}</a><br />
                        <img src={item.image} alt={item.name} style={{width: '100px'}} /><br />
                        <strong>Contact:</strong> {item.contact ? `${item.contact.firstname} ${item.contact.lastname} - ${item.contact.email}` : 'N/A'}<br />
                        <strong>Addresses:</strong>
                        {item.addresses && item.addresses.length > 0 ? (
                            <ul>
                                {item.addresses.map((addr, i) => (
                                    <li key={i}>{addr.street}, {addr.city}, {addr.zipcode}, {addr.country}</li>
                                ))}
                            </ul>
                        ) : 'N/A'}
                    </li>
                )
            case 'creditCards':
                return (
                    <li key={index}>
                        <strong>{item.type}</strong><br />
                        Number: {item.number}<br />
                        Expiration: {item.expiration}<br />
                        Owner: {item.owner}
                    </li>
                )
            case 'images':
                return (
                    <li key={index}>
                        <strong>{item.title}</strong><br />
                        <img src={item.url} alt={item.title} style={{width: '200px'}} /><br/>
                        {item.description}
                    </li>
                )
            case 'persons':
                return (
                    <li key={index}>
                        <strong>{item.firstname} {item.lastname}</strong><br />
                        Email: {item.email} | Phone: {item.phone}<br />
                        Birthday: {item.birthday} | Gender: {item.gender}<br />
                        Website: <a href={item.website}>{item.website}</a><br />
                        <img src={item.image} alt={`${item.firstname} ${item.lastname}`} style={{width: '100px'}} /><br />
                        <strong>Address:</strong> {item.address ? `${item.address.street}, ${item.address.city}, ${item.address.zipcode}, ${item.address.country}` : 'N/A'}
                    </li>
                )
            case 'places':
                return (
                    <li key={index}>
                        Latitude: {item.latitude}, Longitude: {item.longitude}
                    </li>
                )
            case 'products':
                return (
                    <li key={index}>
                        <strong>{item.name}</strong><br />
                        Price: ${item.price} (Net: ${item.net_price}, Tax: {item.taxes}%)<br />
                        EAN: {item.ean} | UPC: {item.upc}<br />
                        <img src={item.image} alt={item.name} style={{width: '100px'}} /><br />
                        {item.description}<br />
                        Categories: {item.categories ? item.categories.join(', ') : 'N/A'} | Tags: {item.tags ? item.tags.join(', ') : 'N/A'}
                    </li>
                )
            case 'texts':
                return (
                    <li key={index}>
                        <strong>{item.title}</strong> by {item.author}<br />
                        Genre: {item.genre}<br />
                        {item.content}
                    </li>
                )
            case 'users':
                return (
                    <li key={index}>
                        <strong>{item.firstname} {item.lastname}</strong> ({item.username})<br />
                        Email: {item.email} | IP: {item.ip}<br />
                        Website: <a href={item.website}>{item.website}</a><br />
                        <img src={item.image} alt={item.username} style={{width: '100px'}} />
                    </li>
                )
            case 'custom':
                return (
                    <li key={index}>
                        {Object.keys(item).map(key => (
                            <div key={key}><strong>{key}:</strong> {this.renderValue(item[key])}</div>
                        ))}
                    </li>
                )
            default:
                return (
                    <li key={index}>
                        {JSON.stringify(item)}
                    </li>
                )
        }
    }

    updateList() {
        let url = `https://fakerapi.it/api/v2/${this.state.itemType}?_quantity=${this.state.numberOfItems}`;
        if (this.state.itemType === 'custom') {
            this.state.selectedCustomTypes.forEach(type => {
                url += `&${type}=${encodeURIComponent(type)}`;
            });
        }
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        error,
                        isLoaded: true
                    })
                }
            )}

    handleChangeNumberOfItems(e) {
        this.setState({ numberOfItems: Number(e.target.value) },
            () => this.updateList()
        )
    }

    handleChangeType(e) {
        this.setState({ itemType: e.target.value },
            () => this.updateList()
        )
    }

    render(){
        const { error, isLoaded, items, itemType } = this.state

        const customTypesList = [
            'boolean', 'boolean_digit', 'buildingNumber', 'building_number', 'card_expiration', 'card_number', 'card_type',
            'city', 'company_name', 'counter', 'country', 'countryCode', 'country_code', 'date', 'dateTime', 'date_time',
            'ean', 'email', 'firstName', 'first_name', 'image', 'lastName', 'last_name', 'latitude', 'longText', 'long_text',
            'longitude', 'name', 'null', 'number', 'phone', 'pokemon', 'postcode', 'state', 'streetAddress', 'streetName',
            'street_address', 'street_name', 'text', 'upc', 'uuid', 'vat', 'website', 'word'
        ];

        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <React.Fragment>
                    <label htmlFor="numberOfItems">Number of items</label>
                    <input name="numberOfItems" value={this.state.numberOfItems} onChange={this.handleChangeNumberOfItems}></input>
                    <br /><br />
                    <label htmlFor="type">Type</label>
                    <select name="type" value={this.state.itemType} onChange={this.handleChangeType}>
                        <option value="addresses">Adresses</option>
                        <option value="books">Books</option>
                        <option value="companies">Companies</option>
                        <option value="creditCards">Credit Cards</option>
                        <option value="images">Images</option>
                        <option value="persons">Persons</option>
                        <option value="places">Places</option>
                        <option value="products">Products</option>
                        <option value="texts">Texts</option>
                        <option value="users">Users</option>
                        <option value="custom">Custom</option>
                    </select>
                    {this.state.itemType === 'custom' && (
                        <div>
                            <br />
                            <label>Custom Types:</label>
                            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                                {customTypesList.map(type => (
                                    <label key={type} style={{margin: '5px'}}>
                                        <input
                                            type="checkbox"
                                            checked={this.state.selectedCustomTypes.includes(type)}
                                            onChange={(e) => this.handleCustomTypeChange(type, e.target.checked)}
                                        />
                                        {type}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                    <br /><br />
                    <ul>
                        {items.data.map((item, index) => (
                            this.renderItem(itemType, item, index)
                        ))}
                    </ul>
                </React.Fragment>
            );
        }
    }
}

export default AFakeList
