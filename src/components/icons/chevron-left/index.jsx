import React from "react";

export const ChevronLeft = ({ color }) => {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      stroke={color}
    >
      <g>
        <line className="cls-1" x1="11" x2="20" y1="16" y2="7" />
        <line className="cls-1" x1="20" x2="11" y1="25" y2="16" />
      </g>
      <g>
        <line className="cls-1" x1="11" x2="20" y1="16" y2="7" />
        <line className="cls-1" x1="20" x2="11" y1="25" y2="16" />
      </g>
    </svg>
  );
};

ChevronLeft.defaultProps = {
  color: "#000",
};
