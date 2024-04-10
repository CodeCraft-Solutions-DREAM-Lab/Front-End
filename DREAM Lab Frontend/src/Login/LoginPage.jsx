import { useNavigation, Form, useNavigate } from "react-router-dom";

import LoginTextField from "./LoginTextField/LoginTextField";
import LoginButton from "./LoginButton/LoginButton";

import "./LoginPage.css";

// Accion que maneja la logica de validar si el usuario y contraseña son válidos
// y regresar la ruta a la que se debe redirigir y un token que se guardará en
// el local storage
import { loginAction } from "../Global/Auth";

import GlassCard from "../components/general/GlassCard";

export default function LoginPage() {
  const navigation = useNavigation();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    // Evitar que se haga el submit del formulario
    event.preventDefault();
    // Obtener los datos del formulario
    const formData = new FormData(event.target);
    try {
      // Llamar a la acción de login y obtener el path al que se debe redirigir
      const path = await loginAction({ formData });
      navigate(path);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="glassCardContainer">
      <GlassCard classes={"glassCard grid grid-rows-4 grid-cols-1 gap-4"}>
        <div className="login-logo-container">
          <img
            src="/LogoDreamLabedited.png"
            alt="Logo"
            className="login-logo"
          />
          <h1 className="login-dreamlab-title">DREAM LAB</h1>
        </div>
        <div>
          <h1 className="login-titulo">Inicia sesión</h1>
        </div>
        <div className="login-form">
          <LoginTextField label={"Matrícula"} marginBot={20} />
          <LoginTextField label={"Contraseña"} />
        </div>
        <LoginButton />
      </GlassCard>
    </div>
  );
}

/*
<Form
          method="post"
          className="login-form"
          replace
          onSubmit={handleLogin}
        >
          <input name="user" placeholder="Usuario" />
          <input name="password" type="password" placeholder="Contraseña" />
          <button disabled={navigation.state === "submitting"}>
            {navigation.state === "submitting" ? "Logging in..." : "Log in"}
          </button>
        </Form>
*/
