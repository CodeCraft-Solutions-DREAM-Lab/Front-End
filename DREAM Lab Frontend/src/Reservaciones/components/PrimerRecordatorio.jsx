import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import React from "react";

function PrimerRecordatorio(props) {
    return (
        <Modal 
            size={props.size} 
            isOpen={props.isOpen} 
            onClose={props.onClose} 
        >
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-row">¡Recordatorio!</ModalHeader>
                <ModalBody>
                    <p> 
                    Recuerda que tu solicitud no garantiza tu reserva de inmediato.
                    Confirmaremos la disponibilidad y te notificaremos en breve.
                    <br/>
                    ¡Gracias por tu paciencia!
                    </p>
                </ModalBody>
                <ModalFooter className="justify-center">
                    <Button className="py-4 px-8" color="primary" onPress={props.onOk}>
                        OK
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    );
}

export default PrimerRecordatorio;
