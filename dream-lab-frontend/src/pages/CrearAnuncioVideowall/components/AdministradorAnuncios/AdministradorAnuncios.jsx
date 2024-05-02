import React from "react";
import "./AdministradorAnuncios.css";
import TarjetaReservacion from "../../../Profile/components/TarjetaReservacion/TarjetaReservacion";

function AdministradorAnuncios(props) {
    return (
        <div className="contenedor-admin-anuncios">
            <h1 className="sub-admin-anuncios">
                {props.titulo}Administrador de anuncios
            </h1>

            <div className="contenedor-admin-anuncios-in">
                <TarjetaReservacion
                    sala="Sala Horizons"
                    experiencia="VR Experience"
                    hora="13:00 - 15:00"
                    dia="15 de diciembre"
                />

                <TarjetaReservacion
                    sala="Sala Horizons"
                    experiencia="VR Experience"
                    hora="13:00 - 15:00"
                    dia="15 de diciembre"
                />

                <TarjetaReservacion
                    sala="Sala Horizons"
                    experiencia="VR Experience"
                    hora="13:00 - 15:00"
                    dia="15 de diciembre"
                />

                <div className="degradado-down-anuncios"></div>

            </div>

        </div>
    );
}

export default AdministradorAnuncios;
