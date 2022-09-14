import React from 'react'

function Button(props) {
  return (
    <button
      className={`btn-default ${props.className}`}
      onClick={props.onClick}
      type={props.type}
    >
      <span className={props.btnValueClass}>{props.btnValue}</span>
    </button>
  )
}

export default Button
