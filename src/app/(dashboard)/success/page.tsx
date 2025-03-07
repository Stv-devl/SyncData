'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useUserStore } from '@/store/useUserStore';

/**
 * SuccessPage component that validates the subscription payment and updates the user's subscription status.
 * @component
 * @returns {JSX.Element} The rendered SuccessPage component
 */
const SuccessPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { validateSubscription } = useUserStore();

  const hasValidated = useRef(false);

  useEffect(() => {
    if (!sessionId) {
      console.log('Missing session ID');
      return;
    }

    if (hasValidated.current) return;
    hasValidated.current = true;

    async function validatePayment() {
      try {
        await validateSubscription(sessionId || '');
      } catch (err) {
        console.log('Payment validation failed');
      }
    }

    validatePayment();
  }, [sessionId, validateSubscription]);

  return <></>;
};

export default SuccessPage;
