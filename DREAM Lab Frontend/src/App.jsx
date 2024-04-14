import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import "./App.css";

// Estructura base
import Root from "./Global/Root.jsx";

// Rutas protegidas
import ProtectedRoutes from "./Global/ProtectedRoutes.jsx";

// Pagina no encontrada
import NotFound from "./Global/NotFound.jsx";

// Login
import LoginPage from "./Login/LoginPage";

// Landing page
import LandingPage from "./LandingPage/LandingPage.jsx";

// Home
import HomePage from "./Home/HomePage.jsx";

// Reservaciones
import ReservacionSala from "./Reservaciones/ReservacionSala.jsx";
import Confirmacion from "./Reservaciones/Confirmacion.jsx";
import ResumenReservacion from "./Reservaciones/ResumenReservacion.jsx";
import SelectorEquipo from "./Reservaciones/SelectorEquipo.jsx";
import SelectorSala from "./Reservaciones/SelectorSala.jsx";
import LandingPageDev from "./LandingPage/LandingPageDev.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<LandingPage />} />
      <Route path="landingpage" element={<LandingPageDev />} /> {/* ruta provisional para desarrollo de la landing */}
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
      <Route
        path="reservacion/confirmacion"
        element={
          <ProtectedRoutes>
            <Confirmacion />
          </ProtectedRoutes>
        }
      />
      <Route
        path="reservacion/resumen"
        element={
          <ProtectedRoutes>
            <ResumenReservacion />
          </ProtectedRoutes>
        }
      />
      <Route
        path="reservacion/equipo"
        element={
          <ProtectedRoutes>
            <SelectorEquipo />
          </ProtectedRoutes>
        }
      />
      <Route
        path="reservacion/sala"
        element={
          <ProtectedRoutes>
            <SelectorSala />
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
