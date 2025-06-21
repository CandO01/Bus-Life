import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Photos() {
  const[vanImg, setVanImg] = useState([])
  const params = useParams();

  useEffect(()=>{
    async function vanImages() {
      const res = await fetch(`http://localhost:8254/api/host/vans/${params.id}`)
      const data = await res.json()
      setVanImg(data)
    }
    vanImages();
  },[params.id])

  const vanImgElement = vanImg.map((images)=>{
    return (
      <div key={images.id}>
        <img style={{height: 100}} src={images.imageUrl} alt={images.name} />
      </div>
    )
  })
  return (
    <>
      {vanImgElement}
    </>
  )
}

export default Photos