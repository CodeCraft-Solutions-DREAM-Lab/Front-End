import React from "react";
import "./AnuncioSinReservas.css";
import CalendarioLogo from "../../../../../../assets/Profile/calendario2.webp";

function AnuncioSinReservas() {
    return (
        <div data-cy="anuncio-sin-reservas" className="no-hay-reservas-div">
            <div className="union-no-hay-reservas">
                <img
                    className="no-hay-reservas-image"
                    src={CalendarioLogo}
                    alt="Imagen de calendario."
                />
                <h1 className="titulo-no-hay-reserva">
                    No existen reservaciones
                </h1>
            </div>
        </div>
    );
}

export default AnuncioSinReservas;
