import * as React from "react";

function SvgMoreVertical(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="more-vertical_svg__feather more-vertical_svg__feather-more-vertical"
      {...props}
    >
      <circle cx={12} cy={12} r={1} />
      <circle cx={12} cy={5} r={1} />
      <circle cx={12} cy={19} r={1} />
    </svg>
  );
}

export default SvgMoreVertical;
