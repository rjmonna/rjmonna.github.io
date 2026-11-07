import { useEffect, useState } from 'react'

const itemTypes = [
  ['addresses', 'Addresses'],
  ['books', 'Books'],
  ['companies', 'Companies'],
  ['creditCards', 'Credit Cards'],
  ['images', 'Images'],
  ['persons', 'Persons'],
  ['places', 'Places'],
  ['products', 'Products'],
  ['texts', 'Texts'],
  ['users', 'Users'],
  ['custom', 'Custom'],
]

const customTypes = [
  'boolean', 'boolean_digit', 'buildingNumber', 'building_number', 'card_expiration', 'card_number', 'card_type',
  'city', 'company_name', 'counter', 'country', 'countryCode', 'country_code', 'date', 'dateTime', 'date_time',
  'ean', 'email', 'firstName', 'first_name', 'image', 'lastName', 'last_name', 'latitude', 'longText', 'long_text',
  'longitude', 'name', 'null', 'number', 'phone', 'pokemon', 'postcode', 'state', 'streetAddress', 'streetName',
  'street_address', 'street_name', 'text', 'upc', 'uuid', 'vat', 'website', 'word',
]

const formatValue = (value) => {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  return typeof value === 'object' ? JSON.stringify(value) : String(value)
}

const formatAddress = (a) => (a ? `${a.street}, ${a.city}, ${a.zipcode}, ${a.country}` : 'N/A')

function Item({ type, item }) {
  switch (type) {
    case 'addresses':
      return (
        <>
          <strong>{item.street}, {item.city}, {item.zipcode}</strong><br />
          Country: {item.country} ({item.country_code})<br />
          Lat: {item.latitude}, Lon: {item.longitude}
        </>
      )
    case 'books':
      return (
        <>
          <strong>{item.title}</strong> by {item.author}<br />
          Genre: {item.genre} | Publisher: {item.publisher} | Published: {item.published}<br />
          ISBN: {item.isbn}
          <img src={item.image} alt={item.title} width="100" />
          {item.description}
        </>
      )
    case 'companies':
      return (
        <>
          <strong>{item.name}</strong><br />
          Email: {item.email} | Phone: {item.phone} | VAT: {item.vat}<br />
          Country: {item.country} | Website: <a href={item.website}>{item.website}</a>
          <img src={item.image} alt={item.name} width="100" />
          <strong>Contact:</strong>{' '}
          {item.contact ? `${item.contact.firstname} ${item.contact.lastname} - ${item.contact.email}` : 'N/A'}<br />
          <strong>Addresses:</strong>
          {item.addresses?.length > 0 ? (
            <ul>
              {item.addresses.map((address, i) => (
                <li key={i}>{formatAddress(address)}</li>
              ))}
            </ul>
          ) : ' N/A'}
        </>
      )
    case 'creditCards':
      return (
        <>
          <strong>{item.type}</strong><br />
          Number: {item.number}<br />
          Expiration: {item.expiration}<br />
          Owner: {item.owner}
        </>
      )
    case 'images':
      return (
        <>
          <strong>{item.title}</strong>
          <img src={item.url} alt={item.title} width="200" />
          {item.description}
        </>
      )
    case 'persons':
      return (
        <>
          <strong>{item.firstname} {item.lastname}</strong><br />
          Email: {item.email} | Phone: {item.phone}<br />
          Birthday: {item.birthday} | Gender: {item.gender}<br />
          Website: <a href={item.website}>{item.website}</a>
          <img src={item.image} alt={`${item.firstname} ${item.lastname}`} width="100" />
          <strong>Address:</strong> {formatAddress(item.address)}
        </>
      )
    case 'places':
      return <>Latitude: {item.latitude}, Longitude: {item.longitude}</>
    case 'products':
      return (
        <>
          <strong>{item.name}</strong><br />
          Price: ${item.price} (Net: ${item.net_price}, Tax: {item.taxes}%)<br />
          EAN: {item.ean} | UPC: {item.upc}
          <img src={item.image} alt={item.name} width="100" />
          {item.description}<br />
          Categories: {item.categories?.join(', ') ?? 'N/A'} | Tags: {item.tags?.join(', ') ?? 'N/A'}
        </>
      )
    case 'texts':
      return (
        <>
          <strong>{item.title}</strong> by {item.author}<br />
          Genre: {item.genre}<br />
          {item.content}
        </>
      )
    case 'users':
      return (
        <>
          <strong>{item.firstname} {item.lastname}</strong> ({item.username})<br />
          Email: {item.email} | IP: {item.ip}<br />
          Website: <a href={item.website}>{item.website}</a>
          <img src={item.image} alt={item.username} width="100" />
        </>
      )
    case 'custom':
      return Object.keys(item).map((key) => (
        <div key={key}><strong>{key}:</strong> {formatValue(item[key])}</div>
      ))
    default:
      return <>{JSON.stringify(item)}</>
  }
}

export default function AFakeList() {
  const [numberOfItems, setNumberOfItems] = useState(10)
  const [itemType, setItemType] = useState('images')
  const [selectedCustomTypes, setSelectedCustomTypes] = useState([])
  const [response, setResponse] = useState({ url: null })

  let url = `https://fakerapi.it/api/v2/${itemType}?_quantity=${numberOfItems}`
  if (itemType === 'custom') {
    for (const type of selectedCustomTypes) url += `&${type}=${encodeURIComponent(type)}`
  }

  useEffect(() => {
    const controller = new AbortController()

    fetch(url, { signal: controller.signal })
      .then((res) => res.json())
      .then((result) => setResponse({ url, items: result.data ?? [] }))
      .catch((error) => {
        if (error.name !== 'AbortError') setResponse({ url, error })
      })

    return () => controller.abort()
  }, [url])

  const toggleCustomType = (type, checked) =>
    setSelectedCustomTypes((current) =>
      checked ? [...current, type] : current.filter((t) => t !== type),
    )

  const { error, items } = response
  const isLoading = response.url !== url

  return (
    <>
      <h2>A fake list</h2>
      <div className="toolbar">
        <label>
          Number of items{' '}
          <input
            type="number"
            min="1"
            max="1000"
            value={numberOfItems}
            onChange={(e) => setNumberOfItems(Number(e.target.value))}
          />
        </label>
        <label>
          Type{' '}
          <select value={itemType} onChange={(e) => setItemType(e.target.value)}>
            {itemTypes.map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>
      </div>

      {itemType === 'custom' && (
        <div className="chips">
          {customTypes.map((type) => (
            <label key={type}>
              <input
                type="checkbox"
                checked={selectedCustomTypes.includes(type)}
                onChange={(e) => toggleCustomType(type, e.target.checked)}
              />{' '}
              {type}
            </label>
          ))}
        </div>
      )}

      {isLoading && <p>Loading...</p>}
      {!isLoading && error && <p>Error: {error.message}</p>}
      {!isLoading && items && (
        <ul className="card-list">
          {items.map((item, index) => (
            <li key={index}>
              <Item type={itemType} item={item} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
