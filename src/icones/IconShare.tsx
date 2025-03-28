import React from 'react';

/**
 * IconShare component
 * @param {React.SVGProps<SVGSVGElement>} props - The props for the IconShare component
 * @returns {React.ReactElement} The IconShare component
 */
const IconShare: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      {...props}
    >
      <path
        d="M13.7635 10.1949C13.4356 9.86686 13.0463 9.60664 12.6178 9.42911C12.1893 9.25157 11.73 9.16019 11.2661 9.16019C10.8023 9.16019 10.343 9.25157 9.91452 9.42911C9.48601 9.60664 9.09667 9.86686 8.76875 10.1949L5.20104 13.7636C4.53883 14.426 4.16686 15.3243 4.16695 16.2609C4.16705 17.1975 4.53921 18.0957 5.20156 18.7579C5.86391 19.4201 6.7622 19.7921 7.6988 19.792C8.63541 19.7919 9.53362 19.4197 10.1958 18.7574L10.5302 18.4407M10.1958 13.7636C10.5238 14.0917 10.9131 14.3519 11.3416 14.5294C11.7701 14.707 12.2294 14.7983 12.6932 14.7983C13.1571 14.7983 13.6163 14.707 14.0449 14.5294C14.4734 14.3519 14.8627 14.0917 15.1906 13.7636L18.7573 10.1949C19.4196 9.53268 19.7918 8.63447 19.7919 7.69787C19.792 6.76126 19.42 5.86297 18.7578 5.20062C18.0956 4.53827 17.1974 4.16611 16.2608 4.16602C15.3242 4.16592 14.4259 4.53789 13.7635 5.2001L12.6927 6.20114"
        fill="none"
        stroke={'currentColor'}
        strokeWidth="2.08333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconShare;
