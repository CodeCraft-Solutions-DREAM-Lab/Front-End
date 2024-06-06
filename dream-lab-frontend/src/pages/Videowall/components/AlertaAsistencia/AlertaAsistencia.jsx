import React, { useState, useEffect } from "react";
import "./AlertaAsistencia.css";
import Check from "./Check/Check";
import Confetti from "react-confetti";

function MensajeBienvenida(props) {
    const [cerrado, setCerrado] = useState(false);
    const [tarde, setTarde] = useState(props.tarde);
    const [ejecutado, setEjecutado] = useState(false);
    const [activarSalida, setActivarSalida] = useState(false);

    useEffect(() => {
        if (!ejecutado) {
            setTimeout(() => {
                setCerrado(false);
                setEjecutado(true);
            }, 0); // Ocultar el componente después de 5 segundos

            setTimeout(() => {
                setActivarSalida(true);
            }, 3000); // Activar la animación de salida después de 3 segundos

            setTimeout(() => {
                setCerrado(true);
            }, 4000); // Ocultar el componente después de 5 segundos
        }
        return; // Limpiar el timeout cuando el componente se desmonte o actualice
    });

    if (cerrado) {
        return null; // Si el mensaje está cerrado o no hay reserva filtrada, no se renderiza nada
    }

    // Inicializa el índice de la última frase seleccionada como -1 para indicar que aún no se ha seleccionado ninguna frase
    let ultimoIndiceSeleccionado = -1;

    const obtenerFraseAleatoria = () => {
        // Lista de frases
        const frases = [
            "\n¡Justo a tiempo!",
            "\n¡Bienvenido!",
            "\n¡Aprende mucho!",
        ];

        // Obtener un índice aleatorio dentro del rango de la lista de frases
        let indiceAleatorio;
        do {
            indiceAleatorio = Math.floor(Math.random() * frases.length);
        } while (indiceAleatorio === ultimoIndiceSeleccionado); // Repetir el proceso si el índice seleccionado es igual al último índice

        // Actualizar el índice de la última frase seleccionada
        ultimoIndiceSeleccionado = indiceAleatorio;

        // Devolver la frase aleatoria seleccionada
        return frases[indiceAleatorio];
    };

    const segundaFrase = obtenerFraseAleatoria(); // Obtener la segunda frase aleatoria

    return (
        <div
            className={`mensaje-bienvenida-videowall-asistencia ${
                activarSalida ? "salida-animada" : ""
            }`}
            style={
                tarde
                    ? { border: "13px solid white" }
                    : { border: `13px solid white` }
            }
        >
            <div className="confetti-alerta-asistencia">
                {tarde ? null :<Confetti width="330vw" height="330vh" />}
            </div>

            <div className="alerta-videowall-primera-mitad-asistencia">
                <div className="checkmark-asistencia">
                    {tarde ? (
                        <Check
                            colorFondo="#E19F20"
                            colorBorde="#E19F20"
                            width="18vw"
                            height="18vh"
                        />
                    ) : (
                        <Check
                            colorFondo="#1BAC55"
                            colorBorde="#1BAC55"
                            width="18vw"
                            height="18vh"
                        />
                    )}
                </div>

                <h1 className="titulo-mensaje-bienvenida-videowall-asistencia">
                    {tarde
                        ? "Asistencia tardía registrada"
                        : "Asistencia registrada" + segundaFrase}
                </h1>
            </div>
        </div>
    );
}

export default MensajeBienvenida;
