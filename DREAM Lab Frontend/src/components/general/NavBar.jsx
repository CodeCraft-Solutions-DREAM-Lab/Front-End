//import React from "react";
import PropTypes from "prop-types";
import UserAvatar from "../components/general/UserAvatar";
import "../App.css";

const Navbar = ({ visible }) => {
  return (
    <div className={`navbar-positioning ${visible ? "visible" : "hidden"}`}>
      <div className="navbar glass-card" height="4.5rem">
        <div className="flex items-center justify-between w-full">
          <div className="logo-container">
            <img src="/LogoDreamLab.png" alt="Logo" className="logo" />
            <h1 className="dreamlab">DREAM LAB</h1>
          </div>
          <div>
            {/* Search bar*/}
            <img src="/LogoDreamLab.png" alt="Logo" className="logo" />
          </div>
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

