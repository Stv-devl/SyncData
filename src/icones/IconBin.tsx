import React from 'react';

const IconBin: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={props.width || 28}
      height={props.height || 28}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      {...props}
    >
      <path
        d="M6.99992 22.1667C6.99992 22.7855 7.24575 23.379 7.68334 23.8166C8.12092 24.2542 8.71441 24.5 9.33325 24.5H18.6666C19.2854 24.5 19.8789 24.2542 20.3165 23.8166C20.7541 23.379 20.9999 22.7855 20.9999 22.1667V8.16667H6.99992V22.1667ZM9.33325 10.5H18.6666V22.1667H9.33325V10.5ZM18.0833 4.66667L16.9166 3.5H11.0833L9.91659 4.66667H5.83325V7H22.1666V4.66667H18.0833Z"
        fill={props.fill || 'currentColor'}
      />
    </svg>
  );
};

export default IconBin;
