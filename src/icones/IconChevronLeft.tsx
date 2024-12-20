import React, { SVGProps } from 'react';

const IconChevronLeft: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={props.width || 24}
      height={props.height || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      {...props}
    >
      <path
        d="M14.4698 18.5298C14.6105 18.6703 14.8011 18.7492 14.9998 18.7492C15.1986 18.7492 15.3892 18.6703 15.5298 18.5298V5.46983C15.3892 5.32938 15.1986 5.25049 14.9998 5.25049C14.8011 5.25049 14.6105 5.32938 14.4698 5.46983L8.46983 11.4698C8.32938 11.6105 8.25049 11.8011 8.25049 11.9998C8.25049 12.1986 8.32938 12.3892 8.46983 12.5298L14.4698 18.5298Z"
        stroke="#737373"
        fill="#737373"
      />
    </svg>
  );
};

export default IconChevronLeft;
