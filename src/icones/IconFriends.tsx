import React from 'react';

/**
 * IconFiles component
 * @param {React.SVGProps<SVGSVGElement>} props - The props for the IconFiles component
 * @returns {React.ReactElement} The IconFiles component
 */
const IconFiles: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={props.width || 18}
      height={props.height || 16}
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      {...props}
    >
      <path
        d="M5.4 8C7.14094 8 8.55 6.43438 8.55 4.5C8.55 2.56563 7.14094 1 5.4 1C3.65906 1 2.25 2.56563 2.25 4.5C2.25 6.43438 3.65906 8 5.4 8ZM7.56 9H7.32656C6.74156 9.3125 6.09188 9.5 5.4 9.5C4.70813 9.5 4.06125 9.3125 3.47344 9H3.24C1.45125 9 0 10.6125 0 12.6V13.5C0 14.3281 0.604688 15 1.35 15H9.45C10.1953 15 10.8 14.3281 10.8 13.5V12.6C10.8 10.6125 9.34875 9 7.56 9ZM13.5 8C14.9906 8 16.2 6.65625 16.2 5C16.2 3.34375 14.9906 2 13.5 2C12.0094 2 10.8 3.34375 10.8 5C10.8 6.65625 12.0094 8 13.5 8ZM14.85 9H14.7431C14.3522 9.15 13.9388 9.25 13.5 9.25C13.0612 9.25 12.6478 9.15 12.2569 9H12.15C11.5763 9 11.0475 9.18438 10.5834 9.48125C11.2697 10.3031 11.7 11.3938 11.7 12.6V13.8C11.7 13.8688 11.6859 13.9344 11.6831 14H16.65C17.3953 14 18 13.3281 18 12.5C18 10.5656 16.5909 9 14.85 9Z"
        fill="#08396F"
      />
    </svg>
  );
};

export default IconFiles;
