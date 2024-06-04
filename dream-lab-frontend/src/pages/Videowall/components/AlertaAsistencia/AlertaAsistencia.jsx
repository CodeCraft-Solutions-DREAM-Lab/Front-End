import React, { useState, useEffect } from "react";
import "./AlertaAsistencia.css";
import flecha from "../../../../assets/Videowall/flechasToQr.png";
import qr from "../../../../assets/Videowall/qrTemporal.png";
import imagenError from "../../../../assets/Videowall/errorVideowall.png";
import imagenCorrecto from "../../../../assets/Videowall/correctoVideowall.png";
import QRCode from "react-qr-code";
import { get } from "src/utils/ApiRequests";
import checkAnimation from "src/assets/Videowall/checkAnimation.gif";
import Check from "./Check/Check";

function MensajeBienvenida(props) {
    const [cerrado, setCerrado] = useState(false);
    const [tarde, setTarde] = useState(props.tarde);
    const [ejecutado, setEjecutado] = useState(false);

    useEffect(() => {
        if (!ejecutado) {
            setTimeout(() => {
                setCerrado(false);
                setEjecutado(true);
            }, 0); // Ocultar el componente después de 5 segundos

            setTimeout(() => {
                setCerrado(true);
            }, 2900); // Ocultar el componente después de 5 segundos
        }
        return; // Limpiar el timeout cuando el componente se desmonte o actualice
    });

    if (cerrado) {
        return null; // Si el mensaje está cerrado o no hay reserva filtrada, no se renderiza nada
    }

    return (
        <div
            className="mensaje-bienvenida-videowall-asistencia"
            style={
                tarde
                    ? { border: "13px solid white" }
                    : { border: `13px solid white` }
            }
        >
            <div className="alerta-videowall-primera-mitad-asistencia">
                {/* Bienvenida al usuario*/}
                {/*<img className="imagen-confirmacion-asistencia" src={checkAnimation} alt="Icono de confirmación" />*/}
                <div className="checkmark-asistencia">
                    {tarde ? (
                        <Check
                            colorFondo="#E19F20"
                            colorBorde="#E19F20"
                            width="18vw"
                            height="18vh"
                        />
                    ) : (
                        <Check
                            colorFondo="#1BAC55"
                            colorBorde="#1BAC55"
                            width="18vw"
                            height="18vh"
                        />
                    )}
                </div>
                <h1 className="titulo-mensaje-bienvenida-videowall-asistencia">
                    {tarde ? "Asistencia tardía" : "Asistencia confirmada"}
                </h1>
            </div>
        </div>
    );
}

export default MensajeBienvenida;
