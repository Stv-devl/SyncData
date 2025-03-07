const getValidateStripePayment = async (sessionId: string) => {
  if (!sessionId) {
    throw new Error('Session ID is not valid');
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payement?session_id=${sessionId}`,
      {
        method: 'GET',
        signal: controller.signal,
      }
    );
    clearTimeout(timeoutId);

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Error validating Stripe payment');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error validating Stripe payment:', error);
    throw error instanceof Error
      ? error
      : new Error('Unknown error validating Stripe payment');
  }
};

export default getValidateStripePayment;
