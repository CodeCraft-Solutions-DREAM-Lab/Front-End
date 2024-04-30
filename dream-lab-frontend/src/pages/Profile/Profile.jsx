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
import { get, put} from "src/utils/ApiRequests.js";
import LogoRobot from "../../assets/Profile/Star.gif";
import { getFromLocalStorage } from "../../utils/Storage";

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

    // Enlace de ayuda para el modal
    const mensajeAyuda = (
        <span>
          ¿Necesitas ayuda? {" "}
          <a style={{ textDecoration: 'underline' }} href="https://n9.cl/zfqn2">Contáctanos aquí</a>
        </span>
    );      

    // Actualización de modales
    const handleClickModal = (tipo, sala, experiencia, hora, dia, idReserv) => {
        setTipoModal(tipo)
        setSalaReserva(sala)
        setExperienciaReserva(experiencia)
        setHoraReserva(hora)
        setDiaReserva(dia)
        setIdResReserva(idReserv)
    };

    /*console.log(getFromSessionStorage("idUsuario"))*/
    const idUsuario = (getFromLocalStorage("user"));

    useEffect(() => {
        get(`perfil_info/${idUsuario}`)
            .then((result) => {
                const perfilInfo = result;
                setDatosUsuario(perfilInfo.recordsets[0][0]);
                setDatosReservas(perfilInfo.recordsets[1]);
                setDatosLogros(perfilInfo.recordsets[2]);
                setEstadoLogros(perfilInfo.recordsets[3]);
            })
            .catch((error) => {
                console.error("An error occurred:", error);
            });
    }, [idUsuario, refreshValue]);
    
    const handleCancelarReserva = (idReserva) => {
        
        const url = `reservaciones/${idReserva}`;
        console.log(idReserva)
        
        const data = JSON.stringify({
            estatus: 4,
          }); // Aquí podrías enviar datos adicionales si es necesario
    
        put(url, data, () => {
            console.log("La reserva se canceló satisfactoriamente.");

            const url2 = `usuarios/${idUsuario}`;
            let prioridadPenalizada;
            let prioridadActual=datosUsuario.prioridad;

            if (prioridadActual - 5 >= 0) {
                prioridadPenalizada = prioridadActual - 5;
            } else if (prioridadActual - 5 < 0){
                prioridadPenalizada = 0;
            }            

            const data2 = JSON.stringify({
                prioridad: prioridadPenalizada
            });
            
            put(url2, data2, () => {
                console.log("Penalización aplicada.");
            }, (error) => {
                console.error("Error al aplicar penalización:", error);
            });
            
            // Pasar al siguiente modal
            handleClickModal(3, salaReserva, experienciaReserva, horaReserva, diaReserva)
            setRefreshValue(refreshValue + 1)

        }, (error) => {
            console.error("Error al cancelar la reserva:", error);
        });
    };

    const handleLogroArtista = (logroId) => {
        const url = `logros/${idUsuario}/${logroId}`;
        let nuevoValorLogro = estadoLogros[logroId - 1].valorActual + 1;
        console.log("NUEVO VALOR LOGRO = " + nuevoValorLogro);
        console.log(datosLogros[logroId - 1].nombre)
        const valorMaxLogro = datosLogros[logroId - 1].valorMax;
        console.log("VALOR MAX LOGRO = " + valorMaxLogro);

        if (nuevoValorLogro >= valorMaxLogro) {
            nuevoValorLogro = valorMaxLogro;
        }

        const data = JSON.stringify({
            valorActual: nuevoValorLogro,
        }); // Aquí podrías enviar datos adicionales si es necesario

        put(url, data, () => {
            console.log("El progreso del logro se actualizó satisfactoriamente.");

            if (nuevoValorLogro == valorMaxLogro) {
                const url2 = `logros/${idUsuario}/${logroId}`;
                const data2 = JSON.stringify({
                    obtenido: true,
                });

                put(url2, data2, () => {
                    console.log("El logro se ha obtenido.");
                }, (error) => {
                    console.error("Error al obtener el logro.", error);
                });
            }

            setRefreshValue(refreshValue + 1)
        }, (error) => {
            console.error("Error al guardar el progreso del logro.", error);
        });
    }

    return (
        <div className="profile-container">
            <div className="navbar-div-profile">
                <Navbar autoHide={false} view="perfil" />
            </div>

            {tipoModal === 1 ? (
                <CancelarReservacion
                    modalClasificacion={1}
                    type="tipo1"
                    titulo1={salaReserva}
                    tituloExperiencia = {experienciaReserva}
                    titulo2={diaReserva}
                    titulo3={horaReserva}
                    textoRojo="Cancelar reservación"
                    funcionRojo={() => handleClickModal(2, salaReserva, experienciaReserva, horaReserva, diaReserva, idResReserva)}
                    funcionVerde={() => handleClickModal(0, salaReserva, experienciaReserva, horaReserva, diaReserva, idResReserva)}
                />
            ) : tipoModal === 2 ? (
                <CancelarReservacion
                    modalClasificacion={2}
                    type="tipo2"
                    titulo1={"¿Quieres cancelar tu reserva?"}
                    titulo2={salaReserva }
                    titulo3={diaReserva.split(" - ")[1] + " (" + horaReserva + ")"}
                    titulo4="¡Perderás puntos de prioridad!"
                    textoRojo="Sí"
                    textoVerde="No"
                    funcionRojo={() => handleCancelarReserva(idResReserva)}
                    /*funcionRojo={() =>handleClickModal(3, salaReserva, experienciaReserva, horaReserva, diaReserva)}*/
                    funcionVerde={() => handleClickModal(0, salaReserva, experienciaReserva, horaReserva, diaReserva, idResReserva)}
                />
            ) : tipoModal === 3 ? (
                <CancelarReservacion
                    modalClasificacion={3}
                    type="tipo3"
                    titulo1="Cancelación exitosa"
                    titulo2="¡Listo! Tu cancelación se ha procesado con éxito."
                    titulo3={mensajeAyuda}
                    textoVerde="Cerrar"
                    funcionVerde={() => handleClickModal(0, salaReserva, experienciaReserva, horaReserva, diaReserva, idResReserva)}
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
                apodo={datosUsuario.apodo}
                icono={datosUsuario.iconoURL? datosUsuario.iconoURL : LogoRobot}
                onClick={() => handleLogroArtista(10)}
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
                            (datosUsuario.prioridad >= 0)
                                ? datosUsuario.prioridad
                                : "..."
                        }
                        subtitulo={
                            (datosUsuario.prioridad >= 0)
                                ? "Puntos de prioridad"
                                : "Cargando"
                        }
                    />
                </div>

                <div className="reservaciones-div">
                    <h2 className="sub">Reservaciones activas</h2>

                    <div className="reservaciones-div-in" data-cy="reservationCard">
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
    );
}

export default Profile;
