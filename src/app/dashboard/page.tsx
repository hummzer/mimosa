// src/app/dashboard/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from '@/components/Dashboard'; // Import the main Dashboard component
import { useSession } from 'next-auth/react';
import { RefreshCw, AlertCircle } from 'lucide-react';

// Define the type for the subscription status
type SubscriptionStatus = 'active' | 'inactive' | null;

const DashboardPage: React.FC = () => {
  const { status: sessionStatus } = useSession();
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      // Check authentication status first
      if (sessionStatus === 'authenticated') {
        try {
          // Fetch real subscription status from the API
          const res = await axios.get('/api/subscription-status');
          setSubscriptionStatus(res.data.status);
        } catch (error) {
          console.error('Failed to fetch subscription status:', error);
          setSubscriptionStatus('inactive'); // Default to inactive on error
        } finally {
          setLoading(false);
        }
      } else if (sessionStatus === 'unauthenticated') {
        setSubscriptionStatus(null);
        setLoading(false);
      }
    };

    fetchSubscriptionStatus();
  }, [sessionStatus]);

  if (sessionStatus === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-black text-gray-400 flex flex-col items-center justify-center space-y-4">
        <RefreshCw className="h-6 w-6 animate-spin text-blue-500" />
        <p className="font-light text-sm">Initializing dashboard...</p>
      </div>
    );
  }

  if (sessionStatus === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-black text-red-400 flex flex-col items-center justify-center space-y-4">
        <AlertCircle className="h-6 w-6" />
        <p className="font-light text-sm">Please sign in to view your dashboard.</p>
      </div>
    );
  }

  // Render the main Dashboard component with the real subscription status
  return <Dashboard subscriptionStatus={subscriptionStatus} />;
};

export default DashboardPage;
