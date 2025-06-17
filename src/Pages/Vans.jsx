import React, { useState, useEffect } from 'react'

export default function Vans(){
  const [vans, setVans] = useState([])

  useEffect(()=>{
      async function vansDataLife() {
      try {
        const res = await fetch('http://localhost:8254/api');
        if (!res.ok) throw new Error('Fetch failed');
        const data = await res.json();
            setVans(data)
            
      } catch (err) {
        console.error('Error fetching vans:', err);
      }
      }
      vansDataLife()
  }, [])
  return(
    <>
    <h1 style={{textAlign: 'center'}}>Explore our van options</h1>
    <div className='van-container'>
      {vans.map((vanning, id)=>{
        return(
          <div key={id} className='van-divs'>
            <div className="inner-div">
              <img className='van-image' src={vanning.imageUrl} alt={vanning.name} />
                <h1>{vanning.name}</h1>
                <h2>${vanning.price}<span>/day</span></h2>
              <h3 className={`van-type ${vanning.type} selcted`}>{vanning.type}</h3>
            </div>
          </div>
        )
      })}
    </div>
  </>
  )
}