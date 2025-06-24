import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom';

export default function Vans() {
  const [vans, setVans] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [searchParams, setSearchParams] = useSearchParams()
  const typeFilter = searchParams.get('type')

  useEffect(() => {
    async function vansDataLife() {
      setLoading(true)
      try {
        const res = await fetch('https://vanlife-api-8k5o.onrender.com/api/vans')
        if (!res.ok) {
          throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
          }
        }
        const data = await res.json()
        setVans(data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    vansDataLife()
  }, [])

  const filteredVans = typeFilter
    ? vans.filter(van => van.type.toLowerCase() === typeFilter)
    : vans

  if (loading) {
    return <h3 aria-live='polite'>Loading...</h3>
  }

  if (error) {
    return <h3 aria-live='assertive'>There is an error: {error.message}</h3>
  }

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Explore our van options</h1>

      <div style={{
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap'
      }}>
        {['simple', 'rugged', 'luxury'].map(type => (
          <button
            key={type}
            onClick={() => setSearchParams({ type })}
            className={`van-type ${type} ${typeFilter === type ? 'selected' : ''}`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}

        {typeFilter && (
          <button
            className='van-type clear-filter'
            onClick={() => setSearchParams({})}
          >
            Clear
          </button>
        )}
      </div>

      <div className='van-container'>
        {filteredVans.map((van) => (
          <div key={van.id} className='van-divs'>
            <Link
              to={`${van.id}`}
              state={{
                search: searchParams.toString(),
                type: typeFilter
              }}
              style={{ textDecoration: 'none', color: 'black' }}
              aria-label={`View details for ${van.name} priced at $${van.price} per day`}
            >
              <div className="inner-div">
                <img className='van-image' src={van.imageUrl} alt={van.name || "Van Image"} />
                <h2>{van.name}</h2>
                <p>${van.price}<span>/day</span></p>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
