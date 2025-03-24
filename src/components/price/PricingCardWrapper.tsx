'use client';

import { plans } from '@/constantes/constantes';
import useModalStore from '@/store/ui/useModale';
import { useUserStore } from '@/store/useUserStore';
import Button from '../button/Button';

export default function PricingCardWrapper() {
  const { profile, updateSubscription } = useUserStore();

  const handleCancelSubscription = () => {
    useModalStore.getState().openModal('RemovePayement');
  };

  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-6 rounded-lg p-6 sm:gap-[4%] lg:mt-5">
      {plans &&
        plans.map((plan, index) => (
          <div
            key={index}
            className="flex min-h-[300px] min-w-[300px] flex-col justify-between rounded-xl border border-regular-gray bg-white p-5 shadow-custom-gray "
          >
            <div>
              <h2 className="text-center text-xl font-semibold text-darkest-blue">
                {plan.name}
              </h2>
              <p className="mt-1 text-center text-3xl font-bold text-darkest-blue">
                {plan.price}
              </p>
              <p className="text-center text-sm ">{plan.storage}</p>

              <ul className="mt-4 space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-dark-blue"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-[36px] w-full">
              {plan.key === profile?.subscription ? (
                <div className="flex size-full items-center justify-center rounded-lg bg-darkest-gray font-bold text-white">
                  Current
                </div>
              ) : profile?.subscription !== 'basic' && plan.key === 'basic' ? (
                <Button
                  onClick={() => handleCancelSubscription()}
                  label="Remove"
                />
              ) : (
                <Button
                  onClick={() => updateSubscription(plan.key)}
                  label={plan.buttonLabel}
                />
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
