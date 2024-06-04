import { useState, useEffect } from "react";
import {
    Button,
    Skeleton
} from "@nextui-org/react";
import propTypes from "prop-types";
import WargningIcon from "../../../../assets/Icons/WarningIcon";
import "./ModalButtons.css";

function PenalizarModalButton(props) {

    const [isHovered, setIsHovered] = useState(false);  
    const [iconColor, setIconColor] = useState("#ac3e1b"); 

    useEffect(() => {
        if (isHovered) {
            setIconColor("#fff");
        } else {
            setIconColor("#ac3e1b");
        }
    }, [isHovered])

    if (props.isLoading) {
        return (
            <Skeleton className="RIM-btn-skeleton" />
        )
    }

	return (
        <>
            <Button 
                className={props.className  + " RIM-btn"}    
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                PENALIZAR
                
                <WargningIcon className="PMB-warning-icon" color={iconColor} />
            </Button>
        </>
        
    );
}

PenalizarModalButton.propTypes = {
	className: propTypes.string,
    isLoading: propTypes.bool,
};

export default PenalizarModalButton;
