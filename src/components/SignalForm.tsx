// src/components/SignalForm.tsx

'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface SignalFormProps {
  subscriptionStatus: 'active' | 'inactive' | null;
}

const SignalForm: React.FC<SignalFormProps> = ({ subscriptionStatus }) => {
  const [symbol, setSymbol] = useState('');
  const [signal, setSignal] = useState('');
  const { status } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status !== 'authenticated') {
      alert('You must be logged in to get a signal.');
      return;
    }

    if (subscriptionStatus !== 'active') {
      alert('Please subscribe to a plan to access signals.');
      return;
    }

    try {
      const res = await axios.post('/api/signals', { symbol });
      setSignal(res.data.signal);
    } catch (err) {
      console.error(err);
      setSignal('Failed to get signal. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border border-gray-700 rounded-md">
      <h2 className="text-xl font-light mb-4">Get an AI Signal</h2>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        placeholder="Stock Symbol (e.g., TSLA)"
        className="w-full p-2 mb-4 bg-gray-900 text-white rounded-md border border-gray-700"
      />
      <button
        type="submit"
        className="w-full py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-200"
      >
        Get Signal
      </button>
      {signal && <p className="mt-4 text-sm text-green-400">Signal: {signal}</p>}
      {subscriptionStatus === 'inactive' && (
        <p className="mt-4 text-sm text-red-400">
          You need an active subscription to access signals.
        </p>
      )}
    </form>
  );
};

export default SignalForm;