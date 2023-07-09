import { createContext, useEffect, useState } from "react";
import "./App.css";
import StopwatchIcon from "./assets/favicons/stopwatch.ico";
import TimerIcon from "./assets/favicons/timer.ico";
import StopwatchSvg from "./assets/vectors/stopwatch";
import TimerSvg from "./assets/vectors/timer";
import Stopwatch from "./components/stopwatch";
import Timer from "./components/timer";

export const CONTEXT = createContext();
const favicon = document.querySelector('[type="image/x-icon"');

function App() {
  const [mode, setMode] = useState("stopwatch");
  const [stopwatch, setStopwatch] = useState({
    isRunning: false,
    laps: [],
    timeElapsed: {
      miliSeconds: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
    },
  });
  const [timer, setTimer] = useState({
    isRunning: false,
    totalTime: 0,
    value: { seconds: 0, minutes: 0, hours: 0 },
  });

  const headerBtns = [
    {
      label: "stopwatch",
      icon: <StopwatchSvg />,
      clickFunc: () =>
        setMode(() => {
          setTimer((prevState) => ({
            ...prevState,
            isRunning: false,
            value: {
              ...prevState.value,
              miliSeconds: 0,
              seconds: 0,
              minutes: 0,
              hours: 0,
            },
          }));
          document.title = "Stopwatch";
          favicon.href = StopwatchIcon;
          return "stopwatch";
        }),
    },
    {
      label: "timer",
      icon: <TimerSvg />,
      clickFunc: () =>
        setMode(() => {
          setStopwatch((prevState) => ({
            ...prevState,
            isRunning: false,
            timeElapsed: {
              ...prevState.timeElapsed,
              miliSeconds: 0,
              seconds: 0,
              minutes: 0,
              hours: 0,
            },
          }));
          document.title = "Timer";
          favicon.href = TimerIcon;
          return "timer";
        }),
    },
  ];

  // const [docTitle, setDocTitle] = useState(mode);

  useEffect(() => {
    let stopwatchInterval = null,
      timerInterval = null;

    if (stopwatch.isRunning) {
      stopwatchInterval = setInterval(() => {
        setStopwatch((prevState) => {
          document.title = `${
            stopwatch.timeElapsed.hours ? stopwatch.timeElapsed.hours : ""
          }${stopwatch.timeElapsed.hours ? ":" : ""}${String(
            stopwatch.timeElapsed.minutes
          ).padStart(2, "0")}:${String(stopwatch.timeElapsed.seconds).padStart(
            2,
            "0"
          )}`;

          const updatedTimeElapsed = {
            ...prevState.timeElapsed,
            miliSeconds: prevState.timeElapsed.miliSeconds + 1,
          };

          if (stopwatch.timeElapsed.miliSeconds >= 99) {
            clearInterval(stopwatchInterval);

            setStopwatch((prevState) => ({
              ...prevState,
              timeElapsed: {
                ...prevState.timeElapsed,
                miliSeconds: 0,
                seconds: prevState.timeElapsed.seconds + 1,
              },
            }));

            if (stopwatch.timeElapsed.seconds >= 59) {
              clearInterval(stopwatchInterval);

              setStopwatch((prevState) => ({
                ...prevState,
                timeElapsed: {
                  ...prevState.timeElapsed,
                  seconds: 0,
                  minutes: prevState.timeElapsed.minutes + 1,
                },
              }));

              if (stopwatch.timeElapsed.minutes >= 59) {
                clearInterval(stopwatchInterval);

                setStopwatch((prevState) => ({
                  ...prevState,
                  timeElapsed: {
                    ...prevState.timeElapsed,
                    minutes: 0,
                    hours: prevState.timeElapsed.hours + 1,
                  },
                }));
              }
            }
          }

          return {
            ...prevState,
            timeElapsed: updatedTimeElapsed,
          };
        });
      }, 10);
    } else if (timer.isRunning && timer.totalTime > 0) {
      const totalTime =
        timer.value.hours * 3600 +
        timer.value.minutes * 60 +
        timer.value.seconds;
      let remainingTime = totalTime;

      timerInterval = setInterval(() => {
        setTimer((prevState) => {
          remainingTime--;

          if (remainingTime === 0) {
            clearInterval(timerInterval);
            setTimer((exState) => ({ ...exState, isRunning: false }));
          }

          return {
            ...prevState,
            totalTime,
            value: {
              hours: Math.floor(remainingTime / 3600),
              minutes: Math.floor((remainingTime % 3600) / 60),
              seconds: remainingTime % 60,
            },
          };
        });
      }, 1000);
    }

    return () => {
      console.log(timer.value);
      clearInterval(stopwatchInterval);
      clearInterval(timerInterval);
    };
  }, [stopwatch, timer]);

  return (
    <CONTEXT.Provider
      value={{ mode, setMode, stopwatch, setStopwatch, timer, setTimer }}
    >
      <header>
        {headerBtns.map((btn) => (
          <button
            className={mode === btn.label ? "active" : ""}
            key={btn.label}
            type="button"
            onClick={btn.clickFunc}
          >
            {btn.icon}
            <span>{btn.label}</span>
          </button>
        ))}
      </header>
      {mode === "stopwatch" ? <Stopwatch /> : <Timer />}
    </CONTEXT.Provider>
  );
}

export default App;
