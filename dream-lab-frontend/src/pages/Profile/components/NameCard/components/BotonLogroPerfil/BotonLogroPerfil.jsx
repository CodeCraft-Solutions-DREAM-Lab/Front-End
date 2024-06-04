// Estilos
import "./BotonLogroPerfil.css";

// Componentes NextUI
import { Button, useDisclosure } from "@nextui-org/react";

// Hooks
import { useState } from "react";

// Componentes
import SelectorLogro from "./components/SelectorLogro/SelectorLogro";
import IconoLogro from "src/GlobalComponents/IconoLogro/IconoLogro";
import AvisoLogroNuevo from "src/GlobalComponents/AvisoLogroNuevo/AvisoLogroNuevo";

// Proptypes
import propTypes from "prop-types";

// API Requests
import { post } from "src/utils/ApiRequests";

// Local Storage
import { getFromLocalStorage } from "src/utils/Storage";

function IconoLogroPerfil({
    colorSeleccionado,
    setColorSeleccionado,
    logrosObtenidos,
    logroSeleccionado,
    setLogroSeleccionado,
    handleLogroArtista,
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [infoAvisoLogro, setInfoAvisoLogro] = useState("");

    // Función para manejar el cambio de información del aviso de logro
    const handleInfoAvisoLogroChange = async () => {
        try {
            const response2 = await post(
                `logros/progresoLogro/${getFromLocalStorage("user")}/10` // Ruta modificada según tu especificación
            );
            // Almacenar la respuesta en infoLogroAviso
            setInfoAvisoLogro(response2);
            console.log(response2);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="ilp-logo-div">
                <Button
                    isIconOnly
                    className="h-full w-full bg-transparent"
                    onPress={() => onOpenChange()}
                    data-cy="boton-logro-perfil"
                    radius="full"
                >
                    <IconoLogro
                        icono={logroSeleccionado.iconoURL}
                        colorFondo={colorSeleccionado}
                    />
                </Button>
            </div>
            <SelectorLogro
                isOpen={isOpen}
                onOpen={onOpen}
                onOpenChange={onOpenChange}
                colorSeleccionado={colorSeleccionado}
                setColorSeleccionado={setColorSeleccionado}
                logrosObtenidos={logrosObtenidos}
                logroSeleccionado={logroSeleccionado}
                setLogroSeleccionado={setLogroSeleccionado}
                handleLogroArtista={handleLogroArtista}
                onInfoAvisoLogroChange={handleInfoAvisoLogroChange}
            />

            {infoAvisoLogro.nuevaPrioridad != null && (
                <AvisoLogroNuevo isOpen={true} datosLogro={infoAvisoLogro}/>
            )}
        </>
    );
}

IconoLogroPerfil.propTypes = {
    colorSeleccionado: propTypes.string,
    setColorSeleccionado: propTypes.func,
    logrosObtenidos: propTypes.array,
    logroSeleccionado: propTypes.object,
    setLogroSeleccionado: propTypes.func,
    handleLogroArtista: propTypes.func,
};

export default IconoLogroPerfil;
