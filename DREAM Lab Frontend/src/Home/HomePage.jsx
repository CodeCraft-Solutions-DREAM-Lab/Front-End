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
import { get } from './Database.js';

import experienceImage1 from "./Images/electric-garage.png";
import experienceImage2 from "./Images/dimension-forge.png";
import experienceImage3 from "./Images/new-horizons.png";
import experienceImage4 from "./Images/deep-net.jpg";
import experienceImage5 from "./Images/graveyard.png";
import experienceImage6 from "./Images/pcb-factory.jpg";
import experienceImage7 from "./Images/hack-battlefield.png";
import experienceImage8 from "./Images/testing-land.jpg";
import experienceImage9 from "./Images/war-headquarters.png";
import experienceImage10 from "./Images/biometrics.jpg";
import experienceImage11 from "./Images/beyond-digits.jpg";
import experienceImage404 from "./Images/error.jpg";

const OPTIONS = { dragFree: true, loop: true }

const unsplash_prefix = 'https://images.unsplash.com/photo-'
const unsplash_suffix = '?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'

const IMAGES = [
    { 'id': '6', 'url': '/ImagenSalaVR.png' },
    { 'id': '1', 'url': '/ImagenUsoRouters.png' },
    { 'id': '2', 'url': '/ImagenExpGoogle.png' },
    { 'id': '3', 'url': `${unsplash_prefix}1496753480864-3e588e0269b3${unsplash_suffix}` },
    { 'id': '0', 'url': `${unsplash_prefix}1613346945084-35cccc812dd5${unsplash_suffix}` },
    { 'id': '5', 'url': `${unsplash_prefix}1516681100942-77d8e7f9dd97${unsplash_suffix}` },
    { 'id': '6', 'url': `${unsplash_prefix}1709777114364-f1d4da772786${unsplash_suffix}` },
    { 'id': '5', 'url': '/ImagenCursoSwift.png' },
    { 'id': '4', 'url': '/ImagenConnections.png' },
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

    const [detallesBD, setDetallesBD] = useState(null);
    const [salasBD, setSalasBD] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    function renderizarImagen() {
        const imagenURL = salasBD[imageID].nombre;
    
        switch (imagenURL) {
            case "Electric Garage":
                return experienceImage1;
            case "Dimension Forge":
                return experienceImage2;
            case "New Horizons":
                return experienceImage3;
            case "Deep Net":
                return experienceImage4;
            case "Graveyard":
                return experienceImage5;
            case "PCB Factory":
                return experienceImage6;
            case "Hack-Battlefield":
                return experienceImage7;
            case "Testing Land":
                return experienceImage8;
            case "War Headquarters":
                return experienceImage9;   
            case "Biometrics Flexible Hall":
                return experienceImage10;  
            case "Beyond-Digits":
                return experienceImage11;  
            default:
                return experienceImage404; 
        }
    }

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

    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await get('experiencias', () => setIsLoading(false), () => setIsLoading(false));
            setDetallesBD(result);
          } catch (error) {
            console.error('An error occurred:', error);
          }
    };
        
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await get('salas', () => setIsLoading(false), () => setIsLoading(false));
            setSalasBD(result);
          } catch (error) {
            console.error('An error occurred:', error);
          }
    };
        
        fetchData();
    }, []);

    const handleProcessedText = (processedText) => {
        setProcessedTranscript(processedText);
    };

    console.log("Processed Transcript in HomePage:", processedTranscript);

    if(isLoading){
        return <div>Cargando...</div>
    }
    
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
                    nombre={detallesBD[imageID]?.nombre || "Experiencia D.R.E.A.M. Lab"} 
                    descripcion = {detallesBD[imageID]?.descripcion || "Lamentamos la falta de detalles. Estamos trabajando para brindarte una experiencia completa. Agradecemos tu paciencia y esperamos compartir pronto todos los detalles contigo."}
                    autodirigido = {detallesBD[imageID]?.esAutoDirigida || false}
                    exclusivoUF = {detallesBD[imageID]?.esExclusivaUF || false}
                    imagenExp = {renderizarImagen()}
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