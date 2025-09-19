'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TradeLog: React.FC = () => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    axios.get('/api/trades').then(res => setTrades(res.data));
  }, []);

  return (
    <div>
      <h2>Trade Log</h2>
      <ul>
        {trades.map((trade: any) => (
          <li key={trade.id}>{trade.symbol} - {trade.signal} at {trade.timestamp}</li>
        ))}
      </ul>
    </div>
  );
};

export default TradeLog;