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
import { getFromLocalStorage } from "src/utils/Storage";

function NameCard({ nombre, handleLogroArtista }) {
    const [logrosObtenidos, setLogrosObtenidos] = useState([]);
    const [logroSeleccionado, setLogroSeleccionado] = useState({});
    const [colorSeleccionado, setColorSeleccionado] = useState("");
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        get(`perfil/logros/${getFromLocalStorage("user")}`).then((response) => {
            console.log(response);
            setLogrosObtenidos(response.logros);
            setLogroSeleccionado({
                idLogro: response.configuracionLogro[0].idLogro,
                nombre: response.configuracionLogro[0].nombre,
                iconoURL: response.configuracionLogro[0].iconoURL,
            });
            setColorSeleccionado(response.configuracionLogro[0].colorPreferido);
        });
    }, [refresh]);

    return (
        <div className="div-exterior">
            <BotonLogroPerfil
                setRefresh={setRefresh}
                colorSeleccionado={colorSeleccionado}
                setColorSeleccionado={setColorSeleccionado}
                logrosObtenidos={logrosObtenidos}
                logroSeleccionado={logroSeleccionado}
                setLogroSeleccionado={setLogroSeleccionado}
                handleLogroArtista={handleLogroArtista}
            />
            <div className="div-usuario">
                <h1 className="nombre-usuario">{nombre}</h1>
                <h2 className="apodo">{logroSeleccionado.nombre}</h2>
            </div>
        </div>
    );
}

NameCard.propTypes = {
    nombre: propTypes.string.isRequired,
    handleLogroArtista: propTypes.func.isRequired,
};

export default NameCard;
