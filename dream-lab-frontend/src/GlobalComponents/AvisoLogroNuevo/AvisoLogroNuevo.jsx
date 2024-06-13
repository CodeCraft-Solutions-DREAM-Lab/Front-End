import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";
import { Grid } from "@mui/material";
import propTypes from "prop-types";
import Confetti from "react-confetti";
import Musica from "src/assets/NotFound/logroNuevo.mp3";
import "./AvisoLogroNuevo.css";
import { Link } from "react-router-dom"; // Importa el componente Link de React Router

function AvisoLogroNuevo(props) {
    const [animationActive, setAnimationActive] = useState(true);
    const [isOpen, setIsOpen] = useState(props.isOpen);
    const defaultColor = "#7EA3E1"; // Color por defecto

    const reproducirTimbre = () => {
        const audio = new Audio(Musica);
        audio.play();
    };

    useEffect(() => {

        if(props.isOpen){
            reproducirTimbre();
        }
  
        // Iniciar la animación una vez cuando se monte el componente
        setAnimationActive(true);

        // Desactivar la animación después de 2 segundos
        const timeoutId = setTimeout(() => {
            setAnimationActive(false);
        }, 2000);

        // Limpiar el timeout cuando el componente se desmonte
        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        if (props.onClose) {
            props.onClose();
        }
    };

    function darkenColor(color, percent) {
        // Convertir el color hexadecimal a RGB
        let num = parseInt(color.replace("#", ""), 16);
        let amt = Math.round(2.55 * percent);
        let R = (num >> 16) - amt;
        let G = (num >> 8 & 0x00FF) - amt;
        let B = (num & 0x0000FF) - amt;
    
        // Asegurarse de que los valores RGB estén en el rango válido (0-255)
        R = Math.max(0, Math.min(255, R));
        G = Math.max(0, Math.min(255, G));
        B = Math.max(0, Math.min(255, B));
    
        // Convertir los valores RGB de vuelta a hexadecimal
        return "#" + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1);
    }
    
    // Datos del logro obtenido
    const datosLogroObtenido = props.datosLogro;

    // Color del logro y elementos oscurecidos
    const color = datosLogroObtenido.colorLogro ? datosLogroObtenido.colorLogro : defaultColor;
    const darkenedColor = darkenColor(color, 15); // Oscurecer el color un 20%
    const darkenedColor2 = darkenColor(color, 20); // Oscurecer el color un 20%

    return (
        <Modal
            size="md"
            isOpen={isOpen}
            onClose={handleClose}
            hideCloseButton={false}
            closeOnOverlayClick={true}
            data-cy="primer-recordatorio-sala"
        >
            <Confetti width={window.innerWidth} height={window.innerHeight} />
            <ModalContent className="p-8">
            <div className="nombre-logro-obtenido-anuncio-generico" style={{ color: darkenedColor}}
            data-cy="nombre-logro-obtenido">
                    {datosLogroObtenido.nombreLogro}
                </div>
                <div className="nombre-logro-obtenido-anuncio">
                    <p>Logro obtenido</p>
                </div>

                <Grid item xs={12} className="flex justify-center">
                    <div className={`circulo-foto-perfil-aviso-logro-nuevo ${
                                animationActive ? "rotate-animation" : ""
                            }`} 
                            style={{ backgroundColor: datosLogroObtenido.colorLogro }} 
                           >
                        <img
                            src={datosLogroObtenido.iconoLogro}
                            className="imagen-foto-perfil-circulo-aviso-logro-nuevo"
                            alt="Correcto logo"
                        />
                    </div>
                </Grid>

                <div className="descripcion-logro-obtenido-anuncio" data-cy="descripcion-logro-obtenido">
                    <p>{datosLogroObtenido.descripcionLogro}</p>
                </div>

                <div className="linea-logro-obtenido-anuncio"></div>

                <div className="recompensa-logro-obtenido-anuncio" style={{ color: darkenedColor2}} data-cy="puntos-ganados-logro-obtenido">
                    <p>+{datosLogroObtenido.prioridadOtorgada} punto(s) de prioridad</p>
                </div>
                <div className="total-nuevo-logro-obtenido-anuncio" data-cy="nuevo-total-logro-obtenido">
                    <p>
                        Tu nuevo total es de <b>{datosLogroObtenido.nuevaPrioridad} pts.</b>
                    </p>
                </div>

                <ModalFooter className="justify-center">
                <Link to="/profile"> {/* Enlace al componente de logros */}
                    <Button
                        className="rounded-full px-12 py-2 bg-[#40ad52] font-bold text-white hover:bg-[#31793e] hover:text-[#40ad52] border-2 border-[#40ad52]"
                        data-cy="ver-logro-boton-anuncio-generico"
                        color="primary"
                        onClick={() => {
                        }}
                        style={{ width: "200px" }}
                    >
                        Ver logro
                    </Button>
                </Link>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

AvisoLogroNuevo.propTypes = {
    size: propTypes.string,
    isOpen: propTypes.bool,
    onClose: propTypes.func,
    verLogro: propTypes.func, // Función para ver el logro
};

export default AvisoLogroNuevo;
