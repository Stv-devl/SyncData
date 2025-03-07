import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import useModalStore from '@/store/ui/useModale';
import { useUserStore } from '@/store/useUserStore';

/**
 * PayementResult component that displays a message indicating the result of a payment.
 * @component
 * @returns {JSX.Element} The rendered PayementResult component
 */
const PayementResult = () => {
  const { error } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      useModalStore.getState().closeModal();
      router.push('/pricing');
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      {error ? (
        <p className="text-error-red font-semibold">{error}</p>
      ) : (
        <p className="text-darkest-blue font-semibold">
          Your payment has been successfully processed.
        </p>
      )}
    </div>
  );
};

export default PayementResult;
