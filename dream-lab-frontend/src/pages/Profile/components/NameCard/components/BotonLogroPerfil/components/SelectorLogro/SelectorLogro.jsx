// Componentes NextUI
import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react";

// Proptypes
import PropTypes from "prop-types";

// Hooks
import { useState, useEffect } from "react";

// Estilos
import "./SelectorLogro.css";

// Componentes
import NuevoIconoLogro from "src/GlobalComponents/NuevoIconoLogro/NuevoIconoLogro";
import SelectorLogroItem from "./components/SelectorLogroItem/SelectorLogroItem";

// API Requests
import { get, post } from "src/utils/ApiRequests";

// Local Storage
import { getFromLocalStorage } from "src/utils/Storage";
import SelectorColores from "./components/SelectorLogroItem/SelectorColores/SelectorColores";

function SelectorLogro({
    isOpen,
    onOpen,
    onOpenChange,
    setRefresh,
    colorSeleccionado,
    setColorSeleccionado,
    logrosObtenidos,
    logroSeleccionado,
    setLogroSeleccionado,
}) {
    const handleSave = () => {
        post(`perfil/logros/${getFromLocalStorage("user")}`, {
            idLogro: logroSeleccionado.idLogro,
            colorPreferido: colorSeleccionado,
        }).then((response) => {
            console.log(response);
            setRefresh((prev) => !prev);
            onOpenChange();
        });
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
            <ModalContent>
                <ModalBody>
                    <div className="sl-main-container">
                        <div className="sl-left-container">
                            <div className="sl-title-container">
                                <h1 className="sl-title">
                                    {logroSeleccionado.nombre}
                                </h1>
                            </div>
                            <div className="sl-icon-container">
                                <div className="sl-icon">
                                    <NuevoIconoLogro
                                        icono={logroSeleccionado.iconoURL}
                                        colorFondo={colorSeleccionado}
                                    />
                                </div>
                            </div>
                            <div className="sl-color-button-container">
                                <SelectorColores
                                    colorSeleccionado={colorSeleccionado}
                                    setColorSeleccionado={setColorSeleccionado}
                                />
                            </div>
                        </div>
                        <div className="sl-center-container"></div>
                        <div className="sl-right-container">
                            <div className="sl-opciones-logros-container">
                                {logrosObtenidos.map((logro, index) => (
                                    <div key={index} className="sl-logro-item">
                                        <SelectorLogroItem
                                            logro={logro}
                                            setLogroSeleccionado={
                                                setLogroSeleccionado
                                            }
                                            selected={
                                                logro.idLogro ===
                                                logroSeleccionado.idLogro
                                            }
                                            selectedColor={colorSeleccionado}
                                        />
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
                                    onPress={handleSave}
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
    setRefresh: PropTypes.func,
    colorSeleccionado: PropTypes.string,
    setColorSeleccionado: PropTypes.func,
    logrosObtenidos: PropTypes.array,
    logroSeleccionado: PropTypes.object,
    setLogroSeleccionado: PropTypes.func,
};

export default SelectorLogro;
