import React, { useEffect, useState } from "react";
import BotonBack from "src/GlobalComponents/BotonBack/BotonBack";
import { renderTarjetasLogro } from "./utils/Funciones.jsx";
import {
    getFromLocalStorage,
    existsInSessionStorage,
    getFromSessionStorage,
} from "src/utils/Storage";
import { get } from "src/utils/ApiRequests.js";

function Logros() {
    const [datosLogros, setDatosLogros] = useState([]);
    const [estadoLogros, setEstadoLogros] = useState([]);
    const [refreshValue, setRefreshValue] = useState(0);

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
                setDatosLogros(perfilInfo.recordsets[2]);
                setEstadoLogros(perfilInfo.recordsets[3]);
            })
            .catch((error) => {
                console.error("An error occurred:", error);
            });
    }, [idUsuario, refreshValue]);

    return (
        <div className="out-div">
            <div className="back-subtitulo-div">
                <div className="boton-back">
                    <BotonBack ruta="/profile/" />
                </div>
                <h2 className="sub-celular">Logros</h2>
            </div>
            <div className="reservaciones-div-celular">
                <div className="reservaciones-div-in-celular">
                    {renderTarjetasLogro(datosLogros, estadoLogros)}
                    <div className="degradado-down-celular"></div>
                </div>
            </div>
        </div>
    );
}

export default Logros;
