import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Photos() {
  const[vanImg, setVanImg] = useState([])
  const params = useParams();

  useEffect(()=>{
    async function vanImages() {
      const res = await fetch(`https://vanlife-api-8k5o.onrender.com/api/host/vans/${params.id}`)
      const data = await res.json()
      setVanImg(data)
    }
    vanImages();
  },[params.id])

  const vanImgElement = 
      <div key={vanImg.id}>
        <img style={{height: 100}} src={vanImg.imageUrl} alt={vanImg.name} />
      </div>
   
  return (
    <>
      {vanImgElement}
    </>
  )
}

export default Photos
