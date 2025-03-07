import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-09-30.acacia' as Stripe.LatestApiVersion,
});

const DOMAIN = process.env.NEXT_PUBLIC_ORIGIN || 'http://localhost:3000';

const STRIPE_PRICES = {
  professional: 'price_1QzW73Rxgjxb0gyuVmpCSNaZ',
  business: 'price_1QzW9YRxgjxb0gyupnOAXVwW',
} as const;

type PlanKey = keyof typeof STRIPE_PRICES;

/**
 * Handles Stripe checkout session creation
 */
export async function postHandler(req: Request) {
  try {
    const { plan }: { plan: PlanKey } = await req.json();

    if (!plan || !(plan in STRIPE_PRICES)) {
      return new Response(JSON.stringify({ error: 'Invalid plan selection' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const priceId = STRIPE_PRICES[plan];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${DOMAIN}/success`,
      metadata: { plan },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Stripe error:', error);

    return new Response(
      JSON.stringify({
        error:
          error instanceof Error ? error.message : 'Payment processing failed',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
