import { Outlet } from "react-router-dom";

// Estilos
import "./Root.css";

// Componentes
import StudentViewStatusBar from "./components/StudentViewStatusBar/StudentViewStatusBar";

// Hooks
import { useEffect } from "react";

// Storage
import { existsInSessionStorage } from "src/utils/Storage";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { selectActive, setActive } from "src/redux/Slices/vistaEstudianteSlice";

function Root() {
    // Para poder cambiar el estado de isActive en redux
    const dispatch = useDispatch();
    // Para obtener el estado de isActive en redux
    const isStudentViewActive = useSelector(selectActive);

    // Checa si la vista de estudiante está activa en el almacenamiento de
    // sesión y actualiza el estado de isActive en redux por si acaso se recarga
    // la página y se pierde el estado de redux
    useEffect(() => {
        if (existsInSessionStorage("vistaEstudiante")) {
            dispatch(setActive(true));
        } else {
            dispatch(setActive(false));
        }
    }, [dispatch]);

    return (
        <div className="root-main-container">
            {isStudentViewActive ? <StudentViewStatusBar /> : null}
            <Outlet />
        </div>
    );
}

export default Root;
