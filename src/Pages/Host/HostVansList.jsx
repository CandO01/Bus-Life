import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function HostVansList() {
  const [van, setVan] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function vanList() {
      try {
        const res = await fetch(`https://vanlife-api-8k5o.onrender.com/api/host/vans`)
        if (!res.ok) {
          throw new Error('Fetch failed')
        }
        const data = await res.json()
        console.log('Host vans API data:', data)
        setVan(data.vans || data) // fallback in case it's a raw array
      } catch (err) {
        console.error('Error fetching vans:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    vanList()
  }, [])

  const hostVanEls = van.map((vanItem) => (
    <Link
      to={`${vanItem.id}`}
      key={vanItem.id}
      className='host-van-link-wrapper'
    >
      <div className='host-van-single'>
        <img src={vanItem.imageUrl} alt={vanItem.name} />
        <div className='host-van-info'>
          <h2>{vanItem.name}</h2>
          <p>${vanItem.price}<span>/day</span></p>
        </div>
      </div>
    </Link>
  ))

  return (
    <section>
      <h1 className='host-vans-title'>Your listed vans</h1>
      <div className='host-vans-list'>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : van.length > 0 ? (
          <section>{hostVanEls}</section>
        ) : (
          <p>No vans found</p>
        )}
      </div>
    </section>
  )
}

export default HostVansList
