/*
DIMENSIONES VIDEOWALL
7680
2160
*/
import "./Videowall.css";
import Anuncios from "./components/Anuncios/Anuncios.jsx";
import CarouselReservaciones from "./components/CarouselReservaciones/CarouselReservaciones";

function Videowall() {

    return (
        <div className="container-videowall">
            <div className="container-reservaciones">
                <CarouselReservaciones />
            </div>
            <div className="container-anuncios">
                <Anuncios />
            </div>
        </div>
    );
}

export default Videowall;
