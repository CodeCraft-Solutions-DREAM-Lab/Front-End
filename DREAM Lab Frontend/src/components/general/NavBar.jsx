{
  /*}
//import React from "react";
import PropTypes from "prop-types";
import UserAvatar from "./UserAvatar";
import "../../App.css";
import SearchBar from "../general/SearchBar";

const Navbar = ({ visible }) => {
  return (
    <div className={`navbar-positioning ${visible ? "visible" : "hidden"}`}>
      <div className="navbar glass-card" height="1rem">
        <div className="flex items-center justify-between w-full">
          <div className="logo-container">
            <img src="/LogoDreamLab.png" alt="Logo" className="logo" />
            <h1 className="dreamlab">DREAM LAB</h1>
          </div>
            <SearchBar/>

          <div className="user-avatar-container">
            <UserAvatar />
          </div>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default Navbar;*/
}

import React from "react";
import PropTypes from "prop-types";
import UserAvatar from "./UserAvatar";
import Logout from "./Logout";
import "../../App.css";
import SearchBar from "../general/SearchBar";
import BotonCrearExperiencia from '../general/BotonCrearExperiencia';

const Navbar = ({ visible, view }) => {
  // Definimos las vistas
  let searchBar, userAction;
  switch (view) {
    case "homeAlumno":
      searchBar = <SearchBar />; // barra de busqueda
      userAction = <UserAvatar />; // Icono de perfil
      break;
    case "homeProfesor":
      searchBar = <SearchBar />; // barra de busqueda
      userAction = <> <BotonCrearExperiencia /> <UserAvatar /> </> // Icono de perfil y boton de creacion de experiencia
      break;
    case "perfil":
      userAction = <Logout />; // Cerrar sesión
      break;
    case "soloPerfil":
      userAction = <UserAvatar />; // Icono de perfil
      break;
    default:
      searchBar = null;
      userAction = null; // Para vistas desconocidas
  }

  return (
    <div className={`navbar-positioning ${visible ? "visible" : "hidden"}`}>
      <div className="navbar glass-card" height="1rem">
        <div className="flex items-center justify-between w-full">
          <div className="logo-container">
            <img src="/LogoDreamLab.png" alt="Logo" className="logo" />
            <h1 className="dreamlab">DREAM LAB</h1>
          </div>
          {searchBar} {/* Se ve la searchBar dependiendo de la vista */}
          <div className="user-avatar-container">
            {userAction}
            {/* Se ven las acciones dependiendo de la vista (profile o logout o profile + create experience) */}
          </div>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  visible: PropTypes.bool.isRequired,
  view: PropTypes.string.isRequired,
};

export default Navbar;
