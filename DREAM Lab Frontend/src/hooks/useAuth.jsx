import { createContext, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

export const AuthContext = createContext();

import PropTypes from "prop-types";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();

    // Envolver las funciones de login y Logout en un useCallback para evitar que se cree una nueva función en cada renderizado
    // Llamar cuando se inicia sesión
    const login = useCallback(
        async (data) => {
            setUser(data);
            navigate("/home");
        },
        [setUser, navigate]
    );

    // Llamar cuando se cierra sesión
    const logout = useCallback(() => {
        setUser(null);
        // Utilizar replace para evitar que el usuario pueda volver a la página anterior
        navigate("/login", { replace: true });
    }, [setUser, navigate]);

    const value = useMemo(
        () => ({
            user,
            login,
            logout,
        }),
        [user, login, logout]
    );
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
