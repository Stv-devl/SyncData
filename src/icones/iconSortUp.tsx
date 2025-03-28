import React from 'react';

/**
 * IconSortUp component
 * @param {React.SVGProps<SVGSVGElement>} props - The props for the IconSortUp component
 * @returns {React.ReactElement} The IconSortUp component
 */
const IconSortUp: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
        d="M8.52983 0.970072C8.3892 0.829622 8.19858 0.750732 7.99983 0.750732C7.80108 0.750732 7.61045 0.829622 7.46983 0.970072L0.469829 7.97007C0.365072 8.07496 0.293748 8.20854 0.264864 8.35394C0.235979 8.49934 0.250831 8.65003 0.307542 8.787C0.364253 8.92396 0.460281 9.04104 0.583497 9.12346C0.706712 9.20588 0.851589 9.24994 0.999829 9.25007H14.9998C15.1481 9.24994 15.2929 9.20588 15.4162 9.12346C15.5394 9.04104 15.6354 8.92396 15.6921 8.787C15.7488 8.65003 15.7637 8.49934 15.7348 8.35394C15.7059 8.20854 15.6346 8.07496 15.5298 7.97007L8.52983 0.970072Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default IconSortUp;
