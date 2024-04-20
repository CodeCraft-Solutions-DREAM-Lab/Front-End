import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@nextui-org/react";
import DeleteReservModal from "./DeleteReservModal";
import { useState } from "react";

import { API_URL } from "../Global/Database.js";

function BotonCancelarReservacion(props) {
    const { id, reservaciones, setReservaciones } = props;

    const [size, setSize] = useState("sm");
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(true);
    };

    const handleCancelReserv = () => {
        console.log("cancelar reservacion");

        fetch(`${API_URL}reservaciones/` + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Connection: "keep-alive",
                Accept: "*/*",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
                setIsOpen(false);
            });

        const newReservArray = reservaciones.filter(
            (reserv) => reserv.idReservacion !== id
        );
        setReservaciones(newReservArray);

        setIsOpen(false);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Button isIconOnly color="error" auto onClick={toggleModal}>
                <FontAwesomeIcon icon={faTrashAlt} />
            </Button>

            <DeleteReservModal
                size={size}
                isOpen={isOpen}
                onClose={handleCloseModal}
                onAction={handleCancelReserv}
            />
        </>
    );
}

export default BotonCancelarReservacion;
