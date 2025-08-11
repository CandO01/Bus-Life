// PaymentSuccess.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [statusMessage, setStatusMessage] = useState('Verifying payment...');

  useEffect(() => {
    const status = searchParams.get('status');
    const transactionId = searchParams.get('transaction_id');

    if (status === 'successful' && transactionId) {
      // Call backend to verify
      fetch(`https://vanlife-api-8k5o.onrender.com/api/flutterwave/verify/${transactionId}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success') {
            setStatusMessage('✅ Payment received successfully! Your booking is confirmed.');
          } else {
            setStatusMessage('⚠ Payment verification failed. Please contact support.');
          }
        })
        .catch(() => setStatusMessage('❌ Could not verify payment.'));
    } else {
      setStatusMessage('❌ Payment failed or canceled.');
    }
  }, [searchParams]);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>{statusMessage}</h1>
    </div>
  );
}

export default PaymentSuccess;
