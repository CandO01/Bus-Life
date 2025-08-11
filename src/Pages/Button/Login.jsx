import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { AuthContext } from '../../AuthenticationContext/AuthContext'

function Login() {
  const [loginFormData, setLoginFormData] = useState({ email: "", password: "" })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const { login, user } = React.useContext(AuthContext)



  const navigate = useNavigate()

  // localStorage.setItem('loggedInUser', loginFormData.email)
 

  

  function handleChange(e) {
    const { name, value } = e.target
    setLoginFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    // setError(null)
    try {
      const res = await fetch('https://vanlife-api-8k5o.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginFormData),
      })

      const data = await res.json()
      console.log(data)

      if (res.ok) {
        login({
          name: data.user,
          email: data.email,
          phone: data.phone,
        });
        
        localStorage.setItem('name', data.user)

        setMessage(data.message)
        console.log('✅ Success:', data.message)
                                        //to get the email of the user
       navigate('/host');
        // navigate(from, {replace: true})
      } else {
        console.error('❌ Error:', data.error)
        setError({ message: data.error })
      }
    } catch (err) {
      setError(err)
    } finally {
      setStatus('idle')
    }
  }

  return (
    <div className="login-container">
      {/* {userMessage && <h3 style={{ color: 'red' }}>{userMessage}</h3>} */}
      <h1>Sign into your account {user?.name || ''}</h1>
      {error && <p style={{ color: 'red', fontWeight: 800 }}>{error.message}</p>}
      {message && <p style={{ color: 'green', fontWeight: 800 }}>{message}</p>}
      <form onSubmit={handleSubmit} className='login-form'>
        <input
          type="email"
          name="email"
          placeholder="Enter your email address"
          onChange={handleChange}
          value={loginFormData.email}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
          value={loginFormData.password}
          required
        />
        <button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <p>
        Don't have an account?{' '}
        <span>
          <Link style={{ color: '#FF8C38', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'none'}} to='/signup'>Sign up now</Link>
        </span>
      </p>
    </div>
  )
}

export default Login
