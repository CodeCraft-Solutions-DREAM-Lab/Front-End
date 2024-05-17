/*
DIMENSIONES VIDEOWALL
7680
2160
*/
import "./Videowall.css";
import Anuncios from "./components/Anuncios/Anuncios.jsx";
import ReservacionesVideowall from "./components/ReservacionesVideowall/ReservacionesVideowall";
import HiddenInputLogger from "./components/HiddenInputLogger/HiddenInputLogger";

function Videowall() {
    return (
        <div className="container-videowall">
            <div className="container-reservaciones">
                <ReservacionesVideowall />
            </div>
            <div className="container-anuncios">
                <Anuncios />
            </div>
            <HiddenInputLogger />
        </div>
    );
}

export default Videowall;
