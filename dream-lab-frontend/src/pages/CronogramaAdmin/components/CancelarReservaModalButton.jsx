import { useState, useEffect } from "react";
import {
    Button
} from "@nextui-org/react";
import propTypes from "prop-types";
import "./ModalButtons.css";

function CancelarReservaModalButton(props) {

	return (
        <Button className={props.className + " RIM-btn"}>
            CANCELAR RESERVA
        </Button>
    );
}

CancelarReservaModalButton.propTypes = {
	className: propTypes.string,
};

export default CancelarReservaModalButton;
