import React, { useState, useEffect } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Select,
    SelectItem,
} from "@nextui-org/react";
import propTypes from "prop-types";
import WarningIcon from "src/assets/Icons/WarningIcon";
import "./ModalPenalizar.css";
import { post } from "src/utils/ApiRequests";
import { setSelectedItem } from "../../../../../redux/Slices/selectedItemSlice";


const ModalPenalizar = (
    {
        isOpen,
        setIsOpen,
        idUsuario,
    }
) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isMotivoSelected, setIsMotivoSelected] = useState(false);
    const [clickedItemIndx, setClickedItemIndx] = useState(null);

    const handleOnClose = () => {
        setIsOpen(false);
    };

    const handlePenalizar = async () => {

        try {
            setIsLoading(true);

            await post(
                "usuarios/cambiarPrioridad", 
                {
                    idUsuario: idUsuario,
                    puntos: -motivos[clickedItemIndx].penalizacion,
                    motivo: "Penalización realizada por un administrador. " + motivos[clickedItemIndx].descr
                }
            );

            setIsOpen(false);
            setSelectedItem(null);
            setIsMotivoSelected(false);
            setIsLoading(false);
        } catch (error) {
            console.log("Error al cancelar reservación: ", error);
            setIsLoading(false);
        }
    };

    const handleSelectMotivo = (index) => {
        setIsMotivoSelected(true);
        setClickedItemIndx(index);
    }

    const motivos = [
        {
            penalizacion: 30,
            descr: "Daño a la sala proporcionado para la reservación",
            label: "Daño a la sala",
        },
        {
            penalizacion: 30,
            descr: "Daño al equipo proporcionado para la reservación",
            label: "Daño a equipo",
        },
        {
            penalizacion: 30,
            descr: "Robo de equipo proporcionado para la reservación",
            label: "Robo de equipo",
        },
        {
            penalizacion: 5,
            descr: "Llegó tarde a la reservación",
            label: "Retraso",
        },
        {
            penalizacion: 10,
            descr: "No asistió a la reservación",
            label: "Inasistencia",
        }
    ];

    return (
        <Modal
            size='2xl'
            isOpen={isOpen}
            onClose={handleOnClose}
            hideCloseButton={true}
            isDismissable={false}
            backdrop="blur"
        >
            <ModalContent className="MP-modal-content-container">
                {() => (
                    <>
                        <ModalHeader className="MP-modal-header">
                            <WarningIcon className="MP-warning-icon" color="#AC3E1B" />
                            <p className="MP-modal-header-text">
                                Penalización
                            </p>
                        </ModalHeader>
                        <ModalBody className="MP-modal-body">
                            <Select
                                labelPlacement="outside-left"
                                label="Tipo de falta"
                                variant="bordered"
                                className="MP-select"
                                placeholder="Selecciona un motivo"
                            >
                                {motivos.map((motivo, index) => (
                                    <SelectItem
                                        key={index}
                                        value={motivo.descr}
                                        onClick={() => {handleSelectMotivo(index)}}
                                    >
                                        {motivo.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </ModalBody>
                        <ModalFooter className="MP-modal-footer">
                            <p className="MP-modal-footer-text">
                                ¿Deseas continuar?
                            </p>
                            <div>
                                <Button
                                    className="justify-center items-center min-w-48 w-35% h-12 mr-16 bg-white cursor-pointer border-4 border-[#1bac55] rounded-full font-karla font-bold text-lg text-[#1bac55] uppercase hover:bg-[#1bac55] hover:border-[#1bac55]  hover:text-white"
                                    // className="MP-close-btn"
                                    onClick={handleOnClose}
                                    disabled={isLoading}
                                >
                                    NO, VOLVER
                                </Button>
                                <Button
                                    className="justify-center items-center min-w-48 w-35% h-12 bg-white cursor-pointer border-4 border-[#ac3e1b] rounded-full font-karla font-bold text-lg text-[#ac3e1b] uppercase hover:bg-[#ac3e1b] hover:border-[#ac3e1b] hover:text-white"
                                    // className="MP-penalizar-btn"
                                    onClick={handlePenalizar}
                                    disabled={isLoading || !isMotivoSelected}
                                >
                                    SÍ, PENALIZAR
                                </Button>
                            </div>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

ModalPenalizar.propTypes = {
    isOpen: propTypes.bool,
    setIsOpen: propTypes.func,
    idUsuario: propTypes.string,
}

export default ModalPenalizar;