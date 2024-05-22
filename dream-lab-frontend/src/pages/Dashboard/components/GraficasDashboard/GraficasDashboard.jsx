// Componentes
import StatCard from "./components/StatCard/StatCard";
import GraficaLinea from "./components/GraficaLinea/GraficaLinea";
import ContenedorGrafica from "./components/ContenedorGrafica/ContenedorGrafica";
// import GraficaBarras from "./components/GraficaBarras/GraficaBarras";
import GraficaPie from "./components/GraficaPie/GraficaPie";
import ReservacionesPorSala from "./components/ReservacionesPorSala/ReservacionesPorSala";
import ContenedorDisponibilidadSalas from "./components/ContenedorDisponibilidadSalas/ContenedorDisponibilidadSalas";

// Estilos
import "./GraficasDashboard.css";

function GraficasDashboard() {
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

    const datosReservacionesPorSala = [
        { name: "Electric Garage", value: 23 },
        { name: "Dimension Forge", value: 45 },
        { name: "New Horizons", value: 12 },
        { name: "Deep Net", value: 37 },
        { name: "Graveyard", value: 29 },
        { name: "PCB Factory", value: 41 },
        { name: "Hack Battlefield", value: 33 },
        { name: "Testing Land", value: 48 },
        { name: "War Headquarters", value: 27 },
        { name: "Biometrics Flexible Hall", value: 39 },
        { name: "Beyond Digits", value: 16 },
        { name: "Open Innovation Lab", value: 50 },
    ];

    return (
        <>
            <div className="graficas-dashboard-main-container">
                <div className="graficas-dashboard-statcards-container">
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
                <div className="graficas-dashboard-graphs-container">
                    <div className="graficas-dashboard-grafica-default graficas-dashboard-grafica-materiales-container">
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
                    <div className="graficas-dashboard-grafica-default graficas-dashboard-grafica-reservaciones-totales-container">
                        <ContenedorGrafica titulo="Reservaciones totales">
                            <GraficaLinea
                                chartData={datosReservaciones}
                                index="fecha"
                                categories={["cantidadReservaciones"]}
                            />
                        </ContenedorGrafica>
                    </div>
                    <div className="graficas-dashboard-grafica-default graficas-dashboard-grafica-reservaiones-sala-container">
                        <ReservacionesPorSala
                            titulo="Reservaciones por sala"
                            data={datosReservacionesPorSala}
                        />
                    </div>
                    <div className="graficas-dashboard-grafica-default graficas-dashboard-grafica-disponbilidad-container">
                        <ContenedorDisponibilidadSalas titulo="Disponibilidad de salas" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default GraficasDashboard;
