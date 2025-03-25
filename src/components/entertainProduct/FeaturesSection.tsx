'use client';

import { landingPageFeatures } from '@/constantes/constantes';
import { iconsMap } from '@/constantes/iconsMap';

/**
 * Features section component
 * Displays the main features of SyncData with icons and descriptions
 * @returns {JSX.Element} Features section component
 */
const FeaturesSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="mb-12 text-center text-3xl font-semibold text-darkest-blue">
          Key Features
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {landingPageFeatures.map((feature, index) => {
            const IconComponent =
              iconsMap[feature.icon as keyof typeof iconsMap];
            return (
              <div
                key={index}
                className="rounded-xl p-6 shadow-custom-gray transition-all duration-300 ease-in-out hover:translate-y-[-5px]"
              >
                <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-light-blue">
                  {IconComponent && <IconComponent className="size-6" />}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-darkest-blue">
                  {feature.title}
                </h3>
                <p>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
