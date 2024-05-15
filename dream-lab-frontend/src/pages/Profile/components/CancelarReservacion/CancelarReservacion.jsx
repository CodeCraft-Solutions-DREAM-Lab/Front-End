import React, { useRef, useEffect } from "react";
import "./CancelarReservacion.css";
import errorLogo from "src/assets/Profile/errorLogo.webp";
import correctLogo from "src/assets/Profile/correctLogo.webp";
import infoLogo from "src/assets/Profile/infoLogo.webp";
import BotonCerrar from "./components/CloseButtonCancelar/CloseButtonCancelar";
import BotonModal from "./components/BotonModal/BotonModal";

function CancelarReservacion(props) {
    // Constantes para los nombres de clase que pueden ser modificados por props
    const blurSpaceClass = `blur-space-tipo2`;
    const modalBlancoClass = `modal-blanco-tipo1`;
    const logoModalOutClass = `logo-modal-out-tipo2`;
    const logoModalClass = `logo-modal-tipo2`;
    const titulo1ModalClass = `titulo1-modal-${props.type}`;
    const titulo1Medio = `titulo1_medio-${props.type}`;
    const titulo2ModalClass = `titulo2-modal-${props.type}`;
    const titulo3ModalClass = `titulo3-modal-${props.type}`;
    const titulo4ModalClass = `titulo4-modal-tipo2`;
    const botonesCancelacionClass = `botones-cancelacion-${props.type}`;
    let logo = errorLogo;

    if (props.modalClasificacion == 1) {
        logo = infoLogo;
    } else if (props.modalClasificacion == 2) {
        logo = errorLogo;
    } else if (props.modalClasificacion == 3) {
        logo = correctLogo;
    }

    const blurSpaceRef = useRef(null);

    function handleClickCloseButton() {
        props.funcionVerde(0, null, null, null, null);
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                blurSpaceRef.current &&
                !blurSpaceRef.current.contains(event.target)
            ) {
                // Si el clic fue fuera del modal, ejecuta la función handleClickModal
                props.funcionVerde(0, null, null, null, null);
            }
        }

        // Agregar el evento de clic al montar el componente
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Eliminar el evento de clic al desmontar el componente
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [props]);

    return (
        <div className={blurSpaceClass}>
            <div className={modalBlancoClass} ref={blurSpaceRef}>
                <div className="boton-cerrar-cancelacion-reserva">
                    {props.modalClasificacion !== 3 && (
                        <BotonCerrar onClick={handleClickCloseButton} />
                    )}
                </div>

                <div className={logoModalOutClass}>
                    {props.modalClasificacion !== 4 && (
                        <div className={logoModalClass}>
                            <img src={logo} alt="Icono de notificación" />
                        </div>
                    )}
                </div>

                <h1 data-cy="titulo-cancelacion" className={titulo1ModalClass}>
                    {props.titulo1}
                </h1>
                <h1 className={titulo1Medio}>{props.tituloExperiencia}</h1>
                <h1 className={titulo2ModalClass}>{props.titulo2}</h1>
                <h1 className={titulo3ModalClass}>{props.titulo3}</h1>
                <h1 className={titulo4ModalClass}>{props.titulo4}</h1>
                {props.modalClasificacion == 8 && (
                    <h1 className={titulo4ModalClass}>{props.titulo4}</h1>
                )}

                <div className={botonesCancelacionClass}>
                    {props.modalClasificacion == 1 && (
                        <BotonModal
                            tipoBoton="Cancelar"
                            nombre={props.textoRojo}
                            funcion={props.funcionRojo}
                        />
                    )}

                    {props.modalClasificacion == 2 && (
                        <BotonModal
                            tipoBoton="CancelarFinal"
                            nombre={props.textoRojo}
                            funcion={props.funcionRojo}
                        />
                    )}

                    {props.modalClasificacion != 1 && (
                        <BotonModal
                            tipoBoton="Aceptar"
                            nombre={props.textoVerde}
                            funcion={props.funcionVerde}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default CancelarReservacion;
