import React from "react";

function TinySpan(props) {
    return (
      <span style={{fontSize: '.8em'}}>{props.lbl}</span>
    );
}

export default TinySpan;