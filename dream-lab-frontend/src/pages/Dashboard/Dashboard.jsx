// Componentes
import GraficasDashboard from "./components/GraficasDashboard/GraficasDashboard";

// Componentes globales
import NavBarAdmin from "src/GlobalComponents/NavBarAdmin/NavBarAdmin";

// Estilos
import "./Dashboard.css";

function Dashboard() {
    return (
        <>
            <NavBarAdmin />
            <GraficasDashboard />
        </>
    );
}

export default Dashboard;
