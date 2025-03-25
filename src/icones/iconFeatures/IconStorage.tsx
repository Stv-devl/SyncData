import React from 'react';

/**
 * IconFiles component
 * @param {React.SVGProps<SVGSVGElement>} props - The props for the IconFiles component
 * @returns {React.ReactElement} The IconFiles component
 */
const IconStorage: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={props.width || 22}
      height={props.height || 22}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      {...props}
    >
      <path
        d="M11 2.75C6.94834 2.75 3.66667 4.39083 3.66667 6.41667C3.66667 8.4425 6.94834 10.0833 11 10.0833C15.0517 10.0833 18.3333 8.4425 18.3333 6.41667C18.3333 4.39083 15.0517 2.75 11 2.75ZM3.66667 8.25V11C3.66667 13.0258 6.94834 14.6667 11 14.6667C15.0517 14.6667 18.3333 13.0258 18.3333 11V8.25C18.3333 10.2758 15.0517 11.9167 11 11.9167C6.94834 11.9167 3.66667 10.2758 3.66667 8.25ZM3.66667 12.8333V15.5833C3.66667 17.6092 6.94834 19.25 11 19.25C15.0517 19.25 18.3333 17.6092 18.3333 15.5833V12.8333C18.3333 14.8592 15.0517 16.5 11 16.5C6.94834 16.5 3.66667 14.8592 3.66667 12.8333Z"
        fill="#0079FF"
      />
    </svg>
  );
};

export default IconStorage;
