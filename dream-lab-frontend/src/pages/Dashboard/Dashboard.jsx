// Componentes
import GraficasDashboard from "./components/GraficasDashboard/GraficasDashboard";
import SelectorFechaDashboard from "./components/SelectorFechaDashboard/SelectorFechaDashboard";

// Componentes globales
import NavBarAdmin from "src/GlobalComponents/NavBarAdmin/NavBarAdmin";

// Estilos
import "./Dashboard.css";

// Hooks
import { useState, useEffect } from "react";

// Fecha
import dayjs from "dayjs";
import "dayjs/locale/es";

// Redux
import { useDispatch } from "react-redux";
import { setActive } from "src/redux/Slices/vistaEstudianteSlice";

// Storage
import { multiClearSessionStorage } from "src/utils/Storage";

function Dashboard() {
    const [fechaSeleccionada, setFechaSeleccionada] = useState(
        dayjs().locale("es")
    );
    const dispatch = useDispatch();

    // Limpiar estados de reservaciones, vista de estudiante y reservacion de
    // admin
    useEffect(() => {
        dispatch(setActive(false));
        multiClearSessionStorage([
            "horaInicio",
            "horaInicioIsoString",
            "duration",
            "fecha",
            "fechaIsoString",
            "personas",
            "experiencia",
            "sala",
            "idExperiencia",
            "idSala",
            "reservType",
            "materials",
            "competidores",
            "cupos",
            "formattedDate",
            "formattedTime",
            "horaCorte",
            "nameSalaExperiencia",
            "vistaEstudiante",
            "nombreReservacionAdmin",
        ]);
    }, [dispatch]);

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
