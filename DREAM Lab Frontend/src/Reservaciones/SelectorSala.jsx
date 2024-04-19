import FechaFormulario from "./components/FechaFormulario";
import TextoNombreSala from "./components/TextoNombreSala.jsx";
import { Button } from "@nextui-org/react";
import PrimerRecordatorio from "./components/PrimerRecordatorio";
import TextoFecha from "./components/TextoFecha";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Reservaciones/SelectorSala.css";
import NavBar from "../components/general/NavBar";
import Slider from "./Slider";
import imagePlaceholder from "./components/3D-model-placeholder.png";
import GlassCard from "../components/general/GlassCard";
import "./components/RoundedButton.css";
import { get } from "../Global/Database.js";
import { useLocation } from "react-router-dom";

import { getFromSessionStorage, saveToSessionStorage } from "../Global/Storage";

function SelectorSala(props) {
    let navigate = useNavigate();

    const [isFirstReminderOpen, setIsFirstReminderOpen] = useState(false);
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);
    const [update, setUpdate] = useState(false);
    const [espacioMax, setEspacioMax] = useState(10);
    const [idSala, setIdSala] = useState(0);
    const [idExperiencia, setIdExperiencia] = useState(0);
    const [nombreSala, setNombreSala] = useState("");
    const [nombreExperiencia, setNombreExperiencia] = useState("");

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    useEffect(() => {
        if (getFromSessionStorage("reservType") == "sala") {
            setIdSala(getFromSessionStorage("idSala"));
        } else {
            setIdExperiencia(getFromSessionStorage("idExperiencia"));
        }
    }, []);

	useEffect(() => {
        if (idExperiencia != 0) {
            get(`salas/nameFromExperienceId/${idExperiencia}`)
                .then((result) => {
                    setNombreSala(result.nombre);
                })
                .catch((error) => {
                    console.error("An error occurred:", error);
                });


            get(`experiencias/${idExperiencia}`)
                .then((result) => {
                    saveToSessionStorage(
                        "idSala",
                        result[0].idSala
                    );
                    setNombreExperiencia(
                        result[0].nombreExperiencia
                    );
                })
                .catch((error) => {
                    console.error("An error occurred:", error);
                });
        } else {
            get(`salas/${idSala}`)
                .then((result) => {
                    setNombreSala(result.recordsets[0][0].nombreSala);
                })
                .catch((error) => {
                    console.error("An error occurred:", error);
                });
        }

		if (!!idSala) {
			get(`mesas/${idSala}`)
			.then((result) => {
				const maxCupos = result.recordsets[0][0].maxCupos;
				setEspacioMax(maxCupos);
			})
			.catch((error) => {
				console.error("An error occurred:", error);
			});
		}

    }, [idSala, idExperiencia]);


    useEffect(() => {
        if (
            !getFromSessionStorage("fecha") ||
            !getFromSessionStorage("horaInicio") ||
            !getFromSessionStorage("duration")
        ) {
            setIsNextButtonDisabled(true);
        } else {
            setIsNextButtonDisabled(false);
        }
    }, [update]);

	return (
		<div>
			<NavBar view="soloPerfil" autoHide={false} />
			<div className="outer-container">
				<GlassCard className="menu-lateral">
					<p>menu</p>
				</GlassCard>
				<div className="container">
					{/* Contenedor principal */}

                    <div className="card-container">
                        {/* Sección de la izquierda */}

                        {/* Nombre de la sala */}
                        {/* <div className="nombre-sala">
							<h1>{nombreSala}</h1>
						</div> */}
                        <TextoNombreSala />
                        <Slider minimo={1} maximo={espacioMax} />
                        <div className="model">
                            <img src={imagePlaceholder}></img>{" "}
                            {/* Placeholder del modelo 3D */}
                        </div>
                    </div>
                    <div className="form-container">
                        {/* Sección de la derecha */}
                        <PrimerRecordatorio
                            isOpen={isFirstReminderOpen}
                            size="2xl"
                            onClose={() => {
                                setIsFirstReminderOpen(false);
                            }}
                            onOk={() => {
                                setIsFirstReminderOpen(false);
                                navigate("/reservacion/resumen");
                            }}
                        />
                        <FechaFormulario
                            update={update}
                            setUpdate={setUpdate}
                        />
                        <TextoFecha update={update} />
                        <div className="button-container">
                            {" "}
                            {/* Button container div */}
                            <Button
                                className="mt-2 rounded-full justify-self-center login-button"
                                onClick={() => {
                                    setIsFirstReminderOpen(true);
                                }}
                                color="white"
                                disabled={isNextButtonDisabled}
                            >
                                <p className="button-label">ACEPTAR</p>
                            </Button>
                        </div>
                        <div className="alerta">
                            <p>
                                La asignación del lugar se hará hoy a las 3 pm.
                                Compiten 10 reservaciones por 20 cupos.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SelectorSala;
