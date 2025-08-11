import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../AuthenticationContext/AuthContext';
function HostLayout() {
  const { user } = useContext(AuthContext);
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
  }

  // Get user email from location or localStorage
  // const location = useLocation()

  return (
    <>
      {/* 👋 Welcome Message
      {user && (
        <div style={{
          backgroundColor: '#f1f1f1',
          padding: '10px 20px',
          borderBottom: '1px solid #ddd',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          👋 Hi, {user}!
        </div>
      )} */}

      {/* Host Navigation */}
      <nav className='host-nav'>
        <NavLink 
          to='.'
          end
          style={({ isActive }) => isActive ? activeStyles : null}
        >Dashboard</NavLink>

        <NavLink 
          to='income'
          style={({ isActive }) => isActive ? activeStyles : null}
        >Income</NavLink>

        <NavLink 
          to='vans'
          style={({ isActive }) => isActive ? activeStyles : null}
        >Vans</NavLink>

        <NavLink 
          to='reviews'
          style={({ isActive }) => isActive ? activeStyles : null}
        >Reviews</NavLink>
      </nav>

      {/* Page content */}
      <Outlet />
    </>
  )
}

export default HostLayout
