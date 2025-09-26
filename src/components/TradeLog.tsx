// src/components/TradeLog.tsx
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RefreshCw, TrendingUp, TrendingDown, Clock, AlertCircle } from 'lucide-react'; 

// Define Trade type
interface Trade {
  id: string;
  symbol: string;
  signal: 'buy' | 'sell' | 'hold'; 
  timestamp: string; 
  pnl?: number; // P&L is optional if not returned by the API
}

const TradeLog: React.FC = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrades = async () => {
        setLoading(true);
        setError('');
        try {
            // Fetch trade history from the provided API endpoint
            const res = await axios.get('/api/trades'); 
            // Only take the last 5 for the dashboard summary
            setTrades(res.data.slice(-5).reverse()); 
        } catch (err: any) {
            console.error('Error fetching trades:', err);
            setError(err.response?.data?.error || 'Failed to load trades. Login required.');
            setTrades([]);
        } finally {
            setLoading(false);
        }
    };

    fetchTrades();
  }, []);

  if (loading) {
    return <div className="text-gray-600 text-xs flex items-center justify-center py-4"><RefreshCw className="h-3 w-3 mr-2 animate-spin"/> Fetching trades...</div>;
  }
  
  if (error) {
    return <div className="text-red-500 text-xs flex items-center py-4"><AlertCircle className="h-3 w-3 mr-1" /> {error}</div>;
  }

  if (trades.length === 0) {
    return <div className="text-gray-700 italic text-xs py-4">No recent trades logged.</div>;
  }

  return (
    <div className="space-y-2">
      {trades.map((trade) => {
        const isBuy = trade.signal === 'buy';
        const isSell = trade.signal === 'sell';
        const signalColor = isBuy ? 'text-green-400' : isSell ? 'text-red-400' : 'text-gray-400';
        const SignalIcon = isBuy ? TrendingUp : isSell ? TrendingDown : Clock;

        return (
          <div key={trade.id} className="flex justify-between items-center py-2 border-b border-gray-900 last:border-b-0">
            <div className="flex items-center space-x-3">
              <SignalIcon className={`h-3 w-3 ${signalColor}`} />
              <p className="text-sm font-light text-white">{trade.symbol}</p>
            </div>
            
            <div className="text-right">
              <p className={`text-xs font-medium uppercase ${signalColor}`}>
                {trade.signal}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TradeLog;
