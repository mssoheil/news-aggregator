import React from "react";

export const ChevronRight = ({ color }) => {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      stroke={color}
    >
      <g id="chevron-right">
        <line className="cls-1" x1="21" x2="12" y1="16" y2="25" />
        <line className="cls-1" x1="12" x2="21" y1="7" y2="16" />
      </g>
    </svg>
  );
};

ChevronRight.defaultProps = {
  color: "#000",
};
