import React from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';

function Reviews() {
 
  return (
        <>
          <Link to='/host' style={{display:'flex', alignItems: 'center', gap: 10}}>
            <IoMdArrowBack />
            <p>go back to host</p>
          </Link>
          
        </>
  )
}

export default Reviews