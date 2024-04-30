import { post } from "src/utils/ApiRequests";
import { useState, useEffect } from "react";
import {
    getFromLocalStorage,
    getFromSessionStorage,
    existsInSessionStorage,
    removeFromLocalStorage,
    removeFromSessionStorage,
} from "src/utils/Storage";
import { useNavigate } from "react-router-dom";
import AvisoFinal from "./components/AvisoFinal";
import "./ResumenReservacion.css";
import Navbar from "src/GlobalComponents/NavBar/NavBar.jsx";
import GlassCard from "src/GlobalComponents/GlassCard/GlassCard";
import MaterialCardDupe from "./components/MaterialCardDupe/MaterialCardDupe";
import BackArrow from "src/assets/ResumenReservaciones/ArrowLeft.png";
import WarningIcon from "src/assets/ResumenReservaciones/warning.png";

function ResumenReservacion(props) {
    let navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const reservationData = {
        nombre: getFromSessionStorage("nameSalaExperiencia"),
        personas: getFromSessionStorage("personas"),
        fecha: getFromSessionStorage("formattedDate"),
        hora: getFromSessionStorage("formattedTime"),
        horaCorte: getFromSessionStorage("horaCorte"),
        competidores: getFromSessionStorage("competidores"),
        cupos: getFromSessionStorage("cupos")
    }

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
        };

        console.log("Data: ", data);

        setIsLoading(true);
        await post(
            "reservaciones",
            data,
            () => {},
            () => {
                setIsLoading(false);
            }
        ).then((response) => {
            removeFromSessionStorage("horaInicio");
            removeFromSessionStorage("horaInicioIsoString");
            removeFromSessionStorage("duration");
            removeFromSessionStorage("fecha");
            removeFromSessionStorage("fechaIsoString");
            removeFromSessionStorage("nameSalaExperiencia");
            removeFromSessionStorage("personas"),
            removeFromSessionStorage("formattedDate"),
            removeFromSessionStorage("formattedTime"),
            removeFromSessionStorage("horaCorte"),
            removeFromSessionStorage("competidores"),
            removeFromSessionStorage("cupos")
            setIsLoading(false);
            setIsModalOpen(true);
        });
    };

    const handleClick = () => {
        navigate(-1); // Navigate back to the previous page
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
				setIsLoading(false);
				console.log(data);
			})
			.catch((error) => {
				console.error("An error occurred:", error);
				setIsLoading(false);
			});
	}, []);

    return (
        <div>
            <Navbar case="soloPerfil" autohide={false}/>
            <div className="reservation-summary-view">
                <div className="material-summary-container">
                    <div className="material-summary-title">
                        <img className="back-arrow" src={BackArrow} onClick={handleClick}/>
                        <h1 className="material-summary-title-text">Resumen de pedido</h1>
                    </div>
                    <div className="material-summary-wrapper">
                        <div className="material-summary-sm">
                        {data.map((material) => {
                            const selectedMaterial = selectedMaterials.find((m) => m.materialId === material.id);
                            if (selectedMaterial && selectedMaterial.quantity > 0) {
                                return (
                                    <MaterialCardDupe
                                        key={material.id}
                                        materialId={material.id}
                                        name={material.name}
                                        image={material.image}
                                        hideQuantity={true}
                                        initialQuantity={selectedMaterial.quantity}
                                        maxQuantity={material.cantidadDisponible}
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
                    <GlassCard margin="2rem" padding="3rem">
                        <div className="reservation-summary-container-inner">
                            <h1 className="reservation-summary-title">Confirma tu solicitud</h1>
                            <p className="reservation-summary-name">{reservationData.nombre}</p>
                            <p className="reservation-summary-people">{reservationData.personas} Persona(s)</p>
                            <p className="reservation-summary-date">{reservationData.fecha}</p>
                            <p className="reservation-summary-time">{reservationData.hora}</p>
                            <button className="reservation-summary-button" isLoading={isLoading} onClick={handleSubmit}>
                                CONFIRMAR
                            </button>
                        </div>
                    </GlassCard>
                    <div className="reservation-summary-warning">
                        <img className="warning-icon" src={WarningIcon} />
                        <p className="reservation-summary-warning-message">La asignación del lugar se hará hoy a las <strong>{reservationData.horaCorte}</strong>. Compiten <strong>{reservationData.competidores}</strong> reservaciones por <strong>{reservationData.cupos}</strong> cupos.</p>
                    </div>
                </div>
                {/* <AvisoFinal
                    isOpen={isModalOpen}
                    size="xl"
                    onOk={() => {
                        setIsModalOpen(false);
                        navigate("/home");
                    }}
                    onClose={() => {
                        setIsModalOpen(false);
                        navigate("/home");
                    }}
                /> */}
            </div>
        </div>
    );
}

export default ResumenReservacion;
