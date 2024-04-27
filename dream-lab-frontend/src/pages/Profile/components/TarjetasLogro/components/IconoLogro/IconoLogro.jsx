import "./IconoLogro.css";
import LogoBigDreamer from "/Profile/bigDreamer.png";
import LogoRobot from "/Profile/robot-icon.png";

function IconoLogro(props) {
    return (
        <div
            className={
                props.logroDesbloqueado
                    ? "div-logro-desbloqueado"
                    : "div-logro-bloqueado"
            }
            style={
                props.logroDesbloqueado
                    ? { backgroundColor: props.colorFondo }
                    : null
            }
        >
            <img
                className="logo-logro"
                src={LogoBigDreamer}
                alt="Icono del logro"
            />
        </div>
    );
}

export default IconoLogro;
