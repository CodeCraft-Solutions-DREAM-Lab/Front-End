import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

import "./App.css";

// Estructura base
import Root from "./pages/Root/Root.jsx";

// Rutas protegidas
import ProtectedRoutes from "./GlobalComponents/ProtectedRoutes/ProtectedRoutes.jsx";

// Pagina no encontrada
import NotFound from "./pages/NotFound/NotFound.jsx";

// Login
import LoginPage from "./pages/LoginPage/LoginPage.jsx";

// Landing page
import LandingPage from "./pages/LandingPage/LandingPage.jsx";

// Home
import HomePage from "./pages/HomePage/HomePage.jsx";

// Reservaciones
import ConfirmacionReserva from "./pages/ConfirmacionReserva/ConfirmacionReserva.jsx";
import ResumenReservacion from "./pages/ResumenReservacion/ResumenReservacion.jsx";
import SeleccionMaterial from "./pages/SeleccionMaterial/SeleccionMaterial";
import SelectorSala from "./pages/SelectorSala/SelectorSala.jsx";
import LandingPageDev from "./pages/LandingPage/LandingPageDev.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Logros from "./pages/Profile/Logros.jsx";
import ReservacionesActivas from "./pages/Profile/ReservacionesActivas.jsx";
import QRLogin from "./pages/QRLogin/QRLogin.jsx";

// Videowall
import Videowall from "./pages/Videowall/Videowall.jsx";

// Admin
import CrearAnuncioVideowall from "./pages/CrearAnuncioVideowall/CrearAnuncioVideowall";
import CronogramaAdmin from "./pages/CronogramaAdmin/CronogramaAdmin";
import Dashboard from "./pages/Dashboard/Dashboard";

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
            <Route index element={<LandingPageDev />} />
            <Route path="landingpage" element={<LandingPage />} />
            {/* ruta provisional para desarrollo de la landing */}
            <Route path="login" element={<LoginPage />} />
            <Route path="home" element={secured(HomePage)()} />
            <Route path="reservacion/sala" element={secured(SelectorSala)()} />
            <Route
                path="reservacion/material"
                element={<SeleccionMaterial />} // Agregar protected cuando se ocupe
            />
            <Route
                path="reservacion/confirmacion"
                element={secured(ConfirmacionReserva)()}
            />
            <Route
                path="reservacion/resumen"
                element={secured(ResumenReservacion)()}
            />
            <Route path="profile" element={secured(Profile)()} />
            <Route path="profile/logros" element={secured(Logros)()} />
            <Route
                path="profile/reservaciones"
                element={secured(ReservacionesActivas)()}
            />
            <Route path="videowall" element={<Videowall />} />
            <Route
                path="crearAnuncio"
                element={secured(CrearAnuncioVideowall)()}
            />
            <Route path="admin" element={<CronogramaAdmin />} />
            <Route path="qr" element={<QRLogin />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
