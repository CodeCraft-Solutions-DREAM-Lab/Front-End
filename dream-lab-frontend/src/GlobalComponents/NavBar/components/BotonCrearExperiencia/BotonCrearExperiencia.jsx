import { useNavigate } from "react-router-dom";
import ExperienciaIcon from "src/assets/NavBar/crearExperiencia.svg";
import "./BotonCrearExperiencia.css";

function BotonCrearExperiencia() {
    let navigate = useNavigate();

    const handleClick = () => {
        navigate(`/crearExperiencia`); 
    };

    return (
        <div className="flex items-center" onClick={handleClick}>
            <img
                className="experienciaIcon"
                src={ExperienciaIcon}
                alt="Crear experiencia"
            />
        </div>
    );
}

export default BotonCrearExperiencia;
