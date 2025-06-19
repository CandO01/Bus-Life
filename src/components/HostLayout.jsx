import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
function HostLayout() {
  return (
    <>
      <nav className='host-nav'>
        <NavLink to='.'>Dashboard</NavLink>
        <NavLink to='income'>Income</NavLink>
        <NavLink to='reviews'>Reviews</NavLink>
      </nav>
      <Outlet />
    </>
  )
}

export default HostLayout