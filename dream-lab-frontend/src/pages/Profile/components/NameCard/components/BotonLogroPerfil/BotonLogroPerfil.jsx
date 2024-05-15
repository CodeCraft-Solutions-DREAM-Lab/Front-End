// Estilos
import "./BotonLogroPerfil.css";

// Componentes NextUI
import { Button, useDisclosure } from "@nextui-org/react";

// Componentes
import SelectorLogro from "./components/SelectorLogro/SelectorLogro";
import NuevoIconoLogro from "src/GlobalComponents/NuevoIconoLogro/NuevoIconoLogro";

// Proptypes
import propTypes from "prop-types";

function IconoLogroPerfil({
    colorSeleccionado,
    setColorSeleccionado,
    logrosObtenidos,
    logroSeleccionado,
    setLogroSeleccionado,
    handleLogroArtista,
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <div className="ilp-logo-div">
                <Button
                    isIconOnly
                    className="h-full w-full bg-transparent"
                    onPress={() => onOpenChange()}
                >
                    <NuevoIconoLogro
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
            />
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
