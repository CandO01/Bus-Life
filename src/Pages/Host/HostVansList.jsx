import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function HostVansList() {
  const [van, setVan] = useState([])

  useEffect(()=>{
    async function vanList() {
      try{
        const res = await fetch(`https://vanlife-api-8k5o.onrender.com/api/host/vans`)
        if(!res.ok){
          throw new Error('Fetch failed')
        }
        const data = await res.json()
         setVan(data)

      }catch(err){
        console.error('Error fetching vans:', err)
      }
    }
    vanList();
  },[])

  const hostVanEls = van.map((vanItem)=>(
                    <Link
                      to={`/host/vans/${vanItem.id}`}
                      key={vanItem.id}
                      className='host-van-link-wrapper'
                    >
                      <div className = 'host-van-single' key={vanItem.id}>
                        <img src={vanItem.imageUrl} alt={vanItem.name} />
                        <div className='host-van-info'>
                          <h2>{vanItem.name}</h2>
                          <p>${vanItem.price}<span>/day</span></p>
                        </div>
                      </div>
                    </Link>
                  ))

  return (
    <section>
      <h1 className='host-vans-title'>Your listed vans</h1>
      <div className='host-vans-list'>
       {van.length > 2 ? (
        <section>
          {hostVanEls}
        </section>
        ) : (
            <p>Loading...</p>
        )}
      </div>
    </section>
  )
}
export default HostVansList
