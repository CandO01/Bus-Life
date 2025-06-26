// HostDashboard.js
import React from 'react'
import { useLocation } from 'react-router-dom'

function HostDashboard() {
  const location = useLocation()
  const userFromState = location.state?.user
  const userFromStorage = localStorage.getItem('loggedInUser')

  const user = userFromState || userFromStorage

  return (
    <div>
      {user && <h2>Welcome {user} 👋</h2>}
    </div>
  )
}

export default HostDashboard
