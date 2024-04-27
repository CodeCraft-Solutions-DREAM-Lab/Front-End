import { useNavigate } from "react-router-dom";

import LoginTextField from "./components/LoginTextField/LoginTextField";
import LoginButton from "./components/LoginButton/LoginButton";
import LoginRow from "./components/LoginRow/LoginRow";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import "./LoginPage.css";

import { useState, useEffect } from "react";

// Accion que maneja la logica de validar si el usuario y contraseña son válidos
// y regresar la ruta a la que se debe redirigir y un token que se guardará en
// el local storage
import { loginAction } from "src/utils/Auth";

import { post } from "src/utils/ApiRequests";
import { getFromLocalStorage } from "src/utils/Storage";

import "src/GlobalComponents/GlassCard/GlassCard.css";
import GlassCard from "src/GlobalComponents/GlassCard/GlassCard";

import { useDispatch } from "react-redux";
import { setAuth } from "src/redux/Slices/userSlice";

import topBlob from "src/assets/Login/top-blob.png";
import bottomBlob from "src/assets/Login/bottom-blob.png";
import dreamLabLogo from "src/assets/Logos/LogoDreamLab.png";

export default function LoginPage() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (getFromLocalStorage("token")) {
            post("auth/token", {
                token: getFromLocalStorage("token") || "",
            }).then((data) => {
                if (data) {
                    dispatch(setAuth(true));
                    navigate("/home");
                }
            });
        }
    }, [dispatch, navigate]);

    // Funcion que se llama cuando se cierra el snackbar para resetear el estado
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const handleLogin = async () => {
        // Si no se ha introducido un usuario, mostrar un snackbar
        if (user === "") {
            setOpen(true);
            setMessage("Introduce un usuario");
            return;
        }
        // Si no se ha introducido una contraseña, mostrar un snackbar
        if (password === "") {
            setOpen(true);
            setMessage("Introduce una contraseña");
            return;
        }

        setLoading(true);
        try {
            // Llamar a la acción de login y obtener el path al que se debe redirigir
            const path = await loginAction(
                { user, password },
                () => {},
                () => {
                    setOpen(true);
                    setMessage("Usuario o contraseña incorrectos");
                }
            );
            setLoading(false);
            navigate(path);
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="blobs-container">
                <img
                    src={topBlob}
                    alt="Top Blob"
                    className="blob-image top-left-image"
                />
                <img
                    src={bottomBlob}
                    alt="Bottom Blob"
                    className="blob-image bottom-right-image"
                />
            </div>
            <div className="glassCardContainer">
                <GlassCard classes={"glassCard"}>
                    <form onSubmit={handleLogin}>
                        <div className="grid-container">
                            <LoginRow flexDirection="col" justify="between">
                                <LoginRow margin="12vh 0 0 0">
                                    <img
                                        src={dreamLabLogo}
                                        alt="Logo"
                                        className="login-logo"
                                    />
                                    <h1 className="login-dreamlab-title">
                                        DREAM LAB
                                    </h1>
                                </LoginRow>
                                <LoginRow margin="4vh 0 0 0">
                                    <h1 className="login-titulo">
                                        Inicia sesión
                                    </h1>
                                </LoginRow>
                            </LoginRow>
                            <LoginRow flexDirection="col">
                                <LoginTextField
                                    label={"Matrícula"}
                                    marginBot={"5vh"}
                                    value={user}
                                    onValueChange={setUser}
                                    cypressSelectorInput="login-user"
                                />
                                <LoginTextField
                                    label={"Contraseña"}
                                    isLogin={true}
                                    value={password}
                                    onValueChange={setPassword}
                                    cypressSelectorInput="login-password"
                                    cypressSelectorVisibility="login-password-visibility"
                                />
                            </LoginRow>
                            <LoginRow margin="0 0 12vh 0">
                                <LoginButton
                                    text="ACEPTAR"
                                    onClick={handleLogin}
                                    isLoading={isLoading}
                                    type="submit"
                                    cypressSelector="login-button"
                                />
                            </LoginRow>
                        </div>
                    </form>
                </GlassCard>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    data-cy="login-error"
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}
