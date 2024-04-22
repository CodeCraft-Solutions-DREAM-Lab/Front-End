import React, { useState, useEffect } from "react";
import "./CloseButton.css";

function CloseButton(props){
    return(
        <button className="close-button" onClick={props.onClick}>x</button>
    )
}

export default CloseButton;