import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import PropTypes from "prop-types";

export const ProtectedRoute = ({ children }) => {
    // Obtenemos el estado de autenticación del contexto
    // user será null si el usuario no ha iniciado sesión
    const { user } = useAuth();
    // Si el usuario NO ha iniciado sesión, lo redirigimos a la página de inicio de sesión
    if (!user) {
        return <Navigate to="/login" />;
    }
    // De lo contrario, renderizamos los componentes hijos que están protegidos
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
