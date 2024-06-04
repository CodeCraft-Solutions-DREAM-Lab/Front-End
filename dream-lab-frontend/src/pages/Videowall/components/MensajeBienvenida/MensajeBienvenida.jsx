import React, { useState, useEffect } from "react";
import "./MensajeBienvenida.css";
import flecha from "../../../../assets/Videowall/flechasToQr.png";
import qr from "../../../../assets/Videowall/qrTemporal.png";
import imagenError from "../../../../assets/Videowall/errorVideowall.png";
import imagenCorrecto from "../../../../assets/Videowall/correctoVideowall.png";
import QRCode from "react-qr-code";
import { get, put } from "src/utils/ApiRequests";
import AlertaAsistencia from "../AlertaAsistencia/AlertaAsistencia";
import { set } from "date-fns";

function MensajeBienvenida(props) {
    const [cerrado, setCerrado] = useState(false);
    const [reservaFiltrada, setReservaFiltrada] = useState(null);
    const [error, setError] = useState(props.error);
    const [nombreUsuario, setNombreUsuario] = useState(null);
    const [llegoTarde, setLlegoTarde] = useState(null);

    //  get de base de datos
    useEffect(() => {     

        setCerrado(true);

        get(`usuarios/nombreUsuario/${props.tagId}`)
            .then((result) => {
                const nombreUsuario = result;
                console.log(
                    "Nombre de usuario:",
                    nombreUsuario[0].NombreUsuario
                );
                setNombreUsuario(nombreUsuario[0].NombreUsuario);
            })
            .catch((error) => {
                console.error("An error occurred:", error);
            });

            // Esperar 5 segundos antes de cerrar el mensaje
            setTimeout(() => {
                setCerrado(false);
            }, 300);

    }, [props.tagId]);

    const filtrarReservaciones = (listadoReservaciones, tagId) => {
        if (!listadoReservaciones || listadoReservaciones.length === 0) {
            return null;
        }
        const reservacionesFiltradas = listadoReservaciones.filter(
            (reservacion) => reservacion.tagId === tagId
        );
        return reservacionesFiltradas.reduce((menorReserva, reservaActual) => {
            if (
                !menorReserva ||
                reservaActual.horaInicio < menorReserva.horaInicio
            ) {
                return reservaActual;
            } else {
                return menorReserva;
            }
        }, null);
    };

    useEffect(() => {
        const reservaFiltrada = filtrarReservaciones(
            props.listadoReservaciones,
            props.tagId
        );
    
        if (!reservaFiltrada) {
            setError(true); // Establecer error en true si no se encuentra una reserva
        } else {
            setError(false); // Establecer error en false si se encuentra una reserva

            setReservaFiltrada(reservaFiltrada);
            console.log("Reserva filtrada:", reservaFiltrada);
    
            // Calcular la diferencia de tiempo en minutos
            const horaInicioString = reservaFiltrada.horaInicio;
            const horaInicioArray = horaInicioString.split(":");
            const horaInicio = new Date();
            horaInicio.setHours(parseInt(horaInicioArray[0]));
            horaInicio.setMinutes(parseInt(horaInicioArray[1]));
            const ahora = new Date();
            const diferenciaMinutos = (ahora.getTime() - horaInicio.getTime()) / (1000 * 60);

            // Establecer el estado de asistencia
            let asistenciaState;
            if (diferenciaMinutos > 15) {
                asistenciaState = "Tarde";
                setLlegoTarde(true);
            } else {
                asistenciaState = "A tiempo";
                setLlegoTarde(false);
            }
    
            // Actualizar la asistencia de la reserva filtrada
            const url = `reservaciones/${reservaFiltrada.idReservacion}`;
            const data = JSON.stringify({
                asistencia: asistenciaState,
            });
    
            // Si la reserva filtrada existe y no tiene asistencia registrada, se registra la asistencia
            if (reservaFiltrada && reservaFiltrada.asistencia === null) {
                put(
                    url,
                    data,
                    () => {
                        console.log("Asistencia registrada.");
                    },
                    (error) => {
                        console.error("Error al registrar asistencia", error);
                    }
                );
            }
        }
    }, [props.listadoReservaciones, props.tagId]);
    

    const handleCloseClick = () => {
        props.onClose();
    };

    if (cerrado) {
        return null; // Si el mensaje está cerrado o no hay reserva filtrada, no se renderiza nada
    }

    // Obtener la primera palabra del nombre del usuario
    const primerNombre = nombreUsuario
        ? nombreUsuario.split(" ")[0]
        : "explorador";

    const bordeColor = llegoTarde ? "#E19F20" : "#1BAC55";

    return (
        <div
            className="mensaje-bienvenida-videowall"
            style={
                error
                    ? { border: "13px solid #e84ea0" }
                    : { border: `13px solid ${bordeColor}` }
            }
        >
            
            <AlertaAsistencia tarde={llegoTarde} />

            <div className="alerta-videowall-primera-mitad">
                {/* Bienvenida al usuario*/}
                <h1 className="titulo-mensaje-bienvenida-videowall">
                    ¡Hola {primerNombre}!
                </h1>

                {/* Botón de cerrar */}
                <div
                    className="btn-cerrar-alerta-videowall"
                    onClick={handleCloseClick}
                >
                    <button>X</button>
                </div>
            </div>

            {/* Imagen*/}
            <div
                className={
                    error
                        ? "imagen-alerta-videowall-bienvenida"
                        : "imagen-alerta-videowall-bienvenida-exito"
                }
            >
                <img
                    src={error ? imagenError : imagenCorrecto}
                    alt="Alerta videowall"
                />
            </div>

            {/* Descripción*/}
            <p
                className={
                    error
                        ? "descripcion-mensaje-bienvenida-videowall"
                        : "descripcion-mensaje-bienvenida-videowall-reserva"
                }
            >
                {error
                    ? "Hoy no tienes reservaciones activas."
                    : "Tu próxima reservación"}
            </p>

            {error ? (
                // Aquí se muestra el QR y la flecha
                <div className="div-qr-reservacion">
                    <p className="agenda-aqui-alerta-videowall">
                        Agenda una aquí
                    </p>
                    <div className="imagen-flecha-alerta-videowall">
                        <img src={flecha} alt="Flecha" />
                    </div>
                    {/*<div className='imagen-qr-alerta-videowall'><img src={qr} alt="QR" /></div>*/}
                    <div className="imagen-qr-alerta-videowall-2">
                        <QRCode
                            className="qr-code-alerta-generado"
                            value={props.qrCode}
                        />
                    </div>
                </div>
            ) : (
                // Aquí se muestra la información de la reservación filtrada
                <div className="div-informacion-reserva-alerta-videowall">
                    <p className="nombre-sala-videowall-alerta">
                        {reservaFiltrada ? reservaFiltrada.nombre_sala : ""}
                    </p>
                    <p className="horario-reserva-videowall-alerta">
                        {reservaFiltrada
                            ? `${reservaFiltrada.horaInicio} - ${reservaFiltrada.horaFin}`
                            : ""}
                    </p>
                </div>
            )}
        </div>
    );
}

export default MensajeBienvenida;
