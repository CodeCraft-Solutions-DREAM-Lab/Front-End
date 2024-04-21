import React, { useState, useEffect, useRef } from "react";
import BotonBack from "../../GlobalComponents/BotonBack/BotonBack";
import TarjetaLogro from "./components/TarjetasLogro/TarjetaLogro";
import "./ReservacionesActivas.css";
import { renderTarjetasLogro } from "./utils/Funciones.jsx";

function Logros() {
    const logrosData = [
        {
            nombre: "Big Dreamer",
            descripcion: "Asiste a más de 35 eventos en el Dream Lab.",
            progreso: 0.75,
            color: "#7885F8",
            logo: "LogoBigDreamer",
        },
        {
            nombre: "Robot Expert",
            descripcion: "Asiste a 3 talleres en el Dimesion Forge.",
            progreso: 1,
            color: "#7885F8",
            logo: "LogoRobot",
        },
        {
            nombre: "Apple Developer",
            descripcion: "Asiste a 3 talleres de Swift.",
            progreso: 0.25,
            color: "#7885F8",
            logo: "LogoBigDreamer",
        },
    ];

    return (
        <div className="out-div">
            <div className="back-subtitulo-div">
                <div className="boton-back">
                    <BotonBack ruta="/profile/" />
                </div>
                <h2 className="sub-celular">Logros</h2>
            </div>

            <div className="reservaciones-div-celular">
                <div className="reservaciones-div-in-celular">
                    {renderTarjetasLogro(logrosData)}

                    <TarjetaLogro
                        progresoLogro="0.2"
                        nombreLogro="Apple Developer"
                        descripcion="Asiste a 3 talleres de Swift."
                        colorFondo="#7885F8"
                        iconoUtilizado="LogoRobot"
                    />

                    <TarjetaLogro
                        progresoLogro="1"
                        nombreLogro="Apple Developer"
                        descripcion="Asiste a 3 talleres de Swift."
                        colorFondo="#7885F8"
                        iconoUtilizado="LogoRobot"
                    />

                    <div className="degradado-down-celular"></div>
                </div>
            </div>
        </div>
    );
}

export default Logros;
