import { useContext } from "react";
import { CONTEXT } from "../../App";
import "./stopwatch.css";

const Stopwatch = () => {
  const {
    stopwatch: {
      timeElapsed: { miliSeconds, seconds, minutes, hours },
    },
  } = useContext(CONTEXT);

  return (
    <h1 className="time-elapsed">
      {hours ? (
        <span className="hours" data-suffix="h">
          {hours}
        </span>
      ) : null}
      {minutes ? (
        <span className="minutes" data-suffix="m">
          {minutes}
        </span>
      ) : null}
      <span className="seconds" data-suffix="s">
        {seconds}
      </span>
      <span className="miliseconds">
        {String(miliSeconds).padStart(2, "0")}
      </span>
    </h1>
  );
};

export default Stopwatch;
