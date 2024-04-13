import { BrowserRouter, Routes, Route } from "react-router-dom";

import './output.css'
import './App.css'
import HomePage from './Home/HomePage.jsx'
import ReservacionSala from "./Reservaciones/ReservacionSala.jsx";
import Confirmacion from "./Confirmacion/Confirmacion.jsx";
import Profile from "./Profile/Profile.jsx";
import Logros from "./Profile/Logros.jsx"
import ReservacionesActivas from "./Profile/ReservacionesActivas.jsx"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/reservacion/:sala" element={<ReservacionSala />} />
        <Route path="/confirmacion" element={<Confirmacion />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/logros" element={<Logros />} />
        <Route path="/profile/reservaciones" element={<ReservacionesActivas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App