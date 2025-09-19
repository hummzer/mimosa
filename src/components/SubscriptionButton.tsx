'use client';

import React from 'react';
import axios from 'axios';

const SubscriptionButton: React.FC = () => {
  const handleSubscribe = async () => {
    const res = await axios.post('/api/subscription');
    window.location.href = res.data.url;
  };

  return <button onClick={handleSubscribe}>Subscribe to Premium</button>;
};

export default SubscriptionButton;