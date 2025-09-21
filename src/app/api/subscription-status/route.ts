// src/app/api/subscription-status/route.ts

import {  NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ status: 'unauthenticated' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { subscription: true },
  });

  if (!user || !user.subscription || user.subscription.status !== 'active') {
    return NextResponse.json({ status: 'inactive' }, { status: 200 });
  }

  return NextResponse.json({ status: 'active' }, { status: 200 });
}