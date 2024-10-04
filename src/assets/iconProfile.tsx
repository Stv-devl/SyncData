import React, { SVGProps } from 'react';

const IconProfile: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || 401}
      height={props.height || 401}
      enableBackground="new 312.809 0 401 401"
      version="1.1"
      viewBox="312.809 0 401 401"
      className={props.className}
      {...props}
    >
      <g transform="matrix(1.223 0 0 1.223 -467.5 -843.44)">
        <rect x="601.45" y="653.07" width="401" height="401" fill="#E4E6E7" />
        <path
          d="m802.38 908.08c-84.515 0-153.52 48.185-157.38 108.62h314.79c-3.87-60.44-72.9-108.62-157.41-108.62z"
          fill="#AEB4B7"
        />
        <path
          d="m881.37 818.86c0 46.746-35.106 84.641-78.41 84.641s-78.41-37.895-78.41-84.641 35.106-84.641 78.41-84.641c43.31 0 78.41 37.9 78.41 84.64z"
          fill="#AEB4B7"
        />
      </g>
    </svg>
  );
};

export default IconProfile;
