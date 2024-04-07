import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import {
    getFromSessionStorage,
    existsInSessionStorage,
    saveToLocalStorage,
} from "../../Global/Storage";

function FechaFormulario(props) {
    
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
        <div className="">
            <div
                style={{
                    backgroundColor: "white",
                    display: "inline-block",
                    borderRadius: "0.6rem",
                }}
            >
                <DatePicker
                    onChange={(newValue) => {
                        setFecha(newValue);
                        setFechaIsoString(newValue.toISOString());
                    }}
                />

                <Autocomplete label="Hora de inicio" className="max-w-xs">
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

                <Autocomplete
                    label="Duración de la reservación (horas)"
                    className="max-w-xs"
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


        </div>
    );
}

export default FechaFormulario;