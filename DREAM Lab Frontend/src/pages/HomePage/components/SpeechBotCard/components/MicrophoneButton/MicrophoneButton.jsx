import { useState } from "react";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import "regenerator-runtime/runtime";
import "./MicrophoneButton.css";

function MicrophoneButton({ onClick, isActive }) {
    return (
        <Button
            className={`bg-transparent text-white h-full mt-1 ${
                isActive ? "active" : ""
            }`}
            isIconOnly={true}
            disableRipple={true}
            onClick={onClick}
        >
            <FontAwesomeIcon
                icon={faMicrophone}
                className="microphone-button"
            />
        </Button>
    );
}

export default MicrophoneButton;
