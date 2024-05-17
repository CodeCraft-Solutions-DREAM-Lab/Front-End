// Componentes
import StatCard from "./components/StatCard/StatCard";
import GraficaLinea from "./components/GraficaLinea/GraficaLinea";
import ContenedorGrafica from "./components/ContenedorGrafica/ContenedorGrafica";

// Estilos
import "./Dashboard.css";

function Dashboard() {
    const data = [
        { cantidadReservaciones: 100, fecha: "Ene" },
        { cantidadReservaciones: 50, fecha: "Feb" },
        { cantidadReservaciones: 75, fecha: "Mar" },
        { cantidadReservaciones: 120, fecha: "Abr" },
        { cantidadReservaciones: 30, fecha: "May" },
        { cantidadReservaciones: 95, fecha: "Jun" },
        { cantidadReservaciones: 44, fecha: "Jul" },
        { cantidadReservaciones: 28, fecha: "Ago" },
        { cantidadReservaciones: 143, fecha: "Sep" },
        { cantidadReservaciones: 17, fecha: "Oct" },
        { cantidadReservaciones: 94, fecha: "Nov" },
        { cantidadReservaciones: 111, fecha: "Dic" },
    ];

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
                <div className="dashboard-grafica-default dashboard-grafica-materiales-container"></div>
                <div className="dashboard-grafica-default dashboard-grafica-reservaciones-totales-container">
                    <ContenedorGrafica titulo="Reservaciones totales">
                        <GraficaLinea
                            chartData={data}
                            index="fecha"
                            categories={["cantidadReservaciones"]}
                        />
                    </ContenedorGrafica>
                </div>
                <div className="dashboard-grafica-default dashboard-grafica-reservaiones-sala-container"></div>
                <div className="dashboard-grafica-default dashboard-grafica-disponbilidad-container"></div>
            </div>
        </div>
    );
}

export default Dashboard;
