import "./NameCard.css";

// Tipos de datos de props
import propTypes from "prop-types";

// Components
import BotonLogroPerfil from "./components/BotonLogroPerfil/BotonLogroPerfil";

// Hooks
import { useEffect, useState } from "react";

// API Requests
import { get } from "src/utils/ApiRequests";

// Storage
import { getFromLocalStorage, existsInSessionStorage } from "src/utils/Storage";

function NameCard({ nombre, handleLogroArtista }) {
    const [logrosObtenidos, setLogrosObtenidos] = useState([]);
    const [logroSeleccionado, setLogroSeleccionado] = useState({});
    const [colorSeleccionado, setColorSeleccionado] = useState("");

    // Obtener los logros del usuario, el logro seleccionado y el color
    // seleccionado de su preferencia cada que se carga la página
    useEffect(() => {
        let idUsuario;
        if (existsInSessionStorage("vistaEstudiante")) {
            idUsuario = "a00000000";
        } else {
            idUsuario = getFromLocalStorage("user");
        }
        get(`perfil/logros/${idUsuario}`).then((response) => {
            setLogrosObtenidos(response.logros);
            setLogroSeleccionado({
                idLogro: response.configuracionLogro[0].idLogro,
                nombre: response.configuracionLogro[0].nombre,
                iconoURL: response.configuracionLogro[0].iconoURL,
            });
            setColorSeleccionado(response.configuracionLogro[0].colorPreferido);
        });
    }, []);

    return (
        <div className="div-exterior">
            <BotonLogroPerfil
                colorSeleccionado={colorSeleccionado}
                setColorSeleccionado={setColorSeleccionado}
                logrosObtenidos={logrosObtenidos}
                logroSeleccionado={logroSeleccionado}
                setLogroSeleccionado={setLogroSeleccionado}
                handleLogroArtista={handleLogroArtista}
            />
            <div className="div-usuario">
                <h1 className="nombre-usuario">{nombre}</h1>
                <h2 className="apodo" data-cy="namecard-titulo-logro">
                    {logroSeleccionado.nombre}
                </h2>
            </div>
        </div>
    );
}

NameCard.propTypes = {
    nombre: propTypes.string.isRequired,
    handleLogroArtista: propTypes.func.isRequired,
};

export default NameCard;
