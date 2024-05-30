import React, { useEffect } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";
import { Grid } from "@mui/material";
import propTypes from "prop-types";
import Confetti from "react-confetti";
import Musica from "src/assets/NotFound/logroNuevo.mp3";
function AvisoLogroNuevo(props) {
    const reproducirTimbre = () => {
        const audio = new Audio(Musica);
        audio.play();
    };

    return (
        <Modal
            size="md"
            isOpen={props.isOpen}
            onClose={props.onClose}
            hideCloseButton={true}
            backdrop="blur"
            data-cy="primer-recordatorio-sala"
        >
            <Confetti width={window.innerWidth} height={window.innerHeight} />
            <ModalContent className="p-16">
                <ModalHeader className="text-[#14247b] px-4 pt-4 pb-2 justify-center text-xl">
                   
                        Logro obtenido
                </ModalHeader>
                <ModalBody>
                    <Grid container justify="center">
                        <Grid item xs={12} className="text-center mb-4">
                            <h2 className="nombre-logro-desbloqueado">
                                Nombre del logro
                            </h2>
                        </Grid>
                        <Grid item xs={12} className="flex justify-center">
                            <div className="circulo-foto-perfil-aviso-logro-nuevo">
                                <img
                                    src="https://dreamlabstorage.blob.core.windows.net/logros/BigDreamer.webp"
                                    className="object-contain w-14"
                                    alt="Correcto logo"
                                />
                            </div>
                        </Grid>

                        <div className="nombre-logro-obtenido-anuncio">
                            <p>
                                Reserva 50 veces algún espacio del D.R.E.A.M.
                                Lab.
                            </p>
                        </div>

                        
                    </Grid>
                </ModalBody>
                <ModalFooter className="justify-center">
                    <Button
                        className="rounded-full px-12 py-2 bg-[#40ad52] font-bold text-white hover:bg-[#31793e] hover:text-[#40ad52] border-2 border-[#40ad52]"
                        color="primary"
                        onClick={() => {
                            //props.verLogro();
                            reproducirTimbre();
                        }}
                        style={{ width: "200px" }}
                    >
                        Ver logro
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}


AvisoLogroNuevo.propTypes = {
    size: propTypes.string,
    isOpen: propTypes.bool,
    onClose: propTypes.func,
    verLogro: propTypes.func, // Función para ver el logro
};

export default AvisoLogroNuevo;
