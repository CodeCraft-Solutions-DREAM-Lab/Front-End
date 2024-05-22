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

import propTypes from "prop-types";

const HiddenInputLogger = ({ reservaciones }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [qr, setQR] = useState("");
    const [tagId, settagId] = useState("");
    const tagIdRef = useRef(tagId);
    const [isLogging, setIsLogging] = useState(false);
    const isLoggingRef = useRef(isLogging);
    const timeoutId = useRef(null);

    useEffect(() => {
        tagIdRef.current = tagId;
        isLoggingRef.current = isLogging;
    }, [tagId, isLogging]);

    const createQR = (e, tagId) => {
        e.preventDefault();
        console.log("tagId: ", tagId);
        post("auth/usuario", { tagId: tagId, origen: "qr" })
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
            if (!isLoggingRef.current) {
                setIsLogging(true);
                settagId(char);
            } else if (isLoggingRef.current) {
                // Log the input and stop logging if "Enter" is pressed
                if (char === "enter") {
                    console.log(tagIdRef.current);
                    createQR(e, tagIdRef.current);
                    setIsLogging(false);
                    settagId("");
                } else {
                    const newInput = tagIdRef.current + char;
                    settagId(newInput);
                }
            }

            // Reset the logging if no key is pressed within 5 seconds
            clearTimeout(timeoutId.current);
            timeoutId.current = setTimeout(() => {
                setIsLogging(false);
                settagId("");
            }, 5000);
        };

        document.addEventListener("keydown", handleKeyDown);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            clearTimeout(timeoutId.current);
        };
    }, []);

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "20w",
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Inicio de sesión
                        </ModalHeader>
                        <ModalBody>
                            <div className="flex centered-container">
                                <QRCode value={qr} style={{ width: "80%" }} />
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
    );
};

HiddenInputLogger.propTypes = {
    reservaciones: propTypes.array,
};

export default HiddenInputLogger;
