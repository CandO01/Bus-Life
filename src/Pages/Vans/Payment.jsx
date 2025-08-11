import React from 'react';
import { useLocation } from 'react-router-dom';

function Payment() {
  const location = useLocation();
  const { price, name, imageUrl, id } = location.state || {};

  const [email, setEmail] = React.useState('');
  const [amount] = React.useState(price || '');

  const payWithFlutterwave = async (e) => {
    e.preventDefault();
    const res = await fetch('https://vanlife-api-8k5o.onrender.com/api/flutterwave/init', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, vanId: id })
    });

    const data = await res.json();
    console.log(data);
    if (data.paymentUrl) {
      window.location.href = data.paymentUrl;
    }
  };

  return (
    <div className='payment-container'>
      <h1>Payment Page</h1>

      {/* Van Details Section */}
      <div className="van-summary">
        <img src={imageUrl} alt={name} style={{ width: "200px", borderRadius: "10px" }} />
        <h2>{name}</h2>
        <p><strong>Price:</strong> ${amount}</p>
      </div>

      {/* Payment Form */}
      <form onSubmit={payWithFlutterwave} className='payment-form'>
        <input 
          type="email" 
          placeholder='Enter your email' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <input 
          type="number" 
          value={amount} 
          disabled
        />
        <button type='submit'>Pay Now</button>
      </form>
    </div>
  );
}

export default Payment;
