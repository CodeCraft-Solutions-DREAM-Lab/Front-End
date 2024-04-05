import {
  useLoaderData,
  useNavigation,
  Form,
  useActionData,
} from "react-router-dom";
// import { loginUser } from "../api";

export default function LoginPage() {
  const errorMessage = useActionData();
  const message = useLoaderData();
  const navigation = useNavigation();

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {errorMessage && <h3 className="red">{errorMessage}</h3>}

      <Form method="post" className="login-form" replace>
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </Form>
    </div>
  );
}
