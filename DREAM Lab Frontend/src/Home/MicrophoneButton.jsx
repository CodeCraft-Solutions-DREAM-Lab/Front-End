import { useState } from "react";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import 'regenerator-runtime/runtime';

function MicrophoneButton({ onClick, isActive}) {

    return (
        <div className={`relative items-center justify-center w-0 h-full ${isActive ? 'active' : ''}`}>
            <Button
                className="bg-transparent text-white h-full"
                isIconOnly={true}
                disableRipple={true}
                onClick={onClick}
            >
                <FontAwesomeIcon icon={faMicrophone} size="3x" />
            </Button>
        </div>
    );
}

export default MicrophoneButton;
