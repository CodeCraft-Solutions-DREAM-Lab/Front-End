import React from "react";
import PropTypes from "prop-types";
import UserAvatar from "./components/UserAvatar/UserAvatar";
import Logout from "./components/Logout/Logout";
import SearchBar from "./components/SearchBar/SearchBar";
import BotonCrearExperiencia from "./components/BotonCrearExperiencia/BotonCrearExperiencia";
import LoginButton from "./components/LoginButton/LoginButton";

import "./NavBar.css";

import logoDreamLab from "src/assets/Logos/LogoDreamLab.webp";

import { Link } from "react-router-dom";

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: true,
            prevScrollPos: 0,
            currentScrollPos: 0,
            scrollDiffThreshold: 0, //90
        };
        this.hideBar = this.hideBar.bind(this);
        this.debouncedHideBar = this.debounce(this.hideBar, 10); // Debounce the hideBar method
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    hideBar() {
        const newScrollPos = window.scrollY;
        const scrollDiff = Math.abs(this.state.prevScrollPos - newScrollPos);
        let isVisible = this.state.isVisible;

        // Only update isVisible if scrollDiff is greater than scrollDiffThreshold
        if (scrollDiff > this.state.scrollDiffThreshold || newScrollPos === 0) {
            isVisible =
                this.state.prevScrollPos > newScrollPos || newScrollPos === 0;
        }

        this.setState({
            currentScrollPos: newScrollPos,
            prevScrollPos: newScrollPos,
            isVisible: isVisible,
        });
    }
    componentDidMount() {
        window.addEventListener("scroll", this.debouncedHideBar);
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.debouncedHideBar);
    }
    render() {
        const { view, autoHide, onSearchInputChange } = this.props;
        let viewLandingPage = false;

        // Definimos las vistas
        let searchBar, userAction;
        switch (view) {
            case "homeAlumno":
                searchBar = <SearchBar onSearchInputChange={onSearchInputChange} />; // barra de busqueda
                userAction = <UserAvatar />; // Icono de perfil
                break;
            case "homeProfesor":
                searchBar = <SearchBar onSearchInputChange={onSearchInputChange} />; // barra de busqueda
                userAction = (
                    <>
                        {" "}
                        <BotonCrearExperiencia /> <UserAvatar />{" "}
                    </>
                ); // Icono de perfil y boton de creacion de experiencia
                break;
                case "profesor":
                    searchBar = null; // barra de busqueda
                    userAction = (
                        <>
                            {" "}
                            <BotonCrearExperiencia /> <UserAvatar />{" "}
                        </>
                    ); // Icono de perfil y boton de creacion de experiencia
                    break;
            case "perfil":
                userAction = <Logout />; // Cerrar sesión
                break;
            case "soloPerfil":
                userAction = <UserAvatar />; // Icono de perfil
                break;
            case "landingPage":
                viewLandingPage = true;
                userAction = <LoginButton />; // Redireccionar al login
                break;
            default:
                searchBar = null;
                userAction = null; // Para vistas desconocidas
        }

        let classHide = "visible";
        if (autoHide && !this.state.isVisible) {
            classHide = "hidden";
        }

        return (
            <div className={`navbar-positioning ${classHide}`}>
                <div
                    data-cy="navbar"
                    className="navbar glass-card"
                    height="1rem"
                >
                    <div className="flex items-center justify-between w-full">
                        {!viewLandingPage && (
                            <Link
                                className="logo-container"
                                to={"/home"}
                                style={{ cursor: "pointer" }}
                            >
                                <img
                                    src={logoDreamLab}
                                    alt="Logo"
                                    className="logo"
                                />
                                <h1 className="dreamlab">DREAM LAB</h1>
                            </Link>
                        )}
                        {searchBar}{" "}
                        {/* Se ve la searchBar dependiendo de la vista */}
                        <div
                            className="user-avatar-container"
                            style={{ cursor: "pointer" }}
                            data-cy="userIconNavBar"
                        >
                            {userAction}
                            {/* Se ven las acciones dependiendo de la vista (profile o logout o profile + create experience) */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Navbar.propTypes = {
    view: PropTypes.string.isRequired,
    autoHide: PropTypes.bool,
    onSearchInputChange: PropTypes.func,
};

Navbar.defaultProps = {
    autoHide: false,
};

export default Navbar;
