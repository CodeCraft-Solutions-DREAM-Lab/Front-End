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
        // <Modal open={true} onOpenChange={onOpenChange}>
        <Modal open={true}>
            <ModalContent>
                <ModalHeader>Agregar reservación</ModalHeader>
                <ModalBody>
                    {/* <Select
                        labelPlacement="outside"
                        label="Sala"
                        className="max-w-xs"
                    >
                        {["Sala 1", "Sala 2"].map((sala, index) => (
                            <SelectItem key={index}>{sala.label}</SelectItem>
                        ))}
                    </Select> */}
                    Hola
                </ModalBody>
                <ModalFooter>
                    {/* <button onClick={onOpenChange}>Cerrar</button> */}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

ModalCrearReservacionAdmin.propTypes = {
    isOpen: propTypes.bool,
    onOpen: propTypes.func,
    onOpenChange: propTypes.func,
};

export default ModalCrearReservacionAdmin;
