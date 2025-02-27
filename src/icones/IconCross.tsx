import React from 'react';

/**
 * IconCross component
 * @param {React.SVGProps<SVGSVGElement>} props - The props for the IconCross component
 * @returns {React.ReactElement} The IconCross component
 */
const IconCross: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={props.width || 30}
      height={props.height || 30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      {...props}
    >
      <path
        d="M21.0938 8.90625L8.90625 21.0938M8.90625 8.90625L21.0938 21.0938"
        stroke="#0255B0"
        strokeWidth="1.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconCross;
