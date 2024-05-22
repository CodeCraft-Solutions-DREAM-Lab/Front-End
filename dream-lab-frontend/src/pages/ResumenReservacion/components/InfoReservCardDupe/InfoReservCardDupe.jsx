import "./InfoReservCardDupe.css";
import WarningIcon from "src/assets/ResumenReservaciones/warning.webp";

import propTypes from "prop-types";

export const InfoReservCardDupe = (props) => {
    const { horaCorte, competidores, cupos } = props;

    return (
        <>
            <div className="IRC-warning-resumen-reservacion">
                <img className="IRC-warning-icon-resumen-reservacion" src={WarningIcon} />
            
                    <p className="IRC-warning-message-resumen-reservacion">
                        La asignación del lugar se hará hoy a las{" "}
                        <strong>{horaCorte}</strong>.
                        <br />
                        Compiten <strong>{competidores}</strong> reservacion(es)
                        por <strong>{cupos}</strong> cupo(s).
                    </p>
            </div>
        </>
    );
};


