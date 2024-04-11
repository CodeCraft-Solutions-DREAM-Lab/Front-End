import { Input } from "@nextui-org/react";

import propTypes from "prop-types";

import { useState } from "react";

import { EyeFilledIcon, EyeSlashFilledIcon } from "./VisibilityIcons";

import "./LoginTextField.css";

function LoginTextField({ label, placeholder, marginBot, isLogin = false }) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return isLogin ? (
    <div className="login-tf-container" style={{ marginBottom: marginBot }}>
      <div className="login-tf-label-container">
        <label className="login-tf-label">{label}</label>
      </div>
      <Input
        labelPlacement="outside"
        placeholder={placeholder}
        fullWidth={false}
        radius="full"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        classNames={{
          input: ["text-white"],
          inputWrapper: ["bg-transparent border-2"],
        }}
      />
    </div>
  ) : (
    <div className="login-tf-container" style={{ marginBottom: marginBot }}>
      <div className="login-tf-label-container">
        <label className="login-tf-label">{label}</label>
      </div>
      <Input
        labelPlacement="outside"
        placeholder={placeholder}
        fullWidth={false}
        radius="full"
        type="text"
        classNames={{
          input: ["text-white"],
          inputWrapper: ["bg-transparent border-2"],
        }}
      />
    </div>
  );
}

LoginTextField.propTypes = {
  label: propTypes.string,
  placeholder: propTypes.string,
  width: propTypes.string,
  marginBot: propTypes.number,
  isLogin: propTypes.bool,
};

export default LoginTextField;
