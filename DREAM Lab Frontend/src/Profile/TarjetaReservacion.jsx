import React, { useState, useEffect, useRef } from "react";
import './TarjetaReservacion.css'

function TarjetaReservacion(props){
    return(
        <div className="div-externo-reservacion">

            <div className="div-datos-reservacion">
                <h1 className="sala-reservacion">{props.sala}Sala Horizons</h1>
                <p className="experiencia-reservacion">{props.experiencia}VR Experience</p>
            </div>

            <div className="linea"></div>

            <div className="div-fecha-reservacion">
                <div className="hora-reservaion"><p >{props.hora}3:00 - 5:00 pm.</p></div>
                <div className="dia-reservacion"><p >{props.dia}15 de diciembre</p></div>
            </div>

        </div>
    )
}

export default TarjetaReservacion;