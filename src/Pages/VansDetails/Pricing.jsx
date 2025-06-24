import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Pricing() {
  const [price, setPrice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const params = useParams()

  useEffect(() => {
    async function vanPrice() {
      try {
        const res = await fetch(`https://vanlife-api-8k5o.onrender.com/api/host/vans/${params.id}`)
        if (!res.ok) throw new Error("Failed to fetch van pricing")
        const data = await res.json()
        setPrice(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    vanPrice()
  }, [params.id])

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!price) return <p>No pricing info found</p>

  return (
    <div>
      <h2>${price.price}<span>/day</span></h2>
    </div>
  )
}

export default Pricing
