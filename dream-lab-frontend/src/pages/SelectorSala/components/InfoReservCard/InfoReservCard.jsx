import { getFromSessionStorage } from "src/utils/Storage";
import "./InfoReservCard.css";
import { useState, useEffect } from "react";
import WarningIcon from "src/assets/ResumenReservaciones/warning.png";

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
        return hora < 12
            ? `${hora} am`
            : `${(hora % 13) + Math.trunc(hora / 13)} pm`;
    };

    useEffect(() => {
        setHoraInicio(parseInt(getFromSessionStorage("horaInicio")) || 0);
        setCupos(cuposArray[horaInicio]);
        setCompetidores(competidoresArray[horaInicio]);
    }, [update]);

    useEffect(() => {
        console.log("Cupos array: ", cuposArray);
        console.log("Competidores array: ", competidoresArray);
        getHoraDeCorte();
        setCupos(cuposArray[horaInicio]);
        setCompetidores(competidoresArray[horaInicio]);
    }, []);

    const getHoraDeCorte = () => {
        const horaActual = today.getHours();
        for (let i = 0; i < horasDeCorte.length; i++) {
            if (horaActual < horasDeCorte[i]) {
                setHoraDeCorte(horasDeCorte[i]);
                break;
            }
        }
    };

    return (
        <>
            <div className="reservation-summary-warning">
                <img className="warning-icon" src={WarningIcon} />
                {/* <p>
                    La asignación del lugar se hará hoy a las{" "}
                    <strong>{horaFormatter(horaDeCorte)}</strong>. La asignación
                    del lugar se hará hoy a las{" "}
                    
                </p> */}
                {cupos > 0 ? (
                    <p className="reservation-summary-warning-message">
                        La asignación del lugar se hará hoy a las{" "}
                        <strong>{horaFormatter(horaDeCorte)}</strong>. La
                        asignación del lugar se hará hoy a las Compiten{" "}
                        <strong>{competidores}</strong> reservaciones por{" "}
                        <strong>{cupos}</strong> cupos.
                    </p>
                ) : (
                    <p className="reservation-summary-warning-message">
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
