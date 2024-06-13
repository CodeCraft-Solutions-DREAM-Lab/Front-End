import React, { useEffect, useState } from "react";
import { Modal, ModalContent } from "@nextui-org/react";
import { Grid } from "@mui/material";
import propTypes from "prop-types";
import Musica from "src/assets/NotFound/progresoSound.mp3";
import "./ProgresoLogro.css";

function ProgresoLogro(props) {
    const [isOpen, setIsOpen] = useState(props.isOpen);
    const [animationActive, setAnimationActive] = useState(false);
    const [positionStyle, setPositionStyle] = useState({
        position: "fixed",
        bottom: -35,
        right: "0",
    });
    const datosLogroObtenido = props.datosLogro;

    useEffect(() => {
        // Update position style based on window size
        const updatePositionStyle = () => {
            const bottomPosition = window.innerWidth <= 550 ? 0 : -35; // Adjust bottom offset as needed

            setPositionStyle({
                position: "fixed",
                bottom: `${bottomPosition}px`,
                right: `0px`,
            });
        };

        // Initial position update
        updatePositionStyle();

        // Add resize event listener to update position style
        window.addEventListener("resize", updatePositionStyle);

        // Cleanup
        return () => {
            window.removeEventListener("resize", updatePositionStyle);
        };
    }, []);

    useEffect(() => {
        setAnimationActive(true);
        const timeoutId = setTimeout(() => {
            setAnimationActive(false);
        }, 1000); // Duración de la animación

        return () => {
            clearTimeout(timeoutId);
        };
    }, [props.isOpen]);

    const reproducirTimbreNotificacion = () => {
        const audio = new Audio(Musica);
        audio.play();
    };

    const handleClose = () => {
        setIsOpen(false);
        if (props.onClose) {
            props.onClose();
        }
    };

    const porcentajeProgreso = (datosLogroObtenido.valorActual / datosLogroObtenido.valorMax) * 100;
    console.log("Porcentaje de progreso:", porcentajeProgreso);

    useEffect(() => {
        if (props.isOpen) {
            reproducirTimbreNotificacion();
            // Cerrar automáticamente después de 20 segundos
            const closeTimeout = setTimeout(() => {
                handleClose();
            }, 1800); // 20 segundos en milisegundos

            return () => {
                clearTimeout(closeTimeout);
            };
        }
    }, [props.isOpen]);


    return (
        <Modal
            size="1x5"
            isOpen={isOpen}
            onClose={handleClose}
            hideCloseButton={false}
            closeOnOverlayClick={true}
            data-cy="primer-recordatorio-sala"
            className="modal-progreso-logro-personalizado"
            style={positionStyle}
            backdrop="opaque"
        >
            <ModalContent className="p-0">
                <Grid container alignItems="center" className="p-4">
                    <Grid item xs={2.6}>
                        <div
                            className={
                                "progress-circulo-foto-perfil-aviso-logro-nuevo"
                            }
                            style={{
                                background: `conic-gradient( #7EA3E1 0% ${porcentajeProgreso}%, rgb(197, 200, 205) ${0}% 50%)`,
                            }}
                        >
                            <img
                                src={datosLogroObtenido.iconoLogro}
                                className="progress-imagen-foto-perfil-circulo-aviso-logro-nuevo"
                                alt="Correcto logo"
                            />
                        </div>
                    </Grid>
                    <Grid item xs={9}>
                        <div className="progress-textos-anuncio"></div>
                        <div
                            className="progress-progreso-logro"
                            style={{
                                animation: animationActive
                                    ? "slideFromLeft 1s ease-in-out"
                                    : "none",
                            }}
                        >
                            <p data-cy="fraccion-avance-progreso-logro">
                                {datosLogroObtenido.valorActual} /{" "}
                                {datosLogroObtenido.valorMax}
                            </p>
                        </div>
                        <div className="progress-nombre-logro-obtenido-anuncio-generico" data-cy="nombre-logro-avance-progreso">
                            {datosLogroObtenido.nombreLogro}
                        </div>
                        <div className="progress-descripcion-logro-obtenido-anuncio-generico" data-cy="descripcion-logro-avance-progreso">
                            {datosLogroObtenido.descripcionLogro}
                        </div>
                    </Grid>
                </Grid>
            </ModalContent>
        </Modal>
    );
}

ProgresoLogro.propTypes = {
    size: propTypes.string,
    isOpen: propTypes.bool,
    onClose: propTypes.func,
    datosLogro: propTypes.string,
    nombreLogro: propTypes.string,
    progresoActual: propTypes.number,
    progresoTotal: propTypes.number,
};

export default ProgresoLogro;
