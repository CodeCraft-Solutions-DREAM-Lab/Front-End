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
                                label="Persona asignada a la reservación"
                                placeholder="Nombre"
                                labelPlacement="outside"
                                className="mcra-input"
                                classNames={{
                                    inputWrapper: [
                                        "bg-transparent border-2 h-12",
                                    ],
                                    label: ["text-lg"],
                                }}
                            />
                            <Select
                                label="Sala"
                                labelPlacement="outside"
                                placeholder="Seleccione una sala"
                                className="mcra-select"
                                classNames={{
                                    trigger: ["bg-transparent border-2  h-12"],
                                    label: ["text-lg"],
                                }}
                            >
                                {salas.map((sala) => (
                                    <SelectItem key={sala.id} value={sala.id}>
                                        {sala.nombre}
                                    </SelectItem>
                                ))}
                            </Select>

                            <div className="mcra-contenedor-botones">
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
                            </div>
                        </ModalBody>
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
