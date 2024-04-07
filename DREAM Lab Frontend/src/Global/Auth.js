import { redirect } from "react-router-dom";
import { postData } from "./Database";

export async function requireAuth() {
  // TODO: Cambiar que en vez de un valor booleano, haya una tabla que relacione
  // a los usuarios y contraseña encriptada, con un token. De esta manera,
  // cuando se haga login, se valida que el usuario y contraseña existan y sean
  // válidos, y se regresa el token para el local storage. Posteriormente,
  // cuando se quiera entrar a una página protegida, se valida que ese token
  // exista.
  // El problema de que sea booleano, es que en los developer tools puedes tú
  // poner ese valor como true. En cambio, es imposible que sepas la cadena de
  // caracteres de un usuario para poder entrar.
  const isLoggedIn = localStorage.getItem("loggedin");

  if (!isLoggedIn) {
    redirect("/login");
  }

  return null;
}

export async function loginAction({ formData }) {
  const user = formData.get("user");
  const password = formData.get("password");
  return postData("http://localhost:3000/authUsuario", {
    usuario: user,
    contrasena: password,
  })
    .then((response) => {
      const jwt = response.jwt;
      localStorage.setItem("token", jwt);
      localStorage.setItem("user", user);
      return "/home";
    })
    .catch(() => {
      return "/login";
    });
}
