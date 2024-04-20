import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import useEmblaCarousel from "embla-carousel-react";
import "./ImageSlider.css";
import { useDispatch } from "react-redux";
import { setSelectedItem } from "../../../../redux/Slices/selectedItemSlice";

const TWEEN_FACTOR_BASE = 0.1; // The higher the number, the more the parallax effect. Default is 0.2

const ImageSlider = (props) => {
    const dispatch = useDispatch();
    const { mostrarDetalles } = props;

    function handleClick(idExperiencia) {
        // Determinar el tipo de imagen (sala o experiencia) según el valor de setImageType
        const isSalaImage = props.setImageType === "salas";

        if (isSalaImage) {
            dispatch(
                setSelectedItem({
                    id: idExperiencia,
                    type: "sala",
                })
            );
        } else {
            dispatch(
                setSelectedItem({
                    id: idExperiencia,
                    type: "experiencia",
                })
            );
        }

        mostrarDetalles();
        // dispatch(setExperiencia(idExperiencia));
        // saveToSessionStorage("experiencia", idExperiencia);
        props.onImageClick(idExperiencia - 1); // pasa el ID de la imagen al componente padre
        console.log("IMAGE SLIDER: " + (idExperiencia - 1));

        // // Determinar el tipo de imagen (sala o experiencia) según el valor de setImageType
        // const isSalaImage = props.setImageType === "salas";

        // Llamar a setIsSalaClicked con el valor correspondiente
        props.setIsSalaClicked(isSalaImage);
    }

    const { images, options } = props;
    console.log(images);
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const tweenFactor = useRef(0);
    const tweenNodes = useRef([]);

    const setTweenNodes = useCallback((emblaApi) => {
        tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
            return slideNode.querySelector(".embla__parallax__layer");
        });
    }, []);

    const setTweenFactor = useCallback((emblaApi) => {
        tweenFactor.current =
            TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
    }, []);

    const tweenParallax = useCallback((emblaApi, eventName) => {
        const engine = emblaApi.internalEngine();
        const scrollProgress = emblaApi.scrollProgress();
        const slidesInView = emblaApi.slidesInView();
        const isScrollEvent = eventName === "scroll";

        emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
            let diffToTarget = scrollSnap - scrollProgress;
            const slidesInSnap = engine.slideRegistry[snapIndex];

            slidesInSnap.forEach((slideIndex) => {
                if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

                if (engine.options.loop) {
                    engine.slideLooper.loopPoints.forEach((loopItem) => {
                        const target = loopItem.target();

                        if (slideIndex === loopItem.index && target !== 0) {
                            const sign = Math.sign(target);

                            if (sign === -1) {
                                diffToTarget =
                                    scrollSnap - (1 + scrollProgress);
                            }
                            if (sign === 1) {
                                diffToTarget =
                                    scrollSnap + (1 - scrollProgress);
                            }
                        }
                    });
                }

                const translate =
                    diffToTarget * (-1 * tweenFactor.current) * 100;
                const tweenNode = tweenNodes.current[slideIndex];
                tweenNode.style.transform = `translateX(${translate}%)`;
            });
        });
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        setTweenNodes(emblaApi);
        setTweenFactor(emblaApi);
        tweenParallax(emblaApi);

        emblaApi
            .on("reInit", setTweenNodes)
            .on("reInit", setTweenFactor)
            .on("reInit", tweenParallax)
            .on("scroll", tweenParallax);
    }, [emblaApi, tweenParallax]);

    return (
        <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {images.map((image, index) => (
                        <div className="embla__slide  " key={image.id}>
                            <div className="embla__parallax">
                                <div className="embla__parallax__layer">
                                    <img
                                        className="embla__slide__img embla__parallax__img"
                                        src={image.url}
                                        alt="Your alt text"
                                        onClick={() => handleClick(image.id)}
                                        draggable="false"
                                        onContextMenu={(e) =>
                                            e.preventDefault()
                                        }
                                    />
                                </div>
                            </div>
                            <p className="slide-title">{image.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageSlider;
