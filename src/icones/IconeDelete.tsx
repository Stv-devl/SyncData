import React from 'react';

const IconeDelete: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
        d="M6.25 19.7917C6.25 20.3442 6.4695 20.8741 6.8602 21.2648C7.2509 21.6555 7.7808 21.875 8.33334 21.875H16.6667C17.2192 21.875 17.7491 21.6555 18.1398 21.2648C18.5305 20.8741 18.75 20.3442 18.75 19.7917V7.29167H6.25V19.7917ZM8.33334 9.375H16.6667V19.7917H8.33334V9.375ZM16.1458 4.16667L15.1042 3.125H9.89584L8.85417 4.16667H5.20834V6.25H19.7917V4.16667H16.1458Z"
        fill={props.fill || 'currentColor'}
      />
    </svg>
  );
};

export default IconeDelete;
