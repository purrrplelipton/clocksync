import { createContext, useEffect, useState } from "react";
import "./App.css";
import StopwatchIcon from "./assets/favicons/stopwatch.ico";
import TimerIcon from "./assets/favicons/timer.ico";
import {
  FullscreenSvg,
  StopwatchSvg,
  TimerSvg,
  VolumeOffSvg,
  VolumeUpSvg,
} from "./assets/vectors";
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
    isMute: false,
    playAlarm: false,
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
    } else if (timer.isRunning) {
      setTimer((prevState) => {
        const totalTime =
          prevState.value.hours * 3600 +
          prevState.value.minutes * 60 +
          prevState.value.seconds;

        return { ...prevState, totalTime };
      });

      timerInterval = setInterval(() => {
        setTimer((prevState) => {
          const updatedTotalTime = prevState.totalTime - 1;

          if (updatedTotalTime === 0) {
            document.title = "Timer";
            clearInterval(timerInterval);
            return {
              ...prevState,
              playAlarm: true,
              isRunning: false,
              totalTime: 0,
              value: {
                hours: 0,
                minutes: 0,
                seconds: 0,
              },
            };
          }

          let updatedHours = Math.floor(updatedTotalTime / 3600),
            updatedMinutes = Math.floor((updatedTotalTime % 3600) / 60),
            updatedSeconds = updatedTotalTime % 60;

          document.title = `${String(updatedHours).padStart(2, "0")}:${String(
            updatedMinutes
          ).padStart(2, "0")}:${String(updatedSeconds).padStart(2, "0")}`;

          return {
            ...prevState,
            totalTime: updatedTotalTime,
            value: {
              hours: updatedHours,
              minutes: updatedMinutes,
              seconds: updatedSeconds,
            },
          };
        });
      }, 1000);
    }

    return () => {
      clearInterval(stopwatchInterval);
      clearInterval(timerInterval);
    };
  }, [
    stopwatch.isRunning,
    timer.isRunning,
    stopwatch.laps,
    timer.totalTime,
    stopwatch.timeElapsed,
    timer.value,
    stopwatch.timeElapsed.hours,
    timer.value.hours,
    stopwatch.timeElapsed.minutes,
    timer.value.minutes,
    stopwatch.timeElapsed.seconds,
    timer.value.seconds,
    stopwatch.timeElapsed.miliSeconds,
    timer.isMute,
  ]);
  const CONTROL_BTNS =
      mode === "stopwatch"
        ? [
            {
              label: stopwatch.isRunning ? "stop" : "start",
              clickFunc: () =>
                setStopwatch((prevState) => ({
                  ...prevState,
                  isRunning: !prevState.isRunning,
                })),
            },
            {
              label: "reset",
              clickFunc: () =>
                setStopwatch((prevState) => {
                  document.title = "Stopwatch";
                  return {
                    ...prevState,
                    isRunning: false,
                    laps: [],
                    timeElapsed: {
                      ...prevState.timeElapsed,
                      miliSeconds: 0,
                      seconds: 0,
                      minutes: 0,
                      hours: 0,
                    },
                  };
                }),
            },
          ]
        : [
            {
              label: timer.isRunning ? "stop" : "start",
              clickFunc:
                timer.value.hours * 3600 +
                  timer.value.minutes * 60 +
                  timer.value.seconds ===
                0
                  ? () => null
                  : () =>
                      setTimer((prevState) => ({
                        ...prevState,
                        isRunning: !prevState.isRunning,
                      })),
            },
            {
              label: "reset",
              clickFunc: () => {
                document.title = "Timer";
                return setTimer((prevState) => ({
                  ...prevState,
                  isRunning: false,
                  playAlarm: false,
                  value: { seconds: 0, minutes: 0, hours: 0 },
                }));
              },
            },
          ],
    extras = [
      {
        label: timer.isMute ? "unmute" : "mute",
        clickFunc: () => {
          return setTimer((prevState) => ({
            ...prevState,
            playAlarm: !prevState.playAlarm,
          }));
        },
        icon: timer.playAlarm ? <VolumeUpSvg /> : <VolumeOffSvg />,
      },
      {
        label: "fullscreen",
        clickFunc: () => {},
        icon: <FullscreenSvg />,
      },
    ];

  if (mode === "stopwatch") extras.shift();

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
      <footer className="controls">
        <div className="start-stop-reset">
          {CONTROL_BTNS.map(({ label, clickFunc }) => (
            <button
              type="button"
              key={label}
              onClick={clickFunc}
              className={`${label}-btn`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="extras">
          {extras.map(({ label, clickFunc, icon }) => (
            <button
              type="button"
              key={label}
              onClick={clickFunc}
              className={`${label}-btn`}
              aria-label={label}
            >
              {icon}
            </button>
          ))}
        </div>
      </footer>
    </CONTEXT.Provider>
  );
}

export default App;
