import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
function Auth() {
  const authentication = true
  if(!authentication){
    return(
      <Navigate 
        to='login'
        state={{message: 'You must login first'}}
      />
    )
      
  }
  return <Outlet />

}

export default Auth