import { useState, useEffect } from "react";
import {
    Button,
    Skeleton
} from "@nextui-org/react";
import propTypes from "prop-types";
import "./ModalButtons.css";

function CancelarReservaModalButton(props) {

    if (props.isLoading) {
        return (
            <Skeleton className="RIM-btn-skeleton" />
        )
    }
    
	return (
        <Button className={props.className + " RIM-btn"}>
            CANCELAR RESERVA
        </Button>
    );
}

CancelarReservaModalButton.propTypes = {
	className: propTypes.string,
    isLoading: propTypes.bool,
};

export default CancelarReservaModalButton;
