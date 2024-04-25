import React, { useState, useEffect} from "react";
import "./Anuncios.css";
import Hora from "./components/Hora/Hora.jsx";
import InfoEvento from "./components/InfoEvento/InfoEvento.jsx";

import {useFirebaseApp} from "reactfire";

const anunciosDefault = [
    {
        id: 1,
        img: "https://media.licdn.com/dms/image/C4E12AQHTZ7pyTmCfEw/article-cover_image-shrink_720_1280/0/1541423067327?e=2147483647&v=beta&t=4fBTi39dOwxthLmtYW4RGwseAA9kAXBPUdnQa_7PKx4",
        title: "Taller de impresión 3D",
        sala: "Dimension Forge",
        date: "Lunes 15 de Febrero 3:00pm a 5:00pm",
    },
    {
        id: 2,
        img: "https://mms.businesswire.com/media/20190617005571/es/727944/5/Warner_Final_Zone5.1.jpg",
        title: "Curso de Swift",
        sala: "New Horizons",
        date: "Martes 16 de Febrero 3:00pm a 5:00pm",
    },
    {
        id: 3,
        img: "https://d1tm14lrsghf7q.cloudfront.net/public/media/23459/conversions/21386-thumb.jpg",
        title: "Seguridad en la Red",
        sala: "Electric Garage",
        date: "Miércoles 17 de Febrero 3:00pm a 5:00pm",
    },
];

function Anuncios() {
    const [data, setData] = useState(anunciosDefault);
    // Estados para manejar el anuncio mostrado y que rote automáticamente
    const [activeSlide, setActiveSlide] = useState(parseInt(Math.floor(data.length / 2)));
    const [autoRotate, setAutoRotate] = useState(true);

    const firebase = useFirebaseApp();
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


