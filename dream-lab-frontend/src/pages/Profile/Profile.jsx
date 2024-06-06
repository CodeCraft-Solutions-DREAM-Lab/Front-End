import ListaReservaciones from "./components/ListaReservaciones/ListaReservaciones";
import { useEffect, useState } from "react";
import NameCard from "./components/NameCard/NameCard";
import EsferaPuntosPrioridad from "./components/EsferaPuntosPrioridad/EsferaPuntosPrioridad";
import BotonCelular from "./components/BotonCelular/BotonCelular";
import "./Profile.css";
import BotonBack from "src/GlobalComponents/BotonBack/BotonBack";
import {
    generateReservationCards,
    renderTarjetasLogro,
} from "./utils/Funciones.jsx";
import CancelarReservacion from "./components/CancelarReservacion/CancelarReservacion.jsx";
import Navbar from "src/GlobalComponents/NavBar/NavBar.jsx";
import { get, put } from "src/utils/ApiRequests.js";
import LogoRobot from "../../assets/Profile/Star.webp";
import { existsInSessionStorage, getFromLocalStorage } from "src/utils/Storage";
import InfoLogo from "src/assets/Profile/infoLogo.png";
import InformacionModal from "./components/InformacionModal/InformacionModal.jsx";

function Profile() {
    const [reservaciones, setReservaciones] = useState([]);
    const [tipoModal, setTipoModal] = useState(0);
    const [infoPerfil, setInfoPerfil] = useState([]);

    const [datosUsuario, setDatosUsuario] = useState([]);
    const [datosReservas, setDatosReservas] = useState([]);
    const [datosLogros, setDatosLogros] = useState([]);
    const [estadoLogros, setEstadoLogros] = useState([]);

    // Variables llenadas por la BD
    const [salaReserva, setSalaReserva] = useState(null);
    const [experienciaReserva, setExperienciaReserva] = useState(null);
    const [horaReserva, setHoraReserva] = useState(null);
    const [diaReserva, setDiaReserva] = useState(null);
    const [idResReserva, setIdResReserva] = useState(null);
    const [refreshValue, setRefreshValue] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Variables para el modal
    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    // Enlace de ayuda para el modal
    const mensajeAyuda = (
        <span>
            ¿Necesitas ayuda?{" "}
            <a
                style={{ textDecoration: "underline" }}
                href="https://n9.cl/zfqn2"
            >
                Contáctanos aquí
            </a>
        </span>
    );

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
                setDatosUsuario(perfilInfo.recordsets[0][0]);
                setDatosReservas(perfilInfo.recordsets[1]);
                setDatosLogros(perfilInfo.recordsets[2]);
                setEstadoLogros(perfilInfo.recordsets[3]);

                // Si se encuentra en la vista de estudiante, se simulan los
                // datos de reservaciones
                if (idUsuario === "a00000000") {
                    setDatosReservas([
                        {
                            idReservacion: 1,
                            idSala: 2,
                            idExperiencia: 2,
                            idMesa: 2,
                            estatus: 3,
                            horaInicio: "1970-01-01T00:00:00.000Z",
                            duracion: 24,
                            fecha: new Date().toISOString(),
                            numPersonas: 3,
                            nombre_experiencia: "Cisco Experience",
                            nombre_sala: "Dimension Forge",
                        },
                        {
                            idReservacion: 2,
                            idSala: 2,
                            idExperiencia: 2,
                            idMesa: 2,
                            estatus: 3,
                            horaInicio: "1970-01-01T00:00:00.000Z",
                            duracion: 24,
                            fecha: new Date(
                                new Date().getTime() + 24 * 60 * 60 * 1000
                            ).toISOString(),
                            numPersonas: 3,
                            nombre_experiencia: "Cisco Experience",
                            nombre_sala: "Dimension Forge",
                        },
                    ]);
                }
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

        // Checar si nos encontramos en la vista de estudiante, en caso de ser
        // así, se elimina una de las reservaciones de prueba sin hacer una
        // llamada a la base de datos
        if (idUsuario !== "a00000000") {
            put(
                url,
                data,
                () => {
                    console.log("La reserva se canceló satisfactoriamente.");

                    const url2 = `usuarios/${idUsuario}`;
                    let prioridadPenalizada;
                    let prioridadActual = datosUsuario.prioridad;

                    if (prioridadActual - 5 >= 0) {
                        prioridadPenalizada = prioridadActual - 5;
                    } else if (prioridadActual - 5 < 0) {
                        prioridadPenalizada = 0;
                    }

                    const data2 = JSON.stringify({
                        prioridad: prioridadPenalizada,
                    });

                    put(
                        url2,
                        data2,
                        () => {
                            console.log("Penalización aplicada.");
                        },
                        (error) => {
                            console.error(
                                "Error al aplicar penalización:",
                                error
                            );
                        }
                    );

                    // Pasar al siguiente modal
                    handleClickModal(
                        3,
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
        } else {
            console.log("Reserva de muestra cancelada.");

            // Eliminar del arreglo de reservaciones
            const reservacionesActualizadas = datosReservas.filter(
                (reservacion) => reservacion.idReservacion !== idReserva
            );
            setDatosReservas(reservacionesActualizadas);

            // Pasar al siguiente modal
            handleClickModal(
                3,
                salaReserva,
                experienciaReserva,
                horaReserva,
                diaReserva
            );
        }
    };

    const handleLogroArtista = (logroId) => {
        return new Promise((resolve, reject) => {
            const url = `logros/${idUsuario}/${logroId}`;
            let nuevoValorLogro = estadoLogros[logroId - 1].valorActual + 1;
            const valorMaxLogro = datosLogros[logroId - 1].valorMax;

            if (nuevoValorLogro >= valorMaxLogro) {
                nuevoValorLogro = valorMaxLogro;
            }

            const data = JSON.stringify({
                valorActual: nuevoValorLogro,
            });

            put(
                url,
                data,
                () => {
                    if (nuevoValorLogro == valorMaxLogro) {
                        const url2 = `logros/${idUsuario}/${logroId}`;
                        const data2 = JSON.stringify({
                            obtenido: true,
                        });

                        put(
                            url2,
                            data2,
                            () => {
                                resolve();
                            },
                            (error) => {
                                reject("Error al obtener el logro.");
                            }
                        );
                    } else {
                        resolve();
                    }

                    setRefreshValue(refreshValue + 1);
                },
                (error) => {
                    reject("Error al guardar el progreso del logro.");
                }
            );
        });
    };
    return (
        <div className="profile-container-out">
            <div className="profile-container">
                <div className="navbar-div-profile">
                    <Navbar autoHide={false} view="perfil" />
                </div>

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
                            diaReserva.split(" - ")[1] +
                            " (" +
                            horaReserva +
                            ")"
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
                        titulo3={mensajeAyuda}
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

                {/* <div className="boton-atras">
    				<BotonBack className="imagen-boton" ruta="/home/"/>
			</div> */}

                <NameCard
                    nombre={
                        datosUsuario.nombre
                            ? datosUsuario.nombre.split(" ")[0] +
                              " " +
                              datosUsuario.apellidoP
                            : "Mi perfil"
                    }
                    handleLogroArtista={handleLogroArtista}
                />

                <div
                    className="boton-informacion-puntos-prioridad"
                    onClick={openModal}
                >
                    <img
                        className="foto-boton-info-puntos-prioridad"
                        src={InfoLogo}
                        alt="Información"
                    />
                </div>
                
                <InformacionModal
                    isOpen={modalIsOpen}
                    closeModal={closeModal}
                />

                <div className="div-exterior-perfil">
                    <div className="esfera-div-celular">
                        <EsferaPuntosPrioridad
                            puntos={
                                datosUsuario.prioridad
                                    ? datosUsuario.prioridad
                                    : "?"
                            }
                            subtitulo={
                                datosUsuario.prioridad
                                    ? "Puntos de prioridad"
                                    : "Cargando"
                            }
                        />
                    </div>

                    <div className="logros-div">
                        <h2 className="sub">Logros</h2>

                        <div className="logros-div-in">
                            {renderTarjetasLogro(datosLogros, estadoLogros)}
                            <div className="degradado-down"></div>
                        </div>
                    </div>

                    <div className="esfera-div">
                        <EsferaPuntosPrioridad
                            puntos={
                                datosUsuario.prioridad >= 0
                                    ? datosUsuario.prioridad
                                    : "..."
                            }
                            subtitulo={
                                datosUsuario.prioridad >= 0
                                    ? "Puntos de prioridad"
                                    : "Cargando"
                            }
                        />
                    </div>

                    <div className="reservaciones-div">
                        <h2 className="sub">Reservaciones activas</h2>

                        <div
                            className="reservaciones-div-in"
                            data-cy="reservationCard"
                        >
                            {generateReservationCards(
                                datosReservas,
                                handleClickModal
                            )}
                            <div className="degradado-down"></div>
                        </div>
                    </div>

                    <div className="botones-modo-celular">
                        <BotonCelular
                            texto="Logros"
                            tipo="logros"
                            datosLogros={datosLogros}
                            estadoLogros={estadoLogros}
                        />
                        <BotonCelular
                            texto="Reservaciones activas"
                            tipo="calendario"
                            datosReservas={datosReservas}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
