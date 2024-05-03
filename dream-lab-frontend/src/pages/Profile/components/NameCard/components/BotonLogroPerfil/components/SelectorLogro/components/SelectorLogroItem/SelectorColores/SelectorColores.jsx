// NextUI components
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    Button,
    Input,
} from "@nextui-org/react";

// Estilos
import "./SelectorColores.css";

// Hooks
import { useState } from "react";

// PropTypes
import PropTypes from "prop-types";

// Colores
const colors = [
    "#C0A2FF",
    "#78C2F8",
    "#FF87E5",
    "#757891",
    "#FF6073",
    "#AFB7FF",
    "#F8E478",
    "#A0DE83",
    "#FEA767",
];

function SelectorColores({ colorSeleccionado, setColorSeleccionado }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelectColor = (color) => {
        setColorSeleccionado(color);
        setIsOpen(false);
    };

    return (
        <Popover
            placement="bottom"
            showArrow
            offset={10}
            shadow="lg"
            backdrop="opaque"
            isOpen={isOpen}
            onOpenChange={(open) => setIsOpen(open)}
        >
            <PopoverTrigger>
                <Button
                    className="sc-color-button"
                    radius="full"
                    style={{
                        backgroundColor: colorSeleccionado,
                    }}
                    onPress={() => {
                        setIsOpen(true);
                    }}
                >
                    <span className="sc-color-button-text">Cambiar color</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                {() => (
                    <div className="sc-cologrid-container">
                        <div className="sc-colorgrid">
                            {colors.map((color, index) => (
                                <Button
                                    key={index}
                                    isIconOnly
                                    style={{ backgroundColor: color }}
                                    onPress={() => handleSelectColor(color)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}

SelectorColores.propTypes = {
    colorSeleccionado: PropTypes.string,
    setColorSeleccionado: PropTypes.func,
};

export default SelectorColores;
