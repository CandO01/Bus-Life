import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
function HostLayout() {
  return (
    <>
      <nav className='host-nav'>

        <NavLink 
          to='.'
          className={({isClicked})=>isClicked ? 'host-link' : null}
        >Dashboard</NavLink>

        <NavLink 
          to='income'
          className={({isClicked})=>isClicked ? 'host-link' : null}
        >Income</NavLink>

        <NavLink 
          to='vans'
          className={({isClicked})=>isClicked ? 'host-link' : null}
        >Vans</NavLink>

        <NavLink 
          to='reviews'
          className={({isClicked})=>isClicked ? 'host-link' : null}
        >Reviews</NavLink>

      </nav>
      <Outlet />
    </>
  )
}

export default HostLayout