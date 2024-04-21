import ListaReservaciones from "./components/ListaReservaciones/ListaReservaciones";
import { useEffect, useState } from "react";
import NameCard from "./components/NameCard/NameCard";
import EsferaPuntosPrioridad from "./components/EsferaPuntosPrioridad/EsferaPuntosPrioridad";
import BotonCelular from "./components/BotonCelular/BotonCelular";
import "./Profile.css";
import BotonBack from "src/globalComponents/BotonBack/BotonBack";
import {
    generateReservationCards,
    renderTarjetasLogro,
} from "./utils/Funciones.jsx";
import CancelarReservacion from "./components/CancelarReservacion/CancelarReservacion.jsx";
import Navbar from "src/globalComponents/NavBar/NavBar.jsx";
import { get } from "src/utils/ApiRequests.js";

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

const reservacionesData = [
    {
        sala: "Sala Horizons",
        experiencia: "VR Experience",
        horaInicio: "15:00:00",
        duracion: 2,
        fecha: "2024-12-15",
    },
    {
        sala: "Dimension Forge",
        experiencia: "Make a Computer - Course",
        horaInicio: "14:30:00",
        duracion: 1,
        fecha: "2024-01-24",
    },
    {
        sala: "Lego Room",
        experiencia: "Swift Course",
        horaInicio: "08:00:00",
        duracion: 3,
        fecha: "2024-04-26",
    },
];

function Profile() {
    const [reservaciones, setReservaciones] = useState([]);
    const [tipoModal, setTipoModal] = useState(0);

    const handleClickModal = (tipo) => {
        setTipoModal(tipo);
    };

    useEffect(() => {
        get("reservaciones")
            .then((res) => {
                console.log("Reservaciones:" + res);
                setReservaciones(res);
            })
            .catch((error) => {
                console.error("An error occurred:", error);
            });
    }, []);

    return (
        <div className="profile-container">
            <div className="navbar-div-profile">
                <Navbar autoHide={false} view="perfil" />
            </div>

            {tipoModal === 1 ? (
                <CancelarReservacion
                    modalClasificacion={1}
                    type="tipo1"
                    titulo1="Tu reserva: Sala Horizons"
                    titulo2="Viernes - 19 de abril"
                    titulo3="14:30 - 15:30"
                    textoRojo="Cancelar"
                    textoVerde="Ok"
                    funcionRojo={() => handleClickModal(2)}
                    funcionVerde={() => handleClickModal(0)}
                />
            ) : tipoModal === 2 ? (
                <CancelarReservacion
                    modalClasificacion={2}
                    type="tipo2"
                    titulo1="Estas a punto de cancelar tu reservación en: Dimension Forge"
                    titulo2="Viernes - 19 de abril"
                    titulo3="14:30 - 15:30"
                    titulo4="¿Deseas continuar?"
                    textoRojo="Si, cancelar"
                    textoVerde="No"
                    funcionRojo={() => handleClickModal(3)}
                    funcionVerde={() => handleClickModal(0)}
                />
            ) : tipoModal === 3 ? (
                <CancelarReservacion
                    modalClasificacion={3}
                    type="tipo3"
                    titulo1="Cancelación exitosa"
                    titulo2="¡Listo! Tu cancelación se ha procesado con éxito."
                    titulo3="¿Necesitas ayuda? Contáctanos aquí"
                    textoVerde="Cerrar"
                    funcionVerde={() => handleClickModal(0)}
                />
            ) : null}

            {/* <div className="boton-atras">
    				<BotonBack className="imagen-boton" ruta="/home/"/>
			</div> */}

            <NameCard />

            <div className="div-exterior-perfil">
                <div className="esfera-div-celular">
                    <EsferaPuntosPrioridad
                        puntos="367"
                        subtitulo="Puntos de prioridad"
                    />
                </div>

                <div className="logros-div">
                    <h2 className="sub">Logros</h2>

                    <div className="logros-div-in">
                        {renderTarjetasLogro(logrosData)}
                        <div className="degradado-down"></div>
                    </div>
                </div>

                <div className="esfera-div">
                    <EsferaPuntosPrioridad
                        puntos="367"
                        subtitulo="Puntos de prioridad"
                    />
                </div>

                <div className="reservaciones-div">
                    <h2 className="sub">Reservaciones activas</h2>

                    <div className="reservaciones-div-in">
                        {generateReservationCards(
                            reservaciones,
                            handleClickModal
                        )}
                        <div className="degradado-down"></div>
                    </div>
                </div>

                <div className="botones-modo-celular">
                    <BotonCelular texto="Logros" tipo="logros" />
                    <BotonCelular
                        texto="Reservaciones activas"
                        tipo="calendario"
                    />
                </div>
            </div>
        </div>
    );
}

export default Profile;
