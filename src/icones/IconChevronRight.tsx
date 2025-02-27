import React, { SVGProps } from 'react';

/**
 * IconChevronRight component
 * @param {React.SVGProps<SVGSVGElement>} props - The props for the IconChevronRight component
 * @returns {React.ReactElement} The IconChevronRight component
 */
const IconChevronRight: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={props.width || 18}
      height={props.height || 18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      {...props}
    >
      <path
        d="M6.75 13.5L11.25 9L6.75 4.5"
        stroke="#737373"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconChevronRight;
