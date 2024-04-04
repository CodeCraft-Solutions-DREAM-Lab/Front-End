import { createContext, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { useContext } from "react";

// Contexto que será utilizado para permitir a los componentes hijos acceder al
// estado de autenticación y las funciones de login y logout.
export const AuthContext = createContext();

import PropTypes from "prop-types";

// Envuelve a otros componentes y les proporciona acceso al estado de
// autenticación y las funciones de login y logout.
export const AuthProvider = ({ children }) => {
  // Utilizamos el hook useLocalStorage para almacenar el estado del usuario
  // en el almacenamiento local del navegador. Esto permite persistir el
  // estado de autenticación entre recargas de la página.
  const [user, setUser] = useLocalStorage("user", null);

  // Permite cambiar programáticamente la ruta de la aplicación.
  const navigate = useNavigate();

  // Actualiza el estado del usuario y redirige al usuario a la página de
  // inicio.
  const login = useCallback(
    async (data) => {
      // Guarda en LocalStorage el usuario que ha iniciado sesión
      setUser(data);
      navigate("/home");
    },
    [setUser, navigate]
  );

  // Borra el estado del usuario y redirige al usuario a la página de inicio
  // de sesión sin permitir regresar a la página anterior.
  const logout = useCallback(() => {
    setUser(null);
    navigate("/login", { replace: true });
  }, [setUser, navigate]);

  // Utilizamos useMemo para optimizar el rendimiento. Esto evita que se creen
  // nuevos objetos en cada renderizado si las dependencias (user, login,
  // logout) no han cambiado.
  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout]
  );

  // Proporciona el estado de autenticación y las funciones de login y logout
  // a todos los componentes hijos a través del AuthContext.
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  return useContext(AuthContext);
};
