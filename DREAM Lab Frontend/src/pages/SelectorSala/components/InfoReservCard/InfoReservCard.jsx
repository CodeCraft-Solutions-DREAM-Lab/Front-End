import { getFromSessionStorage } from "../../../../utils/Storage";
import "./InfoReservCard.css";
import { useState, useEffect } from "react";

export const InfoReservCard = (props) => {

    const {cuposArray, competidoresArray, update} = props;
    const [horaInicio, setHoraInicio] = useState(
        parseInt(getFromSessionStorage("horaInicio")) || 0
    );
    const [today, setToday] = useState(new Date());
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
        getHoraDeCorte();
    }, []);

    useEffect(() => {
        setHoraInicio(parseInt(getFromSessionStorage("horaInicio")) || 0);
    }, [update])

    useEffect(() => {
        setCupos(cuposArray[horaInicio]);
        setCompetidores(competidoresArray[horaInicio]);
    })

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
            <div className="alerta">
                <p>
                    La asignación del lugar se hará hoy a las{" "}
                    <span className="font-bold">
                        {horaFormatter(horaDeCorte)}
                    </span >
                    .{" "}
                </p>
                {cupos > 0 ? (
                    <>
                    Compiten{" "}
                    <span className="font-bold">
                        {competidores}
                    </span> 
                    {" "}reservaciones por{" "}
                    <span className="font-bold">
                        {cupos}
                    </span> 
                    {" "}cupos.
                    </>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
};
