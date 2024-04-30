// Imagenes
import LogoRobot from "src/assets/Profile/robot-icon.png";
import LogoBigDreamer from "src/assets/Profile/bigDreamer.png";

// Estilos
import "./BotonLogroPerfil.css";

// Componentes NextUI
import { Button, useDisclosure } from "@nextui-org/react";

// Componentes
import SelectorLogro from "./components/SelectorLogro/SelectorLogro";
import NuevoIconoLogro from "src/GlobalComponents/NuevoIconoLogro/NuevoIconoLogro";

function IconoLogroPerfil() {
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
                        icono={LogoBigDreamer}
                        colorFondo="#d9d9d9"
                    />
                </Button>
            </div>
            <SelectorLogro
                isOpen={isOpen}
                onOpen={onOpen}
                onOpenChange={onOpenChange}
            />
        </>
    );
}

export default IconoLogroPerfil;
