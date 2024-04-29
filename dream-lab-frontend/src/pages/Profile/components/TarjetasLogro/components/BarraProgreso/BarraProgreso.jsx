import "./BarraProgreso.css";

function BarraProgreso(props) {
    {
        return (
            <div className="div-barra-progreso">
                <div className="progress-bar">
                    <div
                        className="progress"
                        style={{ width: `${props.progresoActual * 100}%` }}
                    ></div>
                    <div className="fraction">{`${Math.round(
                        props.progresoActual * 100
                    )}%`}</div>
                </div>
            </div>
        );
    }
}

export default BarraProgreso;
