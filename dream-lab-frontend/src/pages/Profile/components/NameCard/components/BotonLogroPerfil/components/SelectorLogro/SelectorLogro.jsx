// Componentes NextUI
import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react";

// Proptypes
import PropTypes from "prop-types";

// Hooks
import { useState } from "react";

// Estilos
import "./SelectorLogro.css";

// Componentes
import NuevoIconoLogro from "src/GlobalComponents/NuevoIconoLogro/NuevoIconoLogro";

// Iconos temporales
import LogoBigDreamer from "src/assets/Profile/bigDreamer.png";

function SelectorLogro({ isOpen, onOpen, onOpenChange }) {
    const [titulo, setTitulo] = useState("Robot Expert");
    const [icono, setIcono] = useState("robot-icon.png");

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
            <ModalContent>
                <ModalBody>
                    <div className="sl-main-container">
                        <div className="sl-left-container">
                            <div className="sl-title-container">
                                <h1 className="sl-title">{titulo}</h1>
                            </div>
                            <div className="sl-icon-container">
                                <div className="sl-icon">
                                    <NuevoIconoLogro
                                        icono={LogoBigDreamer}
                                        colorFondo="#AFB7FF"
                                    />
                                </div>
                            </div>
                            <div className="sl-color-button-container">
                                <Button
                                    className="sl-color-button"
                                    radius="full"
                                    style={{
                                        backgroundColor: "#AFB7FF",
                                    }}
                                >
                                    <span className="sl-color-button-text">
                                        Cambiar color
                                    </span>
                                </Button>
                            </div>
                        </div>
                        <div className="sl-center-container"></div>
                        <div className="sl-right-container">
                            <div className="sl-opciones-logros-container"></div>
                            <div className="sl-boton-guardar-container"></div>
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

SelectorLogro.propTypes = {
    isOpen: PropTypes.bool,
    onOpen: PropTypes.func,
    onOpenChange: PropTypes.func,
};

export default SelectorLogro;
