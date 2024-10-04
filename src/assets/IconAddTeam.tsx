import React from 'react';

const IconAddTeam: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={props.width || 22}
      height={props.height || 22}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      {...props}
    >
      <path
        d="M11.4583 13.5416H5.20825V11.4583H11.4583V5.20825H13.5416V11.4583H19.7916V13.5416H13.5416V19.7916H11.4583V13.5416Z"
        fill={props.fill || '#08396F'}
      />
    </svg>
  );
};

export default IconAddTeam;
