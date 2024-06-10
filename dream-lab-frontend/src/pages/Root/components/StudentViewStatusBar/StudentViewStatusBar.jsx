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

// React router dom hooks
import { useNavigate } from "react-router-dom";

// Storage
import { removeFromSessionStorage } from "src/utils/Storage";

// Redux
import { useDispatch } from "react-redux";
import { setActive } from "src/redux/Slices/vistaEstudianteSlice";

function StudentViewStatusBar() {
    const [isExpanded, setIsExpanded] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleExit = () => {
        dispatch(setActive(false));
        removeFromSessionStorage("vistaEstudiante");
        navigate("/admin");
    };

    return (
        <div className={`svsb-main-container ${isExpanded ? "expanded" : ""}`} >
            <div className="svsb-content-container">
                <div className="svsb-col svsb-col-title">
                    {isExpanded ? (
                        <span className="svsb-title" data-cy="vista-estudiante-title">Vista de estudiante</span>
                    ) : null}
                </div>
                <div className="svsb-col svsb-col-toggle-button">
                    <Button
                        className="svsb-toggle-button"
                        onPress={toggleExpand}
                        isIconOnly
                        disableRipple
                        data-cy="vista-estudiante-toggle-button"
                    >
                        <FontAwesomeIcon
                            icon={isExpanded ? faChevronDown : faChevronUp}
                        />
                    </Button>
                </div>
                <div className="svsb-col svsb-col-exit-button">
                    {isExpanded ? (
                        <Button
                            className="svsb-exit-button"
                            onPress={handleExit}
                            data-cy="vista-estudiante-exit-button"
                        >
                            Salir de la vista de estudiante
                        </Button>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default StudentViewStatusBar;
