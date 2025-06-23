import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

function Details() {
  const [info, setInfo] = useState([])

  const params = useParams()

  useEffect(()=>{
    async function vanInfo() {
      const res = await fetch(`https://vanlife-api-8k5o.onrender.com/api/host/vans/${params.id}`)
      const data = await res.json()
      setInfo(data)
    }
    vanInfo();
  },[params.id])

    const vanInfoDetail = info.map((detail)=>{
      return(
        <div className='vaninfo-container' key={detail.id}>
          <p><strong>Name:</strong> <span>{detail.name}</span></p>
          <p><strong>Category:</strong> <span>{detail.type}</span></p>
          <p><strong>Description:</strong> <span>{detail.description}</span></p>
          <p><strong>Visibility:</strong> <span>{detail.visibility}</span></p>
        </div>
      )
    })

  return (
    <>
     {vanInfoDetail}
    </>
  )
}

export default Details
