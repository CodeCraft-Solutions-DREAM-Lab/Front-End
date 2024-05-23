import { useState, useEffect } from "react";
import "./ReservacionesVideowall.css";
import GlassCard from "src/GlobalComponents/GlassCard/GlassCard";
import MensajeBienvenida from "../MensajeBienvenida/MensajeBienvenida";
import HiddenInputLogger from "../HiddenInputLogger/HiddenInputLogger";

// Components
import CarouselReservaciones from "./components/CarouselReservaciones/CarouselReservaciones";
import VideowallSinReservas from "./components/CarouselReservaciones/components/VideowallSinReservas/VideowallSinReservas";

function ReservacionesVideowall() {
    const [qrCode, setQrCode] = useState("");
    const [tagId, setTagId] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [reservacionesPadre, setReservacionesPadre] = useState([]);
    const [qrCodeGeneratedCount, setQrCodeGeneratedCount] = useState(0);

    const handleCerrarMensaje = () => {
        setShowMessage(false);
    };

    useEffect(() => {
        if (qrCode) {
            setShowMessage(true);

            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 200000); // 10 seconds

            // Cleanup the timer when the component unmounts or qrCode changes
            return () => clearTimeout(timer);
        }
    }, [qrCode, tagId, qrCodeGeneratedCount]);

    // Función para recibir las reservaciones desde el componente hijo
    const recibirReservaciones = (reservaciones) => {
        console.log("Reservaciones recibidas en el padre:", reservaciones);
        setReservacionesPadre(reservaciones);
    };

    const handleQrCodeGeneration = () => {
        setQrCodeGeneratedCount((prevCount) => prevCount + 1);
    };

    return (
        <div className="cr-container">
            <div className="cr-title-container">
                <GlassCard borderRadius="2vh" classes={"cr-glasscard"}>
                    <h1 className="cr-title">Reservaciones</h1>
                </GlassCard>
            </div>
            <div className="cr-carousel-container">
                <CarouselReservaciones
                    enviarReservaciones={recibirReservaciones}
                />
            </div>

            {showMessage && (
                <div className="container-mensaje-bienvenida">
                    <MensajeBienvenida
                        error={false}
                        qrCode={qrCode}
                        tagId={tagId}
                        listadoReservaciones={reservacionesPadre}
                        onClose={handleCerrarMensaje}
                    />
                </div>
            )}

            <HiddenInputLogger
                setQrCode={setQrCode}
                setTagId={setTagId}
                setQrCodeGenerated={handleQrCodeGeneration}
            />
        </div>
    );
}

export default ReservacionesVideowall;
