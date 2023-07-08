import React, { useContext } from "react";
import { CONTEXT } from "../../../App";

const Display = () => {
  const {
    timer: {
      value: { seconds, minutes, hours },
    },
    setTimer,
  } = useContext(CONTEXT);

  return (
    <div>
      <div className="value-input-field">
        <input
          id="hours"
          type="text"
          pattern="/\d/"
          maxLength={2}
          max={99}
          value={hours}
          onChange={({ target: { value } }) =>
            setTimer((prevState) => ({
              ...prevState,
              value: { ...prevState.value, hours: value },
            }))
          }
          data-suffix="h"
        />
        <input
          id="minutes"
          type="text"
          pattern="/\d/"
          maxLength={2}
          max={59}
          value={minutes}
          onChange={({ target: { value } }) =>
            setTimer((prevState) => ({
              ...prevState,
              value: { ...prevState.value, minutes: value },
            }))
          }
          data-suffix="m"
        />
        <input
          id="seconds"
          type="text"
          pattern="/\d/"
          maxLength={2}
          max={59}
          value={seconds}
          onChange={({ target: { value } }) =>
            setTimer((prevState) => ({
              ...prevState,
              value: { ...prevState.value, seconds: value },
            }))
          }
          data-suffix="s"
        />
      </div>
    </div>
  );
};

export default Display;
