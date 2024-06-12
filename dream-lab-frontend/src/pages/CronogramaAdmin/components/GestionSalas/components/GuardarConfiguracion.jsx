import React, { useState} from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';
import ConfirmacionGuardado from "./ConfirmacionGuardado";
import { put } from "src/utils/ApiRequests.js";

import propTypes from "prop-types";

function GuardarConfiguracion(props) {
    const [isModalConfirmacionOpen, setIsModalConfirmacionOpen] = useState(false);

    const cambiarEstadoSala = (id, estado) => {
        const url = `salas/cambiarEstadoSalas`;

        const data = JSON.stringify({
            idSala: id,
            bloqueada: estado
        });

        put(
            url,
            data,
            () => {
                console.log("La disponibilidad se actualizó exitosamente.");
            },
            (error) => {
                console.error("Error al cambiar la disponibilidad:", error);
            }
        );
    }

    const handleSave = () => {
        props.salas.forEach(sala => {
            if(sala.clicked){
                sala.bloqueada = !sala.bloqueada;
                cambiarEstadoSala(sala.idSala, sala.bloqueada);
            }
        });

        const newSalasArray = [...props.salas];
        props.setSalas(newSalasArray);

        setIsModalConfirmacionOpen(true);
    };

    return (
        <>
        <ConfirmacionGuardado
				isOpen={isModalConfirmacionOpen}
				onClose={() => {
					setIsModalConfirmacionOpen(false);
                    props.closeAll();
				}}
			/>
        <Modal
            size='2xl'
            isOpen={props.isOpen}
            onClose={props.onClose}
            hideCloseButton={true}
            backdrop="blur"
        >
            <ModalContent className="p-3">
                {() => (
                    <>
                        <div className="flex justify-center pt-4">
                            <DangerousOutlinedIcon sx={{ fontSize: 90, color: "#AC3E1B" }}/>
                        </div>
                        <ModalHeader className="text-[#14247b] px-4 pb-2 mb-4 justify-center text-3xl flex-wrap text-center">
                            ¿Estás seguro de que quieres guardar la configuración?
                        </ModalHeader>
                        <ModalBody className="text-[#646464] px-4 mx-24 justify-center text-2xl text-center font-karla font-medium">
                            Todas las reservaciones de las salas que deshabilites serán canceladas. 
                        </ModalBody>
                        <ModalFooter className="justify-center mt-4">
                            <Button className="flex flex-wrap justify-center items-center min-w-48 w-35% h-12 mr-16 bg-white cursor-pointer border-4 border-[#ac3e1b] rounded-full font-karla font-bold text-lg text-[#ac3e1b] uppercase hover:bg-[#ac3e1b] hover:border-[#ac3e1b] hover:text-white" 
                            onClick={props.onClose}> NO, VOLVER </Button>
                            <Button className="flex flex-wrap justify-center items-center min-w-48 w-35% h-12 bg-white cursor-pointer border-4 border-[#1bac55] rounded-full font-karla font-bold text-lg text-[#1bac55] uppercase hover:bg-[#1bac55] hover:border-[#1bac55]  hover:text-white"
                            onClick={handleSave} data-cy="boton-guardar-disponibilidad"> Sí, GUARDAR </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
        </>
    );
}

GuardarConfiguracion.propTypes = {
    salas: propTypes.array,
    setSalas: propTypes.func,
    isOpen: propTypes.bool,
    closeAll: propTypes.func,
    onClose: propTypes.func,
};

export default GuardarConfiguracion;


