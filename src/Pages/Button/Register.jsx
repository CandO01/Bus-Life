import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti'
import { AuthContext } from '../../AuthenticationContext/AuthContext';

export default function Register() {
  const { login } = React.useContext(AuthContext);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirm: ''
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);


    try {
      const res = await fetch("https://vanlife-api-8k5o.onrender.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      console.log(data.user);
      

      if (!res.ok) throw new Error(data.message || "Registration failed");

      setSuccess(true);
      setMessage(data.message || "✅ Registration successful!");
      setForm({ name: '', phone: '', email: '', password: '', confirm: '' });
      setStatus("done");

      //Login user
      const { user } = data
      login(
        { 
          name: user.user, 
          email: user.email, 
          phone: user.phone 
        }
      );

      setTimeout(() => {
        setSuccess(false);
        setMessage(null);
        navigate('/login');
      }, 5000);

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
          <p style={{ color: 'green' }}>{message}</p>
        </>
      )}

      <input 
        type="text" 
        name="name" 
        placeholder="Name"
        value={form.name}
        onChange={handleChange} 
        required />
      <input 
        type="email" 
        name="email" 
        placeholder="Email"
        value={form.email}
        onChange={handleChange} 
        required />
      <input 
        type="tel" 
        name="phone" 
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange} 
        required />
      <input 
        type="password" 
        name="password" 
        placeholder="Password"
        value={form.password}
        onChange={handleChange} 
        required />
      <input 
        type="password" 
        name="confirm" 
        placeholder="Confirm Password"
        value={form.confirm}
        onChange={handleChange} 
        required />

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