import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";

function DeleteReservModal({ size, isOpen, onClose, onAction }) {
    return (
        <Modal
            size={size}
            isOpen={isOpen}
            onClose={onClose}
            onAction={onAction}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            ¿Estás seguro?
                        </ModalHeader>
                        <ModalBody>
                            <p>
                                ¿Estás seguro que quieres cancelar la
                                reservación? <br />
                                Esta acción no es reversible.
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="" variant="light" onPress={onClose}>
                                Cerrar
                            </Button>
                            <Button color="danger" onPress={onAction}>
                                Cancelar Reservación
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default DeleteReservModal;
