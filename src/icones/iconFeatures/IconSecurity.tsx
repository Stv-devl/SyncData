import React from 'react';

/**
 * IconFiles component
 * @param {React.SVGProps<SVGSVGElement>} props - The props for the IconFiles component
 * @returns {React.ReactElement} The IconFiles component
 */
const IconSecurity: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
        d="M11 20.1667C8.87639 19.632 7.12312 18.4134 5.74017 16.511C4.35723 14.6086 3.66606 12.4966 3.66667 10.175V4.58334L11 1.83334L18.3333 4.58334V10.175C18.3333 12.4972 17.6422 14.6095 16.2598 16.5119C14.8775 18.4143 13.1242 19.6326 11 20.1667ZM11 18.2417C12.4819 17.7833 13.7194 16.878 14.7125 15.5256C15.7056 14.1732 16.2861 12.6647 16.4542 11H11V3.78126L5.50001 5.84376V10.5875C5.50001 10.6945 5.51528 10.832 5.54584 11H11V18.2417Z"
        fill="#0079FF"
      />
    </svg>
  );
};

export default IconSecurity;
