import React,{ useState, useEffect } from 'react'
import { Link, NavLink, Outlet, useParams } from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";

function HostVanDetails() {
  const [vanBus, setVanBus] = useState(null)
  const params = useParams()
  
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
  }

  useEffect(() => {
    async function vanDetails() {
      const res = await fetch(`https://vanlife-api-8k5o.onrender.com/api/host/vans/${params.id}`)
      const data = await res.json()
      setVanBus(data)
    }
    vanDetails()
  }, [params.id])

  return (
    <section>
      <Link 
        to='..'
        relative='path'
        style={{ display: 'flex', alignItems: 'center', gap: 10 }}
      >
        <IoMdArrowBack />
        <p>Back to vans</p>
      </Link>

      {vanBus && (
        <div className='vandetail-big-container'>
          <div className='van-detail-container'>
            <img src={vanBus.imageUrl} alt={vanBus.name} />
            <div className='van-detail-inner-container'>
              <i className={`van-type van-type${vanBus.type}`}>{vanBus.type}</i>
              <h2>{vanBus.name}</h2>
              <p>${vanBus.price}<span>/day</span></p>
            </div>
          </div>

          <div className='vans-infolink vandetail-infolink'>
            <NavLink 
              to='.'
              end
              style={({isActive}) => isActive ? activeStyles : null}
            >
              Details
            </NavLink>
            <NavLink 
              to='pricing'
              style={({isActive}) => isActive ? activeStyles : null}
            >
              Pricing
            </NavLink>
            <NavLink 
              to='photos'
              style={({isActive}) => isActive ? activeStyles : null}
            >
              Photos
            </NavLink>
          </div>

          <Outlet />
        </div>
      )}
    </section>
  )
}

export default HostVanDetails
