import "./BotonCelular.css";
import ImagenEstrella from "src/assets/Profile/estrella.webp";
import ImagenFlecha from "src/assets/Profile/flecha.webp";
import ImagenCalendario from "src/assets/Profile/calendario2.webp";
import { useNavigate } from "react-router-dom";

function BotonCelular(props) {
    let navigate = useNavigate();
    const tipo = props.tipo;

    return (
        <div
            className="boton-celular"
            onClick={() =>
                tipo === "logros"
                    ? navigate("/profile/logros/")
                    : navigate("/profile/reservaciones/")
            }
        >
            <img
                className="imagen-boton"
                src={tipo === "logros" ? ImagenEstrella : ImagenCalendario}
                alt="Imagen de botón"
            />
            <h1 className="texto-boton">{props.texto}</h1>
            <img
                className="imagen-flecha"
                src={ImagenFlecha}
                alt="Imagen de flecha"
            />
        </div>
    );
}

export default BotonCelular;
