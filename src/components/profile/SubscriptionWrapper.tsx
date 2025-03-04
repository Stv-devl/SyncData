import React from 'react';

const SubscriptionWrapper = () => {
  return (
    <>
      <p className="text-darkest-gray">
        Your subscription status :{' '}
        <span className="text-regular-blue cursor-pointer">Free</span>
      </p>
      <p className="text-regular-blue cursor-pointer">Cancel subscription</p>
    </>
  );
};

export default SubscriptionWrapper;
