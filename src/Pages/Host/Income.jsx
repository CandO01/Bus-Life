import React from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { Link, Outlet } from 'react-router-dom';
function Income() {
  return (
    <> 
    <div style={{display:'flex', alignItems: 'center', gap: 10}}>
      <Link to='yesterday-income'>Yesterday</Link>
      <Link to='today-income'>Today</Link>
      <Link to='tomorrow-income'>Tomorrow</Link>
    </div>
    
    {/* {link back to the host page} */}
     <Link to='/host' style={{display:'flex', alignItems: 'center', gap: 10}}>
       <IoMdArrowBack />
       <p>go back to host</p>
     </Link>

      <Outlet />
    </>
  )
}

export default Income