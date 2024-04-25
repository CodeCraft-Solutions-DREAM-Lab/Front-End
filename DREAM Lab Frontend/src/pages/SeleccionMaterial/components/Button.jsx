import { Button } from "@nextui-org/react";
import propTypes from "prop-types";

import "../components/Button.css";

function RoundedButton({ text, onClick }) {
    return (
        <Button
            className="mt-2 rounded-full justify-self-center round-button"
            color="white"
            onClick={onClick}
            radius="full"
        >
            <label className="buttonlabel">{text}</label>
        </Button>
    );
}

RoundedButton.propTypes = {
    text: propTypes.string,
    onClick: propTypes.func,
};

export default RoundedButton;