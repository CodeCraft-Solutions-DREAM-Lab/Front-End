import { useState } from "react";
import Etiqueta from "./components/Etiqueta/Etiqueta.jsx";
import "./Detalles.css";
import BotonSolicitar from "./components/BotonSolicitar/BotonSolicitar.jsx";
import CloseButton from "./components/CloseButton/CloseButton.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    deleteSelectedItem,
    selectSelectedItem,
} from "../../../../redux/Slices/selectedItemSlice.js";
import {
    getFromSessionStorage,
    saveToSessionStorage,
} from "../../../../Global/Storage.js";

function ExperienceDetails(props) {
    const [exitAnimation, setExitAnimation] = useState(false);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedItem = useSelector(selectSelectedItem);

    const handleClose = () => {
        setExitAnimation(true);

        // Esperar 500 milisegundos (por ejemplo)
        setTimeout(() => {
            props.handleClose();
        }, 500); // ajusta el tiempo según tus necesidades
    };

    const handleSolicitarClick = () => {
        // Llama a la función de navegación pasada como prop
        saveToSessionStorage("reservType", selectedItem.type);

		if (selectedItem.type == "sala") {
			saveToSessionStorage("idSala", selectedItem.id);
		} else {
			saveToSessionStorage("idExperiencia", selectedItem.id);
		}

        dispatch(deleteSelectedItem());

        // navigate(
        //     `/reservacion/sala?idSala=${props.idSalaProp}&nombreSala=${props.nombre}`
        // );
		navigate(
            `/reservacion/sala`
        );
    };

    const animationClass = exitAnimation ? "slide-out" : "slide-in";

    return (
        <div className={`main-details-div ${animationClass}`}>
            <div className="boton-cerrar-detalles">
                <CloseButton onClick={handleClose} />
            </div>

            <div className="details">
                <div className="experience-details">
                    <h1 className="experience-name">{props.nombre}</h1>
                    <p className="experience-description">
                        {props.descripcion}
                    </p>
                    <div className="tags-details">
                        <div className="tags-details">
                            {props.exclusivoUF && (
                                <div className="tag">
                                    <Etiqueta
                                        nombre="Exclusivo UF"
                                        tipo="exclusivo-uf"
                                    />
                                </div>
                            )}
                            {props.autodirigido && (
                                <div className="tag">
                                    <Etiqueta
                                        nombre="Autodirigido"
                                        tipo="autodirigido"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="image">
                    <img
                        className="experience-image"
                        src={props.imagenExp}
                        alt="Fotografía de experiencia"
                    />
                </div>

                <div className="boton-solicitud">
                    <BotonSolicitar
                        nombreBoton="Solicitar"
                        onClick={() => handleSolicitarClick()} // Cambio realizado aquí
                    />
                </div>
            </div>
        </div>
    );
}

export default ExperienceDetails;
