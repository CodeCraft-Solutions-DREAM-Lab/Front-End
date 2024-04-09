import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import React from "react";

function AvisoFinal(props) {
    return (
        <Modal 
            size={props.size} 
            isOpen={props.isOpen}
            onClose={props.onClose} 
            backdrop="blur"
        >
            <ModalContent>
            {() => (
                <>
                <ModalHeader className="flex flex-row">Palomita</ModalHeader>
                <ModalBody>
                    <p className="text-l"> 
                    Tu solicitud ha sido procesada exitosamente
                    </p>
                </ModalBody>
                <ModalFooter className="justify-center">
                    <Button className="py-4 px-8" color="primary" onPress={props.onOk}>
                        Cerrar
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    );
}

export default AvisoFinal;
