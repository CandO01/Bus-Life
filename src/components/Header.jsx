import React from 'react'
import { NavLink } from 'react-router-dom'
function Header() {
  return (
      <header>
          <NavLink className="site-logo" to="/">#VanLife</NavLink>
          <nav>
            <NavLink 
              to='/'
              className={({isActive})=>isActive ? 'nav-link' : null}
            >Home</NavLink>
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
          </nav>
      </header>
  )
}

export default Header