import Link from 'next/link';
import React from 'react';
import useModalStore from '@/store/ui/useModale';
import { useUserStore } from '@/store/useUserStore';

const SubscriptionWrapper = () => {
  const { subscription } = useUserStore();

  const handleCancelSubscription = () => {
    useModalStore.getState().openModal('RemovePayement');
  };

  return (
    <>
      <p className="text-darkest-gray">
        Your subscription status :{' '}
        <span className="text-regular-blue">{subscription}</span>
      </p>
      {subscription === 'basic' ? (
        <Link
          href="/pricing"
          className="text-regular-blue hover:text-darkest-blue cursor-pointer duration-500 ease-in-out "
        >
          Upgrade your plan
        </Link>
      ) : (
        <div
          onClick={handleCancelSubscription}
          className="text-regular-blue hover:text-darkest-blue cursor-pointer duration-500 ease-in-out "
        >
          Cancel subscription
        </div>
      )}
    </>
  );
};

export default SubscriptionWrapper;
