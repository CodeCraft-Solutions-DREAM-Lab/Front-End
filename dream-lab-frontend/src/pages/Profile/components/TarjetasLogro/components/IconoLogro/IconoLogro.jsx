import "./IconoLogro.css";

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
                src={props.icono}
                alt="Icono del logro"
            />
        </div>
    );
}

export default IconoLogro;
