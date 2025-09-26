// src/components/Dashboard.tsx

import React from 'react';
import Link from 'next/link';
import SignalForm from './SignalForm';
import TradeLog from './TradeLog';
import SubscriptionButton from './SubscriptionButton';
import { DollarSign, Signal, BarChart3, ExternalLink, Activity, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';

interface DashboardProps {
  subscriptionStatus: 'active' | 'inactive' | null;
}

// --- Placeholder Component for Missing API Data ---
const PlaceholderStat: React.FC<{ title: string; icon: React.ElementType; trend: 'up' | 'down'; value: string; change: string }> = ({ title, icon: Icon, trend, value, change }) => {
    const isUp = trend === 'up';
    const TrendIcon = isUp ? TrendingUp : TrendingDown;
    const trendColor = isUp ? 'text-green-400' : 'text-red-400';

    return (
        <div className="bg-gray-950 border border-gray-800 p-4 rounded-lg flex items-center justify-between shadow-sm">
            <div className="flex flex-col space-y-1">
                <div className="flex items-center text-gray-500">
                    <Icon className="h-4 w-4 mr-2 text-blue-400/80 font-light" />
                    <h3 className="text-xs font-light uppercase tracking-wider">{title}</h3>
                </div>
                <div className="text-2xl font-thin text-white">{value}</div>
                <div className="flex items-center text-xs">
                    <TrendIcon className={`h-3 w-3 mr-1 ${trendColor}`} />
                    <span className={trendColor}>{change}</span>
                </div>
            </div>
            <AlertCircle className="h-5 w-5 text-yellow-600/50"  />
        </div>
    );
};
// ----------------------------------------------------

const Dashboard: React.FC<DashboardProps> = ({ subscriptionStatus }) => {
  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8 flex flex-col items-center">
      {/* Header */}
      <header className="max-w-4xl w-full mb-8 border-b border-gray-900 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-thin tracking-wide">AI Trader Dashboard</h1>
          <div className="flex items-center space-x-4">
            <SubscriptionButton subscriptionStatus={subscriptionStatus} />
            <Link href="/signals" className="text-gray-400 hover:text-white transition-colors flex items-center text-sm font-light">
                Signals <Signal className="h-4 w-4 ml-1" />
            </Link>
            <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors flex items-center text-sm font-light">
                Pricing <DollarSign className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl w-full space-y-8">
        
        {/* SECTION 1: Placeholder Stats (Requires Backend API implementation) */}
        <h2 className="text-lg font-light border-b border-gray-900 pb-2 text-gray-300">Key Metrics (API Required)</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <PlaceholderStat title="Portfolio Value" icon={DollarSign} trend="up" value="$12,345.00" change="+2.15%" />
            <PlaceholderStat title="Win Rate" icon={Activity} trend="up" value="78%" change="+0.5%" />
            <PlaceholderStat title="Active Trades" icon={BarChart3} trend="down" value="4" change="-1" />
            <PlaceholderStat title="Market Trend" icon={TrendingUp} trend="up" value="Strong Buy" change="3/5" />
        </div>

        {/* SECTION 2: AI Signal Generator */}
        <h2 className="text-lg font-light border-b border-gray-900 pb-2 text-gray-300">Generate Signal</h2>
        <SignalForm subscriptionStatus={subscriptionStatus} />

        {/* SECTION 3: Trade Log (Live API Data) */}
        <div className="bg-gray-950 border border-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <BarChart3 className="h-4 w-4 text-green-400 mr-2 font-thin" />
                    <h2 className="text-lg font-light tracking-wider">Recent Trades (/api/trades)</h2>
                </div>
                <Link href="/signals" className="text-xs text-gray-600 hover:text-white transition-colors flex items-center">
                    View Full Log <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
            </div>
            <TradeLog /> 
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
