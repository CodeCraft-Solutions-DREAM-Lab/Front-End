import React, { useState } from 'react';
import "./MensajeBienvenida.css";
import flecha from "../../../../assets/Videowall/flechasToQr.png";
import qr from "../../../../assets/Videowall/qrTemporal.png";
import imagenError from "../../../../assets/Videowall/errorVideowall.png";
import imagenCorrecto from "../../../../assets/Videowall/correctoVideowall.png";

function MensajeBienvenida(props) {
    const [cerrado, setCerrado] = useState(false);

    const handleCloseClick = () => {
        setCerrado(true);
    };

    if (cerrado) {
        return null; // Si el mensaje está cerrado, no se renderiza nada
    }

    return (
        <div className="mensaje-bienvenida-videowall" style={props.error ? { border: '7px solid #e84ea0' } : { border: '5px solid #1BAC55' }}>
            
            <div className='alerta-videowall-primera-mitad'>
               
                {/* Bienvenida al usuario*/}
                <h1 className="titulo-mensaje-bienvenida-videowall">¡Hola, {props.nombre} Jinelle!</h1>

                 {/* Botón de cerrar */}
                 <div className="btn-cerrar-alerta-videowall"><button onClick={handleCloseClick}>X</button></div>

            </div>

            {/* Imagen*/}
            <div className={props.error ? 'imagen-alerta-videowall-bienvenida' : "imagen-alerta-videowall-bienvenida-exito"}>
                <img src={props.error ? imagenError : imagenCorrecto} alt="Alerta videowall" />
            </div>

            {/* Descripción*/}
            <p className={props.error ? "descripcion-mensaje-bienvenida-videowall" : "descripcion-mensaje-bienvenida-videowall-reserva"}>
                {props.error ? "Hoy no tienes reservaciones activas." : "Tu próxima reservación"}
            </p>
            
            {props.error ? (
                // Aquí se muestra el QR y la flecha
                <div className='div-qr-reservacion'>
                    <p className='agenda-aqui-alerta-videowall'>Agenda una aquí</p>
                    <div className='imagen-flecha-alerta-videowall'><img src={flecha} alt="Flecha" /></div>
                    <div className='imagen-qr-alerta-videowall'><img src={qr} alt="QR" /></div>
                </div>
            ) : 
                // Aquí se muestra la información de la reservación
                <div className='div-informacion-reserva-alerta-videowall'>
                    <p className='nombre-sala-videowall-alerta'>{props.sala} Hack Battlefield</p>
                    <p className='horario-reserva-videowall-alerta'>{props.horario} 3:00pm - 5:00pm</p>
                </div>
            }
        </div>
    );
}

export default MensajeBienvenida;
