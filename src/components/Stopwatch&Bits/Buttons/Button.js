import React from "react";

function Button(props) {
    const btnStyle = {
        border: '1px solid black', 
        backgroundColor: 'white', 
        color: 'black', 
        outline: 'none', 
        fontFamily: 'inherit', 
        padding: '.25rem .75rem', 
        marginRight: '1rem', 
        cursor: 'pointer'
    }

    return (
        <button
        style={btnStyle}
        onClick={props.onClick}
        >
        {props.btnValue}
        </button>
    )
}

export default Button;