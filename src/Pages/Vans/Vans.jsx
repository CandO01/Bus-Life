import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import loadingGif from '../Host/images/loading.gif'

export default function Vans(){

  const [vans, setVans] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  //using searchParams for filtering the type of vans
  const [searchParams, setSearchParams] = useSearchParams()
   const typeFilter = searchParams.get('type')



  useEffect(()=>{
      async function vansDataLife() {
        setLoading(true)
        try {
        const res = await fetch('http://localhost:8254/api/vans');
        if (!res.ok){
          throw {
            message: "Failed to fetch vans", 
            statusText: res.statusText,
            status: res.status
        }
        };
        const data = await res.json();
            setVans(data)
            
          } catch (err) {
            setError(err)
          }finally{
            setLoading(false)
          }
      }
      vansDataLife()
  }, [])

     const filteredVans = typeFilter ? vans.filter(bus=>bus.type.toLowerCase()===typeFilter) : vans

     //handling loading
     if(loading){
      return <img style={{width: 100}} src={loadingGif} alt="waiting for images to load" aria-live='polite' />
     }

     //handling errors
     if(error){
      return <h2 aria-live='assertive'>There is an error: {error.message}</h2>
     }

  return(
    <>
    <h3 style={{textAlign: 'center'}}>Explore our van options</h3>
    <div style={{display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'space-evenly'}}>

      <button  
        onClick={()=>setSearchParams({"type":"simple"})}
        className={`van-type simple ${typeFilter ==='simple' ? 'selected' : ''}`}
      >
          Simple
      </button>
      <button  
        onClick={()=>setSearchParams({type:"rugged"})}
        className={`van-type rugged ${typeFilter ==='rugged' ? 'selected' : ''}`}
      >
        Rugged
      </button>
      <button  
        onClick={()=>setSearchParams({type:"luxury"})}
        className={`van-type luxury ${typeFilter ==='luxury' ? 'selected' : ''}`}
      >
        Luxury
      </button>

      {/* {conditionally render the filter button to display when the vans buttons are clicked} */}

      {typeFilter ? (
        <button style={{textDecoration: 'none'}} className='van-type clear-filter' 
        onClick={()=>setSearchParams({})}
      >
        Clear
      </button> ): null}

    </div>
    <div className='van-container'>
      {filteredVans.map((vanning)=>{
        return(
          <div key={vanning.id} className='van-divs'>
            <Link 
              to={`${vanning.id}`} 
              //directing back to the previous page before the vans page 
              state={{ 
                      search: searchParams.toString(),
                      type: typeFilter
                     }}
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
