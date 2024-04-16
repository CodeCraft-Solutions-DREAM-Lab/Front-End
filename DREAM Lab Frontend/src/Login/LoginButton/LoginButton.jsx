import { Button } from "@nextui-org/react";
import propTypes from "prop-types";

import "./LoginButton.css";

function LoginButton({ text, onClick, isLoading }) {
  return (
    <Button
      className="login-button"
      color="white"
      onClick={onClick}
      radius="full"
      isLoading={isLoading}
    >
      <label className="login-button-label">{text}</label>
    </Button>
  );
}

LoginButton.propTypes = {
  text: propTypes.string,
  onClick: propTypes.func,
  isLoading: propTypes.bool,
};

export default LoginButton;
