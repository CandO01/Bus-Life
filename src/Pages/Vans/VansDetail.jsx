import React,{ useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";
import { useParams } from 'react-router-dom';


function VansDetail() {
  const [vans, setVans] = useState(null)

const params = useParams()

  useEffect(()=>{
    async function vanDetailing() {
      const res = await fetch(`http://localhost:8254/api/vans/${params.id}`)
      const data = await res.json()
      setVans(data)
    }

    vanDetailing()
  }, [params.id])
  return (
    <div className='van-detail-conatiner'>
      <Link to='/vans' style={{display:'flex', alignItems:'center', gap: 10}}>
        <IoMdArrowBack /> 
        <p>back to vans</p>
      </Link>

      {vans ? (<div className="van-detail">
        <img src={vans.imageUrl} alt="" />
        <i className={`van-type ${vans.type} selected`}>{vans.type}</i>
        <h2>{vans.name}</h2>
        <p className='van-price'><span>${vans.price}</span>/day</p>
        <p>{vans.description}</p>
        <button className='link-button'>Rent this van</button>
      </div>
      ) : ( <h1>Loading....</h1>)}
    </div>


  )
}

export default VansDetail