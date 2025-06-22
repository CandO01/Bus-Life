import React,{ useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";
import { useParams } from 'react-router-dom';


function VansDetail() {
  const [vans, setVans] = useState([])

const params = useParams()

  useEffect(()=>{
    async function vanDetailing() {
      const res = await fetch(`https://vanlife-api-8k5o.onrender.com/api/vans/${params.id}`)
      const data = await res.json()
      setVans(data)
      console.log(data.map((item)=>item.name))
    }

    vanDetailing()
  }, [params.id])

    const vansElement = vans.map((vanNames)=>{
      return(
        <div key={vanNames.id} className="van-detail">
          <img src={vanNames.imageUrl} alt="" />
          <i className={`van-type ${vanNames.type} selected`}>{vanNames.type}</i>
          <h2>{vanNames.name}</h2>
          <p className='van-price'><span>${vanNames.price}</span>/day</p>
          <p>{vanNames.description}</p>
          <button className='link-button'>Rent this van</button>
      </div>
      )
    })

  return (
    <div className='van-detail-conatiner'>
      <Link to='/vans' style={{display:'flex', alignItems:'center', gap: 10}}>
        <IoMdArrowBack /> 
        <p>back to vans</p>
      </Link>
      {vans.length > 0 ? (<div>
        {vansElement}
      </div>): (
        <h1>Loading...</h1>
      ) }
    </div>


  )
}

export default VansDetail
