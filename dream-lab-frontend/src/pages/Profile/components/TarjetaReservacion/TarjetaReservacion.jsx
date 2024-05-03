import "./TarjetaReservacion.css";
import ClicImage from "../../../../assets/Profile/trash.png"

function TarjetaReservacion(props) {
    return (
        <div className="div-externo-reservacion">
            
            <div className="first-section-reservacion-card">
                <div className="div-datos-reservacion">
                    <h1 className="sala-reservacion">{props.sala}</h1>
                    <p className="experiencia-reservacion">{props.experiencia}</p>
                </div>

                <div className="clic-tarjeta-reservacion">
                    <img data-cy="trash-icon" className="clic-image" src={ClicImage} alt="Imagen presionar" onClick={props.funcion}/>
                </div>
            </div>

            <div className="linea"></div>

            <div className="div-fecha-reservacion">
                <div className="hora-reservaion">
                    <p>{props.hora}</p>
                </div>
                <div className="dia-reservacion">
                    <p>{props.dia}</p>
                </div>
            </div>
        </div>
    );
}

export default TarjetaReservacion;
