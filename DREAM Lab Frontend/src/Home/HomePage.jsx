import { useState, useEffect, useRef } from "react";
import ImageSlider from "./ImageSlider";
import SpeechBotCard from "./SpeechBotCard";
import "../App.css";
import RecommendationsCarousel from "./RecommendationsCarousel";
import RecomendacionesInvalidas from "./RecomendacionesInvalidas";
import Navbar from "../components/general/NavBar.jsx"; // Import the Navbar component
import "./HomePage.css";
import {
    getFromLocalStorage,
    removeFromSessionStorage,
    removeReservationDataFromSessionStorage,
} from "../Global/Storage.js";

import { get, post } from "../Global/Database.js";
import Detalles from "./Detalles.jsx";

import LoadingScreen from "../Global/LoadingScreen.jsx";

const OPTIONS = { dragFree: true, loop: true, startIndex: 0 };

const unsplash_prefix = "https://images.unsplash.com/photo-";
const unsplash_suffix =
    "?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80";

const IMAGES = [
    { id: "1", url: "/ImagenSalaVR.png", title: "Sala VR" },
    { id: "2", url: "/ImagenUsoRouters.png", title: "Deep Net" },
    { id: "3", url: "/ImagenExpGoogle.png", title: "Testing Land" },
    {
        id: "4",
        url: `${unsplash_prefix}1496753480864-3e588e0269b3${unsplash_suffix}`,
        title: "Electric Garage",
    },
    {
        id: "5",
        url: `${unsplash_prefix}1613346945084-35cccc812dd5${unsplash_suffix}`,
        title: "Electric Garage",
    },
    {
        id: "6",
        url: `${unsplash_prefix}1516681100942-77d8e7f9dd97${unsplash_suffix}`,
        title: "Electric Garage",
    },
    {
        id: "7",
        url: `${unsplash_prefix}1709777114364-f1d4da772786${unsplash_suffix}`,
        title: "Electric Garage",
    },
    { id: "8", url: "/ImagenCursoSwift.png", title: "Curso de Swift" },
    { id: "9", url: "/ImagenConnections.png", title: "Deep Net" },
    { id: "10", url: "/ImagenCursoSwift.png", title: "Curso de Swift" },
    { id: "11", url: "/ImagenConnections.png", title: "Deep Net" },
];

