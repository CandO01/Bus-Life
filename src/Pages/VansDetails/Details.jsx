import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

function Details() {
  const [info, setInfo] = useState([])

  const params = useParams()

  useEffect(()=>{
    async function vanInfo() {
      const res = await fetch(`https://vanlife-api-8k5o.onrender.com/api/host/vans/${params.id}`)
      const data = await res.json()
      console.log(data)
      setInfo(data)
    }
    vanInfo();
  },[params.id])

    const vanInfoDetail = 
                  <div className='vaninfo-container' key={info.id}>
                    <p><strong>Name:</strong> <span>{info.name}</span></p>
                    <p><strong>Category:</strong> <span>{info.type}</span></p>
                    <p><strong>Description:</strong> <span>{info.description}</span></p>
                    <p><strong>Visibility:</strong> <span>{info.visibility}</span></p>
                  </div>
      

  return (
    <>
     {vanInfoDetail}
    </>
  )
}

export default Details
