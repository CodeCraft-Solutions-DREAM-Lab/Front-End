import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";
import { Grid } from "@mui/material";
import "./GestionSalas.css";

import propTypes from "prop-types";

function GestionSalas(props) {
    return (
        <Modal
            size='5xl'
            isOpen={props.isOpen}
            onClose={props.onClose}
            hideCloseButton={true}
            backdrop="blur"
            data-cy="undefined"
        >
            <ModalContent className="p-3">
                {() => (
                    <>
                        <ModalHeader className="text-[#14247b] px-4 pt-4 pb-2 justify-center text-xl">
                            Administrar disponibilidad de salas
                        </ModalHeader>
                        <ModalBody>
                            <Grid container justify="center">
                                
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
                            <Button className="boton-modal-guardar" onClick={props.onClose}> GUARDAR </Button>
                            <Button className="boton-modal-cancelar" onClick={props.onClose}> CANCELAR </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

GestionSalas.propTypes = {
    isOpen: propTypes.bool,
    onClose: propTypes.func,
};

export default GestionSalas;