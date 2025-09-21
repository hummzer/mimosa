// src/components/SubscriptionButton.tsx

'use client';

import React from 'react';
import axios from 'axios';

interface SubscriptionButtonProps {
  subscriptionStatus: 'active' | 'inactive' | null;
}

const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({ subscriptionStatus }) => {
  const handleSubscribe = async () => {
    try {
      // Use your actual Stripe price ID
      const priceId = 'price_1PBhNdB0y41V4p3uIe1V9k6E';
      const res = await axios.post('/api/subscription', { priceId });
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error('Subscription failed:', error);
      alert('Subscription failed. Please try again.');
    }
  };

  if (subscriptionStatus === 'active') {
    return (
      <button className="py-2 px-4 bg-gray-700 text-white rounded-md cursor-not-allowed">
        Subscribed
      </button>
    );
  }

  return (
    <button
      onClick={handleSubscribe}
      className="py-2 px-4 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition-colors"
    >
      Subscribe to Premium
    </button>
  );
};

export default SubscriptionButton;