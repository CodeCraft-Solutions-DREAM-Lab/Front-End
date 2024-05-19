import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./NavBarAdmin.css";
import logoDreamLab from "src/assets/Logos/LogoDreamLab.png";
import userAvatarIcon from "src/assets/icons/user-avatar-icon.png";
import settingsIcon from "src/assets/icons/settings-icon.png";

function NavBarAdmin() {
    const [activeTab, setActiveTab] = useState("dashboard");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div data-cy="navbar-admin" className="navbar-admin glass-card">
            <div className="centered-container">
                <div className="navigation-buttons">
                    <Link
                        to={"/admin"}
                        className={`nav-button ${activeTab === "dashboard" ? "active" : ""}`}
                        onClick={() => handleTabClick("dashboard")}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to={"/admin"}
                        className={`nav-button ${activeTab === "projects" ? "active" : ""}`}
                        onClick={() => handleTabClick("projects")}
                    >
                        Projects
                    </Link>
                    <Link
                        to={"/admin"}
                        className={`nav-button ${activeTab === "users" ? "active" : ""}`}
                        onClick={() => handleTabClick("users")}
                    >
                        Users
                    </Link>
                </div>
                <Link to={"/admin"} className="logo-container-admin">
                    <img src={logoDreamLab} alt="Logo" className="logo-admin" />
                    <h1 className="dreamlab-admin">DREAM LAB</h1>
                </Link>
                <div className="user-icons">
                    <img src={userAvatarIcon} alt="User Avatar" className="user-avatar-icon" />
                    <img src={settingsIcon} alt="Settings" className="settings-icon" />
                </div>
            </div>
        </div>
    );
}

NavBarAdmin.propTypes = {
    view: PropTypes.string,
};

export default NavBarAdmin;
