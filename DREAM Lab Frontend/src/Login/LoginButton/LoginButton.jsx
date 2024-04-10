import { Button } from "@nextui-org/react";
import propTypes from "prop-types";

import "./LoginButton.css";

function LoginButton({ text }) {
  return (
    <div className="login-button-container">
      <Button className="login-button">
        <label className="login-button-label">{text}</label>
      </Button>
    </div>
  );
}

LoginButton.propTypes = {
  text: propTypes.string,
};

export default LoginButton;
