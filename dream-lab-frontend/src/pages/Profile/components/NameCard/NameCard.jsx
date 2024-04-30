import "./NameCard.css";

function NameCard(props) {
    return (
        <div className="div-exterior">
            <div className="logo-div">
                <img src={props.icono} alt="logotipo-usuario" />
            </div>
            <div className="div-usuario">
                <h1 className="nombre-usuario">
                    {props.nombre}
                </h1>
                <h2 className="apodo">{props.apodo}</h2>
            </div>
        </div>
    );
}

export default NameCard;
