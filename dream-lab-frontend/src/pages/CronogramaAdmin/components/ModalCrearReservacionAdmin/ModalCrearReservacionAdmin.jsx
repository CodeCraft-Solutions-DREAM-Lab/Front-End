// Componentes de Nextui
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Select,
    SelectItem,
    Button,
    Input,
} from "@nextui-org/react";

// Estilos
import "./ModalCrearReservacionAdmin.css";

import propTypes from "prop-types";

function ModalCrearReservacionAdmin({ isOpen, onOpen, onOpenChange, salas }) {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            backdrop="opaque"
            size="2xl"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="mcra-header">
                            <h1 className="mcra-title">Crear Reservación</h1>
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                label="Nombre"
                                placeholder="Nombre"
                                labelPlacement="outside"
                                className="mcra-input"
                                classNames={{
                                    input: ["bg-transparent"],
                                    inputWrapper: [
                                        "bg-transparent border-2 h-12",
                                    ],
                                }}
                            />
                            <Select
                                label="Sala"
                                labelPlacement="outside"
                                placeholder="Seleccione una sala"
                                classNames={{
                                    trigger: [
                                        "bg-transparent border-2 radius-full h-12",
                                    ],
                                }}
                            >
                                {salas.map((sala) => (
                                    <SelectItem key={sala.id} value={sala.id}>
                                        {sala.nombre}
                                    </SelectItem>
                                ))}
                            </Select>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="light"
                                onPress={onClose}
                            >
                                Close
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                Action
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

ModalCrearReservacionAdmin.propTypes = {
    isOpen: propTypes.bool,
    onOpen: propTypes.func,
    onOpenChange: propTypes.func,
    salas: propTypes.array,
};

export default ModalCrearReservacionAdmin;
