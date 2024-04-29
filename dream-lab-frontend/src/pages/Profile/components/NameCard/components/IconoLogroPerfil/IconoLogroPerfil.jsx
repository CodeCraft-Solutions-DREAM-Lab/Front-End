// Imagenes
import LogoRobot from "src/assets/Profile/robot-icon.png";

// Estilos
import "./IconoLogroPerfil.css";

// Componentes NextUI
import { Button, useDisclosure } from "@nextui-org/react";

// Componentes
import SelectorLogro from "./components/SelectorLogro/SelectorLogro";

function IconoLogroPerfil() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const abrirSelector = () => {
        onOpenChange();
    };

    return (
        <>
            <div className="ilp-logo-div">
                <Button
                    isIconOnly
                    className="h-full w-full bg-transparent"
                    onPress={abrirSelector}
                >
                    <img src={LogoRobot} alt="logotipo-usuario" />
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
