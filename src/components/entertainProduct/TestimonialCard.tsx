'use client';

import Image from 'next/image';
import { TestimonialCardProps } from '@/types/type';

/**
 * Individual testimonial card component
 * @param {Object} props - Component props
 * @param {Object} props.testimonial - Testimonial data object
 * @returns {JSX.Element} Testimonial card component
 */

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="rounded-xl  bg-white p-6 shadow-custom-gray">
      <div className="mb-4 flex items-center">
        <div className="size-12 rounded-full bg-light-blue">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            width={48}
            height={48}
            className="size-12 rounded-full object-cover"
          />
        </div>
        <div className="ml-4">
          <h4 className="font-semibold text-darkest-blue">
            {testimonial.name}
          </h4>
          <p className="text-sm">{testimonial.company}</p>
        </div>
      </div>
      <p>{testimonial.comment}</p>
      <div className="mt-4 flex">
        {Array(testimonial.rating)
          .fill(0)
          .map((_, i) => (
            <span key={i} className="text-yellow-400">
              ★
            </span>
          ))}
      </div>
    </div>
  );
};

export default TestimonialCard;
