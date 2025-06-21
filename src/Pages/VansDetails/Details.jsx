import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

function Details() {
  const [info, setInfo] = useState([])

  const params = useParams()

  useEffect(()=>{
    async function vanInfo() {
      const res = await fetch(`http://localhost:8254/api/host/vans/${params.id}`)
      const data = await res.json()
      setInfo(data)
    }
    vanInfo();
  },[params.id])

    const vanInfoDetail = info.map((detail)=>{
      return(
        <div className='vaninfo-container' key={detail.id}>
          <p>Name: <span>{detail.name}</span></p>
          <p>Category: <span>{detail.type}</span></p>
          <p>Description: <span>{detail.description}</span></p>
          <p>Visibility: <span>{detail.visibility}</span></p>
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