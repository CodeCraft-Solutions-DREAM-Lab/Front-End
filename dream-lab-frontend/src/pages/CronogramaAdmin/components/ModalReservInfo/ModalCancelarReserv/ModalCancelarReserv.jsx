import React, { useState, useEffect } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';
import propTypes from "prop-types";
import "./ModalCancelarReserv.css";
import { post } from "src/utils/ApiRequests";

const ModalCancelarReserv = ({
    isOpen,
    setIsOpen,
    setIsInfoModalOpen,
    reservId,
    salaName,
    fechaString,
    horaInicioString,
    horaFinString,
    items,
    setItems,
    filteredItems,
    setFilteredItems
}) => {

    const [isLoading, setIsLoading] = useState(false);

    const handleOnClose = () => {
        setIsOpen(false);
    };

    const handleCancelReserv = async () => {

        try {
            setIsLoading(true);

            await post(
                "reservaciones/cancelar",
                {
                    idReservacion: reservId,
                }
            );

            const newItemsArray = [...items];
            const deleteIndx1 = newItemsArray.findIndex((it) => it.id == reservId);
            newItemsArray.splice(deleteIndx1, 1);
            setItems(newItemsArray);

            const newFilteredItemsArray = [...filteredItems];
            const deleteIndx2 = newFilteredItemsArray.findIndex((it) => it.id == reservId);
            newFilteredItemsArray.splice(deleteIndx2, 1);
            setFilteredItems(newFilteredItemsArray);

            setIsOpen(false);
            setIsInfoModalOpen(false);
            setIsLoading(false);
        } catch (error) {
            console.log("Error al cancelar reservación: ", error);
            setIsLoading(false);
        }
    };

    return (
        <Modal
            size='2xl'
            isOpen={isOpen}
            onClose={handleOnClose}
            hideCloseButton={true}
            isDismissable={false}
            backdrop="blur"
        >
            <ModalContent className="p-3">
                {() => (
                    <>
                        <div className="flex justify-center pt-4">
                            <DangerousOutlinedIcon sx={{ fontSize: 90, color: "#AC3E1B" }} />
                        </div>
                        <ModalHeader className="MCR-modal-header">
                            <p className="MCR-modal-header-text">
                                Estás a punto de cancelar la reservación en:
                                <span className="MCR-sala-name"> {salaName}</span>
                            </p>
                        </ModalHeader>
                        <ModalBody className="MCR-modal-body">
                            <p className="MCR-fecha">
                                {fechaString}
                            </p>
                            <p className="MCR-hora">
                                {horaInicioString} a {horaFinString}
                            </p>
                        </ModalBody>
                        <ModalFooter className="justify-center mt-0">
                            <Button
                                className="flex flex-wrap justify-center items-center min-w-48 w-35% h-12 mr-16 bg-white cursor-pointer border-4 border-[#1bac55] rounded-full font-karla font-bold text-lg text-[#1bac55] uppercase hover:bg-[#1bac55] hover:border-[#1bac55]  hover:text-white"
                                onClick={handleOnClose}
                                disabled={isLoading}
                            >
                                NO, VOLVER
                            </Button>
                            <Button
                                className="flex flex-wrap justify-center items-center min-w-48 w-35% h-12 bg-white cursor-pointer border-4 border-[#ac3e1b] rounded-full font-karla font-bold text-lg text-[#ac3e1b] uppercase hover:bg-[#ac3e1b] hover:border-[#ac3e1b] hover:text-white"
                                onClick={handleCancelReserv}
                                disabled={isLoading}
                            >
                                SÍ, CANCELAR
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

ModalCancelarReserv.propTypes = {
    isOpen: propTypes.bool,
    setIsOpen: propTypes.func,
    setIsInfoModalOpen: propTypes.func,
    reservId: propTypes.number,
    salaName: propTypes.string,
    fechaString: propTypes.string,
    horaInicioString: propTypes.string,
    horaFinString: propTypes.string,
    items: propTypes.array,
    setItems: propTypes.func,
    filteredItems: propTypes.array,
    setFilteredItems: propTypes.func
}

export default ModalCancelarReserv