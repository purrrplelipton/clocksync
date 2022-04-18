/*import React, { useState, useEffect } from 'react'
import Button from '../App'


const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(false);

  const [timer, setTimer] = useState(null);

  useEffect(() => {
    let interval = null
    if (active) {
      let start = seconds

      interval = setInterval(() => {
        setTimer(start)
        start--;

        if (start === -1) {
          clearInterval(interval)
          setActive(!active)
        }
      }, 1000)
    } else if (!active) {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [active, seconds])

  return (
    <div>
      <h1>TIMER</h1>
      <input
        placeholder='Enter time in seconds'
        type='number'
        onChange={(event) => {
          setActive(false)
          setSeconds(event.target.value)
        }}
        value={seconds}
      />
      <Button
        btnValue={!active ? 'Start' : 'Stop'}
        onClick={() => {
          setActive(!active)
          if(active) setSeconds(0)
        }}
      />
      {active && timer > 0 && <h1>{timer} seconds</h1>}

      {timer === 0 && <h1>Time's up!</h1>}
    </div>
  );
};

export default Timer
*/