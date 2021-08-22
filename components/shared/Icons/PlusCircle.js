import * as React from "react";

function SvgPlusCircle(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="plus-circle_svg__feather plus-circle_svg__feather-plus-circle"
      {...props}
    >
      <circle cx={12} cy={12} r={10} />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

export default SvgPlusCircle;
