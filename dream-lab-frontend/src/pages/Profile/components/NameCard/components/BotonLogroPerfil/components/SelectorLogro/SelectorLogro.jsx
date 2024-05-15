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
import { post } from "src/utils/ApiRequests";

// Local Storage
import { getFromLocalStorage } from "src/utils/Storage";
import SelectorColores from "./components/SelectorLogroItem/SelectorColores/SelectorColores";

function SelectorLogro({
    isOpen,
    onOpen,
    onOpenChange,
    colorSeleccionado,
    setColorSeleccionado,
    logrosObtenidos,
    logroSeleccionado,
    setLogroSeleccionado,
    handleLogroArtista,
}) {
    const [logroPreSeleccionado, setLogroPreSeleccionado] = useState({});
    const [colorPreSeleccionado, setColorPreSeleccionado] = useState("");

    // Obtenemos los valores originales del logro y color seleccionado como
    // valor incial de la preseleccion
    useEffect(() => {
        setLogroPreSeleccionado(logroSeleccionado);
        setColorPreSeleccionado(colorSeleccionado);
    }, [logroSeleccionado, colorSeleccionado]);

    // Guarda el logro y color seleccionado en la base de datos
    const handleSave = async () => {
        setLogroSeleccionado(logroPreSeleccionado);
        setColorSeleccionado(colorPreSeleccionado);

        try {
            const response = await post(
                `perfil/logros/${getFromLocalStorage("user")}`,
                {
                    idLogro: logroPreSeleccionado.idLogro,
                    colorPreferido: colorPreSeleccionado,
                }
            );
            // Otorga un logro por customizar el perfil
            await handleLogroArtista(10);
            // Cierra el modal
            onOpenChange();
        } catch (error) {
            console.error(error);
        }
    };

    // En caso de cerrar el modal, se regresan los valores a los originales
    const handleClose = () => {
        setLogroPreSeleccionado(logroSeleccionado);
        setColorPreSeleccionado(colorSeleccionado);
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    handleClose();
                }
                onOpenChange(isOpen);
            }}
            size="5xl"
        >
            <ModalContent>
                <ModalBody>
                    <div className="sl-main-container">
                        <div className="sl-left-container">
                            <div className="sl-title-container">
                                <h1 className="sl-title" data-cy='selector-logro-titulo'>
                                    {logroPreSeleccionado.nombre}
                                </h1>
                            </div>
                            <div className="sl-icon-container">
                                <div className="sl-icon">
                                    <NuevoIconoLogro
                                        icono={logroPreSeleccionado.iconoURL}
                                        colorFondo={colorPreSeleccionado}
                                    />
                                </div>
                            </div>
                            <div className="sl-color-button-container">
                                <SelectorColores
                                    colorSeleccionado={colorPreSeleccionado}
                                    setColorSeleccionado={
                                        setColorPreSeleccionado
                                    }
                                />
                            </div>
                        </div>
                        <div className="sl-center-container"></div>
                        <div className="sl-right-container">
                            <div className="sl-opciones-logros-container" data-cy='selector-logro-container'>
                                {logrosObtenidos.map((logro, index) => (
                                    <div key={index} className="sl-logro-item">
                                        <SelectorLogroItem
                                            logro={logro}
                                            setLogroSeleccionado={
                                                setLogroPreSeleccionado
                                            }
                                            selected={
                                                logro.idLogro ===
                                                logroPreSeleccionado.idLogro
                                            }
                                            selectedColor={colorPreSeleccionado}
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
    colorSeleccionado: PropTypes.string,
    setColorSeleccionado: PropTypes.func,
    logrosObtenidos: PropTypes.array,
    logroSeleccionado: PropTypes.object,
    setLogroSeleccionado: PropTypes.func,
    handleLogroArtista: PropTypes.func,
};

export default SelectorLogro;
