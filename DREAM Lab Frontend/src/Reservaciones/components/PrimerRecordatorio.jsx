import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";
import React from "react";
import { Grid } from "@mui/material";
import infoLogo from "../../assets/infoicon.png";

function PrimerRecordatorio(props) {
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
                        <ModalHeader className="text-[#14247b] px-4 pt-4 pb-2 justify-center text-xl">
                            ¡Recordatorio!
                        </ModalHeader>
                        <ModalBody>
                            <Grid container justify="center">
                                <Grid
                                    item
                                    xs={2}
                                    className="flex justify-start"
                                >
                                    <img
                                        src={infoLogo}
                                        className="object-contain w-14"
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <p>
                                        Recuerda que tu solicitud no garantiza
                                        tu reserva de inmediato. Confirmaremos
                                        la disponibilidad y te notificaremos en
                                        breve.
                                        <br />
                                        ¡Gracias por tu paciencia!
                                    </p>
                                </Grid>
                            </Grid>
                        </ModalBody>
                        <ModalFooter className="justify-center">
                            <Button
                                className="rounded-full px-12 py-2 bg-white font-bold text-[#1bac55] 
                                            hover:bg-[#1bac55] hover:text-white border-2 border-[#1bac55]"
                                color="primary"
                                onPress={props.onOk}
                            >
                                OK ✓
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default PrimerRecordatorio;
