import { useContext } from "react";
import { CONTEXT } from "../../App";
import buzzer from "../../assets/buzzer.aac";
import "./timer.css";

const Timer = () => {
  const {
    timer: {
      value: { seconds, minutes, hours },
      playAlarm,
    },
    setTimer,
  } = useContext(CONTEXT);

  const handleInputChange = (val) => {
    const trimmedVal = val.trim();
    const numericVal = trimmedVal.replace(/\D/g, ""); // Remove non-numeric characters

    let updatedSeconds = 0,
      updatedMinutes = 0,
      updatedHours = 0;

    const trimmedValLength = numericVal.length;

    if (trimmedValLength === 1 || trimmedValLength === 2) {
      updatedSeconds = parseInt(numericVal, 10);
    } else if (trimmedValLength === 3) {
      updatedMinutes = parseInt(numericVal[0], 10);
      updatedSeconds = parseInt(numericVal.substring(1), 10);
    } else if (trimmedValLength === 4) {
      updatedMinutes = parseInt(numericVal.substring(0, 2), 10);
      updatedSeconds = parseInt(numericVal.substring(2), 10);
    } else if (trimmedValLength === 5) {
      updatedHours = parseInt(numericVal.substring(0, 1), 10);
      updatedMinutes = parseInt(numericVal.substring(1, 3), 10);
      updatedSeconds = parseInt(numericVal.substring(3), 10);
    } else if (trimmedValLength === 6) {
      updatedHours = parseInt(numericVal.substring(0, 2), 10);
      updatedMinutes = parseInt(numericVal.substring(2, 4), 10);
      updatedSeconds = parseInt(numericVal.substring(4), 10);
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

  return (
    <>
      <div className="value-input-field">
        <input
          aria-label="timer duration field"
          type="text"
          min={0}
          max={995959}
          pattern="\d{0,6}"
          maxLength={6}
          onChange={({ target: { value } }) => handleInputChange(value)}
          inputMode="numeric"
          // hidden
        />
        <h1>
          {String(hours).padStart(2, "0")}
          <span className="suffix hours">h</span>
          {String(minutes).padStart(2, "0")}
          <span className="suffix minutes">m</span>
          {String(seconds).padStart(2, "0")}
          <span className="suffix seconds">s</span>
        </h1>
        <audio
          ref={(audio) => {
            if (audio && playAlarm) audio.play();
          }}
          src={buzzer}
        />
      </div>
    </>
  );
};

export default Timer;
