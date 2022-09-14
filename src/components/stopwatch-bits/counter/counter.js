import React from 'react'

import TinySpan from '../../tiny-span/tiny-span'

function Counter({ h, m, s, ms }) {
  const hours = h ? <TinySpan className={'h big-num'} lbl={h} /> : null
  const hSign = hours ? <TinySpan className={'h-tiny x-tiny'} lbl={'h'} /> : null
  const minutes = m || h ? <TinySpan className={'m big-num'} lbl={m} /> : null
  const mSign =
    minutes || hours ? <TinySpan className={'m-tiny x-tiny'} lbl={'m'} /> : null
  const seconds = <TinySpan className={'s big-num'} lbl={s} />
  const sSign = <TinySpan className={'s-tiny x-tiny'} lbl={'s'} />
  const miliseconds = <TinySpan className={'ms'} lbl={String(ms).padStart(2, 0)} />

  return (
    <div className={'counter-container'}>
      {hours}
      {hSign}
      {minutes}
      {mSign}
      {seconds}
      {sSign}
      {miliseconds}
    </div>
  )
}

export default Counter
