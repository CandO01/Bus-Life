import React, { useEffect, useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";

function VansDetail() {
  const [van, setVan] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const params = useParams()
  const location = useLocation()

  const searchParams = location.state?.search || ""
  const type = location.state?.type || "all"

  useEffect(() => {
    async function fetchVanDetail() {
      setLoading(true)
      try {
        const res = await fetch(`https://vanlife-api-8k5o.onrender.com/api/vans/${params.id}`)
        if (!res.ok) {
          throw new Error('Failed to fetch van details')
        }
        const data = await res.json()
        setVan(data.vans) 
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchVanDetail()
  }, [params.id])

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h2 style={{ color: 'red' }}>{error}</h2>
  }

  if (!van) {
    return <h2>No van found</h2>
  }

  return (
    <div className='van-detail-container'>
      <Link
        to={`..?${searchParams}`}
        relative='path'
        style={{ display: 'flex', alignItems: 'center', gap: 10 }}
      >
        <IoMdArrowBack />
        <p>Back to {type} vans</p>
      </Link>

      <div className="van-detail">
        <img src={van.imageUrl} alt={van.name} />
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
        <h2>{van.name}</h2>
        <p className='van-price'><span>${van.price}</span>/day</p>
        <p>{van.description}</p>
        <button className='link-button'>Rent this van</button>
      </div>
    </div>
  )
}

export default VansDetail
