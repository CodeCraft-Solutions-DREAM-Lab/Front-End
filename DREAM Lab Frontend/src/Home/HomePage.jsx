import React, { useState, useEffect, useRef } from "react";
import ImageSlider from './ImageSlider'
import SpeechBotCard from './SpeechBotCard'
import '../App.css'
import GlassCard from '../components/general/glass-card'
import RecommendationsCarousel from './RecommendationsCarousel'
import "./RecommendationsCarousel.css"
import UserAvatar from '../components/general/UserAvatar'
import TypeText from './TypeText'
import NCarruselRecomendaciones from './NCarruselRecomendaciones'
import Detalles from './Detalles.jsx';

const OPTIONS = { dragFree: true, loop: true }

const unsplash_prefix = 'https://images.unsplash.com/photo-'
const unsplash_suffix = '?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'

const IMAGES = [
    { 'id': 'sala-1', 'url': '/ImagenSalaVR.png' },
    { 'id': 'Deep Net', 'url': '/ImagenUsoRouters.png' },
    { 'id': 'Testing Land', 'url': '/ImagenExpGoogle.png' },
    { 'id': 'Electric Garage', 'url': `${unsplash_prefix}1496753480864-3e588e0269b3${unsplash_suffix}` },
    { 'id': 'Electric Garage', 'url': `${unsplash_prefix}1613346945084-35cccc812dd5${unsplash_suffix}` },
    { 'id': 'Electric Garage', 'url': `${unsplash_prefix}1516681100942-77d8e7f9dd97${unsplash_suffix}` },
    { 'id': 'Electric Garage', 'url': `${unsplash_prefix}1709777114364-f1d4da772786${unsplash_suffix}` },
    { 'id': 'Curso de Swift', 'url': '/ImagenCursoSwift.png' },
    { 'id': 'Deep Net', 'url': '/ImagenConnections.png' },
];

const initialData = [
    {
        bgColor: "#F54748",
        img: '/ImagenSalaVR.png',
        title: "Lorem Ipsum",
        desc:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
    },
    {
        bgColor: "#7952B3",
        img: '/ImagenSalaVR.png',
        title: "Lorem Ipsum",
        desc:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
    },
    {
        bgColor: "#1597BB",
        img: '/ImagenSalaVR.png',
        title: "Lorem Ipsum",
        desc:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
    },
];

function HomePage() {
    const [processedTranscript, setProcessedTranscript] = useState('');
    const [data, setData] = useState(initialData);
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [detallesVisible, setDetallesVisible] = useState(false);
    const [imageID, setImageID] = useState(null); // Nuevo estado para imageID
    const detallesRef = useRef(null);

    // Función para mostrar Detalles
    const mostrarDetalles = () => {
      setDetallesVisible(true);
    };

    // Manejador de eventos para detectar clics fuera de Detalles
    const handleClickOutsideDetalles = (event) => {
        // Si el apartado de detalles existe && el lugar donde se presionó no está conteindo en detalles = oculta detalles
        if (detallesRef.current && !detallesRef.current.contains(event.target)) {
            setDetallesVisible(false);
        }
    };

    const handleImageClick = (imageId) => {
        setImageID(imageId); // Actualiza el imageID cuando se hace clic en una imagen
    };

    useEffect(() => {
        if (processedTranscript) {
            const recommendations = processedTranscript.split(/\d+\.\s+/).filter(item => item.trim() !== '');
            const newData = initialData.slice(0, recommendations.length);
            newData.forEach((item, index) => {
                item.title = recommendations[index];
            });
            setData(newData);
            setShowRecommendations(true);
            setDetallesVisible(true); // Mostrar detalles cuando se actualiza processedTranscript
        }
    
        // Agregar el event listener cuando se monta el componente
        document.addEventListener("mousedown", handleClickOutsideDetalles);
    
        // Limpiar el event listener cuando se desmonta el componente
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideDetalles);
        };
    }, [processedTranscript]);

    const handleProcessedText = (processedText) => {
        setProcessedTranscript(processedText);
    };


    console.log("Processed Transcript in HomePage:", processedTranscript);
    return (
        <>
            <GlassCard className="navbar" height='4.5rem' padding='0.5rem'>
                <div className="flex items-center justify-between w-full">
                    <div className="logo-container">
                        <img src="/LogoDreamLab.png" alt="Logo" className="logo" />
                        <h1 className="dreamlab">DREAM Lab</h1>
                    </div>
                    <div className="user-avatar-container">
                        <UserAvatar />
                    </div>
                </div>
            </GlassCard >
            
            <div ref={detallesRef}>
                {detallesVisible && <Detalles 
                    nombre = "VR EXPERIENCE"
                    descripcion = "¡Explora el Mundo Virtual: Un Viaje Educativo en Realidad Virtual! Únete a nosotros en nuestra escuela para una experiencia única donde los estudiantes se sumergirán en la magia de la realidad virtual. Desde viajar a lugares exóticos hasta aventurarse en mundos históricos, cada experiencia ofrecerá una nueva perspectiva y un aprendizaje interactivo."
                    imageID={imageID} // Pasa el imageID como prop al componente Detalles
                />}
            </div>

            <SpeechBotCard width='100%' height='25rem' onProcessedText={handleProcessedText}/>

            {showRecommendations && (
                <NCarruselRecomendaciones data={data} activeSlide={parseInt(Math.floor(data.length / 2))} />
            )}

            <br />
            <ImageSlider images={IMAGES} options={OPTIONS} mostrarDetalles={mostrarDetalles} onImageClick={handleImageClick}/>
            <br />
            <ImageSlider images={IMAGES} options={OPTIONS} mostrarDetalles={mostrarDetalles} onImageClick={handleImageClick}/>
            <br />
            <ImageSlider images={IMAGES} options={OPTIONS} mostrarDetalles={mostrarDetalles} onImageClick={handleImageClick}/>
            <br />
            <ImageSlider images={IMAGES} options={OPTIONS} mostrarDetalles={mostrarDetalles} onImageClick={handleImageClick}/>

            <TypeText
                title='Title'
                words={[
                    {
                        text: "Build",
                    },
                    {
                        text: "awesome",
                    },
                    {
                        text: "apps",
                    },
                    {
                        text: "with",
                    },
                    {
                        text: "Aceternity.",
                        className: "text-blue-500 dark:text-blue-500",
                    },
                ]} />
        </>
    )
}

export default HomePage;
