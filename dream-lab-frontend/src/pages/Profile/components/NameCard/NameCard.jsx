import "./NameCard.css";
import LogoRobot from "/Profile/robot-icon.png";

function NameCard(props) {
    return (
        <div className="div-exterior">
            <div className="logo-div">
                <img src={LogoRobot} alt="logotipo-usuario" />
            </div>
            <div className="div-usuario">
                <h1 className="nombre-usuario">
                    {props.nombre}Efraín Martínez Garza
                </h1>
                <h2 className="apodo">{props.apodo}Robot Expert</h2>
            </div>
        </div>
    );
}

export default NameCard;
