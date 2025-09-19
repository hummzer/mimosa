'use client';

import { useSession } from 'next-auth/react';
import Dashboard from '@/components/Dashboard';

export default function DashboardPage() {
  const { data: session } = useSession();

  if (!session) return <div>Loading...</div>;

  return <Dashboard />;
}