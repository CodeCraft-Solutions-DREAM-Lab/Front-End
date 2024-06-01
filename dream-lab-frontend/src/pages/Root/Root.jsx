import { Outlet } from "react-router-dom";

// Estilos
import "./Root.css";

// Componentes
import StudentViewStatusBar from "./components/StudentViewStatusBar/StudentViewStatusBar";

function Root() {
    return (
        <div className="root-main-container">
            <StudentViewStatusBar />
            <Outlet />
        </div>
    );
}

export default Root;
