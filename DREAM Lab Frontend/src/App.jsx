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
import LoginPage from "./Login/LoginPage/LoginPage.jsx";

// Landing page
import LandingPage from "./pages/LandingPage/LandingPage.jsx";

// Home
import HomePage from "./pages/HomePage/HomePage.jsx";

// Reservaciones
import ReservacionSala from "./Reservaciones/ReservacionSala.jsx";
import Confirmacion from "./Reservaciones/Confirmacion.jsx";
import ResumenReservacion from "./Reservaciones/ResumenReservacion.jsx";
import SelectorEquipo from "./Reservaciones/SelectorEquipo.jsx";
import SelectorSala from "./Reservaciones/SelectorSala.jsx";
import LandingPageDev from "./pages/LandingPage/LandingPageDev.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Logros from "./pages/Profile/Logros.jsx";
import ReservacionesActivas from "./pages/Profile/ReservacionesActivas.jsx";

function secured(Component) {
    return function WrappedComponent(props) {
        return (
            <ProtectedRoutes>
                <Component {...props} />
            </ProtectedRoutes>
        );
    };
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />}>
            <Route index element={<LandingPage />} />
            <Route path="landingpage" element={<LandingPageDev />} />
            {/* ruta provisional para desarrollo de la landing */}
            <Route path="login" element={<LoginPage />} />
            <Route path="home" element={secured(HomePage)()} />
            <Route path="reservacion" element={secured(ReservacionSala)()} />
            <Route
                path="reservacion/confirmacion"
                element={secured(Confirmacion)()}
            />
            <Route
                path="reservacion/resumen"
                element={secured(ResumenReservacion)()}
            />
            <Route
                path="reservacion/equipo"
                element={secured(SelectorEquipo)()}
            />
            <Route path="reservacion/sala" element={secured(SelectorSala)()} />
            <Route path="profile" element={secured(Profile)()} />
            <Route path="profile/logros" element={secured(Logros)()} />
            <Route
                path="profile/reservaciones"
                element={secured(ReservacionesActivas)()}
            />
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
