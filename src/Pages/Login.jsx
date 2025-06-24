import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Login() {
  const [loginFormData, setLoginFormData] = useState({ email: "", password: "" })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  const userMessage = location.state?.message

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
    setError(null)

    try {
      const res = await fetch('https://vanlife-api-8k5o.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginFormData),
      })

      const data = await res.json()

      if (res.ok) {
        console.log('✅ Success:', data)
        navigate('/host')
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
      {userMessage && <h3 style={{ color: 'red' }}>{userMessage}</h3>}
      <h1>Sign into your account</h1>
      {error && <p style={{ color: 'red', fontWeight: 800 }}>{error.message}</p>}

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
        <span style={{ color: '#FF8C38', fontWeight: 'bold', cursor: 'pointer' }}>
          Create one now
        </span>
      </p>
    </div>
  )
}

export default Login
