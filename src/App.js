import React, {useState ,useEffect} from 'react'

import Button from './components/Stopwatch&Bits/Buttons/Button';
import Counter from './components/Stopwatch&Bits/Counter/Counter';

function App() {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [miliseconds, setMiliseconds] = useState(0)

  const [start, setStart] = useState(false)

  const toggle = () => setStart(start => (start = !start))

  useEffect(() => {
    let interval = null
    
    if(start) {
      interval = setInterval(() => {
        setMiliseconds((miliseconds) => miliseconds + 1)
        if(miliseconds === 99) {
          clearInterval(interval)
          setMiliseconds(0)
          setSeconds((seconds) => seconds + 1)
        }
        if(seconds === 60) {
          clearInterval(interval)
          setSeconds(0)
          setMinutes((minutes) => minutes + 1)
        }
        if(minutes === 60) {
          clearInterval(interval)
          setMinutes(0)
          setHours((hours) => hours + 1)
        }
      }, 10)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [start, hours, minutes, seconds, miliseconds])
  
  return (
    <div>
      <p>STOPWATCH</p>
      <Counter
        h={hours}
        m={minutes}
        s={seconds}
        ms={miliseconds}
      />
      <div>
        <Button btnValue={start ? 'STOP' : 'START'} onClick={toggle}/>
        <Button btnValue='RESET' onClick={() => {
          setMiliseconds(0)
          setSeconds(0)
          setMinutes(0)
          setHours(0)
          setStart(false)
        }}/>
      </div>
    </div>
  )
  /* const [active, setActive] = useState(0)

  return (
    <div>
      <h1>Timer||Stopwatch</h1>
      <div>
        <Button btnValue='Timer' onClick={() => setActive(0)}/>
        <Button btnValue='Stopwatch' onClick={() => setActive(1)}/>
      </div>
      {active === 0 && <Timer />}
      {active === 1 && <Stopwatch />}
    </div>
  ) */
}

export default App