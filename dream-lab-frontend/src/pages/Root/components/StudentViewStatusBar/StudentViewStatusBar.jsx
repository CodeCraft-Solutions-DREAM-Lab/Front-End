// Estilos
import "./StudentViewStatusBar.css";

// Hooks
import { useState } from "react";

// Nextui
import { Button } from "@nextui-org/react";

// Fontawesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Up Arrow Icon
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
// Down Arrow Icon
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function StudentViewStatusBar() {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`svsb-main-container ${isExpanded ? "expanded" : ""}`}>
            <div className="svsb-content-container">
                <div className="svsb-col svsb-col-title">
                    {isExpanded ? (
                        <span className="svsb-title">Vista de estudiante</span>
                    ) : null}
                </div>
                <div className="svsb-col svsb-col-toggle-button">
                    <Button
                        className="svsb-toggle-button"
                        onPress={toggleExpand}
                        isIconOnly
                        disableRipple
                    >
                        <FontAwesomeIcon
                            icon={isExpanded ? faChevronDown : faChevronUp}
                        />
                    </Button>
                </div>
                <div className="svsb-col svsb-col-exit-button">
                    {isExpanded ? (
                        <Button className="svsb-exit-button">
                            Salir de la vista de estudiante
                        </Button>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default StudentViewStatusBar;
