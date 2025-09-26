// src/components/SignalForm.tsx
'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { RefreshCw, Signal, AlertCircle } from 'lucide-react'; 

interface SignalFormProps {
    subscriptionStatus: 'active' | 'inactive' | null;
}

const SignalForm: React.FC<SignalFormProps> = ({ subscriptionStatus }) => {
    const [symbol, setSymbol] = useState('');
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);

        if (subscriptionStatus !== 'active') {
            setError('Subscription required to generate signals.');
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post('/api/signals', { symbol: symbol.toUpperCase() });
            setResult(res.data);
            // Refresh trade log here if possible, but for now we rely on user action or a separate hook.
        } catch (err: any) {
            console.error('Signal generation failed:', err);
            setError(err.response?.data?.error || 'Failed to generate signal. Check symbol and subscription.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 border border-gray-900 rounded-lg bg-gray-950">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <input
                    type="text"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value.trim())}
                    placeholder="Enter Stock Symbol (e.g., GOOG, AAPL)"
                    required
                    className="flex-grow p-2.5 text-sm bg-black border border-gray-800 rounded-md focus:border-blue-500 focus:outline-none font-light"
                    disabled={loading || subscriptionStatus !== 'active'}
                />
                <button
                    type="submit"
                    className="flex items-center justify-center p-2.5 text-sm bg-blue-600/80 hover:bg-blue-600 transition-colors rounded-md text-white font-light disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed"
                    disabled={loading || subscriptionStatus !== 'active' || !symbol}
                >
                    {loading ? (
                        <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                        <Signal className="h-4 w-4 mr-2" />
                    )}
                    Generate Signal
                </button>
            </form>

            {(error || result) && (
                <div className="mt-4 p-3 rounded-md text-xs font-light">
                    {error && (
                        <div className="flex items-center text-red-400">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            {error}
                        </div>
                    )}
                    {result && !error && (
                        <div className="text-green-400">
                            <p className="font-semibold mb-1">Generated Signal for {symbol.toUpperCase()}:</p>
                            <p className="flex items-center">
                                <span className={`text-lg font-medium uppercase ${
                                    result.signal === 'buy' ? 'text-green-400' : 
                                    result.signal === 'sell' ? 'text-red-400' : 'text-gray-400'
                                } mr-2`}>
                                    {result.signal}
                                </span> 
                                (Predicted: ${result.predicted.toFixed(2)})
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SignalForm;
