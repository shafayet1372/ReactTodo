import React from "react";
import { useEffect } from "react";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import RadialSeparators from "./RadialSeparators";
export default function Index({ percent }) {
  return (
    <CircularProgressbarWithChildren
      value={percent}
      text={`${percent}%`}
      strokeWidth={10}
      styles={buildStyles({
        pathColor: "#05c46b",
      })}
    >
      <RadialSeparators
        count={12}
        style={{
          background: "#fff",
          width: "2px",
          // This needs to be equal to props.strokeWidth
          height: `${10}%`,
        }}
      />
    </CircularProgressbarWithChildren>
  );
}
