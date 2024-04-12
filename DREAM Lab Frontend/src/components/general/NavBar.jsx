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

export default Navbar;

