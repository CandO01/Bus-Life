import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function Vans(){
  const [vans, setVans] = useState([])

  useEffect(()=>{
      async function vansDataLife() {
      try {
        const res = await fetch('https://vanlife-api-8k5o.onrender.com/api/vans');
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
      {vans.map((vanning)=>{
        return(
          <div key={vanning.id} className='van-divs'>
            <Link 
              to={`/vans/${vanning.id}`} 
              style={{textDecoration:'none', color:'black'}}
              aria-label={`View details for ${vanning.name} priced at $${vanning.price} per day`}
              >
              <div className="inner-div">
                <img className='van-image' src={vanning.imageUrl} alt={vanning.name} />
                  <h1>{vanning.name}</h1>
                  <p>${vanning.price}<span>/day</span></p>
                <i className={`van-type ${vanning.type} selcted`}>{vanning.type}</i>
              </div>
            </Link>
          </div>
        )
      })}
    </div>
  </>
  )
}