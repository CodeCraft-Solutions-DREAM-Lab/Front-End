import React, { useState, useEffect } from "react";
import "./Anuncios.css";
import Hora from "./components/Hora/Hora.jsx";
import InfoEvento from "./components/InfoEvento/InfoEvento.jsx";
import axios from "axios";

//import {useFirebaseApp} from "reactfire";

/* const anunciosDefault = [
    {
        id: 1,
        img: "",
        title: "Titulo 1",
        sala: "Sala 1",
        date: "Fecha 1",
    },
    {
        id: 2,
        img: "",
        title: "Titulo 2",
        sala: "Sala 2",
        date: "Martes 16 de Febrero 3:00pm a 5:00pm",
    },
]; */

function Anuncios() {
    const [data, setData] = useState([]);
    // Estados para manejar el anuncio mostrado y que rote automáticamente
    const [activeSlide, setActiveSlide] = useState(parseInt(Math.floor(data.length / 2)));
    const [autoRotate, setAutoRotate] = useState(true);

    useEffect(() => {
        // Realiza la solicitud HTTP la primera vez que se renderice el componente
        const fetchData = async () => {
            try {
                const response = await axios.get("https://readanuncios-j5zt2ysdwq-uc.a.run.app");
                setData(response.data); // Actualiza el estado `data` con los datos recibidos
                console.log("Data ahora es: ", data);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };

        fetchData(); // Llama a la función para realizar la solicitud HTTP
    }, []);

    //const firebase = useFirebaseApp();
    //console.log(firebase);

    //console.log("Data: ", data);


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
        if (autoRotate) {
            interval = setInterval(() => {
                next();
            }, 5000);
        }

        return () => clearInterval(interval);
    }, [activeSlide, autoRotate]);

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
                                background: `no-repeat center/cover url(${item.img})`,
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
