import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import "./App.css";
import Root from "./Global/Root.jsx";
import LandingPage from "./LandingPage/LandingPage.jsx";
import LoginPage from "./Login/LoginPage";
import NotFound from "./Global/NotFound.jsx";
import HomePage from "./Home/HomePage.jsx";
import ReservacionSala from "./Reservaciones/ReservacionSala.jsx";

import ProtectedRoutes from "./Global/ProtectedRoutes.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<LandingPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route
        path="home"
        element={
          <ProtectedRoutes>
            <HomePage />
          </ProtectedRoutes>
        }
      />
      <Route
        path="reservacion"
        element={
          <ProtectedRoutes>
            <ReservacionSala />
          </ProtectedRoutes>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
