import React, { SVGProps } from 'react';

/**
 * IconLinks component
 * @param {React.SVGProps<SVGSVGElement>} props - The props for the IconLinks component
 * @returns {React.ReactElement} The IconLinks component
 */
const IconLinks: React.FC<SVGProps<SVGSVGElement>> = (props) => {
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
        d="M15.4152 11.4181C15.0479 11.0507 14.6118 10.7593 14.1319 10.5604C13.652 10.3616 13.1376 10.2592 12.6181 10.2592C12.0986 10.2592 11.5842 10.3616 11.1043 10.5604C10.6243 10.7593 10.1883 11.0507 9.821 11.4181L5.82517 15.4151C5.08349 16.1569 4.66688 17.163 4.66699 18.212C4.6671 19.261 5.08392 20.267 5.82575 21.0087C6.56759 21.7504 7.57366 22.167 8.62267 22.1669C9.67167 22.1668 10.6777 21.7499 11.4193 21.0081L11.7938 20.6534M11.4193 15.4151C11.7866 15.7825 12.2227 16.074 12.7026 16.2728C13.1825 16.4716 13.6969 16.574 14.2164 16.574C14.7359 16.574 15.2503 16.4716 15.7302 16.2728C16.2102 16.074 16.6462 15.7825 17.0135 15.4151L21.0082 11.4181C21.75 10.6764 22.1668 9.67044 22.1669 8.62144C22.167 7.57244 21.7504 6.56636 21.0088 5.82453C20.2671 5.0827 19.2611 4.66588 18.2121 4.66577C17.1631 4.66566 16.157 5.08227 15.4152 5.82395L14.2158 6.94512"
        fill={props.fill || 'currentColor'}
        strokeWidth="2.08333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconLinks;
