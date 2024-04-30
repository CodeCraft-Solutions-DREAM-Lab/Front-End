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
    setRefresh,
    colorSeleccionado,
    setColorSeleccionado,
    logrosObtenidos,
    logroSeleccionado,
    setLogroSeleccionado,
    handleLogroArtista,
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const abrirSelector = () => {
        onOpenChange();
    };

    return (
        <>
            <div className="ilp-logo-div" onClick={abrirSelector}>
                <Button
                    isIconOnly
                    className="h-full w-full bg-transparent"
                    onPress={abrirSelector}
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
                setRefresh={setRefresh}
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
    setRefresh: propTypes.func,
    colorSeleccionado: propTypes.string,
    setColorSeleccionado: propTypes.func,
    logrosObtenidos: propTypes.array,
    logroSeleccionado: propTypes.object,
    setLogroSeleccionado: propTypes.func,
    handleLogroArtista: propTypes.func,
};

export default IconoLogroPerfil;
