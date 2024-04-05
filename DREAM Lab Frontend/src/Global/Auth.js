import { redirect } from "react-router-dom";

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
    throw redirect("/login");
  }

  return null;
}

export async function loginAction({ request }) {
  const loginUser = ({ email, password }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "a@a" && password === "test") {
          resolve({ email });
        } else {
          reject(new Error("Invalid email or password"));
        }
      }, 1000);
    });
  };

  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const data = await loginUser({ email, password });
    localStorage.setItem("loggedin", true);
    return redirect("/home");
  } catch (err) {
    return err.message;
  }
}
