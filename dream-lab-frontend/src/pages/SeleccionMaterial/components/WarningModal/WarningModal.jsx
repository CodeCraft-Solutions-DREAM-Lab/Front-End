import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";
import { Grid } from "@mui/material";
import infoLogo from "src/assets/SelectorSala/infoicon.webp";

import propTypes from "prop-types";

function WarningModal(props) {
    return (
        <Modal
            size={props.size}
            isOpen={props.isOpen}
            onClose={props.onClose}
            hideCloseButton={true}
            backdrop="blur"
            data-cy="primer-recordatorio-sala"
        >
            <ModalContent className="p-3">
                {() => (
                    <>
                        <ModalHeader className="text-[#14247b] px-4 pt-4 pb-2 justify-center text-xl">
                            ¡Aviso!
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
                                        Asegurate de seleccionar todos los materiales recomendados. Si no eliges los
                                        materiales recomendados y no cuentas con tu propio equipo, <strong> no podrás realizar
                                        la actividad</strong>. ¿Deseas continuar?
                                    </p>
                                </Grid>
                            </Grid>
                        </ModalBody>
                        <ModalFooter className="flex justify-center gap-10">
                            <Button
                                className="rounded-full px-12 py-2 font-bold  
                                            hover:bg-[#D4004A] hover:text-white border-2 "
                                color="danger"
                                onPress={props.onOk}
                            >
                                Cancelar
                            </Button>
                            <Button
                                className="rounded-full px-12 py-2 font-bold text-[#FFFFFF] 
                                            hover:bg-[#15B158] hover:text-white border-2 "
                                color="success"
                                onPress={props.onOk}
                            >
                                Sí, continuar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

WarningModal.propTypes = {
    size: propTypes.string,
    isOpen: propTypes.bool,
    onClose: propTypes.func,
    onOk: propTypes.func,
};

export default WarningModal;
