import {
  useLoaderData,
  useNavigation,
  Form,
  useActionData,
  redirect,
  useNavigate,
} from "react-router-dom";
import { loginAction } from "../Global/Auth"; // import the loginAction function

export default function LoginPage() {
  const errorMessage = useActionData();
  const message = useLoaderData();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const path = await loginAction({ formData });
      console.log("Path:", path);
      navigate(path);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {errorMessage && <h3 className="red">{errorMessage}</h3>}

      <Form method="post" className="login-form" replace onSubmit={handleLogin}>
        <input name="user" placeholder="Usuario" />
        <input name="password" type="password" placeholder="Contraseña" />
        <button disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </Form>
    </div>
  );
}
