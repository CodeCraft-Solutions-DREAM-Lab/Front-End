import React, { useState, useEffect } from "react";
import "./Anuncios.css";
import Hora from "./components/Hora/Hora.jsx";
import InfoEvento from "./components/InfoEvento/InfoEvento.jsx";

function Anuncios() {
    const [data, setData] = useState([]);
    // Estados para manejar el anuncio mostrado y que rote automáticamente
    const [activeSlide, setActiveSlide] = useState(parseInt(Math.floor(data.length / 2)));
    const [autoRotate, setAutoRotate] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch("https://readanuncios-j5zt2ysdwq-uc.a.run.app/");
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Funciones para rotar el carrusel
    const next = () => {
      setActiveSlide((activeSlide + 1) % data.length);
    };

    const prev = () => {
        setActiveSlide(
            activeSlide === 0 ? data.length - 1 : activeSlide - 1
        );
    };

    // Rotar cada cierto tiempo
    useEffect(() => {
        let interval;
        if (autoRotate && data.length > 0) {
            interval = setInterval(() => {
                console.log("data before next", data);
                next();
            }, 5000);
        }

        return () => clearInterval(interval);
    }, [activeSlide, autoRotate, data]);

    // Cambio de estilos dependiendo de la posición del anuncio
    const getStyles = (index) => {
        if (activeSlide === index)
            return {
                opacity: 1,
                zIndex: 10,
            };
        else
            return {
                opacity: 0,
                zIndex: 9,
            };
    };

    return (
      <div className="containerAnuncios">
                {data.map((item, i) => (
                    <React.Fragment key={i}>
                        <div
                            className="slideAnuncio"
                            style={{
                                height: '100%',
                                background: `no-repeat center/cover url(${item.urlImagen})`,
                                ...getStyles(i),
                            }}
                        >
                            <Hora/>
                            <InfoEvento {...item}/>
                        </div>
                    </React.Fragment>
                ))}
        </div>
    );
}

export default Anuncios;
