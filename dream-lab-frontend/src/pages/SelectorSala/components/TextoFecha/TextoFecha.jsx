import { useEffect, useState } from "react";
import {
    getFromSessionStorage,
    existsInSessionStorage,
    saveToSessionStorage,
} from "src/utils/Storage";
import { parseDate } from "@internationalized/date";

import propTypes from "prop-types";

const TextoFecha = ({ update }) => {
    const [showText, setShowText] = useState(false);

    const [diaTexto, setDiaTexto] = useState("");
    const [diaNumero, setDiaNumero] = useState("");
    const [mes, setMes] = useState("");
    const [horaInicioTexto, setHoraInicioTexto] = useState("");
    const [horaFinTexto, setHoraFinTexto] = useState("");

    const getFechaTexto = (dia) => {
        const days = {
            1: "Lunes",
            2: "Martes",
            3: "Miércoles",
            4: "Jueves",
            5: "Viernes",
            6: "Sábado",
            0: "Domingo",
        };

        return days[dia];
    };

    const getFechaNumero = (dia) => {
        if (dia < 10) {
            return `0${dia}`;
        } else {
            return dia;
        }
    };

    const getFechaMes = (mes) => {
        const months = {
            0: "Enero",
            1: "Febrero",
            2: "Marzo",
            3: "Abril",
            4: "Mayo",
            5: "Junio",
            6: "Julio",
            7: "Agosto",
            8: "Septiembre",
            9: "Octubre",
            10: "Noviembre",
            11: "Diciembre",
        };

        return months[mes];
    };

    const getHoraInicioTexto = (horaInicio) => {
        return horaInicio < 12
            ? `${horaInicio} AM`
            : `${(horaInicio % 13) + Math.trunc(horaInicio / 13)} PM`;
    };

    const getHoraFinTexto = (horaInicio) => {
        const numToAdd = getFromSessionStorage("duration");
        const horaFin = Number(horaInicio) + Number(numToAdd);
        return horaFin < 12
            ? `${horaFin} AM`
            : `${(horaFin % 13) + Math.trunc(horaFin / 13)} PM`;
    };

    useEffect(() => {
        if (
            !existsInSessionStorage("fecha") ||
            !existsInSessionStorage("horaInicio") ||
            !existsInSessionStorage("duration")
        ) {
            setShowText(false);
            return;
        }

        setShowText(true);

        const date = parseDate(getFromSessionStorage("fecha"));
        const dateInDateFormat = date.toDate();

        setDiaTexto(getFechaTexto(dateInDateFormat.getDay()));
        setDiaNumero(getFechaNumero(dateInDateFormat.getDate()));
        setMes(getFechaMes(dateInDateFormat.getMonth()));
        setHoraInicioTexto(
            getHoraInicioTexto(getFromSessionStorage("horaInicio"))
        );
        setHoraFinTexto(
            getHoraFinTexto(getFromSessionStorage("horaInicio"))
        );

    }, [update, diaTexto, horaFinTexto]);

    useEffect(() => {
        saveToSessionStorage("formattedDate", `${diaTexto} - ${diaNumero} de ${mes}`);
        saveToSessionStorage("formattedTime", `${horaInicioTexto} - ${horaFinTexto}`);
    }, [diaTexto, horaFinTexto])

    return (
        <>
            {showText ? (
                <div className="p-5 text-white flex flex-col items-center text-nowrap" data-cy="texto-fecha">
                    <p>
                        {diaTexto} - {diaNumero} de {mes}
                    </p>
                    <p className="text-lg font-bold">
                        {horaInicioTexto} - {horaFinTexto}
                    </p>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

TextoFecha.propTypes = {
    update: propTypes.bool,
};

export default TextoFecha;
