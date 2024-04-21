import { useNavigate } from "react-router-dom";
import LogoutIcon from "../../assets/images/logout.svg";
import "./Logout.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../redux/Slices/userSlice";
import { clearStorages } from "../../../../utils/Storage";

function Logout() {
    let navigate = useNavigate();
    const dispatch = useDispatch(); // Get the dispatch function

    const handleClick = () => {
        navigate("/login"); // Navega a la landing page
        clearStorages();
        // Llamámos a la función de logoutUser de la userSlice para borrar los datos del usuario
        dispatch(logoutUser());
    };

    return (
        <div className="flex items-center" onClick={handleClick}>
            <h1 className="cerrar-sesion">CERRAR SESIÓN</h1>
            <img className="logoutIcon" src={LogoutIcon} alt="Cerrar sesión" />
        </div>
    );
}

export default Logout;
