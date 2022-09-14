import React, { useState, useEffect } from 'react'

import Button from './components/stopwatch-bits/button/button'
import Counter from './components/stopwatch-bits/counter/counter'
// import './scss/styles'

function App() {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [miliseconds, setMiliseconds] = useState(0)

  const [start, setStart] = useState(false)

  const [title, setTitle] = useState('stopwatch | timer')

  const toggle = () => setStart(!start)

  useEffect(() => {
    document.title = title
    let interval = null

    if (start) {
      interval = setInterval(() => {
        setMiliseconds((miliseconds) => miliseconds + 1)
        if (miliseconds === 99) {
          clearInterval(interval)
          setMiliseconds(0)
          setSeconds((seconds) => seconds + 1)
          setTitle(
            `${hours ? hours + 'h' : ''} ${
              minutes || hours ? minutes + 'm' : ''
            } ${seconds}s`
          )
        }
        if (seconds === 60) {
          clearInterval(interval)
          setSeconds(0)
          setMinutes((minutes) => minutes + 1)
        }
        if (minutes === 60) {
          clearInterval(interval)
          setMinutes(0)
          setHours((hours) => hours + 1)
        }
      }, 10)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [title, start, hours, minutes, seconds, miliseconds])

  return (
    <div className={'app-container'}>
      <span className={'tab-name'}>
        <i className='fi fi-sr-stopwatch'></i>
        stopwatch
      </span>
      <Counter h={hours} m={minutes} s={seconds} ms={miliseconds} />
      <div className={'btn-wrapper'}>
        <Button
          type='button'
          btnValue={start ? 'stop' : 'start'}
          onClick={toggle}
          className={'start-stop-btn'}
        />
        <Button
          type='button'
          btnValue='reset'
          onClick={() => {
            setMiliseconds(0)
            setSeconds(0)
            setMinutes(0)
            setHours(0)
            setStart(false)
          }}
          className={'reset-btn'}
        />
      </div>
    </div>
  )
}

export default App
