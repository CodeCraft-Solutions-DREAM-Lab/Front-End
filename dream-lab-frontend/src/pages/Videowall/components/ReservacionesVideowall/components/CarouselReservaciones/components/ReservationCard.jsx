import "./ReservationCard.css";

import { Image } from "@nextui-org/react";

import propTypes from "prop-types";

import NuevoIconoLogro from "src/GlobalComponents/NuevoIconoLogro/NuevoIconoLogro";

function ReservationCard({
    nombre,
    horaInicio,
    horaFin,
    sala,
    icono,
    colorPreferido,
}) {
    console.log(icono);
    return (
        <div className="rc-container">
            <div className="rc-image-container">
                <div className="rc-logro">
                    <NuevoIconoLogro
                        icono={icono}
                        colorFondo={colorPreferido}
                    />
                    {/* <Image src={icono} alt="Logro del usuario" fullwidth={false} /> */}
                </div>
            </div>
            <div className="rc-data-container">
                <div className="rc-top-container">
                    <span className="rc-nombre">{nombre}</span>
                </div>
                <div className="rc-bot-container">
                    <span className="rc-horario">
                        {horaInicio} - {horaFin}
                    </span>
                    <span className="rc-sala">{sala}</span>
                </div>
            </div>
        </div>
    );
}

ReservationCard.propTypes = {
    nombre: propTypes.string,
    horaInicio: propTypes.string,
    horaFin: propTypes.string,
    sala: propTypes.string,
    icono: propTypes.string,
    colorPreferido: propTypes.string,
};

ReservationCard.defaultProps = {
    nombre: "Nombre",
    horaInicio: "00:00",
    horaFin: "00:00",
    sala: "Sala",
    icono: "https://dreamlabstorage.blob.core.windows.net/logros/BigDreamer.png",
};

export default ReservationCard;
