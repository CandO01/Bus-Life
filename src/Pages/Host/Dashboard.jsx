import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BsStarFill } from "react-icons/bs"
import loadingGif from './images/loading.gif'
import { AuthContext } from '../../AuthenticationContext/AuthContext'

function Dashboard() {
  const { user } = React.useContext(AuthContext);
  const [vans, setVans] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)


  useEffect(()=>{
    async function dashboardVans() {
      try {
        setLoading(true)
        const res = await fetch('https://vanlife-api-8k5o.onrender.com/api/host/vans')
        if(!res.ok){
          throw new Error('Failed to fetch data')
        }
        const data = await res.json()
        setVans(data)
        console.log(data)

      } catch (err) {
        console.log(err)
        setError(null)
      }finally{
        setLoading(false)
      }
    }
    dashboardVans()
  }, [])

  //error handling
  if(error) return <h2 style={{color: 'red', fontSize: 20}}>Error in the message</h2>

  //looping through the aaray of object data
  const dashboardElement = vans.map((dashVans)=>{
    return(
        <div className="host-van-single" key={dashVans.id}>
          <img src={dashVans.imageUrl} alt="picture of the vans" />
          <div className="host-van-info">
            <h2>{dashVans.name}</h2>
            <p>${dashVans.price}<span>/day</span></p>
          </div>
          <Link to={`vans/${dashVans.id}`} style={{textDecoration: 'none', color: '#161616'}}>View</Link>
        </div>
    )
  })

  return (
          <>
              <section className="host-dashboard-earnings">
                <div className="info">
                    <h1>Welcome {user}!</h1>
                    <p>Income last <span>30 days</span></p>
                    <h2>$2,260</h2>
                </div>
                <Link style={{textDecoration: 'none', color: '#161616'}} to="income">Details</Link>
            </section>
            <section className="host-dashboard-reviews">
                <h2>Review score</h2>

                <BsStarFill className="star" />

                <p>
                    <span>5.0</span>/5
                </p>
                <Link to="reviews">Details</Link>
            </section>
            <section className='host-dashboard-vans'>
              <div className="top">
                    <h2>Your listed vans</h2>
                    <Link style={{textDecoration: 'none', color: '#161616'}} to="vans">View all</Link>
                </div>
                {
                  loading
                  ? <img style={{width: 100}} src={loadingGif} alt='loading images' />
                  :(
                    <>
                      {dashboardElement}
                    </>
                  )
                }
            </section>
          </>
  )
}

export default Dashboard