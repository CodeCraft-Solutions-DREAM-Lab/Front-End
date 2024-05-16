import { useState, useEffect, useRef } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";

import QRCode from "react-qr-code";

import { post } from "src/utils/ApiRequests";

const HiddenInputLogger = () => {
    const [idUsuario, setIdUsuario] = useState("");
    const [isLogging, setIsLogging] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [qr, setQR] = useState("");
    const timeoutId = useRef(null);

    const createQR = (e) => {
        e.preventDefault();
        post("auth/usuario", { usuario: idUsuario, origen: "qr" })
            .then((response) => {
                const jwt = response.jwt;
                if (jwt) {
                    setQR(`https://www.dreamlab.world/login/?jwt=${jwt}`);
                } else {
                    setQR(`https://www.dreamlab.world/login`);
                }
                onOpen();
            })
            .catch(() => {
                setQR(`https://www.dreamlab.world/login`);
            });
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            const char = e.key.toLowerCase();

            // Check if logging should start
            if (!isLogging) {
                setIsLogging(true);
                setIdUsuario(char);
            } else if (isLogging) {
                // Log the input and stop logging if "Enter" is pressed
                if (char === "enter") {
                    console.log(idUsuario);
                    setIsLogging(false);
                    setIdUsuario("");
                    createQR(e);
                } else {
                    const newInput = idUsuario + char;
                    setIdUsuario(newInput);
                }
            }

            // Reset the logging if no key is pressed within 5 seconds
            clearTimeout(timeoutId.current);
            timeoutId.current = setTimeout(() => {
                setIsLogging(false);
                setIdUsuario((prevIdUsuario) => "");
            }, 5000);
        };

        document.addEventListener("keydown", handleKeyDown);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            clearTimeout(timeoutId.current);
        };
    }, [idUsuario, isLogging]);

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Inicio de sesión
                        </ModalHeader>
                        <ModalBody>
                            <div className="flex centered-container">
                                <QRCode value={qr} />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="light"
                                onPress={onClose}
                            >
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    ); // No visible UI component
};

export default HiddenInputLogger;
