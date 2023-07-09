import { useContext, useEffect, useRef } from "react";
import { CONTEXT } from "../../../App";

const Display = () => {
  const {
    timer: {
      isRunning,
      totalTime,
      value: { seconds, minutes, hours },
    },
    setTimer,
  } = useContext(CONTEXT);
  const circleRef = useRef();

  const handleInputChange = (val) => {
    const trimmedVal = val.trim();

    let updatedSeconds = 0,
      updatedMinutes = 0,
      updatedHours = 0;

    const trimmedValLength = trimmedVal.length;

    if (trimmedValLength === 1 || trimmedValLength === 2) {
      updatedSeconds = parseInt(val, 10);
    } else if (trimmedValLength === 3) {
      updatedMinutes = parseInt(val[0], 10);
      updatedSeconds = parseInt(val.substring(1), 10);
    } else if (trimmedValLength === 4) {
      updatedMinutes = parseInt(val.substring(0, 2), 10);
      updatedSeconds = parseInt(val.substring(2), 10);
    } else if (trimmedValLength === 5) {
      updatedHours = parseInt(val.substring(0, 1), 10);
      updatedMinutes = parseInt(val.substring(1, 3), 10);
      updatedSeconds = parseInt(val.substring(3), 10);
    } else if (trimmedValLength === 6) {
      updatedHours = parseInt(val.substring(0, 2), 10);
      updatedMinutes = parseInt(val.substring(2, 4), 10);
      updatedSeconds = parseInt(val.substring(4), 10);
    }

    setTimer((prevState) => ({
      ...prevState,
      value: {
        seconds: updatedSeconds,
        minutes: updatedMinutes,
        hours: updatedHours,
      },
    }));
  };

  useEffect(() => {
    const remainingTime = hours * 3600 + minutes * 60 + seconds;
    const circle = circleRef.current;
    circle.style.backgroundImage = `conic-gradient(#242424 ${
      ((totalTime - remainingTime) / totalTime) * 100
    }%,rgba(255, 255, 255, 0.9) 0%)`;
  }, [isRunning, totalTime, hours, minutes, seconds]);

  return (
    <>
      <div className="value-input-field">
        <input
          type="text"
          pattern="\d+"
          onChange={({ target: { value } }) => handleInputChange(value)}
        />
        <h1>
          {String(hours).padStart(2, "0")}
          <span className="suffix hours">h</span>
          {String(minutes).padStart(2, "0")}
          <span className="suffix minutes">m</span>
          {String(seconds).padStart(2, "0")}
          <span className="suffix seconds">s</span>
        </h1>
      </div>
      <div ref={circleRef} className="circle-thingamajig" />
    </>
  );
};

export default Display;
