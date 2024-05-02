import { useEffect, useState } from "react";
import {
    getFromSessionStorage,
    existsInSessionStorage,
    saveToSessionStorage,
} from "src/utils/Storage";

const TextoFecha = ({ update }) => {
    const [showText, setShowText] = useState(false);

    const [diaTexto, setDiaTexto] = useState("");
    const [diaNumero, setDiaNumero] = useState("");
    const [mes, setMes] = useState("");
    const [horaInicioTexto, setHoraInicioTexto] = useState("");
    const [horaFinTexto, setHoraFinTexto] = useState("");

    const getFechaTexto = (fecha) => {
        const days = {
            Mon: "Lunes",
            Tue: "Martes",
            Wed: "Miércoles",
            Thu: "Jueves",
            Fri: "Viernes",
            Sat: "Sábado",
            Sun: "Domingo",
        };

        return days[fecha.substring(0, 3)];
    };

    const getFechaNumero = (fecha) => {
        return fecha.substring(5, 7);
    };

    const getFechaMes = (fecha) => {
        const months = {
            Jan: "Enero",
            Feb: "Febrero",
            Mar: "Marzo",
            Apr: "Abril",
            May: "Mayo",
            Jun: "Junio",
            Jul: "Julio",
            Aug: "Agosto",
            Sep: "Septiembre",
            Oct: "Octubre",
            Nov: "Noviembre",
            Dec: "Diciembre",
        };

        return months[fecha.substring(8, 11)];
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
            existsInSessionStorage("fecha") &&
            existsInSessionStorage("horaInicio") &&
            existsInSessionStorage("duration")
        ) {
            setShowText(true);

            setDiaTexto(getFechaTexto(getFromSessionStorage("fecha")));
            setDiaNumero(getFechaNumero(getFromSessionStorage("fecha")));
            setMes(getFechaMes(getFromSessionStorage("fecha")));
            setHoraInicioTexto(
                getHoraInicioTexto(getFromSessionStorage("horaInicio"))
            );
            setHoraFinTexto(
                getHoraFinTexto(getFromSessionStorage("horaInicio"))
            );
        } else {
            setShowText(false);
        }
    }, [update, diaTexto, horaFinTexto]);

    useEffect(() => {
        saveToSessionStorage("formattedDate", `${diaTexto} - ${diaNumero} de ${mes}`);
        saveToSessionStorage("formattedTime", `${horaInicioTexto} - ${horaFinTexto}`);
    }, [diaTexto, horaFinTexto])

    return (
        <>
            {showText ? (
                <div className="p-5 text-white flex flex-col items-center">
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

export default TextoFecha;
