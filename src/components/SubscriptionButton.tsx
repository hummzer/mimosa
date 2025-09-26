// src/components/SubscriptionButton.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { DollarSign, CheckCircle } from 'lucide-react';

interface SubscriptionButtonProps {
  subscriptionStatus: 'active' | 'inactive' | null;
}

const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({ subscriptionStatus }) => {
  if (subscriptionStatus === 'active') {
    return (
      <div className="flex items-center space-x-2 p-2 px-3 bg-green-900/30 border border-green-800 rounded-lg">
        <CheckCircle className="h-4 w-4 text-green-400 font-thin" />
        <span className="text-xs font-light text-green-300 tracking-wider">
          Active Subscription
        </span>
      </div>
    );
  }

  // If status is inactive or null (unauthenticated user on public page)
  return (
    <Link href="/pricing" legacyBehavior>
      <a className="flex items-center space-x-2 p-2 px-3 bg-blue-600/50 border border-blue-600 hover:bg-blue-700/50 transition-colors rounded-lg">
        <DollarSign className="h-4 w-4 text-white font-thin" />
        <span className="text-xs font-light text-white tracking-wider">
          View Pricing
        </span>
      </a>
    </Link>
  );
};

export default SubscriptionButton;
