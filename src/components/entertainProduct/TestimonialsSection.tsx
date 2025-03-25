'use client';

import { testimonials } from '@/constantes/constantes';
import TestimonialCard from './TestimonialCard';

/**
 * Testimonials section component
 * Displays customer reviews and ratings
 * @returns {JSX.Element} Testimonials section component
 */
const TestimonialsSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="mb-12 text-center text-3xl font-semibold text-darkest-blue">
          What Our Customers Say
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
