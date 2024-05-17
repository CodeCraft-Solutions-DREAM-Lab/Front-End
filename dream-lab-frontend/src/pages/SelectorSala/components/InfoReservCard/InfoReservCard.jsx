import { getFromSessionStorage, saveToSessionStorage } from "src/utils/Storage";
import "./InfoReservCard.css";
import { useState, useEffect } from "react";
import WarningIcon from "src/assets/ResumenReservaciones/warning.webp";

import propTypes from "prop-types";

export const InfoReservCard = (props) => {
    const { cuposArray, competidoresArray, update } = props;
    const [horaInicio, setHoraInicio] = useState(
        parseInt(getFromSessionStorage("horaInicio")) || 0
    );
    const today = new Date();
    // const [today, setToday] = useState(new Date());
    const [horaDeCorte, setHoraDeCorte] = useState(0);
    const [cupos, setCupos] = useState(0);
    const [competidores, setCompetidores] = useState(0);
    const horasDeCorte = [3, 6, 9, 12, 15, 18, 21, 24];

    const horaFormatter = (hora) => {
        let formattedHora;
        if (hora < 12) {
            formattedHora = `${hora} am`;
        } else {
            formattedHora = `${(hora % 13) + Math.trunc(hora / 13)} pm`;
        }
        saveToSessionStorage("horaCorte", formattedHora);
        return formattedHora;
    };

    useEffect(() => {
        getHoraDeCorte();
    }, []);

    useEffect(() => {
        setHoraInicio(parseInt(getFromSessionStorage("horaInicio")) || 0);
    }, [update]);

    useEffect(() => {
        setCupos(cuposArray[horaInicio]);
        setCompetidores(competidoresArray[horaInicio]);
        saveToSessionStorage("competidores", competidores);
        saveToSessionStorage("cupos", cupos);
    });

    const getHoraDeCorte = () => {
        const horaActual = today.getHours();
        for (let i = 0; i < horasDeCorte.length; i++) {
            if (horaActual < horasDeCorte[i]) {
                setHoraDeCorte(horasDeCorte[i]);
                break;
            }
        }
    };

    useEffect(() => {
        setHoraInicio(parseInt(getFromSessionStorage("horaInicio")) || 0);
        setCupos(cuposArray[horaInicio]);
        setCompetidores(competidoresArray[horaInicio]);
    }, [horaDeCorte, horaInicio, cuposArray, competidoresArray, update]);

    return (
        <>
            <div className="IRC-warning">
                <img className="IRC-warning-icon" src={WarningIcon} />
                {cupos > 0 ? (
                    <p className="IRC-warning-message">
                        La asignación del lugar se hará hoy a las{" "}
                        <strong>{horaFormatter(horaDeCorte)}</strong>.
                        <br />
                        Compiten <strong>{competidores}</strong> reservacion(es)
                        por <strong>{cupos}</strong> cupo(s).
                    </p>
                ) : (
                    <p className="IRC-warning-message">
                        La asignación del lugar se hará hoy a las{" "}
                        <strong>{horaFormatter(horaDeCorte)}</strong>.
                    </p>
                )}
            </div>
        </>
    );
};

InfoReservCard.propTypes = {
    cuposArray: propTypes.array,
    competidoresArray: propTypes.array,
    update: propTypes.bool,
};
