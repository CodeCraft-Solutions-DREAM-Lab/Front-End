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
    const [logrosObtenidos, setLogrosObtenidos] = useState([
        {
            nombre: "Robot Expert",
            iconoURL:
                "https://dreamlabstorage.blob.core.windows.net/logros/RobotExpert.png",
        },
        {
            nombre: "Ancient Soul",
            iconoURL:
                "https://dreamlabstorage.blob.core.windows.net/logros/AncientSoul.png",
        },
        {
            nombre: "Five-Star Player",
            iconoURL:
                "https://dreamlabstorage.blob.core.windows.net/logros/Trustworthy.png",
        },
        {
            nombre: "Robot Expert",
            iconoURL:
                "https://dreamlabstorage.blob.core.windows.net/logros/RobotExpert.png",
        },
        {
            nombre: "Ancient Soul",
            iconoURL:
                "https://dreamlabstorage.blob.core.windows.net/logros/AncientSoul.png",
        },
        {
            nombre: "Five-Star Player",
            iconoURL:
                "https://dreamlabstorage.blob.core.windows.net/logros/Trustworthy.png",
        },
        {
            nombre: "Robot Expert",
            iconoURL:
                "https://dreamlabstorage.blob.core.windows.net/logros/RobotExpert.png",
        },
        {
            nombre: "Ancient Soul",
            iconoURL:
                "https://dreamlabstorage.blob.core.windows.net/logros/AncientSoul.png",
        },
        {
            nombre: "Five-Star Player",
            iconoURL:
                "https://dreamlabstorage.blob.core.windows.net/logros/Trustworthy.png",
        },
        {
            nombre: "Robot Expert",
            iconoURL:
                "https://dreamlabstorage.blob.core.windows.net/logros/RobotExpert.png",
        },
        {
            nombre: "Ancient Soul",
            iconoURL:
                "https://dreamlabstorage.blob.core.windows.net/logros/AncientSoul.png",
        },
        {
            nombre: "Five-Star Player",
            iconoURL:
                "https://dreamlabstorage.blob.core.windows.net/logros/Trustworthy.png",
        },
    ]);

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
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
                            <div className="sl-opciones-logros-container">
                                {logrosObtenidos.map((logro, index) => (
                                    <div key={index} className="sl-logro-item">
                                        <div className="sl-logro-item-icon">
                                            <NuevoIconoLogro
                                                icono={logro.iconoURL}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="sl-save-button-container">
                                <Button
                                    className="sl-save-button"
                                    radius="full"
                                    style={{
                                        backgroundColor: "#1BAC55",
                                    }}
                                >
                                    <span className="sl-save-button-text">
                                        Guardar
                                    </span>
                                </Button>
                            </div>
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
