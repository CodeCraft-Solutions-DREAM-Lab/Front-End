import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./NavBarAdmin.css";
import logoDreamLab from "src/assets/Logos/LogoDreamLab.webp";
import studentViewIcon from "src/assets/NavBar/vista-estudiante-icon.svg";
import profileIcon from "src/assets/NavBar/Administrador-perfil-icon.svg";
import GlassCard from "../GlassCard/GlassCard";

function NavBarAdmin() {
	const [activeTab, setActiveTab] = useState("reservaciones");

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	return (
		<GlassCard borderRadius="10px 10px 10px 10px" data-cy="navbar-admin" classes="navbar-admin">
            <div className="centered-container">
			<Link to={"/admin"} className="logo-container-admin">
                <div className="logo-admin" >
                <img src={logoDreamLab} alt="Logo"/>
                </div>
				<h1 className="dreamlab-admin">DREAM LAB</h1>
			</Link>
			
				<div className="navigation-buttons">
					<Link
						to={"/admin"}
						className={`nav-button ${
							activeTab === "reservaciones" ? "active" : ""
						}`}
						onClick={() => handleTabClick("reservaciones")}
					>
						Reservaciones
					</Link>
					<Link
						to={"/dashboard"}
						className={`nav-button ${activeTab === "Dashboard" ? "active" : ""}`}
						onClick={() => handleTabClick("Dashboard")}
					>
						Dashboard
					</Link>
					<Link
						to={"/crearAnuncio"}
						className={`nav-button ${activeTab === "Videowall" ? "active" : ""}`}
						onClick={() => handleTabClick("Videowall")}
					>
						Videowall
					</Link>
				</div>
				<div className="user-icons-admin">
					<img
						src={studentViewIcon}
						alt="User Avatar"
						className="user-avatar-icon-admin"
					/>
					<img src={profileIcon} alt="Settings" className="settings-icon" />
				</div>
			</div>
		</GlassCard>
	);
}

NavBarAdmin.propTypes = {
	view: PropTypes.string,
};

export default NavBarAdmin;
