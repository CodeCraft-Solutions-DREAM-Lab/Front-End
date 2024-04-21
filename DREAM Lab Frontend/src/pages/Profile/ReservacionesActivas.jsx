import React, { useState, useEffect, useRef } from "react";
import "./ReservacionesActivas.css";
import TarjetaReservacion from "./components/TarjetaReservacion/TarjetaReservacion";
import BotonBack from "../../GlobalComponents/BotonBack/BotonBack";
import { generateReservationCards } from "./utils/Funciones.jsx";

function ReservacionesActivas() {
    const reservacionesData = [
        {
            sala: "Sala Horizons",
            experiencia: "VR Experience",
            horaInicio: "1970-01-01T10:00:00.000Z",
            duracion: 2,
            fecha: "2024-01-01T00:00:00.000Z",
        },
        {
            sala: "Dimension Forge",
            experiencia: "Make a Computer - Course",
            horaInicio: "1970-01-01T10:00:00.000Z",
            duracion: 1,
            fecha: "2024-01-01T00:00:00.000Z",
        },
        {
            sala: "Lego Room",
            experiencia: "Swift Course",
            horaInicio: "1970-01-01T10:00:00.000Z",
            duracion: 3,
            fecha: "2024-01-01T00:00:00.000Z",
        },
    ];

    return (
        <div className="out-div">
            <div className="back-subtitulo-div">
                <div className="boton-back">
                    <BotonBack ruta="/profile/" />
                </div>
                <h2 className="sub-celular">Reservaciones activas</h2>
            </div>

            <div className="reservaciones-div-celular">
                <div className="reservaciones-div-in-celular">
                    {generateReservationCards(reservacionesData)}

                    <TarjetaReservacion
                        sala="Lego Room"
                        experiencia="Swift Course"
                        hora="11:00 am - 1:00 pm."
                        dia="26 de enero"
                    />

                    <TarjetaReservacion
                        sala="Lego Room"
                        experiencia="Swift Course"
                        hora="11:00 am - 1:00 pm."
                        dia="26 de enero"
                    />

                    <TarjetaReservacion
                        sala="Lego Room"
                        experiencia="Swift Course"
                        hora="11:00 am - 1:00 pm."
                        dia="26 de enero"
                    />

                    <div className="degradado-down-celular"></div>
                </div>
            </div>
        </div>
    );
}

export default ReservacionesActivas;
