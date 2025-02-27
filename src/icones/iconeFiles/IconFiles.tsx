import React from 'react';

/**
 * IconFiles component
 * @param {React.SVGProps<SVGSVGElement>} props - The props for the IconFiles component
 * @returns {React.ReactElement} The IconFiles component
 */
const IconFiles: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={props.width || 39}
      height={props.height || 45}
      viewBox="0 0 39 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.3126 0H5.03578C3.75706 0 2.53071 0.50797 1.62652 1.41216C0.722326 2.31636 0.214355 3.54271 0.214355 4.82143V40.1786C0.214355 41.4573 0.722326 42.6836 1.62652 43.5878C2.53071 44.492 3.75706 45 5.03578 45H33.9644C35.2431 45 36.4694 44.492 37.3736 43.5878C38.2778 42.6836 38.7858 41.4573 38.7858 40.1786V16.4732H24.3215C24.0577 16.4732 23.7964 16.4213 23.5527 16.3203C23.309 16.2193 23.0875 16.0714 22.901 15.8848C22.7144 15.6983 22.5664 15.4768 22.4655 15.2331C22.3645 14.9893 22.3126 14.7281 22.3126 14.4643V0ZM37.4422 12.4554L26.3304 1.34357V12.4554H37.4422Z"
        fill="#0079FF"
      />
    </svg>
  );
};

export default IconFiles;
