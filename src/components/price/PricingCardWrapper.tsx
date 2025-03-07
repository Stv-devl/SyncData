'use client';
import Button from '../button/Button';
import RemovePayement from '../modal/modaleType/RemovePayement';
import { plans } from '@/constantes/constantes';
import { modalsMap } from '@/constantes/modalsMap';
import useModalStore from '@/store/ui/useModale';
import { useUserStore } from '@/store/useUserStore';

export default function PricingCardWrapper() {
  const { profile, updateSubscription } = useUserStore();

  const handleCancelSubscription = () => {
    useModalStore.getState().openModal('RemovePayement');
  };

  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-6 p-6 lg:mt-5">
      {plans &&
        plans.map((plan, index) => (
          <div
            key={index}
            className="border-regular-gray shadow-custom-gray flex min-h-[300px] min-w-[300px] flex-col justify-between rounded-xl border bg-white p-5  sm:min-w-[241px]"
          >
            <div>
              <h2 className="text-darkest-blue text-center text-xl font-semibold">
                {plan.name}
              </h2>
              <p className="text-darkest-blue mt-1 text-center text-3xl font-bold">
                {plan.price}
              </p>
              <p className="text-center text-sm ">{plan.storage}</p>

              <ul className="mt-4 space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="bg-dark-blue size-2 rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-[36px] w-full">
              {plan.key === profile?.subscription ? (
                <div className="bg-darkest-gray flex size-full items-center justify-center rounded-lg font-bold text-white">
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
