'use client';

import PricingCardWrapper from '@/components/price/PricingCardWrapper';

export default function Pricing() {
  return (
    <div className="mt-2 flex flex-col sm:mt-3 lg:mt-16 lg:h-full ">
      <div className="flex flex-col items-center justify-center gap-2 ">
        <h1 className="text-darkest-blue text-2xl font-bold  sm:text-4xl">
          Choose your plan
        </h1>
        <p className="mt-3 font-semibold">
          Choose the offer that suits you best.
        </p>
      </div>
      <PricingCardWrapper />
    </div>
  );
}
