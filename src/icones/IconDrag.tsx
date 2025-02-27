import React from 'react';

/**
 * IconDrag component
 * @param {React.SVGProps<SVGSVGElement>} props - The props for the IconDrag component
 * @returns {React.ReactElement} The IconDrag component
 */
const IconDrag: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={props.width || 104}
      height={props.height || 111}
      viewBox="0 0 104 111"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      {...props}
    >
      <path
        d="M101.29 100.243C101.29 102.414 100.339 104.497 98.6462 106.032C96.9535 107.567 94.6576 108.43 92.2636 108.43H11.0264C8.63242 108.43 6.33653 107.567 4.64376 106.032C2.95099 104.497 2 102.414 2 100.243V10.1869C2 8.01562 2.95099 5.93324 4.64376 4.39789C6.33653 2.86255 8.63242 2 11.0264 2H69.6977L101.29 30.6542V100.243Z"
        stroke="#D9D9D9"
        strokeWidth="3.57143"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M45.3538 36.9666C44.3244 36.9666 43.3372 37.3374 42.6093 37.9976C41.8814 38.6578 41.4724 39.5533 41.4724 40.4869V50.3767H30.5776C29.5498 50.3767 28.5639 50.7465 27.8363 51.4049C27.1087 52.0634 26.6987 52.9567 26.6963 53.8889V65.3097C26.6963 67.2582 28.4384 68.8301 30.5776 68.8301H41.4724V78.7117C41.4724 80.6602 43.2145 82.2321 45.3538 82.2321H57.9456C58.975 82.2321 59.9622 81.8612 60.6901 81.201C61.418 80.5408 61.8269 79.6453 61.8269 78.7117V68.8301H72.7217C73.7511 68.8301 74.7383 68.4592 75.4662 67.799C76.1941 67.1388 76.6031 66.2433 76.6031 65.3097V53.8889C76.6031 52.9553 76.1941 52.0598 75.4662 51.3996C74.7383 50.7394 73.7511 50.3685 72.7217 50.3685H61.8269V40.4951C61.8269 39.5615 61.418 38.666 60.6901 38.0058C59.9622 37.3456 58.975 36.9747 57.9456 36.9747L45.3538 36.9666Z"
        stroke="#D9D9D9"
        strokeWidth="3.57143"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconDrag;
