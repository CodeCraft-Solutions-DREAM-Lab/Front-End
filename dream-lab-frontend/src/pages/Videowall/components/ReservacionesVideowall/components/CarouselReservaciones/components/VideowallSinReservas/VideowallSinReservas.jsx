import "./VideowallSinReservas.css";
import CalendarioLogo from "src/assets/Profile/calendario2.webp";
import QRCode from "react-qr-code";

function AnuncioSinReservas() {
    return (
        <div className="vsr-outer-container">
            <div className="vsr-no-reservas-container">
                <img
                    className="vsr-no-reservas-imagen"
                    src={CalendarioLogo}
                    alt="Imagen de calendario."
                />
                <h1 className="vsr-no-reservas-titulo">
                    No existen reservaciones
                </h1>
            </div>
            <div className="vsr-qr-code-container-outer">
                <h1 className="vsr-qr-code-titulo">Reserva aquí</h1>
                <div className="vsr-qr-code-container-inner">
                    {
                        <QRCode
                            className="w-full h-full"
                            value="https://www.dreamlab.world/login"
                        />
                    }
                </div>
            </div>
        </div>
    );
}

export default AnuncioSinReservas;
