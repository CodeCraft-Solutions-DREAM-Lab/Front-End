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
import { loginAction } from "../../Global/Auth";

import { post } from "../../Global/ApiRequests";
import { getFromLocalStorage } from "../../Global/Storage";

import "../../globalComponents/GlassCard/GlassCard.css";
import GlassCard from "../../globalComponents/GlassCard/GlassCard";

import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/Slices/userSlice";

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
                    src="/src/pages/LoginPage/assets/images/top-blob.png"
                    alt="Top Blob"
                    className="blob-image top-left-image"
                />
                <img
                    src="/src/pages/LoginPage/assets/images/bottom-blob.png"
                    alt="Bottom Blob"
                    className="blob-image bottom-right-image"
                />
            </div>
            <div className="glassCardContainer">
                <GlassCard classes={"glassCard"}>
                    <div className="grid-container">
                        <LoginRow flexDirection="col" justify="between">
                            <LoginRow margin="12vh 0 0 0">
                                <img
                                    src="/LogoDreamLabedited.png"
                                    alt="Logo"
                                    className="login-logo"
                                />
                                <h1 className="login-dreamlab-title">
                                    DREAM LAB
                                </h1>
                            </LoginRow>
                            <LoginRow margin="4vh 0 0 0">
                                <h1 className="login-titulo">Inicia sesión</h1>
                            </LoginRow>
                        </LoginRow>
                        <LoginRow flexDirection="col">
                            <LoginTextField
                                label={"Matrícula"}
                                marginBot={"5vh"}
                                value={user}
                                onValueChange={setUser}
                            />
                            <LoginTextField
                                label={"Contraseña"}
                                isLogin={true}
                                value={password}
                                onValueChange={setPassword}
                            />
                        </LoginRow>
                        <LoginRow margin="0 0 12vh 0">
                            <LoginButton
                                text="ACEPTAR"
                                onClick={handleLogin}
                                isLoading={isLoading}
                            />
                        </LoginRow>
                    </div>
                </GlassCard>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
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
