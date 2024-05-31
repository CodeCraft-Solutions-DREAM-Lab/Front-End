import { Input } from "@nextui-org/react";

import propTypes from "prop-types";

import { useState, useEffect } from "react";

import { EyeFilledIcon, EyeSlashFilledIcon } from "./VisibilityIcons";

import CapsLockIcon from "src/assets/Login/caps-lock.webp";

import "./LoginTextField.css";

function LoginTextField({
    label,
    placeholder,
    marginBot,
    isLogin = false,
    onValueChange,
    value,
    cypressSelectorInput,
    cypressSelectorVisibility,
}) {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const [isCapsLockActive, setIsCapsLockActive] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.getModifierState("CapsLock")) {
                setIsCapsLockActive(true);
            } else {
                setIsCapsLockActive(false);
            }
        };

        const handleKeyUp = (event) => {
            if (!event.getModifierState("CapsLock")) {
                setIsCapsLockActive(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    return isLogin ? (
        <div className="login-tf-container" style={{ marginBottom: marginBot }}>
            <div className="login-tf-label-container">
                <label className="login-tf-label">{label}</label>
            </div>
            <Input
                data-cy={cypressSelectorInput}
                labelPlacement="outside"
                placeholder={placeholder}
                value={value}
                onValueChange={onValueChange}
                fullWidth={false}
                radius="full"
                endContent={
                    <div className="flex items-center">
                        <div className="w-6 h-6 flex items-center justify-center">
                            {isCapsLockActive && (
                                <img
                                    src={CapsLockIcon}
                                    alt="Caps Lock"
                                    className="w-full h-full"
                                />
                            )}
                        </div>
                        <button
                            className="focus:outline-none ml-2"
                            type="button"
                            onClick={toggleVisibility}
                            data-cy={cypressSelectorVisibility}
                        >
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    </div>
                }
                type={isVisible ? "text" : "password"}
                classNames={{
                    input: ["bg-transparent text-white text-xl"],
                    inputWrapper: ["bg-transparent border-2 h-12"],
                }}
            />
        </div>
    ) : (
        <div className="login-tf-container" style={{ marginBottom: marginBot }}>
            <div className="login-tf-label-container">
                <label className="login-tf-label">{label}</label>
            </div>
            <Input
                data-cy={cypressSelectorInput}
                labelPlacement="outside"
                placeholder={placeholder}
                value={value}
                onValueChange={onValueChange}
                fullWidth={false}
                radius="full"
                type="text"
                className="login-tf"
                classNames={{
                    input: ["text-white text-xl"],
                    inputWrapper: ["bg-transparent border-2 h-12"],
                }}
            />
        </div>
    );
}

LoginTextField.propTypes = {
    label: propTypes.string,
    placeholder: propTypes.string,
    width: propTypes.string,
    marginBot: propTypes.string,
    isLogin: propTypes.bool,
    onValueChange: propTypes.func,
    value: propTypes.string,
    cypressSelectorInput: propTypes.string,
    cypressSelectorVisibility: propTypes.string,
};

export default LoginTextField;
