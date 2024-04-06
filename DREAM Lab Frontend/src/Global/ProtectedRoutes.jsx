import propTypes from "prop-types";

import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setAuth, selectAuth } from "../redux/Slices/userSlice";

import { postData } from "./Database";

import { Navigate } from "react-router-dom";

import { Spinner } from "@nextui-org/react";

function ProtectedRoutes({ children }) {
  const isAuth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const [authVal, setAuthVal] = useState(null);

  // Validar el token
  useEffect(() => {
    // Llamada a la API para validar el token
    async function validateToken() {
      const data = await postData("http://localhost:3000/authToken", {
        token: localStorage.getItem("token") || "",
      });

      // la api regresa un booleano que indica si el token es válido o no
      setAuthVal(data || false);
    }

    // Si no está autenticado o no se ha validado el token, validar
    if (!isAuth || authVal === null) {
      validateToken();
    }
  }, [isAuth, authVal]);

  // Actualizar el estado de autenticación
  useEffect(() => {
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
