// Componentes
import GraficasDashboard from "./components/GraficasDashboard/GraficasDashboard";

// Componentes globales
import NavBarAdmin from "src/GlobalComponents/NavBarAdmin/NavBarAdmin";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// Estilos
import "./Dashboard.css";

function Dashboard() {
    return (
        <>
            <NavBarAdmin />

            <GraficasDashboard />
            <div>
                <DatePicker
                    label={'"month" and "year"'}
                    openTo="month"
                    views={["year", "month"]}
                />
            </div>
        </>
    );
}

export default Dashboard;
