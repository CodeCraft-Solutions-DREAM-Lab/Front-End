// Componentes
import StatCard from "./components/StatCard/StatCard";

// Estilos
import "./Dashboard.css";

function Dashboard() {
    return (
        <div className="dashboard-main-container">
            <div className="dashboard-statcards-container">
                <StatCard
                    nombre="Reservaciones totales"
                    valor={100}
                    cambio={10}
                />
                <StatCard
                    nombre="Reservaciones activas"
                    valor={100}
                    cambio={10}
                />
                <StatCard nombre="Penalizaciones" valor={100} cambio={0} />
                <StatCard nombre="Cancelaciones" valor={100} cambio={-10} />
            </div>
            <div className="dashboard-graphs-container">
                <div className="dashboard-grafica-materiales-container"></div>
                <div className="dashboard-grafica-reservaciones-totales-container"></div>
                <div className="dashboard-grafica-reservaiones-sala-container"></div>
                <div className="dashboard-grafica-disponbilidad-container"></div>
            </div>
        </div>
    );
}

export default Dashboard;
