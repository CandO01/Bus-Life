import React from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from "react-icons/fa6"
import { AuthContext } from '../AuthenticationContext/AuthContext'

function Header() {
  const navigate = useNavigate()
  const { isLoggedIn, logout } = React.useContext(AuthContext)

  function handleLogout() {
    logout()
    navigate("/login")
  }

  return (
    <header>
      <NavLink className="site-logo" to="/">#CandO</NavLink>
      <nav>
        <NavLink 
          to="/host"
          className={({ isActive }) => isActive ? 'nav-link' : null}
        >Host</NavLink>
        <NavLink 
          to="/about"
          className={({ isActive }) => isActive ? 'nav-link' : null}
        >About</NavLink>
        <NavLink 
          to="/vans"
          className={({ isActive }) => isActive ? 'nav-link' : null}
        >Vans</NavLink>

        {!isLoggedIn ? (
          <Link to="/login">
            <FaRegCircleUser title="Login" />
          </Link>
        ) : (
          <button onClick={handleLogout} style={{ background: "none", border: "none", color: "red", cursor: "pointer" }}>
            Log Out
          </button>
        )}
      </nav>
    </header>
  )
}

export default Header
