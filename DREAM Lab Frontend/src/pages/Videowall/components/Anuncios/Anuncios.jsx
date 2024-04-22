import React, { useState, useEffect} from "react";
import "./Anuncios.css";

function Anuncios(props) {
    // Estados para manejar el anuncio mostrado y que rote automáticamente
    const [activeSlide, setActiveSlide] = useState(props.activeSlide);
    const [autoRotate, setAutoRotate] = useState(true);

    console.log(props.data);


    // Funciones para rotar el carrusel
    const next = () => {
      setActiveSlide((activeSlide + 1) % props.data.length);
    };

    const prev = () => {
        setActiveSlide(
            activeSlide === 0 ? props.data.length - 1 : activeSlide - 1
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
                {props.data.map((item, i) => (
                    <React.Fragment key={i}>
                        <div
                            className="slideAnuncio"
                            style={{
                                height: '100%',
                                background: `no-repeat center/cover url(${item.img})`,
                                ...getStyles(i),
                            }}
                        ></div>
                    </React.Fragment>
                ))}
        </div>
    );
  }
  
  export default Anuncios;


