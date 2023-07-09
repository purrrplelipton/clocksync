import { useContext, useState } from "react";
import { CONTEXT } from "../../../App";
import {
  FullscreenSvg,
  VolumeOffSvg,
  VolumeUpSvg,
} from "../../../assets/vectors";

const Controls = () => {
  const {
    timer: {
      isRunning,
      value: { hours, minutes, seconds },
    },
    setTimer,
  } = useContext(CONTEXT);
  const [isMute, setIsMute] = useState(false);

  const TIMER_CONTROL_BTNS = [
    {
      label: isRunning ? "stop" : "start",
      clickFunc:
        hours * 3600 + minutes * 60 + seconds === 0
          ? () => null
          : () => {
              setTimer((prevState) => ({
                ...prevState,
                isRunning: !prevState.isRunning,
              }));
            },
    },
    {
      label: "reset",
      clickFunc: () => {
        if (isRunning) {
          setTimer((prevState) => ({
            ...prevState,
            isRunning: false,
            value: { seconds: 0, minutes: 0, hours: 0 },
          }));
        } else {
          setTimer((prevState) => ({
            ...prevState,
            value: { seconds: 0, minutes: 0, hours: 0 },
          }));
        }
      },
    },
  ];

  const xtraFunctionBtns = [
    {
      label: isMute ? "unmute" : "mute",
      clickFunc: () => setIsMute((prevState) => !prevState),
      icon: isMute ? <VolumeUpSvg /> : <VolumeOffSvg />,
    },
    {
      label: "fullscreen",
      clickFunc: () => {},
      icon: <FullscreenSvg />,
    },
  ];

  return (
    <footer className="timer-controls">
      <div>
        {TIMER_CONTROL_BTNS.map((btn) => (
          <button key={btn.label} type="button" onClick={btn.clickFunc}>
            {btn.label}
          </button>
        ))}
      </div>
      <div>
        {xtraFunctionBtns.map((btn) => (
          <button
            key={btn.label}
            type="button"
            aria-label={btn.label}
            onClick={btn.clickFunc}
          >
            {btn.icon}
          </button>
        ))}
      </div>
    </footer>
  );
};

export default Controls;
