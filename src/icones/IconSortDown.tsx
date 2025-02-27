import React from 'react';

/**
 * IconSortDown component
 * @param {React.SVGProps<SVGSVGElement>} props - The props for the IconSortDown component
 * @returns {React.ReactElement} The IconSortDown component
 */
const IconSortDown: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={props.width || 16}
      height={props.height || 10}
      viewBox="0 0 16 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      {...props}
    >
      <path
        d="M0.999829 0.75C0.851589 0.75013 0.706712 0.794188 0.583497 0.876608C0.460281 0.959028 0.364253 1.07611 0.307542 1.21308C0.250831 1.35004 0.235979 1.50074 0.264864 1.64614C0.293748 1.79154 0.365072 1.92511 0.469829 2.03L7.46983 9.03C7.61045 9.17045 7.80108 9.24934 7.99983 9.24934C8.19858 9.24934 8.3892 9.17045 8.52983 9.03L15.5298 2.03C15.6346 1.92511 15.7059 1.79154 15.7348 1.64614C15.7637 1.50074 15.7488 1.35004 15.6921 1.21308C15.6354 1.07611 15.5394 0.959028 15.4162 0.876608C15.2929 0.794188 15.1481 0.75013 14.9998 0.75H0.999829Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default IconSortDown;
