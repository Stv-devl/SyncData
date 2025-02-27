import React, { SVGProps } from 'react';

/**
 * IconLogout component
 * @param {React.SVGProps<SVGSVGElement>} props - The props for the IconLogout component
 * @returns {React.ReactElement} The IconLogout component
 */
const IconLogout: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={props.width || 35}
      height={props.height || 35}
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      {...props}
    >
      <path
        d="M4.375 34.375C3.34375 34.375 2.46125 34.0081 1.7275 33.2744C0.99375 32.5406 0.62625 31.6575 0.625 30.625V4.375C0.625 3.34375 0.9925 2.46125 1.7275 1.7275C2.4625 0.99375 3.345 0.62625 4.375 0.625H17.5V4.375H4.375V30.625H17.5V34.375H4.375ZM25 26.875L22.4219 24.1562L27.2031 19.375H11.875V15.625H27.2031L22.4219 10.8438L25 8.125L34.375 17.5L25 26.875Z"
        fill={props.fill || 'currentColor'}
      />
    </svg>
  );
};

export default IconLogout;
