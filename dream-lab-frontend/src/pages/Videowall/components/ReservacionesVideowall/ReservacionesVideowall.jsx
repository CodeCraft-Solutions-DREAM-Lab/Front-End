import { useState, useEffect } from "react";
import "./ReservacionesVideowall.css";
import GlassCard from "src/GlobalComponents/GlassCard/GlassCard";
import CarouselReservaciones from "./components/CarouselReservaciones/CarouselReservaciones";
import MensajeBienvenida from "../MensajeBienvenida/MensajeBienvenida";
import HiddenInputLogger from "../HiddenInputLogger/HiddenInputLogger";

function ReservacionesVideowall() {
    const [qrCode, setQrCode] = useState("");
    const [tagId, setTagId] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [reservacionesPadre, setReservacionesPadre] = useState([]);
    
    const handleCerrarMensaje = () => {
        setShowMessage(false);
    };

    useEffect(() => {
        if (qrCode) {
            setShowMessage(true);

            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 20000); // 10 seconds

            // Cleanup the timer when the component unmounts or qrCode changes
            return () => clearTimeout(timer);
        }
    }, [qrCode, tagId]);

    // Función para recibir las reservaciones desde el componente hijo
    const recibirReservaciones = (reservaciones) => {
        console.log("Reservaciones recibidas en el padre:", reservaciones);
        setReservacionesPadre(reservaciones);
    };

    return (
        <div className="cr-container">
            <div className="cr-title-container">
                <GlassCard borderRadius="2vh" classes={"cr-glasscard"}>
                    <h1 className="cr-title">Reservaciones</h1>
                </GlassCard>
            </div>
            <div className="cr-carousel-container">
                <CarouselReservaciones enviarReservaciones={recibirReservaciones}/>
            </div>

            {showMessage && 
            <div className="container-mensaje-bienvenida">
                <MensajeBienvenida error={false} qrCode={qrCode} tagId={tagId} listadoReservaciones={reservacionesPadre} onClose={handleCerrarMensaje}/>
            </div>}

            <HiddenInputLogger setQrCode={setQrCode} setTagId={setTagId}/>
        </div>
    );
}

export default ReservacionesVideowall;
