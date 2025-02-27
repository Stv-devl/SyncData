import React from 'react';

/**
 * IconCrossCircle component
 * @param {React.SVGProps<SVGSVGElement>} props - The props for the IconCrossCircle component
 * @returns {React.ReactElement} The IconCrossCircle component
 */
const IconCrossCircle: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={props.width || 24}
      height={props.height || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      {...props}
    >
      <path
        d="M12 2C17.53 2 22 6.47 22 12C22 17.53 17.53 22 12 22C6.47 22 2 17.53 2 12C2 6.47 6.47 2 12 2ZM15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"
        fill={props.fill || 'currentColor'}
      />
    </svg>
  );
};

export default IconCrossCircle;
