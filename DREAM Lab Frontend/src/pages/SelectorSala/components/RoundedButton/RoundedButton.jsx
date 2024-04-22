import { Button } from "@nextui-org/react";
import propTypes from "prop-types";

import "./RoundedButton.css";

function RoundedButton({ text, onClick, disabled }) {
    return (
        <Button
            className="mt-2 rounded-full justify-self-center rounded-button"
            color="white"
            onClick={onClick}
            radius="full"
            disabled={disabled}
        >
            <label className="button-label">{text}</label>
        </Button>
    );
}

RoundedButton.propTypes = {
    text: propTypes.string,
    onClick: propTypes.func,
    disabled: propTypes.bool,
};

export default RoundedButton;
