// ApiRequests
import { post } from "src/utils/ApiRequests";

// Hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Storage
import {
    getFromLocalStorage,
    getFromSessionStorage,
    existsInSessionStorage,
    multiClearSessionStorage,
} from "src/utils/Storage";

// Componentes
import AvisoFinal from "./components/AvisoFinal";
import MaterialCardDupe from "./components/MaterialCardDupe/MaterialCardDupe";
import { InfoReservCardDupe } from "./components/InfoReservCardDupe/InfoReservCardDupe";

// Estilos
import "./ResumenReservacion.css";

// Navbars
import NavBar from "src/GlobalComponents/NavBar/NavBar.jsx";
import NavBarAdmin from "src/GlobalComponents/NavBarAdmin/NavBarAdmin";

// Global Components
import GlassCard from "src/GlobalComponents/GlassCard/GlassCard";
import AvisoLogroNuevo from "src/GlobalComponents/AvisoLogroNuevo/AvisoLogroNuevo";
import ProgresoLogro from "src/GlobalComponents/ProgresoLogro/ProgresoLogro";

// Assets
import BackArrow from "src/assets/ResumenReservaciones/ArrowLeft.webp";

function ResumenReservacion() {
    let navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [infoAvisoLogro, setInfoAvisoLogro] = useState("");

    // Función para manejar el cambio de información del aviso de logro
    const handleInfoAvisoLogroChange = async () => {
        try {
            const response2 = await post(
                `logros/progresoLogro/${getFromLocalStorage("user")}/1` // Ruta modificada según tu especificación
            );
            // Almacenar la respuesta en infoLogroAviso
            setInfoAvisoLogro(response2);
            console.log(response2);
        } catch (error) {
            console.error(error);
        }
    };

    const reservationData = {
        nombre: getFromSessionStorage("nameSalaExperiencia"),
        personas: getFromSessionStorage("personas"),
        fecha: getFromSessionStorage("formattedDate"),
        hora: getFromSessionStorage("formattedTime"),
        horaCorte: getFromSessionStorage("horaCorte"),
        competidores: getFromSessionStorage("competidores"),
        cupos: getFromSessionStorage("cupos"),
    };

    const handleSubmit = async () => {
        const data = {
            idUsuario: getFromLocalStorage("user") || "A0XXXXXX1",
            idSala: getFromSessionStorage("idSala") || null,
            idExperiencia: getFromSessionStorage("idExperiencia") || null,
            horaInicio: getFromSessionStorage("horaInicioIsoString"),
            duracion: getFromSessionStorage("duration"),
            fecha: getFromSessionStorage("fechaIsoString"),
            idMesa: null,
            estatus: 5,
            numPersonas: reservationData.personas,
        };

        if (existsInSessionStorage("nombreReservacionAdmin")) {
            data.nombreAlterno = getFromSessionStorage(
                "nombreReservacionAdmin"
            );
        }

        console.log("Data: ", data);

        const doAfterResponse = () => {
            handleInfoAvisoLogroChange();
            const keysToRemove = [
                "horaInicio",
                "horaInicioIsoString",
                "duration",
                "fecha",
                "fechaIsoString",
                "nameSalaExperiencia",
                "personas",
                "formattedDate",
                "formattedTime",
                "horaCorte",
                "competidores",
                "cupos",
            ];
            multiClearSessionStorage(keysToRemove);
            setIsModalOpen(true);
        };

        // En caso de encontrarse en la vista de estudiante, saltarse la
        // petición
        if (!existsInSessionStorage("vistaEstudiante")) {
            console.log("Enviando solicitud de reservación");
            await post("reservaciones", data).then(() => {
                doAfterResponse();
            });
        } else {
            doAfterResponse();
        }
    };

    const handleClick = () => {
        navigate(`/reservacion/material/`); // Navigate back to the previous page
    };

    const [selectedMaterials, setSelectedMaterials] = useState(() => {
        if (
            existsInSessionStorage("materials") &&
            getFromSessionStorage("materials")
        ) {
            console.log(JSON.parse(getFromSessionStorage("materials")));
            return JSON.parse(getFromSessionStorage("materials"));
        } else {
            return [];
        }
    });
    const [data, setData] = useState([]);

    useEffect(() => {
        const date = new Date(getFromSessionStorage("fecha"));

        // Parametros Stored Procedure
        const params = {
            idSala: getFromSessionStorage("idSala"),
            fecha: date.toISOString(),
            horaInicio: getFromSessionStorage("horaInicioIsoString"),
            duracion: parseInt(getFromSessionStorage("duration")),
        };

        post("materiales", params)
            .then((result) => {
                setData(result);
            })
            .catch((error) => {
                console.error("An error occurred:", error);
            });
    }, []);

    return (
        <div className="contenedor-resumen-de-reservacion">
            {existsInSessionStorage("nombreReservacionAdmin") ? (
                <NavBarAdmin />
            ) : (
                <NavBar view="soloPerfil" autoHide={false} />
            )}
            <div className="reservation-summary-view">
                <div className="material-summary-container">
                    <div className="material-summary-title">
                        <img
                            data-cy="summmary-back-button"
                            className="back-arrow"
                            src={BackArrow}
                            onClick={handleClick}
                        />
                        <h1 className="material-summary-title-text">
                            Resumen de pedido
                        </h1>
                    </div>
                    <div className="material-summary-wrapper">
                        <div className="material-summary-sm">
                            {data.length > 0 &&
                                selectedMaterials.length === 0 && (
                                    <p className="material-summary-empty">
                                        No seleccionaste ningún material.
                                    </p>
                                )}
                            {data.map((material, index) => {
                                const selectedMaterial = selectedMaterials.find(
                                    (m) => m.materialId === material.id
                                );
                                if (
                                    selectedMaterial &&
                                    selectedMaterial.quantity > 0
                                ) {
                                    return (
                                        <MaterialCardDupe
                                            name={material.name}
                                            image={material.image}
                                            initialQuantity={
                                                selectedMaterial.quantity
                                            }
                                            key={index}
                                        />
                                    );
                                } else {
                                    return null; // If quantity is not greater than 0, don't render anything
                                }
                            })}
                        </div>
                    </div>
                </div>
                <div className="reservation-summary-container">
                    <GlassCard classes="reservation-summary-glasscard-classes">
                        <div className="reservation-summary-container-inner">
                            <div className="reservation-summary-title-row">
                                <img
                                    className="back-arrow-responsive"
                                    src={BackArrow}
                                    onClick={handleClick}
                                />
                                <h1 className="reservation-summary-title">
                                    Confirma tu solicitud
                                </h1>
                            </div>
                            <p
                                data-cy="summary-lab-name"
                                className="reservation-summary-name"
                            >
                                {reservationData.nombre}
                            </p>
                            <p
                                data-cy="summary-lab-people"
                                className="reservation-summary-people"
                            >
                                {reservationData.personas} Persona(s)
                            </p>
                            <p
                                data-cy="summary-lab-date"
                                className="reservation-summary-date"
                            >
                                {reservationData.fecha}
                            </p>
                            <p
                                data-cy="summary-lab-time"
                                className="reservation-summary-time"
                            >
                                {reservationData.hora}
                            </p>
                            <button
                                data-cy="summary-submit-button"
                                className="reservation-summary-button"
                                onClick={handleSubmit}
                            >
                                CONFIRMAR
                            </button>
                        </div>
                    </GlassCard>

                    {infoAvisoLogro.nuevaPrioridad != null && (
                        <AvisoLogroNuevo
                            isOpen={true}
                            datosLogro={infoAvisoLogro}
                        />
                    )}

                    {infoAvisoLogro.obtenido == false &&
                        infoAvisoLogro.obtenidoPreviamente == false && (
                            <ProgresoLogro
                                isOpen={true}
                                datosLogro={infoAvisoLogro}
                            />
                        )}

                    <InfoReservCardDupe
                        horaCorte={reservationData.horaCorte}
                        competidores={reservationData.competidores}
                        cupos={reservationData.cupos}
                    ></InfoReservCardDupe>
                </div>

                <AvisoFinal
                    isOpen={isModalOpen}
                    size="xl"
                    onOk={() => {
                        setIsModalOpen(false);
                        if (existsInSessionStorage("nombreReservacionAdmin")) {
                            navigate("/admin");
                        } else {
                            navigate("/home");
                        }
                    }}
                    onClose={() => {
                        setIsModalOpen(false);
                        if (existsInSessionStorage("nombreReservacionAdmin")) {
                            navigate("/admin");
                        } else {
                            navigate("/home");
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default ResumenReservacion;
