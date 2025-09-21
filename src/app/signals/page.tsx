'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
// import Link from 'next/link';

interface Signal {
  id: string;
  symbol: string;
  signal: string;
  timestamp: string;
}

export default function SignalsPage() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated') {
      const fetchSignals = async () => {
        try {
          const res = await axios.get('/api/signals');
          setSignals(res.data);
        } catch (error) {
          console.error('Failed to fetch signals:', error);
        }
      };
      fetchSignals();
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">Loading...</div>;
  }

  if (session) {
    return (
      <div className="bg-black text-white min-h-screen p-8">
        <h1 className="text-4xl font-light mb-8">AI Trading Signals</h1>
        {signals.length > 0 ? (
          <div className="grid gap-4">
            {signals.map((signal) => (
              <div key={signal.id} className="p-4 border border-gray-800 rounded-lg">
                <p className="font-bold">{signal.symbol}</p>
                <p className="text-gray-400">{signal.signal}</p>
                <p className="text-xs text-gray-500 mt-2">Generated: {new Date(signal.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No signals available. Please check back later.</p>
        )}
      </div>
    );
  }
  
  return null;
}