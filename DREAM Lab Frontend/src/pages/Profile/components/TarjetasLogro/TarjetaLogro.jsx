import "./TarjetaLogro.css";
import IconoLogro from "./components/IconoLogro/IconoLogro";
import BarraProgreso from "./components/BarraProgreso/BarraProgreso";

function TarjetaLogro(props) {
    {
        const logroObtenido = props.progresoLogro >= "1" ? true : false;

        return (
            <div className="div-exterior-logro">
                <div className="icono-logro">
                    <IconoLogro
                        icono={props.iconoUtilizado}
                        logroDesbloqueado={logroObtenido}
                        colorFondo={props.colorFondo}
                    />
                </div>

                <div className="div-info-logro">
                    <h1
                        className={
                            logroObtenido
                                ? "nombre-logro-desbloqueado"
                                : "nombre-logro-bloqueado"
                        }
                    >
                        {props.nombreLogro}
                    </h1>
                    <h2 className="descripcion-logro">{props.descripcion}</h2>

                    <BarraProgreso progresoActual={props.progresoLogro} />
                </div>
            </div>
        );
    }
}

export default TarjetaLogro;
