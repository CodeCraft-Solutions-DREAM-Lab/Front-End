import React, { useState, useEffect } from "react";
import "./CloseButtonCancelar.css";

function CloseButtonCancelar(props){
    return(
        <button className="close-button-cancelar" onClick={props.onClick}>x</button>
    )
}

export default CloseButtonCancelar;