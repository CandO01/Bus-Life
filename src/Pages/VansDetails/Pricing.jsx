import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Pricing() {
  const [price, setPrice] = useState([])
  const params = useParams()

  useEffect(()=>{

    async function vanPrice() {
      const res = await fetch(`https://vanlife-api-8k5o.onrender.com/api/host/vans/${params.id}`)
      const data = await res.json()
      setPrice(data)
    }
    vanPrice();
  }, [params.id])

  const vanPricesEl = 
      <div key={price.id}>
        <h2>${price.price}<span>/day</span></h2>
      </div>
  
  return (
    <>
      {vanPricesEl}
    </>
  )
}

export default Pricing
