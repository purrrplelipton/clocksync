import React from "react";

import TinySpan from "../../TinySpan/TinySpan";

function Counter ({h, m, s, ms}) {
    const hours = h ? `${String(h).padStart(2,0)}` : null;
    const hSign = hours ? <TinySpan lbl="h"/> : null;
    const minutes = m || h ? `${String(m).padStart(2,0)}` : null;
    const mSign = minutes || hours ? <TinySpan lbl="m"/> : null
    const seconds = `${String(s).padStart(2,0)}`
    const sSign = <TinySpan lbl="s"/>
    const miliseconds = <TinySpan lbl={String(ms).padStart(2,0)}/>

    return (
        <h1>{hours}{hSign} {minutes}{mSign} {seconds}{sSign} {miliseconds}</h1>
    );
};

export default Counter;