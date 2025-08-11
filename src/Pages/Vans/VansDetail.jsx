import React,{ useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";
import { useParams , useLocation, useNavigate} from 'react-router-dom';



function VansDetail() {
  const [vans, setVans] = useState([])

  const navigate = useNavigate()

const params = useParams()

const location = useLocation()
                        //this is called optional chaining
const searchParams = location.state?.search || ""
const type = location.state?.type || "all"

// const type = new URLSearchParams(searchParams).get('type')

  useEffect(()=>{
    async function vanDetailing() {
      const res = await fetch(`https://vanlife-api-8k5o.onrender.com/api/vans/${params.id}`)
      const data = await res.json()
      setVans(data)
    }

    vanDetailing()
  }, [params.id])


    const vansElement = 
        <div key={vans.id} className="van-detail">
          <img  src={vans.imageUrl} alt={vans.name} />
          <i className={`van-type ${vans.type} selected`}>{vans.type}</i>
          <h2>{vans.name}</h2>
          <p className='van-price'><span>${vans.price}</span>/day</p>
          <p>{vans.description}</p>
          <button 
            className='link-button'
            onClick={() => navigate('/payment', { 
                      state: { 
                        id: vans.id,
                        price: vans.price, 
                        name: vans.name,
                        imageUrl: vans.imageUrl 
                      } 
                    })}
          >
            Rent this van
          </button>
      </div>
     

  return (
    <div className='van-detail-conatiner'>
      <Link 
        to={`..?${searchParams}`} 
        relative='path'
        // state={searchParams ? {search: searchParams} : null}
        style={{display:'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#161616'}}>
        <IoMdArrowBack /> 
        <p>back to {type} vans</p>
      </Link>
      {vans ? (<div>
        {vansElement}
      </div>): (
        <h3>Loading...</h3>
      ) }
    </div>


  )
}

export default VansDetail
