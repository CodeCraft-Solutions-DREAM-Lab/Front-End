import {
  Route,
  Router,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import "./App.css";
import Root from "./Global/Root.jsx";
// import HomePage from './Home/HomePage.jsx'
// import ReservacionSala from "./Reservaciones/ReservacionSala.jsx";
// import Confirmacion from "./Confirmacion/Confirmacion.jsx";
// import Profile from "./Profile/Profile.jsx";
import LoginPage from "./Login/LoginPage";
import { AuthProvider } from "./hooks/useAuth.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route path="login" element={<LoginPage />} />
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router}>
      <AuthProvider>
        <Root />
      </AuthProvider>
    </RouterProvider>
  );
}

export default App;
