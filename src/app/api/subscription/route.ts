import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: 'price_yourstripepriceid', quantity: 1 }],  // From Stripe dashboard
    success_url: `${process.env.NEXTAUTH_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/dashboard`,
    customer_email: session.user.email as string,
  });

  return NextResponse.json({ url: checkoutSession.url });
}