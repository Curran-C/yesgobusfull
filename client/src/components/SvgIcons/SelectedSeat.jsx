import React from "react";

export default function SelectedSeat(props) {
  return (
    <svg
      width="45"
      height="22"
      viewBox="0 0 45 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="0.5"
        y="21.5"
        width="21"
        height="44"
        rx="5.5"
        transform="rotate(-90 0.5 21.5)"
        fill="#45F495"
        stroke="#00F06E"
      />
      <rect
        x="34.5"
        y="19.5"
        width="16"
        height="5"
        rx="2.5"
        transform="rotate(-90 34.5 19.5)"
        fill="white"
        stroke="#00F06E"
      />
    </svg>
  );
}
