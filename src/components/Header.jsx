import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaRegCircleUser } from "react-icons/fa6";
function Header() {
  return (
      <header>
          <NavLink className="site-logo" to="/">#CandO</NavLink>
          <nav>
            {/* <NavLink 
              to='/'
              className={({isActive})=>isActive ? 'nav-link' : null}
            >Home</NavLink> */}
            <NavLink 
              to='/host'
              className={({isActive})=>isActive ? 'nav-link' : null}
            >Host</NavLink>
            <NavLink 
              to='/about'
              className={({isActive})=>isActive ? 'nav-link' : null}
            >About</NavLink>
            <NavLink 
              to='/vans'
              className={({isActive})=>isActive ? 'nav-link' : null}
            >Vans</NavLink>
            <Link to='login'>
              <FaRegCircleUser />
            </Link>
          </nav>
      </header>
  )
}

export default Header