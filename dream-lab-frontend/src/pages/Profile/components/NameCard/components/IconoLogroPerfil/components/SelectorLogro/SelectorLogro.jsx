// Componentes NextUI
import { Modal, ModalBody, ModalHeader, ModalContent } from "@nextui-org/react";

// Proptypes
import PropTypes from "prop-types";

// Hooks
import { useState } from "react";

export const Row = ({
    span,
    children,
    classNames,
    verticalCenter,
    horizontalCenter,
}) => {
    let classes = `flex row-span-${span} h-full w-full ${classNames}`;

    if (verticalCenter) {
        classes += " items-center";
    }
    if (horizontalCenter) {
        classes += " justify-center";
    }
    return <div className={classes}>{children}</div>;
};
Row.propTypes = {
    span: PropTypes.number,
    children: PropTypes.node,
    classNames: PropTypes.string,
    verticalCenter: PropTypes.bool,
    horizontalCenter: PropTypes.bool,
};

export const Col = ({ span, children, classNames }) => {
    return (
        <div className={`col-span-${span} h-full w-full ${classNames}`}>
            {children}
        </div>
    );
};
Col.propTypes = {
    span: PropTypes.number,
    children: PropTypes.node,
    classNames: PropTypes.string,
};

export const Grid = ({ cols, rows, children, classNames }) => {
    return (
        <div
            className={`grid grid-cols-${cols} grid-rows-${rows} h-full w-full ${classNames}`}
        >
            {children}
        </div>
    );
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
                    <Grid cols={3} rows={1}>
                        <Col span={1}>
                            <Grid rows={4} cols={1}>
                                <Row
                                    span={1}
                                    classNames="bg-yellow-500"
                                    horizontalCenter
                                    verticalCenter
                                >
                                    <span>{titulo}</span>
                                </Row>
                                <Row
                                    span={2}
                                    classNames="bg-red-500"
                                    horizontalCenter
                                    verticalCenter
                                >
                                    <img src={icono} alt="icono-logro" />
                                </Row>
                                <Row
                                    span={1}
                                    classNames="bg-green-500"
                                    horizontalCenter
                                    verticalCenter
                                >
                                    <button onClick={onOpen}>Cambiar</button>
                                </Row>
                            </Grid>
                        </Col>
                        <Col span={2}>
                            <Grid rows={4} cols={1}>
                                <Row span={3} classNames="bg-indigo-500">
                                    Selector
                                </Row>
                                <Row span={1}>Colores</Row>
                            </Grid>
                        </Col>
                    </Grid>
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
