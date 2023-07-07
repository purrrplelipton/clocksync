import React, { useContext } from "react";
import { CONTEXT } from "../../../App";

const Controls = () => {
  const { stopwatch, setStopwatch } = useContext(CONTEXT);

  const STOPWATCH_CONTROL_BTNS = [
    {
      label: stopwatch.start ? "stop" : "start",
      clickFunc: () =>
        setStopwatch((prevState) => ({
          ...prevState,
          start: !prevState.start,
        })),
    },
    {
      label: "reset",
      clickFunc: () => {
        if (stopwatch.start) {
          return setStopwatch((prevState) => {
            document.title = "Stopwatch";
            return {
              ...prevState,
              start: !prevState.start,
              timeElapsed: {
                ...prevState.timeElapsed,
                miliSeconds: 0,
                seconds: 0,
                minutes: 0,
                hours: 0,
              },
            };
          });
        } else {
          return;
        }
      },
    },
  ];

  return (
    <footer>
      <div>
        {STOPWATCH_CONTROL_BTNS.map((btn) => (
          <button key={btn.label} type="button" onClick={btn.clickFunc}>
            {btn.label}
          </button>
        ))}
      </div>
      <button type="button" aria-label="do something">
        icon
      </button>
    </footer>
  );
};

export default Controls;
