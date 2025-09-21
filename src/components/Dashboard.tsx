// src/components/Dashboard.tsx

import React from 'react';
import SignalForm from './SignalForm';
import TradeLog from './TradeLog';
import SubscriptionButton from './SubscriptionButton';

interface DashboardProps {
  subscriptionStatus: 'active' | 'inactive' | null;
}

const Dashboard: React.FC<DashboardProps> = ({ subscriptionStatus }) => {
  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <h1 className="text-4xl font-light mb-8">Trading Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="col-span-1">
          <SubscriptionButton subscriptionStatus={subscriptionStatus} />
        </div>
        <div className="col-span-1 md:col-span-2">
          <SignalForm subscriptionStatus={subscriptionStatus} />
        </div>
        <div className="col-span-1 md:col-span-2">
          <TradeLog />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;