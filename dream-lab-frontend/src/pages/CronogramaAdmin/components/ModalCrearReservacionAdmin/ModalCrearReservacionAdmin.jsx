import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@nextui-org/modal";

import { Select, SelectSection, SelectItem } from "@nextui-org/select";

import propTypes from "prop-types";

function ModalCrearReservacionAdmin({ isOpen, onOpen, onOpenChange }) {
    return (
        <Modal open={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>
                    <h1>Agregar reservación</h1>
                </ModalHeader>
                <ModalBody>
                    <Select
                        labelPlacement="outside"
                        label="Sala"
                        className="max-w-xs"
                    >
                        {["Sala 1", "Sala 2"].map((sala, index) => (
                            <SelectItem key={index}>{sala.label}</SelectItem>
                        ))}
                    </Select>
                </ModalBody>
                <ModalFooter>
                    <button onClick={onOpenChange}>Cerrar</button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

ModalCrearReservacionAdmin.propTypes = {
    isOpen: propTypes.bool.isRequired,
    onOpen: propTypes.func.isRequired,
    onOpenChange: propTypes.func.isRequired,
};

export default ModalCrearReservacionAdmin;
