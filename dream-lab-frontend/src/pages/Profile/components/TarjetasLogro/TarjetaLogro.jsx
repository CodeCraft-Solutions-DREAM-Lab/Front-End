import "./TarjetaLogro.css";
import IconoLogro from "src/GlobalComponents/IconoLogro/IconoLogro";
import BarraProgreso from "./components/BarraProgreso/BarraProgreso";

function TarjetaLogro(props) {
    {
        const logroObtenido = props.progresoLogro >= "1" ? true : false;

        return (
            <div className="div-exterior-logro">
                <div className="icono-logro">
                    <IconoLogro
                        icono={props.iconoUtilizado}
                        colorFondo={
                            logroObtenido ? props.colorFondo : "#d9d9d9"
                        }
                        opacidad={logroObtenido ? "50%" : "25%"}
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
