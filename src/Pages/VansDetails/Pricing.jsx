import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Pricing() {
  const [price, setPrice] = useState([])
  const params = useParams()

  useEffect(()=>{

    async function vanPrice() {
      const res = await fetch(`http://localhost:8254/api/host/vans/${params.id}`)
      const data = await res.json()
      setPrice(data)
    }
    vanPrice();
  }, [params.id])

  const vanPricesEl = price.map((prices)=>{
    return (
      <div key={prices.id}>
        <h2>${prices.price}<span>/day</span></h2>
      </div>
    )
  })
  return (
    <>
      {vanPricesEl}
    </>
  )
}

export default Pricing