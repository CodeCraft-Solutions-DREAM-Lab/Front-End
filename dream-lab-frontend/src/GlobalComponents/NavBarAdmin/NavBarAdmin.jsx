import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import "./NavBarAdmin.css";
import logoDreamLab from "src/assets/Logos/LogoDreamLab.webp";
import studentViewIcon from "src/assets/NavBar/vista-estudiante-icon.svg";
import profileIcon from "src/assets/NavBar/Administrador-perfil-icon.svg";
import GlassCard from "../GlassCard/GlassCard";
import { useLocation } from "react-router-dom";

// Nextui
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    Button,
} from "@nextui-org/react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setActive } from "src/redux/Slices/vistaEstudianteSlice";
import { selectNombre, logoutUser } from "src/redux/Slices/userSlice";

// Storage
import {
    saveToSessionStorage,
    multiClearSessionStorage,
    clearStorages,
} from "src/utils/Storage";

function NavBarAdmin() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.pathname);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const clearAdminStates = () => {
        dispatch(setActive(false));
        multiClearSessionStorage([
            "horaInicio",
            "horaInicioIsoString",
            "duration",
            "fecha",
            "fechaIsoString",
            "personas",
            "experiencia",
            "sala",
            "idExperiencia",
            "idSala",
            "reservType",
            "materials",
            "competidores",
            "cupos",
            "formattedDate",
            "formattedTime",
            "horaCorte",
            "nameSalaExperiencia",
            "vistaEstudiante",
            "nombreReservacionAdmin",
        ]);
    };

    const handleTabClick = (tab) => {
        clearAdminStates();
        setActiveTab(tab);
    };

    const handleStudentViewClick = () => {
        clearAdminStates();
        dispatch(setActive(true));
        saveToSessionStorage("vistaEstudiante", true);
        navigate("/home");
    };

    const handleLogout = () => {
        clearStorages();
        // Llamámos a la función de logoutUser de la userSlice para borrar
        // los datos del usuario
        dispatch(logoutUser());
        navigate("/login", { replace: true }); // Navega al login
    };

    return (
        <GlassCard
            borderRadius="10px 10px 10px 10px"
            data-cy="navbar-admin"
            classes="navbar-admin"
        >
            <div className="centered-container">
                <Link
                    to={"/admin"}
                    className="logo-container-admin"
                    onClick={clearAdminStates}
                >
                    <div className="logo-admin">
                        <img src={logoDreamLab} alt="Logo" />
                    </div>
                    <h1 className="dreamlab-admin">DREAM LAB</h1>
                </Link>

                <div className="navigation-buttons">
                    <Link
                        to={"/admin"}
                        className={`nav-button ${
                            activeTab === "/admin" ? "active" : ""
                        }`}
                        onClick={() => handleTabClick("/admin")}
                    >
                        Reservaciones
                    </Link>
                    <Link
                        to={"/dashboard"}
                        className={`nav-button ${
                            activeTab === "/dashboard" ? "active" : ""
                        }`}
                        onClick={() => handleTabClick("/dashboard")}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to={"/crearAnuncio"}
                        className={`nav-button ${
                            activeTab === "/crearAnuncio" ? "active" : ""
                        }`}
                        onClick={() => handleTabClick("/crearAnuncio")}
                    >
                        Videowall
                    </Link>
                </div>
                <div className="user-icons-admin">
                    <div className="tooltip">
                        <img
                            src={studentViewIcon}
                            alt="User Avatar"
                            className="user-avatar-icon-admin"
                            onClick={handleStudentViewClick}
                            data-cy="student-view-button"
                        />
                        <span className="tooltiptext">Vista de estudiante</span>
                    </div>
                    <Popover showArrow placement="bottom-end">
                        <PopoverTrigger>
                            <img
                                src={profileIcon}
                                alt="Settings"
                                className="settings-icon"
                            />
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="px-1 py-2">
                                <div className="mb-2 text-center">
                                    <span className="text-lg font-bold">
                                        {useSelector(selectNombre)}
                                    </span>
                                </div>
                                <div>
                                    <Button
                                        variant="flat"
                                        color="danger"
                                        fullWidth
                                        onPress={handleLogout}
                                    >
                                        Cerrar sesión
                                    </Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </GlassCard>
    );
}

NavBarAdmin.propTypes = {
    view: PropTypes.string,
};

export default NavBarAdmin;
