import { useCallback, useEffect, useRef, useState } from "react";

import useEmblaCarousel from "embla-carousel-react";
import "./ImageSlider.css";
import { useDispatch } from "react-redux";
import { setSelectedItem } from "src/redux/Slices/selectedItemSlice";

import { get, post } from "src/utils/ApiRequests";
import { getFromLocalStorage } from "src/utils/Storage";

const TWEEN_FACTOR_BASE = 0.1; // The higher the number, the more the parallax effect. Default is 0.2

const ImageSlider = (props) => {
    const dispatch = useDispatch();
    const { mostrarDetalles } = props;
    const [response, setResponse] = useState([]);
    const [bdImages, setBdImages] = useState([]);

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

        // // Determinar el tipo de imagen (sala o experiencia) según el valor de setImageType
        // const isSalaImage = props.setImageType === "salas";

        // Llamar a setIsSalaClicked con el valor correspondiente
        props.setIsSalaClicked(isSalaImage);
    }

    const { options, api_url, isExperiencia, images, request_type } = props;
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

    useEffect(() => {
        const handleResponse = (setState) => {
            return (res) => {
                if (typeof res === "string") {
                    setState(JSON.parse(res));
                } else {
                    setState(res); // Assuming data is already an object
                }

                res = res.map((item) => ({
                    id: (props.setImageType==="salas"? item.idSala : item.idExperiencia),
                    isExperiencia: { isExperiencia },
                    url: item.fotoURL ? item.fotoURL : item.portadaURL,
                    title: item.nombre,
                }));
                console.log(res);
                setBdImages(res);
            };
        };

        const handleError = () => {
            return (error) => {
                console.error("Error fetching data:", error);
            };
        };

        if (api_url) {
            if (request_type === "GET") {
                get(api_url)
                    .then(handleResponse(setResponse))
                    .catch(handleError());
            } else if (request_type === "POST") {
                post(api_url, { user: getFromLocalStorage("user") })
                    .then(handleResponse(setResponse))
                    .catch(handleError());
            }
        } else {
            setBdImages(images);
        }
    }, [api_url, request_type, images, isExperiencia]);

    return (
        <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {bdImages.map((image, index) => (
                        <div className="embla__slide  " key={index}>
                            <div className="embla__parallax">
                                <div className="embla__parallax__layer">
                                    <img
                                        data-cy="imagen-experiencia"
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
