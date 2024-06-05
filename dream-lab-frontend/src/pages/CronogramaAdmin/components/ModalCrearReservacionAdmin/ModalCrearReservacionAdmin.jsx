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
                                    className="bg-white border-4 border-[#ac3e1b] text-[#ac3e1b] hover:bg-[#ac3e1b] hover:border-[#ac3e1b] hover:text-white mcra-button"
                                    onClick={onClose}
                                    radius="full"
                                >
                                    <span className="mcra-button-text">
                                        Cancelar
                                    </span>
                                </Button>
                                <Button
                                    className="bg-white border-4 border-[#1bac55] text-[#1bac55] hover:bg-[#1bac55] hover:border-[#1bac55]  hover:text-white mcra-button"
                                    onClick={onClose}
                                    radius="full"
                                >
                                    <span className="mcra-button-text">
                                        Guardar
                                    </span>
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
