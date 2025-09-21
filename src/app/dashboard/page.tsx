// src/app/dashboard/page.tsx

'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Dashboard from '@/components/Dashboard';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [subscriptionStatus, setSubscriptionStatus] = useState<'active' | 'inactive' | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
    if (session) {
      // Fetch subscription status from a new API endpoint
      const fetchSubscriptionStatus = async () => {
        const res = await fetch('/api/subscription-status');
        const data = await res.json();
        setSubscriptionStatus(data.status);
      };
      fetchSubscriptionStatus();
    }
  }, [session, status, router]);

  if (status === 'loading' || !session) {
    return <div className="flex justify-center items-center min-h-screen text-white bg-black">Loading...</div>;
  }

  return <Dashboard subscriptionStatus={subscriptionStatus} />;
}