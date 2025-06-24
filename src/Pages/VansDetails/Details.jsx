import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Details() {
  const [info, setInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const params = useParams()

  useEffect(() => {
    async function vanInfo() {
      try {
        const res = await fetch(`https://vanlife-api-8k5o.onrender.com/api/host/vans/${params.id}`)
        if (!res.ok) throw new Error('Failed to fetch van details')
        const data = await res.json()
        setInfo(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    vanInfo()
  }, [params.id])

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!info) return <p>No van info found.</p>

  return (
    <div className='vaninfo-container'>
      <p><strong>Name:</strong> <span>{info.name}</span></p>
      <p><strong>Category:</strong> <span>{info.type}</span></p>
      <p><strong>Description:</strong> <span>{info.description}</span></p>
      <p><strong>Visibility:</strong> <span>{info.visibility || 'Public'}</span></p>
    </div>
  )
}

export default Details

