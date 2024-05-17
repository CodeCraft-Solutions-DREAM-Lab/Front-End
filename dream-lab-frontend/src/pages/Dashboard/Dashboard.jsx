// Componentes
import StatCard from "./components/StatCard/StatCard";

// Estilos
import "./Dashboard.css";

function Dashboard() {
    return (
        <div className="p-8">
            <div className="dashboard-statcards-container">
                <StatCard nombre="Usuarios" valor={100} cambio={10} />
                <StatCard nombre="Reservaciones" valor={100} cambio={10} />
                <StatCard nombre="Salas" valor={100} cambio={-10} />
                <StatCard nombre="Materiales" valor={100} cambio={-10} />
            </div>
        </div>
    );
}

export default Dashboard;
