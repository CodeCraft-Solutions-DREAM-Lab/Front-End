import React, { useState, useEffect } from "react";
import "./AlertaAsistencia.css";
import flecha from "../../../../assets/Videowall/flechasToQr.png";
import qr from "../../../../assets/Videowall/qrTemporal.png";
import imagenError from "../../../../assets/Videowall/errorVideowall.png";
import imagenCorrecto from "../../../../assets/Videowall/correctoVideowall.png";
import QRCode from "react-qr-code";
import { get } from "src/utils/ApiRequests";

function MensajeBienvenida(props) {
    const [cerrado, setCerrado] = useState(false);
    const [tarde, setTarde] = useState(props.tarde);
    const [ejecutado, setEjecutado] = useState(false);

    /*useEffect(() => {
        if (!ejecutado) {
            setTimeout(() => {
                setCerrado(false);
                setEjecutado(true);
            }, 0); // Ocultar el componente después de 5 segundos

            setTimeout(() => {
                setCerrado(true);
            }, 3000); // Ocultar el componente después de 5 segundos
        }
        return; // Limpiar el timeout cuando el componente se desmonte o actualice
    });*/

    if (cerrado) {
        return null; // Si el mensaje está cerrado o no hay reserva filtrada, no se renderiza nada
    }

    return (
        <div
            className="mensaje-bienvenida-videowall-asistencia"
            style={
                tarde
                    ? { backgroundColor: "#E19F20" }
                    : { backgroundColor: "#1BAC55" }
            }
        >
            <div className="alerta-videowall-primera-mitad-asistencia">
                {/* Bienvenida al usuario*/}
                <h1 className="titulo-mensaje-bienvenida-videowall-asistencia">
                    {tarde ? "Asistencia tardía" : "Asistencia confirmada"}
                </h1>
            </div>

            <div className="white-box-alerta-asistencia"></div>
        </div>
    );
}

export default MensajeBienvenida;
