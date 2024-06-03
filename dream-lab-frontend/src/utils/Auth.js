import { post } from "./ApiRequests";

import { saveToLocalStorage } from "./Storage";

// Función para validar las credenciales del usuario y redirigir a la página
export async function loginAction(
    { user, password },
    success = () => {},
    error = () => {}
) {
    // Llamar a la API para validar las credenciales
    return post("auth/usuario", {
        usuario: user,
        contrasena: password,
    })
        .then((response) => {
            // De la API se recibe un jwt (JSON Web Token)
            const jwt = response.jwt;
            if (jwt) {
                // Guardar el token y el usuario en el local storage
                saveToLocalStorage("token", jwt);
                saveToLocalStorage("user", user.toLowerCase());

                // Llamar a la función de éxito
                success();

                // Redirigir a una página dependiendo del rol del usuario
                if (response.rol.toLowerCase() === "admin") {
                    return "/admin";
                } else if (response.rol.toLowerCase() === "regular") {
                    return "/home";
                } else {
                    // Llamar a la función de error
                    error();
                    // Si las credenciales no son válidas, regresar a la página de login
                    return "/login";
                }
            } else {
                // Llamar a la función de error
                error();
                // Si las credenciales no son válidas, regresar a la página de login
                return "/login";
            }
        })
        .catch(() => {
            // Llamar a la función de error
            error();
            // Si las credenciales no son válidas, regresar a la página de login
            return "/login";
        });
}
