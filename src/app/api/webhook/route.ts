import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-08-27.basil' });

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature') as string;
  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const user = await prisma.user.findUnique({ where: { email: session.customer_email! } });
    if (user) {
      await prisma.subscription.upsert({
        where: { userId: user.id },
        update: { stripeId: session.subscription as string, status: 'active' },
        create: { userId: user.id, stripeId: session.subscription as string, status: 'active' },
      });
    }
  } else if (event.type === 'invoice.payment_failed') {
    // Handle failed payment
  }

  return NextResponse.json({ received: true });
}