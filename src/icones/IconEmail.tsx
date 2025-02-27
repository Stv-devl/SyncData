import React from 'react';

/**
 * IconEmail component
 * @param {React.SVGProps<SVGSVGElement>} props - The props for the IconEmail component
 * @returns {React.ReactElement} The IconEmail component
 */
const IconEmail: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={props.width || 16}
      height={props.height || 12}
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      {...props}
    >
      <path
        d="M13 0H1C0.867392 0 0.740215 0.0526785 0.646447 0.146447C0.552678 0.240215 0.5 0.367392 0.5 0.5V9C0.5 9.26522 0.605357 9.51957 0.792893 9.70711C0.98043 9.89464 1.23478 10 1.5 10H12.5C12.7652 10 13.0196 9.89464 13.2071 9.70711C13.3946 9.51957 13.5 9.26522 13.5 9V0.5C13.5 0.367392 13.4473 0.240215 13.3536 0.146447C13.2598 0.0526785 13.1326 0 13 0ZM12.5 9H1.5V1.63688L6.66187 6.36875C6.75412 6.45343 6.87478 6.50041 7 6.50041C7.12522 6.50041 7.24588 6.45343 7.33813 6.36875L12.5 1.63688V9Z"
        fill={props.fill || 'currentColor'}
      />
    </svg>
  );
};

export default IconEmail;
