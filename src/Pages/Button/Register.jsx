import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti'

export default function Register() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch("https://vanlife-api-8k5o.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Registration failed");

      setSuccess(true);
    } catch (err) {
      setError(err);
    } finally {
      setStatus("idle");
    }
  }

  return (
  <div className="signup-container">
    <form onSubmit={handleSubmit} className='signup-form'>
      <h1>Create your account</h1>

      {error && <p style={{ color: 'red' }}>{error.message}</p>}
      {success && (
        <>
          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <p style={{ color: 'green' }}>✅ Registered successfully! Please log in.</p>
        </>
          )
      }


      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />

      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Creating..." : "Sign up"}
      </button>
    </form>
    <p>
        Already have an account?{' '}
        <span>
          <Link style={{ color: '#FF8C38', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'none'}} to='/login'>Login</Link>
        </span>
      </p>
    </div>
  );
}