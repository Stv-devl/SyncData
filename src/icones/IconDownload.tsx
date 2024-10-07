import React from 'react';

const IconDownload: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={props.width || 23}
      height={props.height || 23}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      {...props}
    >
      <path
        d="M15 16.25V5M8.75 17.5H6.25C5.91848 17.5 5.60054 17.6317 5.36612 17.8661C5.1317 18.1005 5 18.4185 5 18.75V23.75C5 24.0815 5.1317 24.3995 5.36612 24.6339C5.60054 24.8683 5.91848 25 6.25 25H23.75C24.0815 25 24.3995 24.8683 24.6339 24.6339C24.8683 24.3995 25 24.0815 25 23.75V18.75C25 18.4185 24.8683 18.1005 24.6339 17.8661C24.3995 17.6317 24.0815 17.5 23.75 17.5H21.25M20 11.25L15 17.5L10 11.25M21.25 21.25H21.2625"
        stroke={'currentColor'}
        fill="none"
        strokeWidth="2.08333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconDownload;
