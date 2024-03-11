import { BrowserRouter, Routes, Route } from "react-router-dom";

import './output.css'
import './App.css'
import HomePage from './Home/HomePage.jsx'
import ReservacionCuarto from "./Reservaciones/ReservacionSala.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/reservacion/:sala" element={<ReservacionCuarto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
