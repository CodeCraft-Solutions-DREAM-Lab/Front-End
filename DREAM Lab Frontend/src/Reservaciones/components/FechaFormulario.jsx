import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

import {
    getFromSessionStorage,
    existsInSessionStorage,
    saveToLocalStorage,
} from "../../Global/Storage";

function FechaFormulario(props) {
    
    const [minEligibleDate, setMinEligibleDate] = useState(dayjs());
    const [fecha, setFecha] = useState(getFromSessionStorage("fecha") || "");
    const [fechaIsoString, setFechaIsoString] = useState(getFromSessionStorage("fechaIsoString") || "");
    const [horaInicio, setHoraInicio] = useState(getFromSessionStorage("horaInicio") || "");
    const [horaInicioIsoString, setHoraInicioIsoString] = useState(getFromSessionStorage("horaInicioIsoString") || "");
    const [duration, setDuration] = useState(getFromSessionStorage("duration") || 0);

    useEffect(() => {saveToLocalStorage("fecha", fecha)}, [fecha]);
    useEffect(() => {saveToLocalStorage("fechaIsoString", fechaIsoString)}, [fechaIsoString]);
    useEffect(() => {saveToLocalStorage("horaInicio", horaInicio)}, [horaInicio]);
    useEffect(() => {saveToLocalStorage("horaInicioIsoString", horaInicioIsoString)}, [horaInicioIsoString]);
    useEffect(() => {saveToLocalStorage("duration", duration)}, [duration]);

    return (
        <div className="flex flex-col mx-3">
                <p className="text-white">Fecha</p>
                <DatePicker
                    className="bg-white rounded"
                    minDate={minEligibleDate}
                    onChange={(newValue) => {
                        setFecha(newValue);
                        setFechaIsoString(newValue.toISOString());
                    }}
                />

                <p className="text-white mt-6">Hora de inicio</p>
                <Autocomplete 
                    className="max-w mb-3"
                    aria-label="Hora de inicio"
                >
                    {[9, 10, 11].map((hora) => (
                        <AutocompleteItem
                            key={hora}
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
                >
                    {["2 horas", "4 horas"].map((hora) => (
                        <AutocompleteItem
                            key={hora}
                            value={hora}
                            onClick={() => {
                                if (hora === "2 horas") setDuration(2);
                                if (hora === "4 horas") setDuration(4);
                            }}
                        >
                            {hora}
                        </AutocompleteItem>
                    ))}
                </Autocomplete>

                <Button onClick={() => {
                    console.log(getFromSessionStorage("fecha"));
                    console.log(getFromSessionStorage("fechaIsoString"));
                    console.log(getFromSessionStorage("horaInicio"));
                    console.log(getFromSessionStorage("horaInicioIsoString"));
                    console.log(getFromSessionStorage("duration"));

                    console.log(fecha);
                    console.log(fechaIsoString);
                    console.log(horaInicio);
                    console.log(horaInicioIsoString);
                    console.log(duration);
                }}>Debug</Button>
        </div>
    );
}

export default FechaFormulario;