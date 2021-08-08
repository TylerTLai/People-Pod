import * as React from "react";

function SvgSmartphone(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="smartphone_svg__feather smartphone_svg__feather-smartphone"
      {...props}
    >
      <rect x={5} y={2} width={14} height={20} rx={2} ry={2} />
      <path d="M12 18h.01" />
    </svg>
  );
}

export default SvgSmartphone;
