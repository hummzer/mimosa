'use client';

import React, { useState } from 'react';
import axios from 'axios';

const SignalForm: React.FC = () => {
  const [symbol, setSymbol] = useState('');
  const [signal, setSignal] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/signals', { symbol });
      setSignal(res.data.signal);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="Stock Symbol" />
      <button type="submit">Get Signal</button>
      {signal && <p>Signal: {signal}</p>}
    </form>
  );
};

export default SignalForm;