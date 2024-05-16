import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";
import { Grid } from "@mui/material";
import errorLogo from "../../../../../../assets/Profile/errorLogo.png";
import propTypes from "prop-types";

function ModalEliminacionAnuncio(props) {
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
                            ¡Advertencia!
                        </ModalHeader>
                        <ModalBody>
                            <Grid container justify="center">
                                <Grid
                                    item
                                    xs={2}
                                    className="flex justify-start"
                                >
                                    <img
                                        src={errorLogo}
                                        className="object-contain w-14"
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <p>
                                        Estás a punto de eliminar
                                        permanentemente el anuncio antes
                                        seleccionado.
                                        <b> ¿Deseas continuar?</b>
                                    </p>
                                </Grid>
                            </Grid>
                        </ModalBody>
                        <ModalFooter className="justify-center">
                            <Button
                                className={`rounded-full px-12 py-2 bg-[#ac1b1b] font-bold text-white 
                                hover:text-[#ac1b1b]  hover:bg-[#ac1b1be0]  border-2 border-[#ac1b1b] 
                                hover:border-[#ac1b1b]`}
                                color="primary"
                                onPress={props.onOk}
                                data-cy="primer-recordatorio-ok"
                                style={{ marginLeft: '10px', width: '150px' }} // Agrega margen izquierdo y ajusta el ancho
                            >
                                Sí
                            </Button>
                            <Button
                                className="rounded-full px-12 py-2 bg-white font-bold text-[#898383] 
                                            hover:bg-[#898383] hover:text-white border-2 border-[#898383]"
                                color="primary"
                                onPress={props.onOk}
                                data-cy="primer-recordatorio-ok"
                                style={{ marginLeft: '10px', width: '150px' }} // Agrega margen izquierdo y ajusta el ancho
                            >
                                No
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

ModalEliminacionAnuncio.propTypes = {
    size: propTypes.string,
    isOpen: propTypes.bool,
    onClose: propTypes.func,
    onOk: propTypes.func,
};

export default ModalEliminacionAnuncio;
