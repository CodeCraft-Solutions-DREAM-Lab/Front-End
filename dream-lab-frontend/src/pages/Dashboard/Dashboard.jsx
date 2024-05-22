// Componentes
import GraficasDashboard from "./components/GraficasDashboard/GraficasDashboard";
import SelectorFechaDashboard from "./components/SelectorFechaDashboard/SelectorFechaDashboard";

// Componentes globales
import NavBarAdmin from "src/GlobalComponents/NavBarAdmin/NavBarAdmin";

// Estilos
import "./Dashboard.css";

function Dashboard() {
    return (
        <>
            <NavBarAdmin />
            <SelectorFechaDashboard />
            <GraficasDashboard />
        </>
    );
}

export default Dashboard;
