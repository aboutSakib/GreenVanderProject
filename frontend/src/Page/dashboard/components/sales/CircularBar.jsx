import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const CircularBar = ({ percentage, pathColor }) => {
  return (
    <div className="w-16 h-16">
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        strokeWidth={5}
        styles={buildStyles({
          pathTransitionDuration: 0.5,
          strokeLinecap: "round",
          pathTransition: "stroke-dashoffset 0.5s ease 0s",
          textSize: "20px",
          pathColor: pathColor,
          textColor: "#A3AED0",
          trailColor: "#A3AED0",
        })}
      />
    </div>
  );
};

export default CircularBar;
