import React from "react";

const TIMER_CONTROL_BTNS = [
  {
    label: "start",
    clickFunc: () => {},
  },
  {
    label: "reset",
    clickFunc: () => {},
  },
];

const xtraFunctionBtns = [
  {
    label: "mute",
    clickFunc: () => {},
    icon: "icon",
  },
  {
    label: "fs",
    clickFunc: () => {},
    icon: "icon",
  },
];

const Controls = () => {
  return (
    <footer>
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
