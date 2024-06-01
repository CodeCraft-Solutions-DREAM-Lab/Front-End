import { useState, useEffect } from "react";
import {
    Button
} from "@nextui-org/react";
import propTypes from "prop-types";

function PenalizarModalButton(props) {

	return (
        <Button>
            PenalizarModalButton
        </Button>
    );
}

PenalizarModalButton.propTypes = {
	size: propTypes.string,
};

export default PenalizarModalButton;
