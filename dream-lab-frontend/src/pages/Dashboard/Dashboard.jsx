// Componentes
import GraficasDashboard from "./components/GraficasDashboard/GraficasDashboard";
import SelectorFechaDashboard from "./components/SelectorFechaDashboard/SelectorFechaDashboard";

// Componentes globales
import NavBarAdmin from "src/GlobalComponents/NavBarAdmin/NavBarAdmin";

// Estilos
import "./Dashboard.css";

// Hooks
import { useState } from "react";

// Fecha
import dayjs from "dayjs";
import "dayjs/locale/es";

function Dashboard() {
    const [fechaSeleccionada, setFechaSeleccionada] = useState(
        dayjs().locale("es")
    );
    return (
        <>
            <NavBarAdmin />
            <SelectorFechaDashboard
                fechaSeleccionada={fechaSeleccionada}
                setFechaSeleccionada={setFechaSeleccionada}
            />
            <GraficasDashboard
                month={parseInt(fechaSeleccionada.format("MM"))}
                year={parseInt(fechaSeleccionada.format("YYYY"))}
            />
        </>
    );
}

export default Dashboard;
