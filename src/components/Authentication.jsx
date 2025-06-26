import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../AuthenticationContext/AuthContext'
function Auth() {
  const location = useLocation()
    const { isLoggedIn } = React.useContext(AuthContext)

  if(!isLoggedIn){
    return(
      <Navigate 
        to='/login'
        state={{
          message: 'You must login first',
          from: location.pathname
        }}
        replace
      />
    )
      
  }
  return <Outlet />

}

export default Auth