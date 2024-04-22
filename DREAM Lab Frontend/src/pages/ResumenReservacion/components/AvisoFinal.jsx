import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";
import greenTickIcon from "../assets/images/greenTickIcon.png";

function AvisoFinal(props) {
    return (
        <Modal
            size={props.size}
            isOpen={props.isOpen}
            onClose={props.onClose}
            hideCloseButton={true}
            backdrop="blur"
        >
            <ModalContent className="p-3">
                {(onClose) => (
                    <>
                        <ModalHeader className="justify-center">
                            <img
                                src={greenTickIcon}
                                className="object-contain w-12"
                            />
                        </ModalHeader>
                        <ModalBody>
                            <p className="text-[#14247b] px-4 pt-0 pb-2 justify-center text-2xl text-center font-semibold">
                                Tu solicitud ha sido procesada exitosamente.
                            </p>
                        </ModalBody>
                        <ModalFooter className="justify-center">
                            <Button
                                // className="rounded-full px-12 py-2 bg-white font-bold text-[#1bac55]
                                //             hover:bg-[#1bac55] hover:text-white border-2 border-[#1bac55]"
                                className="rounded-full px-12 py-2 font-bold border-2 bg-[#1bac55]
                                            hover:bg-white hover:text-[#1bac55] border-[#1bac55]"
                                color="primary"
                                onPress={props.onOk}
                            >
                                CERRAR
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default AvisoFinal;
