// Permite declarar los tipos de dato de las propiedades que recibe el
// componente
import propTypes from "prop-types";

// Hooks de react
import { useEffect, useState } from "react";

// Hooks de redux
import { useSelector, useDispatch } from "react-redux";
import { setAuth, selectAuth } from "src/redux/Slices/userSlice";

// Funciones para manejar la base de datos
import { post } from "src/utils/ApiRequests";

// Funciones para manejar el almacenamiento local
import { existsInLocalStorage, getFromLocalStorage } from "src/utils/Storage";

// Componente para redirigir a otra página
import { Navigate } from "react-router-dom";

// Componentes de UI para mostrar mientras se carga la página
import LoadingScreen from "../LoadingScreen/LoadingScreen";

function ProtectedRoutes({ children }) {
    // Obtener el estado de autenticación del store de redux
    const isAuth = useSelector(selectAuth);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    // Verificar si hay un token en el almacenamiento local
    // Si hay un token, se pone la pantalla de carga para comenzar la
    // autenticacion
    // Si no hay un token, se quita la pantalla de carga, lo que redirige al login
    useEffect(() => {
        if (existsInLocalStorage("token")) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, []);

    // Validar el token
    useEffect(() => {
        // Se valida si se esta cargando para dar oportunidad de desplegar la
        // pantalla de carga. Tenicamente, dado que ya se valido que existe un token
        // en el almacenamiento local, isLoading debería ser falso, pero se deja por
        // si se quiere hacer alguna otra validación
        if (isLoading && existsInLocalStorage("token")) {
            // Llamada a la API para validar el token
            post(
                "auth/token",
                {
                    token: getFromLocalStorage("token"),
                },
                () => setIsLoading(false),
                () => setIsLoading(false)
            ).then((res) => {
                // Una vez que se cumpla la promesa, se actualiza el estado de
                // autenticación con el valor recibido de la api
                dispatch(setAuth(res.isAuth));
            });
        }
    }, [isLoading, dispatch]);

    // Mientras se esta validando el token, se muestra la pantalla de carga
    if (isLoading) {
        return <LoadingScreen isLoading={isLoading} />;
    }
    // Una vez que se termina de validar el token, si resulto ser valido, se
    // cargan los components hijos, de lo contrario, se redirige al login
    else {
        if (isAuth) {
            return children;
        } else {
            return <Navigate to="/login" />;
        }
    }
}

ProtectedRoutes.propTypes = {
    children: propTypes.node.isRequired,
};

export default ProtectedRoutes;
