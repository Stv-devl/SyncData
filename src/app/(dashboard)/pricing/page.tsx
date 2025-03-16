import PricingCardWrapper from '@/components/price/PricingCardWrapper';

export default function Pricing() {
  return (
    <div className=" flex h-full  flex-col bg-white">
      <div className="mt-3 flex flex-col items-center justify-center gap-2 lg:mt-16 ">
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
