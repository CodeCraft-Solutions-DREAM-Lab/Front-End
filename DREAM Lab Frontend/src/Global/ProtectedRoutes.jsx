import propTypes from "prop-types";

import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setAuth, selectAuth } from "../redux/Slices/userSlice";

import { postData } from "./Database";

import { Navigate } from "react-router-dom";

import { Spinner } from "@nextui-org/react";

import { getFromLocalStorage } from "./Storage";

function ProtectedRoutes({ children }) {
  // Obtener el estado de autenticación del store de redux
  const isAuth = useSelector(selectAuth);
  // Obtener la función para actualizar el estado de autenticación
  const dispatch = useDispatch();
  // Se usarán dos useStates para poder actualizar el componentes cuando reciban
  // cambios. Esto porque cuando se hace una llamada a la api, se recibe una
  // promesa de que recibirá un valor, pero no se sabe cuándo. Por lo tanto, se
  // estará esperando usando un usesState para actualizar el componente cuando
  // se reciba el valor.
  const [authVal, setAuthVal] = useState(null);

  // Validar el token
  useEffect(() => {
    // Llamada a la API para validar el token
    async function validateToken() {
      const data = await postData("http://localhost:3000/authToken", {
        token: getFromLocalStorage("token") || "",
      });

      // la api regresa un booleano que indica si el token es válido o no
      // Si todavía no se recibe nada de la api, authVal se queda en false
      setAuthVal(data || false);
    }

    // Si no está autenticado o no se ha validado el token, validarlo
    if (!isAuth || authVal === null) {
      validateToken();
    }
  }, [isAuth, authVal]);

  // Actualizar el estado de autenticación una vez que se haya validado el token
  useEffect(() => {
    // Si se recibe un valor de la api, actualizar el estado de autenticación
    // usando la función de dispatch de redux
    if (authVal) {
      dispatch(setAuth(authVal));
    }
  }, [authVal, dispatch]);

  // Mientras se valida el token, authVal es null, una vez que se valida, si
  // fue exitoso, se muestra la página, si no, se redirige a login
  if (authVal === null) {
    return <Spinner label="Cargando..." labelColor="primary" />;
  } else {
    if (authVal || isAuth) {
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