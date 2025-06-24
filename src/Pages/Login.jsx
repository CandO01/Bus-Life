import React from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
function Login() {
 const [loginFormData, setLoginFormData] = useState({email: "", password: ""})
 const [status, setStatus] = useState('idle')
 const [error, setError] = useState(null)
 const location = useLocation()
 const navigate = useNavigate()

 //function to handle the submit button

 async function handleSubmit(){
   setStatus('submitting')
   setError(null)
    try {
     
     const url = 'https://vanlife-api-8k5o.onrender.com/login'
     const options =  {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginFormData),
    }
     
    const res = await fetch(url, options);

    const data = await res.json();

    if (res.ok) {
      console.log('✅ Success:', data);
      navigate('/host')
    } else {
      console.error('❌ Error:', data.error);
      alert(data.error);
    }
  } catch (err) {
    setError(err);
  }finally{
     setStatus('idle')
  }
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
     {
       error && (
        <p style={{color:'red', fontWeight: 800}}>
         {error.message}
        </p>
         )
     }
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
        <button type="submit" disabled={status==='submitting'}>{status==='submitting' ? 'Loggin in...' : 'Login'}</button>
      </form>
      <p>Don't have an account? <span style={{color:'#FF8C38', fontWeight:'bold', cursor: 'pointer' }}>Create one now</span></p>
    </div>
  )
}

export default Login
