import React from 'react';

/**
 * IconAddFile component
 * @param {React.SVGProps<SVGSVGElement>} props - The props for the IconAddFile component
 * @returns {React.ReactElement} The IconAddFile component
 */
const IconAddFile: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      {...props}
    >
      <path
        d="M15.1667 17.3333H17.3334V15.1666H19.5001V12.9999H17.3334V10.8333H15.1667V12.9999H13.0001V15.1666H15.1667V17.3333ZM4.33341 21.6666C3.73758 21.6666 3.22769 21.4546 2.80375 21.0307C2.3798 20.6067 2.16747 20.0965 2.16675 19.4999V6.49992C2.16675 5.90409 2.37908 5.3942 2.80375 4.97025C3.22841 4.54631 3.7383 4.33397 4.33341 4.33325H10.8334L13.0001 6.49992H21.6667C22.2626 6.49992 22.7728 6.71225 23.1975 7.13692C23.6222 7.56158 23.8341 8.07147 23.8334 8.66658V19.4999C23.8334 20.0958 23.6214 20.606 23.1975 21.0307C22.7736 21.4553 22.2633 21.6673 21.6667 21.6666H4.33341ZM4.33341 19.4999H21.6667V8.66658H12.1063L9.93966 6.49992H4.33341V19.4999Z"
        fill={props.fill || 'currentColor'}
      />
    </svg>
  );
};

export default IconAddFile;
