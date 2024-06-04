import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import "./NavBarAdmin.css";
import logoDreamLab from "src/assets/Logos/LogoDreamLab.webp";
import studentViewIcon from "src/assets/NavBar/vista-estudiante-icon.svg";
import profileIcon from "src/assets/NavBar/Administrador-perfil-icon.svg";
import GlassCard from "../GlassCard/GlassCard";
import { useLocation } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { setActive } from "src/redux/Slices/vistaEstudianteSlice";

// Storage
import { saveToSessionStorage } from "src/utils/Storage";

function NavBarAdmin() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.pathname);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleStudentViewClick = () => {
        dispatch(setActive(true));
        saveToSessionStorage("vistaEstudiante", true);
        navigate("/home");
    };

    return (
        <GlassCard
            borderRadius="10px 10px 10px 10px"
            data-cy="navbar-admin"
            classes="navbar-admin"
        >
            <div className="centered-container">
                <Link to={"/admin"} className="logo-container-admin">
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
                        />
                        <span className="tooltiptext">Vista de estudiante</span>
                    </div>
                    <img
                        src={profileIcon}
                        alt="Settings"
                        className="settings-icon"
                    />
                </div>
            </div>
        </GlassCard>
    );
}

NavBarAdmin.propTypes = {
    view: PropTypes.string,
};

export default NavBarAdmin;
