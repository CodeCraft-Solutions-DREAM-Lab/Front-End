import "./IconoLogro.css";
import LogoBigDreamer from "src/assets/Profile/bigDreamer.png";
import LogoRobot from "src/assets/Profile/robot-icon.png";

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