const initialData = [
    {
        bgColor: "#F54748",
        id: 1,
        img: "https://img.freepik.com/fotos-premium/holograma-circuito-chip-brillante-creativo-sobre-fondo-oscuro-cpu-lugar-simulado-concepto-metaverso-representacion-3d_670147-4751.jpg",
        title: "Lorem Ipsum",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
        bgColor: "#7952B3",
        id: 1,
        img: "https://t3.ftcdn.net/jpg/01/38/61/48/360_F_138614801_Xx5aDLUQKTXkEqVl8IBoJInJEGvqmxh9.jpg",
        title: "Lorem Ipsum",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
        bgColor: "#1597BB",
        id: 1,
        img: "https://img.freepik.com/fotos-premium/conexion-gafas-vr-tecnologia-linea-metaverse_10221-14040.jpg",
        title: "Lorem Ipsum",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
];

function HomePage() {
    const [processedTranscript, setProcessedTranscript] = useState("");
    const [data, setData] = useState(initialData);
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [showInvalidNotice, setShowInvalidNotice] = useState(false);
    const [experiences, setExperiences] = useState([]);
    const [ufs, setUfs] = useState([]);
    const [salas, setSalas] = useState([]);
    const [isLoadingSalas, setIsLoadingSalas] = useState(false);
    const [errorSalas, setErrorSalas] = useState(null);
    const [isLoadingUfs, setIsLoadingUfs] = useState(false);
    const [errorUfs, setErrorUfs] = useState(null);
    const [isLoadingExperiences, setIsLoadingExperiences] = useState(false);
    const [errorExperiences, setErrorExperiences] = useState(null);

    const [detallesVisible, setDetallesVisible] = useState(false);
    const [imageID, setImageID] = useState(null); // Nuevo estado para imageID
    const detallesRef = useRef(null);
    const [detallesBD, setDetallesBD] = useState(null);
    const [salasBD, setSalasBD] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSalaClicked, setIsSalaClicked] = useState(false);

    const handleResponse = (setState) => {
        return (response) => {
            if (typeof response === "string") {
                setState(JSON.parse(response));
            } else {
                setState(response); // Assuming data is already an object
            }
        };
    };

    const handleError = (setError) => {
        return (error) => {
            console.error("Error fetching data:", error);
            setError(error);
        };
    };

    // Función para mostrar Detalles
    const mostrarDetalles = () => {
        setDetallesVisible(true);
    };

    const handleCloseDetalles = () => {
        setDetallesVisible(false);
    };

    // Manejador de eventos para detectar clics fuera de Detalles
    const handleClickOutsideDetalles = (event) => {
        // Si el apartado de detalles existe && el lugar donde se presionó no está conteindo en detalles = oculta detalles
        if (
            detallesRef.current &&
            !detallesRef.current.contains(event.target)
        ) {
            setDetallesVisible(false);
        }
    };

    const handleImageClick = (imageId) => {
        setImageID(imageId); // Actualiza el imageID cuando se hace clic en una imagen
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideDetalles);
        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutsideDetalles
            );
        };
    }, [detallesRef]);

    useEffect(() => {
        if (processedTranscript) {
            const fetchData = async () => {
                const newData = await Promise.all(
                    processedTranscript.map(async (item, index) => {
                        const type = item.type;
                        const id = item.id;

                        if (type === "error" || type === "Error" || id === 0) {
                            setShowInvalidNotice(true);
                            return;
                        }

                        try {
                            let result;
                            if (
                                type === "experiencias" ||
                                type === "Experiencias" ||
                                type === "experiencia" ||
                                type === "Experiencia"
                            ) {
                                result = await fetch(
                                    "http:localhost:3000/experiencias/" + id
                                );
                            } else if (
                                type === "salas" ||
                                type === "Salas" ||
                                type === "sala" ||
                                type === "Sala"
                            ) {
                                result = await fetch(
                                    "http:localhost:3000/salas/" + id
                                );
                            }

                            if (result.ok) {
                                const data = await result.json();
                                if (
                                    type === "experiencias" ||
                                    type === "Experiencias" ||
                                    type === "experiencia" ||
                                    type === "Experiencia"
                                ) {
                                    return {
                                        ...item,
                                        id: id,
                                        isExperiencia: true,
                                        idSala: data[0].idSala,
                                        img: data[0].portadaURL,
                                        title: data[0].nombre,
                                        desc: data[0].descripcion,
                                    };
                                } else {
                                    return {
                                        ...item,
                                        id: id,
                                        isExperiencia: false,
                                        idSala: data[0].idSala,
                                        img: data[0].fotoURL,
                                        title: data[0].nombre,
                                        desc: data[0].descripcion,
                                    };
                                }
                            } else {
                                console.error(
                                    "Error fetching ${type} with id ${id}"
                                );
                                return item; // Conservar el item original en caso de error
                            }
                        } catch (error) {
                            console.error(
                                "Error fetching ${type} with id ${id}:",
                                error
                            );
                            return item; // Conservar el item original en caso de error
                        }
                    })
                );

                if (!showInvalidNotice) {
                    setData(newData);
                    setShowRecommendations(true);
                }
            };

            fetchData();
        }
    }, [processedTranscript]);

    const handleProcessedText = (processedText) => {
        setProcessedTranscript(processedText);
    };

    useEffect(() => {
        removeReservationDataFromSessionStorage();

        setIsLoadingSalas(true);
        setErrorSalas(null);

        setIsLoadingExperiences(true);
        setErrorExperiences(null);

        setIsLoadingUfs(true);
        setErrorUfs(null);

        const userID = getFromLocalStorage("user");

        get("salas")
            .then(handleResponse(setSalas))
            .catch(handleError(setErrorSalas))
            .finally(() => setIsLoadingSalas(false));

        get("experiencias/autodirigidas")
            .then(handleResponse(setExperiences))
            .catch(handleError(setErrorExperiences))
            .finally(() => setIsLoadingExperiences(false));

        post("experiencias/UFs", { user: userID })
            .then(handleResponse(setUfs))
            .catch(handleError(setErrorUfs))
            .finally(() => setIsLoadingUfs(false));
    }, []);

    useEffect(() => {
        get(
            "experiencias",
            () => setIsLoading(false),
            () => setIsLoading(false)
        )
            .then((result) => {
                setDetallesBD(result);
            })
            .catch((error) => {
                console.error("An error occurred:", error);
            });

        get(
            "salas",
            () => setIsLoading(false),
            () => setIsLoading(false)
        )
            .then((result) => {
                setSalasBD(result);
            })
            .catch((error) => {
                console.error("An error occurred:", error);
            });
    }, []);

    if (isLoading) {
        return <LoadingScreen isLoading={isLoading} />;
    }

    return (
        <>
            <Navbar view="homeAlumno" autoHide={!detallesVisible} />
            {/* Use the Navbar component */}
            <div className="background-container">
                <div className="home-background-image-container">
                    <div className="left-blobs-container">
                        <img
                            src="/src/images/blob-left.png"
                            alt="Left Image"
                            className="left-image"
                        />
                        <img
                            src="/src/images/small-blob.png"
                            alt="Mini blob"
                            className="mini-blob"
                        />
                    </div>
                    <img
                        src="/src/images/blob-right.png"
                        alt="Right Image"
                        className="right-image"
                    />
                </div>
            </div>
            <div className="page-content">
                <div ref={detallesRef}>
                    {detallesVisible && (
                        <Detalles
                            nombre={
                                isSalaClicked
                                    ? salasBD[imageID]?.nombre ||
                                      "Experiencia D.R.E.A.M. Lab"
                                    : detallesBD[imageID]?.nombre ||
                                      "Experiencia D.R.E.A.M. Lab"
                            }
                            descripcion={
                                isSalaClicked
                                    ? salasBD[imageID]?.descripcion ||
                                      "Lamentamos la falta de detalles..."
                                    : detallesBD[imageID]?.descripcion ||
                                      "Lamentamos la falta de detalles..."
                            }
                            autodirigido={
                                isSalaClicked
                                    ? salasBD[imageID]?.esAutoDirigida || false
                                    : detallesBD[imageID]?.esAutoDirigida ||
                                      false
                            }
                            exclusivoUF={
                                isSalaClicked
                                    ? salasBD[imageID]?.esExclusivaUF || false
                                    : detallesBD[imageID]?.esExclusivaUF ||
                                      false
                            }
                            imagenExp={
                                isSalaClicked
                                    ? salasBD[imageID]?.detallesURL ||
                                      "https://dreamlabstorage.blob.core.windows.net/archivos/error.jpg"
                                    : salasBD[detallesBD[imageID].idSala - 1]
                                          ?.detallesURL ||
                                      "https://dreamlabstorage.blob.core.windows.net/archivos/error.jpg"
                            }
                            handleClose={handleCloseDetalles}
                            imageID={imageID}
                            idSalaProp = {imageID + 1}
                        />
                    )}
                </div>
                <SpeechBotCard
                    height="25rem"
                    onProcessedText={handleProcessedText}
                />
                {showInvalidNotice ? (
                    <RecomendacionesInvalidas />
                ) : (
                    showRecommendations && (
                        <RecommendationsCarousel
                            data={data}
                            activeSlide={parseInt(Math.floor(data.length / 2))}
                        />
                    )
                )}
                <div className="carousel-container">
                    <h1>RECOMENDACIONES</h1>
                    <ImageSlider
                        images={IMAGES}
                        titles={IMAGES.map((item) => item.title)}
                        options={OPTIONS}
                        mostrarDetalles={mostrarDetalles}
                        onImageClick={handleImageClick}
                    />
                </div>
                <div className="carousel-container">
                    {salas.length > 0 && !isLoadingSalas && (
                        <>
                            <h1>SALAS</h1>
                            <ImageSlider
                                images={salas.map((sala) => ({
                                    id: sala.idSala,
                                    isExperiencia: false,
                                    url: sala.fotoURL,
                                    title: sala.nombre,
                                }))}
                                options={OPTIONS}
                                mostrarDetalles={mostrarDetalles}
                                onImageClick={handleImageClick}
                                setIsSalaClicked={setIsSalaClicked}
                                setImageType="salas"
                            />
                        </>
                    )}
                </div>
                <div className="carousel-container">
                    {experiences.length > 0 && !isLoadingExperiences && (
                        <>
                            <h1>PRÁCTICAS AUTODIRIGIDAS</h1>
                            <ImageSlider
                                images={experiences.map((experience) => ({
                                    id: experience.idExperiencia,
                                    isExperiencia: true,
                                    url: experience.portadaURL,
                                    title: experience.nombre,
                                }))}
                                options={OPTIONS}
                                mostrarDetalles={mostrarDetalles}
                                onImageClick={handleImageClick}
                                setIsSalaClicked={setIsSalaClicked}
                                setImageType="experiencias"
                            />
                        </>
                    )}
                </div>
                <div className="carousel-container">
                    {ufs.length > 0 && !isLoadingUfs && (
                        <>
                            <h1>UNIDADES DE FORMACIÓN</h1>
                            <ImageSlider
                                images={ufs.map((uf) => ({
                                    id: uf.idExperiencia,
                                    isExperiencia: true,
                                    url: uf.portadaURL,
                                    title: uf.nombre,
                                }))}
                                options={OPTIONS}
                                mostrarDetalles={mostrarDetalles}
                                onImageClick={handleImageClick}
                                setIsSalaClicked={setIsSalaClicked}
                                setImageType="experiencias"
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default HomePage;
