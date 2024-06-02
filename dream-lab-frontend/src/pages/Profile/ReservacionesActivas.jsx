import "./ReservacionesActivas.css";
import TarjetaReservacion from "./components/TarjetaReservacion/TarjetaReservacion";
import BotonBack from "src/GlobalComponents/BotonBack/BotonBack";
import { generateReservationCards } from "./utils/Funciones.jsx";
import { get, put } from "src/utils/ApiRequests.js";
import React, { useEffect, useState } from "react";
import { existsInSessionStorage, getFromLocalStorage } from "src/utils/Storage";
import CancelarReservacion from "./components/CancelarReservacion/CancelarReservacion.jsx";

function ReservacionesActivas() {
    const [refreshValue, setRefreshValue] = useState(0);
    const [datosReservas, setDatosReservas] = useState([]);
    const [tipoModal, setTipoModal] = useState(0);

    // Variables llenadas por la BD
    const [salaReserva, setSalaReserva] = useState(null);
    const [experienciaReserva, setExperienciaReserva] = useState(null);
    const [horaReserva, setHoraReserva] = useState(null);
    const [diaReserva, setDiaReserva] = useState(null);
    const [idResReserva, setIdResReserva] = useState(null);

    // Actualización de modales
    const handleClickModal = (tipo, sala, experiencia, hora, dia, idReserv) => {
        setTipoModal(tipo);
        setSalaReserva(sala);
        setExperienciaReserva(experiencia);
        setHoraReserva(hora);
        setDiaReserva(dia);
        setIdResReserva(idReserv);
    };

    let idUsuario;
    if (existsInSessionStorage("vistaEstudiante")) {
        idUsuario = "a00000000";
    } else {
        idUsuario = getFromLocalStorage("user");
    }

    useEffect(() => {
        get(`perfil/${idUsuario}`)
            .then((result) => {
                const perfilInfo = result;
                setDatosReservas(perfilInfo.recordsets[1]);
            })
            .catch((error) => {
                console.error("An error occurred:", error);
            });
    }, [idUsuario, refreshValue]);

    const handleCancelarReserva = (idReserva) => {
        const url = `reservaciones/${idReserva}`;
        console.log(idReserva);

        const data = JSON.stringify({
            estatus: 4,
        }); // Aquí podrías enviar datos adicionales si es necesario

        put(
            url,
            data,
            () => {
                console.log("La reserva se canceló satisfactoriamente.");

                // Pasar al siguiente modal
                handleClickModal(
                    4,
                    salaReserva,
                    experienciaReserva,
                    horaReserva,
                    diaReserva
                );
                setRefreshValue(refreshValue + 1);
            },
            (error) => {
                console.error("Error al cancelar la reserva:", error);
            }
        );
    };

    return (
        <div className="out-div">
            {tipoModal === 1 ? (
                <CancelarReservacion
                    modalClasificacion={1}
                    type="tipo1"
                    titulo1={salaReserva}
                    tituloExperiencia={experienciaReserva}
                    titulo2={diaReserva}
                    titulo3={horaReserva}
                    textoRojo="Cancelar reservación"
                    funcionRojo={() =>
                        handleClickModal(
                            2,
                            salaReserva,
                            experienciaReserva,
                            horaReserva,
                            diaReserva,
                            idResReserva
                        )
                    }
                    funcionVerde={() =>
                        handleClickModal(
                            0,
                            salaReserva,
                            experienciaReserva,
                            horaReserva,
                            diaReserva,
                            idResReserva
                        )
                    }
                />
            ) : tipoModal === 2 ? (
                <CancelarReservacion
                    modalClasificacion={2}
                    type="tipo2"
                    titulo1={"¿Quieres cancelar tu reserva?"}
                    titulo2={salaReserva}
                    titulo3={
                        diaReserva.split(" - ")[1] + " (" + horaReserva + ")"
                    }
                    titulo4="¡Perderás puntos de prioridad!"
                    textoRojo="Sí"
                    textoVerde="No"
                    funcionRojo={() => handleCancelarReserva(idResReserva)}
                    /*funcionRojo={() =>handleClickModal(3, salaReserva, experienciaReserva, horaReserva, diaReserva)}*/
                    funcionVerde={() =>
                        handleClickModal(
                            0,
                            salaReserva,
                            experienciaReserva,
                            horaReserva,
                            diaReserva,
                            idResReserva
                        )
                    }
                />
            ) : tipoModal === 3 ? (
                <CancelarReservacion
                    modalClasificacion={3}
                    type="tipo3"
                    titulo1="Cancelación exitosa"
                    titulo2="¡Listo! Tu cancelación se ha procesado con éxito."
                    titulo3="¿Necesitas ayuda? Contáctanos aquí"
                    textoVerde="Cerrar"
                    funcionVerde={() =>
                        handleClickModal(
                            0,
                            salaReserva,
                            experienciaReserva,
                            horaReserva,
                            diaReserva,
                            idResReserva
                        )
                    }
                />
            ) : null}

            <div className="back-subtitulo-div">
                <div className="boton-back">
                    <BotonBack ruta="/profile/" />
                </div>
                <h2 className="sub-celular">Reservaciones activas</h2>
            </div>

            <div className="reservaciones-div-celular">
                <div className="reservaciones-div-in-celular">
                    {generateReservationCards(datosReservas, handleClickModal)}

                    <div className="degradado-down-celular"></div>
                </div>
            </div>
        </div>
    );
}

export default ReservacionesActivas;
