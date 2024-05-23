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

// Propiedades
import propTypes from "prop-types";

// hooks
import { useEffect, useState } from "react";

// ApiRequests
import { get } from "src/utils/ApiRequests";

function GraficasDashboard({ month, year }) {
    const [reservacionesGenerales, setReservacionesGenerales] = useState([]);
    const [_reservacionesGeneralesCurrent, _setReservacionesGeneralesCurrent] =
        useState({});
    const [_reservacionesGeneralesPrev, _setReservacionesGeneralesPrev] =
        useState({});

    useEffect(() => {
        get("dashboard/reservacionesByMes").then((res) => {
            console.log(res);
            setReservacionesGenerales(res);
        });
    }, []);

    useEffect(() => {
        if (reservacionesGenerales.length > 0) {
            const resCurrent = reservacionesGenerales.find((reservacion) => {
                return reservacion.month === month && reservacion.year === year;
            });

            if (resCurrent) {
                _setReservacionesGeneralesCurrent(resCurrent);
            } else {
                _setReservacionesGeneralesCurrent({
                    year: year,
                    month: month,
                    reservacionesTotales: 0,
                    reservacionesConfirmadas: 0,
                    reservacionesCanceladas: 0,
                    reservacionesEnEspera: 0,
                    reservacionesDenegadas: 0,
                });
            }

            let prevMonth = month - 1;
            let prevYear = year;

            if (prevMonth < 1) {
                prevMonth = 12;
                prevYear = year - 1;
            }

            const resPrev = reservacionesGenerales.find((reservacion) => {
                return (
                    reservacion.month === prevMonth &&
                    reservacion.year === prevYear
                );
            });

            if (resPrev) {
                _setReservacionesGeneralesPrev(resPrev);
            } else {
                _setReservacionesGeneralesPrev({
                    year: prevYear,
                    month: prevMonth,
                    reservacionesTotales: 0,
                    reservacionesConfirmadas: 0,
                    reservacionesCanceladas: 0,
                    reservacionesEnEspera: 0,
                    reservacionesDenegadas: 0,
                });
            }
        }
    }, [reservacionesGenerales, month, year]);

    useEffect(() => {
        console.log("Current", _reservacionesGeneralesCurrent);
        console.log("Prev", _reservacionesGeneralesPrev);
    }, [_reservacionesGeneralesCurrent, _reservacionesGeneralesPrev]);

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
        { uso: 120, material: "Visor VR para smartphone" },
        { uso: 30, material: "Bocinas" },
        { uso: 95, material: "Micrófono" },
        { uso: 44, material: "Cámara" },
        { uso: 28, material: "Pantalla" },
        { uso: 113, material: "Control" },
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

    const calcularCambio = (current, prev) => {
        if (prev === 0) {
            return 0;
        }

        return ((current - prev) / prev) * 100;
    };

    return (
        <>
            <div className="graficas-dashboard-main-container">
                <div className="graficas-dashboard-statcards-container">
                    <StatCard
                        nombre="Reservaciones totales"
                        valor={
                            _reservacionesGeneralesCurrent.reservacionesTotales
                        }
                        cambio={calcularCambio(
                            _reservacionesGeneralesCurrent.reservacionesTotales,
                            _reservacionesGeneralesPrev.reservacionesTotales
                        )}
                    />
                    <StatCard
                        nombre="Reservaciones activas"
                        valor={
                            _reservacionesGeneralesCurrent.reservacionesConfirmadas
                        }
                        cambio={calcularCambio(
                            _reservacionesGeneralesCurrent.reservacionesConfirmadas,
                            _reservacionesGeneralesPrev.reservacionesConfirmadas
                        )}
                    />
                    <StatCard nombre="Penalizaciones" valor={100} cambio={0} />
                    <StatCard
                        nombre="Cancelaciones"
                        valor={
                            _reservacionesGeneralesCurrent.reservacionesCanceladas
                        }
                        cambio={calcularCambio(
                            _reservacionesGeneralesCurrent.reservacionesCanceladas,
                            _reservacionesGeneralesPrev.reservacionesCanceladas
                        )}
                    />
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

GraficasDashboard.propTypes = {
    month: propTypes.number.isRequired,
    year: propTypes.number.isRequired,
};

export default GraficasDashboard;
