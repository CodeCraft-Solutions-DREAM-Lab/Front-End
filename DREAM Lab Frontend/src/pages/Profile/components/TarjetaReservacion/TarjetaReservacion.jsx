import "./TarjetaReservacion.css";

function TarjetaReservacion(props) {
    return (
        <div className="div-externo-reservacion" onClick={props.funcion}>
            <div className="div-datos-reservacion">
                <h1 className="sala-reservacion">{props.sala}</h1>
                <p className="experiencia-reservacion">{props.experiencia}</p>
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
