import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

import {
    existsInSessionStorage,
    getFromSessionStorage,
    removeFromSessionStorage,
    saveToSessionStorage,
} from "../../../../Global/Storage";

import { post } from "../../../../Global/ApiRequests";
import { height, minHeight } from "@mui/system";

function FechaFormulario(props) {
    const { update, setUpdate, fetchFreeHoursAgain } = props;

    const [minEligibleDate, setMinEligibleDate] = useState(dayjs());
    const [fecha, setFecha] = useState();
    const [fechaIsoString, setFechaIsoString] = useState(
        getFromSessionStorage("fechaIsoString") || ""
    );
    const [horaInicio, setHoraInicio] = useState(
        getFromSessionStorage("horaInicio") || 0
    );
    const [horaInicioIsoString, setHoraInicioIsoString] = useState(
        getFromSessionStorage("horaInicioIsoString") || ""
    );
    const [duration, setDuration] = useState(
        getFromSessionStorage("duration") || 0
    );
    const [freeHours, setFreeHours] = useState([]);
    const [isSelectHoursDisabled, setIsSelectHoursDisabled] = useState(true);

    const fetchFreeHoursArray = () => {
        const date = new Date(getFromSessionStorage("fecha"));
        post("salas/horasLibres", {
            idSala: getFromSessionStorage("idSala"),
            fecha: date.toISOString(),
            personas: getFromSessionStorage("personas"),
        }).then((response) => {
            setFreeHours(response);
        });
    };

    const horaFormatter = (hora) => {
        return hora < 12
            ? `${hora} AM`
            : `${(hora % 13) + Math.trunc(hora / 13)} PM`;
    };

    useEffect(() => {
        if (existsInSessionStorage("fecha")) {
            setFecha(dayjs(getFromSessionStorage("fecha")));
        }
    }, []);

    useEffect(() => {
        if (!!fecha && fecha !== "Invalid Date") {
            saveToSessionStorage("fecha", fecha);
        }

        if (!!getFromSessionStorage("fecha")) {
            fetchFreeHoursArray();
            setIsSelectHoursDisabled(false);
        } else {
            setIsSelectHoursDisabled(true);
        }
    }, [fecha]);

    useEffect(() => {
        if (!!horaInicio && !freeHours.includes(horaInicio)) {
            removeFromSessionStorage("horaInicio");
            removeFromSessionStorage("horaInicioIsoString");
            removeFromSessionStorage("duration");
            setHoraInicio(0);
            setHoraInicioIsoString("");
            setDuration(0);
            setUpdate(!update);
        }
    }, [freeHours]);

    useEffect(() => {
        fetchFreeHoursArray();
    }, [fetchFreeHoursAgain]);

    useEffect(() => {
        if (!!fechaIsoString) {
            saveToSessionStorage("fechaIsoString", fechaIsoString);
        }
    }, [fechaIsoString]);

    useEffect(() => {
        if (!!horaInicio) {
            saveToSessionStorage("horaInicio", horaInicio);
        }
    }, [horaInicio]);

    useEffect(() => {
        if (!!horaInicioIsoString) {
            saveToSessionStorage("horaInicioIsoString", horaInicioIsoString);
        }
    }, [horaInicioIsoString]);

    useEffect(() => {
        if (!!duration) {
            saveToSessionStorage("duration", duration);
        }
    }, [duration]);

    return (
        <div className="flex flex-col mx-3">
            <p className="text-white">Fecha</p>
            <DatePicker
                sx={{
                    backgroundColor: "white",
                    borderRadius: "16px",
                    "& .MuiInputBase-root": {
                        // Target specific MUI class for background
                        height: "3rem",
                        backgroundColor: "white",
                        borderRadius: "16px",
                    },
                }}
                className="rounded-24 font-bold"
                value={fecha}
                minDate={minEligibleDate}
                onChange={(newValue) => {
                    setFecha(newValue);
                    setFechaIsoString(newValue.toISOString());
                    setUpdate(!update);
                }}
            />

            <p className="text-white mt-6">Hora de inicio</p>
            <Autocomplete
                className="mb-3 "
                aria-label="Hora de inicio"
                selectedKey={horaFormatter(horaInicio)}
                disabled={isSelectHoursDisabled}
                sx={{
                    "& .MuiAutocomplete-input": {
                        // Target specific MUI class for background
                        height: "3rem",
                        backgroundColor: "white",
                        borderRadius: "16px",
                    },
                }}
            >
                {freeHours.map((hora) => (
                    <AutocompleteItem
                        key={horaFormatter(hora)}
                        value={hora}
                        textValue={horaFormatter(hora)}
                        onClick={() => {
                            setHoraInicio(hora);
                            const date = new Date();
                            date.setHours(hora - 6);
                            date.setMinutes(0);
                            date.setSeconds(0);
                            date.setMilliseconds(0);

                            setHoraInicioIsoString(date.toISOString());
                            setUpdate(!update);
                        }}
                    >
                        {horaFormatter(hora)}
                    </AutocompleteItem>
                ))}
            </Autocomplete>

            <p className="text-white mt-3">Duración</p>
            <Autocomplete
                className="max-w"
                aria-label="Duración"
                selectedKey={duration + (duration == 1 ? " hora" : " horas")}
                disabled={isSelectHoursDisabled}
            >
                {["1 hora", "2 horas", "3 horas", "4 horas"].map((hora) => (
                    <AutocompleteItem
                        key={hora}
                        value={hora}
                        onClick={() => {
                            if (hora === "1 hora") setDuration(1);
                            if (hora === "2 horas") setDuration(2);
                            if (hora === "3 horas") setDuration(3);
                            if (hora === "4 horas") setDuration(4);
                            setUpdate(!update);
                        }}
                    >
                        {hora}
                    </AutocompleteItem>
                ))}
            </Autocomplete>
        </div>
    );
}

export default FechaFormulario;
