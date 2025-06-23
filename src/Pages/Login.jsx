import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
function Login() {
 const [loginFormData, setLoginFormData] = useState({email: "", password: ""})

 const location = useLocation()

 //function to handle the submit button

 function handleSubmit(e){
    e.preventDefault()
    console.log('Submitted')
 }

 function handleChange(e){
    const { value, name } = e.currentTarget
    setLoginFormData((prevObj)=>{
      return {
        ...prevObj,
        [name]: value
      }
    })
 }

 //message to redirect user to sign in or sign up
 const userMessage = location.state?.message

  return (
    <div className="login-container">
      {/* Informing the user to signin  */}
      { 
        userMessage && <h3 style={{color: 'red'}}>{location.state.message}</h3>
      }
      <h1>Sign into your account</h1>
      <form action={handleSubmit} className='login-form'>
        <input 
          type="email"
          name='email'
          placeholder='Enter your email address'
          onChange={handleChange}
          value={loginFormData.email}
        />
        <input 
          type="password"
          name='password' 
          placeholder='Enter your password'
          onChange={handleChange}
          value={loginFormData.password}
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <span style={{color:'#FF8C38', fontWeight:'bold', cursor: 'pointer' }}>Create one now</span></p>
    </div>
  )
}

export default Login