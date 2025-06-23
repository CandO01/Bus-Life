import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='not-found'>
      <h1>404 Error</h1>
      <h2>Sorry, the page you were looking for was not found</h2>
      <marquee behavior="" direction="">Please kindly enter the right url or click on the home button below to take you to the home page.</marquee>
      <Link to='.'>Return home</Link>
    </div>
  )
}

export default NotFound