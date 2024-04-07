import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import GlassCard from "../components/general/glass-card";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  getFromSessionStorage,
  existsInSessionStorage,
} from "../Global/Storage";

function ReservacionCuarto(props) {
  const navigate = useNavigate();

  // Si no existe la experiencia en el sessionStorage, redirigir a la página de inicio
  useEffect(() => {
    if (!existsInSessionStorage("experiencia")) {
      navigate("/home");
    }
  }, [navigate]);

  // Obtiene el nombre de la experiencia del sessionStorage
  const experiencia = getFromSessionStorage("experiencia");

  const [duration, setDuration] = useState(0);

  const [horaInicio, setHoraInicio] = useState(0);
  const [horaInicioIsoString, setHoraInicioIsoString] = useState("");

  const [fecha, setFecha] = useState(0);
  const [fechaIsoString, setFechaIsoString] = useState("");

  async function handleClick(imageId) {
    const date = new Date(fecha);
    setFechaIsoString(date.toISOString());
    setHoraInicioIsoString(new Date(date.setHours(horaInicio)).toISOString());

    const data = {
      idReservacion: 3,
      idUsuario: "A0XXXXXX1",
      idSala: 1,
      idExperiencia: 1,
      horaInicio: horaInicioIsoString,
      duracion: duration,
      fecha: fechaIsoString,
      numMesa: 1,
    };

    fetch("https://dreamlab-api.azurewebsites.net/reservaciones", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        Connection: "keep-alive",
        Accept: "*/*",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        navigate(`confirmacion`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <GlassCard padding="2rem">
      <h1 style={{ color: "white" }}>
        {experiencia
          ? `Reservación de ${experiencia} - Mesa 1`
          : "No se proporcionó un ID de sala"}
      </h1>
      <br />
      <br />
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
      </div>
      <br />
      <br />
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
      <br />
      <br />
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
      <br />
      <br />
      <Button color="primary" variant="solid" onClick={handleClick}>
        Aceptar
      </Button>
    </GlassCard>
  );
}

export default ReservacionCuarto;
