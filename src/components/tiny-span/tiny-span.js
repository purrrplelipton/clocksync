import React from 'react'

function TinySpan(props) {
  return <span className={`tiny-span ${props.className}`}>{props.lbl}</span>
}

export default TinySpan
