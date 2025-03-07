const postCancel = async (subscriptionId: string) => {
  if (!subscriptionId) throw new Error('Subscription ID is missing');

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cancel-subscription`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscriptionId }),
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

    return await response.json();
  } catch (error) {
    console.error('Stripe request error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Unexpected Stripe error'
    );
  }
};

export default postCancel;
