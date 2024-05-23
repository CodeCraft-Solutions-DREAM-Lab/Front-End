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

// Fecha
// Fecha
import dayjs from "dayjs";
import "dayjs/locale/es";

function GraficasDashboard({ month, year }) {
    // Estados de las reservaciones
    const [reservacionesGenerales, setReservacionesGenerales] = useState([]);
    const [_reservacionesGeneralesCurrent, _setReservacionesGeneralesCurrent] =
        useState({
            year: year,
            month: month,
            reservacionesTotales: 0,
            reservacionesConfirmadas: 0,
            reservacionesCanceladas: 0,
            reservacionesEnEspera: 0,
            reservacionesDenegadas: 0,
        });
    const [_reservacionesGeneralesPrev, _setReservacionesGeneralesPrev] =
        useState({
            year: year,
            month: month,
            reservacionesTotales: 0,
            reservacionesConfirmadas: 0,
            reservacionesCanceladas: 0,
            reservacionesEnEspera: 0,
            reservacionesDenegadas: 0,
        });
    const [historialReservaciones, setHistorialReservaciones] = useState([]);

    // Estados de las penalizaciones
    const [penalizaciones, setPenalizaciones] = useState([]);
    const [_penalizacionesCurrent, _setPenalizacionesCurrent] = useState({
        year: year,
        month: month,
        penalizaciones: 0,
    });
    const [_penalizacionesPrev, _setPenalizacionesPrev] = useState({
        year: year,
        month: month,
        penalizaciones: 0,
    });

    // Estados de los materiales
    const [usoMateriales, setUsoMateriales] = useState([]);
    const [_usoMaterialesCurrent, _setUsoMaterialesCurrent] = useState({
        year: year,
        month: month,
        total: 0,
        materiales: [],
    });

    // Estados de las reservaciones por sala
    const [reservacionesPorSala, setReservacionesPorSala] = useState([]);
    const [_reservacionesPorSalaCurrent, _setReservacionesPorSalaCurrent] =
        useState([
            {
                year: year,
                month: month,
                salas: [],
            },
        ]);

    // Obtener los datos de todos los meses de las reservaciones totales,
    // reservaciones activas y reservaciones canceladas
    useEffect(() => {
        get("dashboard/reservacionesByMes").then((res) => {
            setReservacionesGenerales(res);
        });
    }, []);

    // De todos los datos de reservaciones generales, obtener los datos del mes
    // actual y del mes anterior con base en la fecha seleccionada
    useEffect(() => {
        // Buscar los datos del mes actual
        const resCurrent = reservacionesGenerales.find((reservacion) => {
            return reservacion.month === month && reservacion.year === year;
        });

        // Si se encontraron los datos del mes actual se asignan, si no se
        // asignan los valores por defecto
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

        // Buscar los datos del mes anterior
        // Si el mes actual es enero, se asigna diciembre del año anterior
        // como mes anterior y se asigna el año anterior
        let prevMonth = month - 1;
        let prevYear = year;
        if (prevMonth < 1) {
            prevMonth = 12;
            prevYear = year - 1;
        }

        // Buscar los datos del mes anterior
        const resPrev = reservacionesGenerales.find((reservacion) => {
            return (
                reservacion.month === prevMonth && reservacion.year === prevYear
            );
        });

        // Si se encontraron los datos del mes anterior se asignan, si no se
        // asignan los valores por defecto
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
    }, [reservacionesGenerales, month, year]);

    // Generar una lista con la cantidad de reservaciones por mes para la
    // grafica de linea
    useEffect(() => {
        const newDatosReservaciones = reservacionesGenerales
            // Filtrar las reservaciones del año seleccionado
            .filter((reservacion) => reservacion.year === year)
            // Mapear los datos para obtener el nombre del mes en español
            .map((reservacion) => {
                const monthName = dayjs()
                    .locale("es")
                    .month(reservacion.month - 1)
                    .format("MMM");

                // Retornar los datos con el nombre del mes en español con la
                // primera letra en mayúscula y la cantidad de reservaciones
                return {
                    cantidadReservaciones: reservacion.reservacionesTotales,
                    fecha:
                        monthName.charAt(0).toUpperCase() + monthName.slice(1),
                };
            });

        setHistorialReservaciones(newDatosReservaciones);
    }, [reservacionesGenerales, year]);

    // Obtener datos de las penalizaciones por mes
    useEffect(() => {
        get("dashboard/penalizacionesByMes").then((res) => {
            setPenalizaciones(res);
        });
    }, []);

    // De todos los datos de las penalizaciones generales, obtener los datos del
    // mes actual y del mes anterior con base en la fecha seleccionada
    useEffect(() => {
        // Buscar los datos del mes actual
        const resCurrent = penalizaciones.find((penalizacion) => {
            return penalizacion.month === month && penalizacion.year === year;
        });

        // Si se encontraron los datos del mes actual se asignan, si no se
        // asignan los valores por defecto
        if (resCurrent) {
            _setPenalizacionesCurrent(resCurrent);
        } else {
            _setPenalizacionesCurrent({
                year: year,
                month: month,
                penalizaciones: 0,
            });
        }

        // Buscar los datos del mes anterior
        // Si el mes actual es enero, se asigna diciembre del año anterior
        // como mes anterior y se asigna el año anterior
        let prevMonth = month - 1;
        let prevYear = year;
        if (prevMonth < 1) {
            prevMonth = 12;
            prevYear = year - 1;
        }

        // Buscar los datos del mes anterior
        const resPrev = penalizaciones.find((penalizacion) => {
            return (
                penalizacion.month === prevMonth &&
                penalizacion.year === prevYear
            );
        });

        // Si se encontraron los datos del mes anterior se asignan, si no se
        // asignan los valores por defecto
        if (resPrev) {
            _setPenalizacionesPrev(resPrev);
        } else {
            _setPenalizacionesPrev({
                year: prevYear,
                month: prevMonth,
                penalizaciones: 0,
            });
        }
    }, [penalizaciones, month, year]);

    // Obtener los datos del uso de los materiales a traves de los meses
    useEffect(() => {
        get("dashboard/usoMaterialByMes").then((res) => {
            setUsoMateriales(res);
        });
    }, []);

    // De todos los datos de uso de materiales, obtener los datos del mes actual
    // y del mes anterior con base en la fecha seleccionada
    useEffect(() => {
        // Buscar los datos del mes actual
        const resCurrent = usoMateriales.find((usoMaterial) => {
            return usoMaterial.month === month && usoMaterial.year === year;
        });

        // Si se encontraron los datos del mes actual se asignan, si no se
        // asignan los valores por defecto
        if (resCurrent) {
            _setUsoMaterialesCurrent(resCurrent);
        } else {
            _setUsoMaterialesCurrent({
                year: year,
                month: month,
                total: 0,
                materiales: [],
            });
        }
    }, [usoMateriales, month, year]);

    // Obtener las reservaciones por sala a traves de los meses
    useEffect(() => {
        get("dashboard/reservacionesBySalaByMes").then((res) => {
            setReservacionesPorSala(res);
        });
    }, []);

    // Obtener los datos de las reservaciones por sala del mes actual
    useEffect(() => {
        // Buscar los datos del mes actual
        const resCurrent = reservacionesPorSala.find((reservacion) => {
            return reservacion.month === month && reservacion.year === year;
        });

        // Si se encontraron los datos del mes actual se asignan, si no se
        // asignan los valores por defecto
        if (resCurrent) {
            _setReservacionesPorSalaCurrent(resCurrent);
        } else {
            _setReservacionesPorSalaCurrent([
                {
                    year: year,
                    month: month,
                    salas: [],
                },
            ]);
        }
    }, [reservacionesPorSala, month, year]);

    useEffect(() => {
        console.log(
            "_reservacionesGeneralesCurrent",
            _reservacionesGeneralesCurrent
        );
        console.log("_reservacionesGeneralesPrev", _reservacionesGeneralesPrev);
        console.log("historialReservaciones", historialReservaciones);
        console.log("_penalizacionesCurrent", _penalizacionesCurrent);
        console.log("_penalizacionesPrev", _penalizacionesPrev);
        console.log("_usoMaterialesCurrent", _usoMaterialesCurrent);
    }, [
        _reservacionesGeneralesCurrent,
        _reservacionesGeneralesPrev,
        historialReservaciones,
        _penalizacionesCurrent,
        _penalizacionesPrev,
        _usoMaterialesCurrent,
    ]);

    // const datosReservaciones = [
    //     { cantidadReservaciones: 100, fecha: "Ene" },
    //     { cantidadReservaciones: 50, fecha: "Feb" },
    //     { cantidadReservaciones: 75, fecha: "Mar" },
    //     { cantidadReservaciones: 120, fecha: "Abr" },
    //     { cantidadReservaciones: 30, fecha: "May" },
    //     { cantidadReservaciones: 95, fecha: "Jun" },
    //     { cantidadReservaciones: 44, fecha: "Jul" },
    //     { cantidadReservaciones: 28, fecha: "Ago" },
    //     { cantidadReservaciones: 143, fecha: "Sep" },
    //     { cantidadReservaciones: 17, fecha: "Oct" },
    //     { cantidadReservaciones: 94, fecha: "Nov" },
    //     { cantidadReservaciones: 111, fecha: "Dic" },
    // ];

    // const datosUsoMateriales = [
    //     { uso: 100, material: "Laptop" },
    //     { uso: 50, material: "Proyector" },
    //     { uso: 75, material: "Cable HDMI" },
    //     { uso: 120, material: "Visor VR para smartphone" },
    //     { uso: 30, material: "Bocinas" },
    //     { uso: 95, material: "Micrófono" },
    //     { uso: 44, material: "Cámara" },
    //     { uso: 28, material: "Pantalla" },
    //     { uso: 113, material: "Control" },
    //     { uso: 17, material: "Audífonos" },
    //     { uso: 94, material: "Teclado" },
    //     { uso: 111, material: "Mouse" },
    // ];

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

    // Funcion para calcular el porcentaje de cambio entre dos valores
    const calcularCambio = (current, prev) => {
        // Prevenir division por cero
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
                    <StatCard
                        nombre="Penalizaciones"
                        valor={_penalizacionesCurrent.penalizaciones}
                        cambio={calcularCambio(
                            _penalizacionesCurrent.penalizaciones,
                            _penalizacionesPrev.penalizaciones
                        )}
                    />
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
                                chartData={_usoMaterialesCurrent.materiales}
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
                                chartData={historialReservaciones}
                                index="fecha"
                                categories={["cantidadReservaciones"]}
                            />
                        </ContenedorGrafica>
                    </div>
                    <div className="graficas-dashboard-grafica-default graficas-dashboard-grafica-reservaiones-sala-container">
                        <ReservacionesPorSala
                            titulo="Reservaciones por sala"
                            data={_reservacionesPorSalaCurrent.salas}
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
