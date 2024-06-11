import React, { useState, useEffect} from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Button,
} from "@nextui-org/react";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

import propTypes from "prop-types";

function ConfirmacionGuardado(props) {

    return (
        <Modal
            size='xl'
            isOpen={props.isOpen}
            onClose={props.onClose}
            hideCloseButton={true}
            backdrop="blur"
        >
            <ModalContent className="p-3">
                {() => (
                    <>
                        <div className="flex justify-center pt-4">
                            <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 90, color: "#1bac55" }}/>
                        </div>
                        <ModalHeader className="text-[#14247b] px-4 pb-2 mx-12 mt-1 mb-4 justify-center text-3xl flex-wrap text-center">
                            La configuración se ha guardado exitosamente
                        </ModalHeader>
                        <ModalFooter className="justify-center mt-4">
                            <Button className="flex flex-wrap justify-center items-center min-w-48 w-35% h-12 bg-white cursor-pointer border-4 border-[#1bac55] rounded-full font-karla font-bold text-lg text-[#1bac55] uppercase hover:bg-[#1bac55] hover:border-[#1bac55]  hover:text-white"
                            onClick={props.onClose} data-cy="boton-cerrar-confirmacion-disponibilidad"> CERRAR </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

ConfirmacionGuardado.propTypes = {
    isOpen: propTypes.bool,
    onClose: propTypes.func,
};

export default ConfirmacionGuardado;