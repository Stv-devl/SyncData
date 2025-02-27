import React from 'react';

/**
 * IconSort component
 * @param {React.SVGProps<SVGSVGElement>} props - The props for the IconSort component
 * @returns {React.ReactElement} The IconSort component
 */
const IconSort: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={props.width || 15}
      height={props.height || 24}
      viewBox="0 0 15 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      {...props}
    >
      <path
        d="M1.87627 13.4999H12.7538C13.7319 13.4999 14.221 14.714 13.5308 15.4218L8.09203 20.9999C7.66241 21.4405 6.96771 21.4405 6.54266 20.9999L1.0993 15.4218C0.409166 14.714 0.8982 13.4999 1.87627 13.4999ZM13.5308 8.57803L8.09203 2.9999C7.66241 2.55928 6.96771 2.55928 6.54266 2.9999L1.0993 8.57803C0.409166 9.28584 0.8982 10.4999 1.87627 10.4999H12.7538C13.7319 10.4999 14.221 9.28584 13.5308 8.57803Z"
        fill="#737373"
      />
    </svg>
  );
};

export default IconSort;
