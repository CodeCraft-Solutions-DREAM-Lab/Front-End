import "./TarjetaAnuncio.css";
import ClicImage from "../../../../../assets/Profile/trash.png";
import OpenEye from "../../../../../assets/CrearAnuncioVideowall/openEye.png";
import ClosedEye from "../../../../../assets/CrearAnuncioVideowall/closedEye.png";
import SalonClases from "../../../../../assets/CrearAnuncioVideowall/salonClases.jpg";

function TarjetaReservacion(props) {
    return (
        <div
            className={`div-externo-anuncio ${
                props.encendido ? "" : "apagado"
            }`}
        >
            <div
                style={{ backgroundImage: `url(${props.imagen})` }}
                className="div-imagen-anuncio-izq"
            ></div>

            <div className="div-texto-del-anuncio">
                <div className="first-section-anuncio-card">
                    <div className="div-datos-anuncio">
                        <h1 className="sala-anuncio">{props.sala}</h1>

                        <p
                            className="experiencia-anuncio"
                            style={{
                                fontSize: props.personalizado
                                    ? "small"
                                    : "inherit",
                            }}
                        >
                            {props.experiencia}
                        </p>
                    </div>

                    <div className="clic-tarjeta-anuncio">
                        <img
                            data-cy="eye-icon"
                            className="clic-image2"
                            src={props.encendido ? OpenEye : ClosedEye}
                            alt="Imagen presionar"
                            onClick={props.funcion}
                        />
                        <img
                            data-cy="trash-icon"
                            className="clic-image"
                            src={ClicImage}
                            alt="Imagen presionar"
                            onClick={props.funcionTrash}
                        />
                    </div>
                </div>

                {props.personalizado !== "agua" ? (
                    <div className="linea"></div>
                ) : null}

                <div className="div-fecha-anuncio">
                    <div className="hora-anuncio">
                        <p>{props.hora}</p>
                    </div>
                    <div className="dia-anuncio">
                        <p>{props.dia}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TarjetaReservacion;
