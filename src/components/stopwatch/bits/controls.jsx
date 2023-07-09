import { useContext } from "react";
import { CONTEXT } from "../../../App";
import { FullscreenSvg } from "../../../assets/vectors";
// import "../stopwatch.css";

const Controls = () => {
  const {
    stopwatch: { isRunning },
    setStopwatch,
  } = useContext(CONTEXT);

  const STOPWATCH_CONTROL_BTNS = [
    {
      label: isRunning ? "stop" : "start",
      clickFunc: () =>
        setStopwatch((prevState) => ({
          ...prevState,
          isRunning: !prevState.isRunning,
        })),
    },
    {
      label: "reset",
      clickFunc: () => {
        if (isRunning) {
          return setStopwatch((prevState) => {
            document.title = "Stopwatch";
            return {
              ...prevState,
              isRunning: !prevState.isRunning,
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
    <footer className="stopwatch-controls">
      <div>
        {STOPWATCH_CONTROL_BTNS.map((btn) => (
          <button
            key={btn.label}
            type="button"
            onClick={btn.clickFunc}
            className={`${btn.label}-btn`}
          >
            {btn.label}
          </button>
        ))}
      </div>
      <button type="button" aria-label="go fullscreen">
        <FullscreenSvg />
      </button>
    </footer>
  );
};

export default Controls;
