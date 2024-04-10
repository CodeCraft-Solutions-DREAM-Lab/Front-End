import { useNavigation, Form, useNavigate } from "react-router-dom";

import LoginTextField from "../LoginTextField/LoginTextField";
import LoginButton from "../LoginButton/LoginButton";
import LoginRow from "../LoginRow/LoginRow";

import "./LoginPage.css";

// Accion que maneja la logica de validar si el usuario y contraseña son válidos
// y regresar la ruta a la que se debe redirigir y un token que se guardará en
// el local storage
import { loginAction } from "../../Global/Auth";

import "../../components/general/GlassCard.css";
import GlassCard from "../../components/general/GlassCard";

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
      <GlassCard classes={"glassCard"}>
        <img src="/top-blob.png" alt="Logo" className="top-left-image" />
        <img src="/bottom-blob.png" alt="Logo" className="bottom-right-image" />
        <div className="grid-container">
          <LoginRow flexDirection="col" justify="between">
            <LoginRow margin="70px 0 0 0">
              <img
                src="/LogoDreamLabedited.png"
                alt="Logo"
                className="login-logo"
              />
              <h1 className="login-dreamlab-title">DREAM LAB</h1>
            </LoginRow>
            <LoginRow margin="0 0 0 0">
              <h1 className="login-titulo">Inicia sesión</h1>
            </LoginRow>
          </LoginRow>
          <LoginRow flexDirection="col">
            <LoginTextField label={"Matrícula"} marginBot={20} />
            <LoginTextField label={"Contraseña"} />
          </LoginRow>
          <LoginRow margin="0 0 80px 0">
            <LoginButton text="ACEPTAR" />
          </LoginRow>
        </div>
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
