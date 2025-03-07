const postStripeSession = async (plan: string, userId: string) => {
  if (!plan || !userId) throw new Error('Plan or userId is missing');

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payement`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan, userId }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Stripe request failed [${response.status}]: ${errorText}`
      );
    }

    const data: { url?: string } = await response.json();

    if (!data.url) {
      throw new Error('Missing URL in Stripe response');
    }

    return data.url;
  } catch (error) {
    console.error('Stripe request error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Unexpected Stripe error'
    );
  }
};

export default postStripeSession;
