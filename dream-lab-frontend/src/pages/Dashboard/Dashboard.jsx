// Componentes
import StatCard from "./components/StatCard/StatCard";
import GraficaLinea from "./components/GraficaLinea/GraficaLinea";
import ContenedorGrafica from "./components/ContenedorGrafica/ContenedorGrafica";
import GraficaBarras from "./components/GraficaBarras/GraficaBarras";
import GraficaPie from "./components/GraficaPie/GraficaPie";

// Estilos
import "./Dashboard.css";

function Dashboard() {
    const datosReservaciones = [
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

    const datosUsoMateriales = [
        { uso: 100, material: "Laptop" },
        { uso: 50, material: "Proyector" },
        { uso: 75, material: "Cable HDMI" },
        { uso: 120, material: "Cable VGA" },
        { uso: 30, material: "Bocinas" },
        { uso: 95, material: "Micrófono" },
        { uso: 44, material: "Cámara" },
        { uso: 28, material: "Pantalla" },
        { uso: 143, material: "Control" },
        { uso: 17, material: "Audífonos" },
        { uso: 94, material: "Teclado" },
        { uso: 111, material: "Mouse" },
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
                <div className="dashboard-grafica-default dashboard-grafica-materiales-container">
                    <ContenedorGrafica titulo="Materiales más utilizados">
                        <GraficaPie
                            chartData={datosUsoMateriales}
                            index="material"
                            category={"uso"}
                        />
                        {/* <GraficaBarras
                            chartData={datosUsoMateriales}
                            index="material"
                            category={"uso"}
                        /> */}
                    </ContenedorGrafica>
                </div>
                <div className="dashboard-grafica-default dashboard-grafica-reservaciones-totales-container">
                    <ContenedorGrafica titulo="Reservaciones totales">
                        <GraficaLinea
                            chartData={datosReservaciones}
                            index="fecha"
                            categories={["cantidadReservaciones"]}
                        />
                    </ContenedorGrafica>
                </div>
                <div className="dashboard-grafica-default dashboard-grafica-reservaiones-sala-container">
                    <div className="overflow-y-auto h-full">
                        <p>Elemento 1</p>
                        <p>Elemento 1</p>
                        <p>Elemento 1</p>
                        <p>Elemento 1</p>
                        <p>Elemento 1</p>
                        <p>Elemento 1</p>
                        <p>Elemento 1</p>
                        <p>Elemento 1</p>
                        <p>Elemento 1</p>
                        <p>Elemento 1</p>
                        <p>Elemento 1</p>
                        <p>Elemento 1</p>
                        <p>Elemento 1</p>
                        <p>Elemento 1</p>
                        <p>Elemento 1</p>
                        <p>Elemento 1</p>
                        <p>Elemento 1</p>
                    </div>
                </div>
                <div className="dashboard-grafica-default dashboard-grafica-disponbilidad-container"></div>
            </div>
        </div>
    );
}

export default Dashboard;
