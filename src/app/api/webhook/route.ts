// src/app/api/webhook/route.ts

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

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      if (userId) {
        await prisma.subscription.upsert({
          where: { userId },
          update: { stripeId: session.subscription as string, status: 'active' },
          create: { userId, stripeId: session.subscription as string, status: 'active' },
        });
      }
      break;

    case 'customer.subscription.updated':
      const subscription = event.data.object as Stripe.Subscription;
      const user = await prisma.user.findFirst({ where: { subscription: { stripeId: subscription.id } } });
      if (user) {
        await prisma.subscription.update({
          where: { userId: user.id },
          data: { status: subscription.status },
        });
      }
      break;

    case 'invoice.payment_failed':
      // Optionally handle failed payments, e.g., send an email to the user
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}