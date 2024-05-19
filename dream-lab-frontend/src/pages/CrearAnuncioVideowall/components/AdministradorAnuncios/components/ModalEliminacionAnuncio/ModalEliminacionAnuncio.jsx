import React, { useState } from "react";
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
import correctoLogo from "../../../../../../assets/Profile/correctLogo.png";
import propTypes from "prop-types";

function ModalEliminacionAnuncio(props) {
    const [eliminacionSatisfactoria, setEliminacionSatisfactoria] =
        useState(false);

    const handleOk = async () => {
        try {
            console.log("Eliminando anuncio con ID:", props.anuncioId);

            // Realizar una solicitud DELETE a la función de Firebase Functions
            const response = await fetch(`https://deleteanuncio-j5zt2ysdwq-uc.a.run.app?id=${props.anuncioId}`, {
                method: "DELETE"
            });
            
            // Verificar si la solicitud fue exitosa
            if (response.ok) {
                setEliminacionSatisfactoria(true);
            } else {
                // Manejar el caso de error
                console.error("Error al eliminar el anuncio:", response.statusText);
                // Puedes mostrar un mensaje de error al usuario si lo deseas
            }
        } catch (error) {
            console.error("Error al eliminar el anuncio:", error);
            // Puedes mostrar un mensaje de error al usuario si lo deseas
        }
    };

    const handleOkSatisfactorio = () => {
        setEliminacionSatisfactoria(false);
        props.onClose();
    };

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
                {!eliminacionSatisfactoria && (
                    <ModalHeader className="text-[#14247b] px-4 pt-4 pb-2 justify-center text-xl">
                        ¡Advertencia!
                    </ModalHeader>
                )}

                {eliminacionSatisfactoria && (
                    <ModalHeader className="text-[#14247b] px-4 pt-4 pb-2 justify-center text-xl">
                        Eliminación satisfactoria
                    </ModalHeader>
                )}
                <ModalBody>
                    <Grid container justify="center">
                        {!eliminacionSatisfactoria ? (
                            <Grid item xs={2} className="flex justify-start">
                                <img
                                    src={errorLogo}
                                    className="object-contain w-14"
                                    alt="Error logo"
                                />
                            </Grid>
                        ) : (
                            <Grid item xs={2} className="flex justify-start">
                                <img
                                    src={correctoLogo}
                                    className="object-contain w-14"
                                    alt="Correcto logo"
                                />
                            </Grid>
                        )}
                        <Grid item xs={10}>
                            {eliminacionSatisfactoria ? (
                                <p>
                                    {" "}
                                    <b>
                                        El anuncio seleccionado fue eliminado
                                        adecuadamente.
                                    </b>{" "}
                                    Te invitamos a ver el video wall para checar
                                    tus cambios.{" "}
                                </p>
                            ) : (
                                <p>
                                    Estás a punto de eliminar permanentemente el
                                    anuncio antes seleccionado.
                                    <b> ¿Deseas continuar?</b>
                                </p>
                            )}
                        </Grid>
                    </Grid>
                </ModalBody>
                <ModalFooter className="justify-center">
                    {!eliminacionSatisfactoria && (
                        <>
                            <Button
                                className={`rounded-full px-12 py-2 bg-[#ac1b1b] font-bold text-white 
                                hover:text-[#ac1b1b]  hover:bg-[#ac1b1be0]  border-2 border-[#ac1b1b] 
                                hover:border-[#ac1b1b]`}
                                color="primary"
                                onClick={handleOk}
                                data-cy="primer-recordatorio-ok"
                                style={{ marginLeft: "10px", width: "150px" }}
                            >
                                Sí
                            </Button>
                            <Button
                                className="rounded-full px-12 py-2 bg-white font-bold text-[#898383] 
                                            hover:bg-[#898383] hover:text-white border-2 border-[#898383]"
                                color="primary"
                                onClick={props.onClose}
                                style={{ marginLeft: "10px", width: "150px" }}
                            >
                                No
                            </Button>
                        </>
                    )}
                    {eliminacionSatisfactoria && (
                        <Button
                            className="rounded-full px-12 py-2 bg-[#40ad52] font-bold text-white 
                                            hover:bg-[#31793e] hover:text-[#40ad52] border-2 border-[#40ad52]"
                            color="primary"
                            onClick={handleOkSatisfactorio}
                            style={{ marginLeft: "10px", width: "300px" }}
                        >
                            Aceptar
                        </Button>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

ModalEliminacionAnuncio.propTypes = {
    size: propTypes.string,
    isOpen: propTypes.bool,
    onClose: propTypes.func,
    anuncioId: propTypes.string.isRequired, // Se requiere el ID del anuncio
};

export default ModalEliminacionAnuncio;
