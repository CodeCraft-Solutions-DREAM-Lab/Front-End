import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronRight,
    faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./RecommendationsCarousel.css";
import { useNavigate } from "react-router-dom";

import { saveToSessionStorage } from "src/utils/Storage";

function RecomendationsCarousel(props) {
    const [activeSlide, setActiveSlide] = useState(props.activeSlide);

    const [autoRotate, setAutoRotate] = useState(true);

    const stopRotating = () => {
        setAutoRotate(false);
    };

    const next = () => {
        setActiveSlide((activeSlide + 1) % props.data.length);
    };

    const prev = () => {
        setActiveSlide(
            activeSlide === 0 ? props.data.length - 1 : activeSlide - 1
        );
    };

    const handleDotClick = (index) => {
        setActiveSlide(index);
        stopRotating();
    };

    useEffect(() => {
        let interval;
        if (autoRotate) {
            interval = setInterval(() => {
                next();
            }, 5000);
        }

        return () => clearInterval(interval);
    }, [activeSlide, autoRotate]);

    const getStyles = (index) => {
        if (activeSlide === index)
            return {
                opacity: 1,
                transform: "translateX(0px) translateZ(0px) rotateY(0deg)",
                zIndex: 10,
            };
        else if (activeSlide - 1 === index)
            return {
                opacity: 1,
                transform:
                    "translateX(-240px) translateZ(-400px) rotateY(35deg)",
                zIndex: 9,
            };
        else if (activeSlide + 1 === index)
            return {
                opacity: 1,
                transform:
                    "translateX(240px) translateZ(-400px) rotateY(-35deg)",
                zIndex: 9,
            };
        else if (activeSlide - 2 === index)
            return {
                opacity: 1,
                transform:
                    "translateX(-480px) translateZ(-500px) rotateY(35deg)",
                zIndex: 8,
            };
        else if (activeSlide + 2 === index)
            return {
                opacity: 1,
                transform:
                    "translateX(480px) translateZ(-500px) rotateY(-35deg)",
                zIndex: 8,
            };
        else if (index < activeSlide - 2)
            return {
                opacity: 0,
                transform:
                    "translateX(-480px) translateZ(-500px) rotateY(35deg)",
                zIndex: 7,
            };
        else if (index > activeSlide + 2)
            return {
                opacity: 0,
                transform:
                    "translateX(480px) translateZ(-500px) rotateY(-35deg)",
                zIndex: 7,
            };
    };

    const getStylesDots = (index) => {
        if (activeSlide === index)
            return {
                backgroundColor: "#ffffff",
            };
    };

    return (
        <>
            {/* carousel */}
            <div className="slideC" data-cy="container-recomendaciones">
                {props.data.map((item, i) => (
                    <React.Fragment key={i}>
                        <div
                            className="slide"
                            style={{
                                background: `linear-gradient(to right, rgba(0, 0, 0, 0.5) 40%, transparent), no-repeat center/cover url(${item.img})`,
                                boxShadow: `0 5px 20px ${item.bgColor}30`,
                                ...getStyles(i),
                            }}
                        >
                            <SliderContent
                                {...item}
                                index={i}
                                onClick={setActiveSlide}
                                activeSlide={activeSlide}
                                stopRotating={stopRotating}
                            />
                        </div>
                    </React.Fragment>
                ))}
            </div>
            {/* carousel */}

            <div className="btns">
                <FontAwesomeIcon
                    data-cy="flecha-izquierda-recomendaciones"
                    className="btn"
                    onClick={() => {
                        prev();
                        stopRotating();
                    }}
                    icon={faChevronLeft}
                    color="#fff"
                    size="2x"
                />

                <div className="dots">
                    {props.data.map((item, i) => (
                        <div
                            key={i}
                            className="dot"
                            style={getStylesDots(i)}
                            onClick={() => handleDotClick(i)}
                        />
                    ))}
                </div>

                <FontAwesomeIcon
                    data-cy="flecha-derecha-recomendaciones"
                    className="btn"
                    onClick={() => {
                        next();
                        stopRotating();
                    }}
                    icon={faChevronRight}
                    color="#fff"
                    size="2x"
                />
            </div>
        </>
    );
}

const SliderContent = (props) => {
    let navigate = useNavigate();

    function handleClick() {
        props.stopRotating();
        if (props.index === props.activeSlide) {

            if (props.isExperiencia) {
                saveToSessionStorage("idExperiencia", props.id);
                saveToSessionStorage("reservType", "experiencia");
            } else {
                saveToSessionStorage("idSala", props.id);
                saveToSessionStorage("reservType", "sala");
            }

            navigate(`/reservacion/sala`);
        } else {
            props.onClick(props.index);
        }
    }

    return (
        <div className="sliderContent" onClick={handleClick}>
            {props.icon}
            <h2 data-cy="titulo-recomendaciones">{props.title}</h2>
            <div className="textContainer">
                <p data-cy="descripcion-recomendaciones">{props.desc}</p>
            </div>
        </div>
    );
};

export default RecomendationsCarousel;
