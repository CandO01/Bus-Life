import React,{ useState, useEffect } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";
import { useParams } from 'react-router-dom'

function HostVanDetails() {
  const [vanBus, setVanBus] = useState([])

  const params = useParams()
  
  const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

  useEffect(()=>{
    async function vanDetails() {
      const res = await fetch(`https://vanlife-api-8k5o.onrender.com/api/host/vans/${params.id}`)
      const data = await res.json()
      setVanBus(data)
      // console.log(data)
    }
    vanDetails();
  }, [params.id])

  const hostVanDetails = vanBus.map((vanbus)=>{
    return(
          <div key={vanbus.id} className='van-detail-container'>
            <img src={vanbus.imageUrl} alt={vanbus.name} />
            <div className='van-detail-inner-container'>
              <i className={`van-type van-type${vanbus.type}`}>{vanbus.type}</i>
              <h2>{vanbus.name}</h2>
              <p>${vanbus.price}<span>/day</span></p>
            </div>
          </div>
    )
  })

  return (
    <section>
        <Link 
          to='..'
          relative='path'
          style={{display:'flex', alignItems: 'center', gap: 10}}
        >
          <IoMdArrowBack />
          <p>back to vans</p>
        </Link>

        <div className='vandetail-big-container'>
          {hostVanDetails}

          <div className='vans-infolink vandetail-infolink'>
              <NavLink 
                to='.'
                end
                style={({isActive})=>isActive ? activeStyles : null}
                >Details</NavLink>
              <NavLink 
                to='pricing'
                style={({isActive})=>isActive ? activeStyles : null}
                >Pricing</NavLink>
              <NavLink 
                to='photos'
                style={({isActive})=>isActive ? activeStyles : null}
                >Photos</NavLink>
          </div>

          <Outlet />
        </div>

    </section>
  )
}

export default HostVanDetails
