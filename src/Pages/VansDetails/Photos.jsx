import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Photos() {
  const [vanImg, setVanImg] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const params = useParams()

  useEffect(() => {
    async function vanImages() {
      try {
        const res = await fetch(`https://vanlife-api-8k5o.onrender.com/api/host/vans/${params.id}`)
        if (!res.ok) throw new Error('Failed to fetch van image')
        const data = await res.json()
        setVanImg(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    vanImages()
  }, [params.id])

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!vanImg) return <p>No image found</p>

  return (
    <div>
      <img
        style={{ height: 100 }}
        src={vanImg.imageUrl}
        alt={vanImg.name || "Van Image"}
      />
    </div>
  )
}

export default Photos
