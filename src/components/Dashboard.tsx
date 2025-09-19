import React from 'react';
import SignalForm from './SignalForm';
import TradeLog from './TradeLog';
import SubscriptionButton from './SubscriptionButton';

const Dashboard: React.FC = () => {
  return (
    <div className="p-4">
      <h1>Trading Dashboard</h1>
      <SubscriptionButton />
      <SignalForm />
      <TradeLog />
    </div>
  );
};

export default Dashboard;