import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

import {
    getFromSessionStorage,
    saveToSessionStorage,
} from "../../Global/Storage";

function FechaFormulario(props) {

    const {update, setUpdate} = props;
    
    const [minEligibleDate, setMinEligibleDate] = useState(dayjs());
    const [fecha, setFecha] = useState(/*getFromSessionStorage("fecha") ||*/ dayjs());
    const [fechaIsoString, setFechaIsoString] = useState(getFromSessionStorage("fechaIsoString") || "");
    const [horaInicio, setHoraInicio] = useState(getFromSessionStorage("horaInicio") || 0);
    const [horaInicioIsoString, setHoraInicioIsoString] = useState(getFromSessionStorage("horaInicioIsoString") || "");
    const [duration, setDuration] = useState(getFromSessionStorage("duration") || 0);

    const [selectedKeyInDuration, setSelectedKeyInDuration] = useState("");

    useEffect(() => {
        if (!!fecha) {
            saveToSessionStorage("fecha", fecha)
        }
    }, [fecha]);

    useEffect(() => {
        if (!!fechaIsoString) {
            saveToSessionStorage("fechaIsoString", fechaIsoString)
        }
    }, [fechaIsoString]);

    useEffect(() => {
        if (!!horaInicio) {
            saveToSessionStorage("horaInicio", horaInicio)
        }
    }, [horaInicio]);

    useEffect(() => {
        if (!!horaInicioIsoString) {
            saveToSessionStorage("horaInicioIsoString", horaInicioIsoString)
        }
    }, [horaInicioIsoString]);

    useEffect(() => {
        if (!!duration) {
            saveToSessionStorage("duration", duration)
        }
    }, [duration]);

    useEffect(() => {
        if (duration === 2) {
            setSelectedKeyInDuration("2 horas");
        } else if (duration === 4) {
            setSelectedKeyInDuration("4 horas");
        }
    }, [duration]);

    return (
        <div className="flex flex-col mx-3">
                <p className="text-white">Fecha</p>
                <DatePicker
                    value={fecha}
                    className="bg-white rounded"
                    minDate={minEligibleDate}
                    onChange={(newValue) => {
                        setFecha(newValue);
                        setFechaIsoString(newValue.toISOString());
                        setUpdate(!update);
                    }}
                />

                <p className="text-white mt-6">Hora de inicio</p>
                <Autocomplete 
                    className="max-w mb-3"
                    aria-label="Hora de inicio"
                    selectedKey={horaInicio+"am"}
                >
                    {[9, 10, 11].map((hora) => (
                        <AutocompleteItem
                            key={hora + "am"}
                            value={hora}
                            textValue={`${hora} am`}
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
                            {hora} am
                        </AutocompleteItem>
                    ))}
                </Autocomplete>

                <p className="text-white mt-3">Duración</p>
                <Autocomplete
                    className="max-w"
                    aria-label="Duración"
                    selectedKey={selectedKeyInDuration}
                >
                    {["2 horas", "4 horas"].map((hora) => (
                        <AutocompleteItem
                            key={hora}
                            value={hora}
                            onClick={() => {
                                if (hora === "2 horas") setDuration(2);
                                if (hora === "4 horas") setDuration(4);
                                setUpdate(!update);
                            }}
                        >
                            {hora}
                        </AutocompleteItem>
                    ))}
                </Autocomplete>

                {/* <Button onClick={ () => {
                    console.log("-----Session Storage:--------------");
                    console.log(getFromSessionStorage("fecha"));
                    console.log(getFromSessionStorage("fechaIsoString"));
                    console.log(getFromSessionStorage("horaInicio"));
                    console.log(getFromSessionStorage("horaInicioIsoString"));
                    console.log(getFromSessionStorage("duration"));
                    console.log("------Estados: -------------------");
                    console.log(fecha);
                    console.log(fechaIsoString);
                    console.log(horaInicio);
                    console.log(horaInicioIsoString);
                    console.log(duration);
                    console.log("----------------------------------")
                    // removeFromSessionStorage("fecha");
                    // removeFromSessionStorage("fechaIsoString");
                    // removeFromSessionStorage("horaInicio");
                    // removeFromSessionStorage("horaInicioIsoString");
                    // removeFromSessionStorage("duration");
                }}>
                    Session Storage
                </Button> */}

        </div>
    );
}

export default FechaFormulario;