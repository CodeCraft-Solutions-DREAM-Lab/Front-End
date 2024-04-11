import { Button } from "@nextui-org/react";
import propTypes from "prop-types";

import "./LoginButton.css";

function LoginButton({ text, onClick }) {
  return (
    <div className="login-button-container">
      <Button
        className="login-button"
        color="white"
        onClick={onClick}
        radius="full"
      >
        <label className="login-button-label">{text}</label>
      </Button>
    </div>
  );
}

LoginButton.propTypes = {
  text: propTypes.string,
  onClick: propTypes.func,
};

export default LoginButton;
