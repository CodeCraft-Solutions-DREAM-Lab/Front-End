// Componentes NextUI
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";

// Proptypes
import PropTypes from "prop-types";

// Hooks
import { useState } from "react";

// Estilos
import "./SelectorLogro.css";

export const Row = ({ span, children, classNames }) => {
    let classes = ``;
    span ? (classes += `row-span-${span}`) : null;
    classNames ? (classes += ` ${classNames}`) : null;
    return <div className={classes}>{children}</div>;
};
Row.propTypes = {
    span: PropTypes.number,
    children: PropTypes.node,
    classNames: PropTypes.string,
};

export const Col = ({ span, children, classNames }) => {
    let classes = ``;
    span ? (classes += `col-span-${span}`) : null;
    classNames ? (classes += ` ${classNames}`) : null;
    return <div className={classes}>{children}</div>;
};
Col.propTypes = {
    span: PropTypes.number,
    children: PropTypes.node,
    classNames: PropTypes.string,
};

export const Grid = ({ cols, rows, children, classNames }) => {
    let classes = `h-full w-full grid`;
    cols ? (classes += ` grid-cols-${cols}`) : null;
    rows ? (classes += ` grid-rows-${rows}`) : null;
    classNames ? (classes += ` ${classNames}`) : null;
    return <div className={classes}>{children}</div>;
};
Grid.propTypes = {
    cols: PropTypes.number,
    rows: PropTypes.number,
    children: PropTypes.node,
    classNames: PropTypes.string,
};

function SelectorLogro({ isOpen, onOpen, onOpenChange }) {
    const [titulo, setTitulo] = useState("Robot Expert");
    const [icono, setIcono] = useState("robot-icon.png");

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
            <ModalContent>
                <ModalBody>
                    <div className="sl-contenedor-modal">
                        <div className="grid grid-cols-3 h-full">
                            <div className="col-span-1 h-full">
                                <div className="grid grid-rows-4 h-full">
                                    <div className="row-span-1 h-full bg-yellow-500">
                                        <span>{titulo}</span>
                                    </div>
                                    <div className="row-span-2 h-full bg-red-500">
                                        <img src={icono} alt="icono-logro" />
                                    </div>
                                    <div className="row-span-1 h-full bg-green-500">
                                        <button onClick={onOpen}>
                                            Cambiar
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2 h-full">
                                <div className="grid grid-rows-5 h-full">
                                    <div className="row-span-4 h-full bg-indigo-500">
                                        Selector
                                    </div>
                                    <div className="row-span-1 h-full">
                                        Colores
                                    </div>
                                </div>
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
