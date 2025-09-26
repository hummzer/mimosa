// src/app/signals/page.tsx
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RefreshCw, Signal, AlertCircle, TrendingUp, TrendingDown, Clock, ExternalLink } from 'lucide-react';

// Define the Trade type from schema.prisma
interface Trade {
    id: string;
    symbol: string;
    signal: 'buy' | 'sell' | 'hold'; // Match the logic in signals/route.ts
    timestamp: string; // ISO Date String
}

export default function SignalsPage() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      // Redirect to signin if not authenticated
      router.push('/auth/signin');
      return;
    } 
    
    if (status === 'authenticated') {
      const fetchTrades = async () => {
        setLoading(true);
        setError('');
        try {
          // Fetch historical trades using the GET /api/trades endpoint
          const res = await axios.get('/api/trades');
          // Displaying newest first
          setTrades(res.data.reverse()); 
        } catch (err: any) {
          console.error('Failed to fetch signals/trades:', err);
          setError(err.response?.data?.error || 'Failed to fetch signal history. Authentication or API issue.');
        } finally {
            setLoading(false);
        }
      };
      fetchTrades();
    }
  }, [status, router]);

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
    });
  };

  if (status === 'loading' || loading) {
    return (
        <div className="flex justify-center items-center min-h-screen bg-black text-gray-400">
            <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
            <span className="font-light text-sm">Loading Signal History...</span>
        </div>
    );
  }

  if (error) {
    return (
        <div className="flex justify-center items-center min-h-screen bg-black text-red-400 p-8">
            <div className="flex items-center bg-gray-950 border border-red-900 p-6 rounded-lg">
                <AlertCircle className="h-5 w-5 mr-3" /> 
                <span className="font-light text-sm">{error}</span>
            </div>
        </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen p-4 sm:p-8 flex flex-col items-center">
        <header className="max-w-4xl w-full border-b border-gray-900 pb-4 mb-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Signal className="h-6 w-6 text-blue-400 mr-3 font-thin" />
                    <h1 className="text-3xl font-thin tracking-wide">Signal History Log</h1>
                </div>
                <Link href="/dashboard" className="text-sm text-gray-500 hover:text-white transition-colors flex items-center font-light">
                    Back to Dashboard <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
            </div>
            <p className="text-sm font-light text-gray-500 mt-1">Review all generated AI signals and corresponding trades.</p>
        </header>

        <main className="max-w-4xl w-full">
            {trades.length === 0 ? (
                <div className="text-gray-500 italic text-center py-10 bg-gray-950 border border-gray-900 rounded-lg">
                    No signals have been generated yet. Try one on the <Link href="/dashboard" className="text-blue-500 underline">Dashboard</Link>.
                </div>
            ) : (
                <div className="space-y-3">
                    {trades.map((trade) => {
                        const isBuy = trade.signal === 'buy';
                        const isSell = trade.signal === 'sell';
                        const signalColor = isBuy ? 'text-green-400' : isSell ? 'text-red-400' : 'text-gray-400';
                        const SignalIcon = isBuy ? TrendingUp : isSell ? TrendingDown : Clock;

                        return (
                            <div key={trade.id} className="flex justify-between items-center bg-gray-950 border border-gray-800 p-4 rounded-lg hover:border-blue-500 transition-colors">
                                <div className="flex items-center space-x-4">
                                    <div className={`p-2 rounded-full ${isBuy ? 'bg-green-900/50' : isSell ? 'bg-red-900/50' : 'bg-gray-800'}`}>
                                        <SignalIcon className={`h-5 w-5 ${signalColor}`} />
                                    </div>
                                    <div>
                                        <p className="text-lg font-light">{trade.symbol}</p>
                                        <p className={`text-sm font-medium uppercase ${signalColor}`}>{trade.signal}</p>
                                    </div>
                                </div>
                                
                                <div className="text-right">
                                    <p className="text-xs text-gray-500 font-thin">Generated At</p>
                                    <p className="text-sm font-light text-gray-300">{formatDate(trade.timestamp)}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </main>
    </div>
  );
}
