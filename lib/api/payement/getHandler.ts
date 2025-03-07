import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-09-30.acacia' as Stripe.LatestApiVersion,
});

export async function getHandler(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing session ID' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not verified' },
        { status: 400 }
      );
    }

    const planName = session.metadata?.plan;
    const subscriptionId = session.subscription;
    if (!planName || !subscriptionId) {
      return NextResponse.json(
        { error: 'Plan name or subscription ID not found' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      planName: planName,
      subscriptionId: subscriptionId,
    });
  } catch (error) {
    console.error('Stripe validation error:', error);
    return NextResponse.json(
      { error: 'Stripe validation failed' },
      { status: 500 }
    );
  }
}
