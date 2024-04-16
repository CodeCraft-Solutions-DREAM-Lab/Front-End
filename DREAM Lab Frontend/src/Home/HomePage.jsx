import { useState, useEffect } from "react";
import ImageSlider from './ImageSlider'
import SpeechBotCard from './SpeechBotCard'
import '../App.css'
import GlassCard from '../components/general/glass-card'
import UserAvatar from '../components/general/UserAvatar'
import RecomendacionesInvalidas from './RecomendacionesInvalidas';
import RecommendationsCarousel from './RecommendationsCarousel'

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
        img: 'https://img.freepik.com/fotos-premium/holograma-circuito-chip-brillante-creativo-sobre-fondo-oscuro-cpu-lugar-simulado-concepto-metaverso-representacion-3d_670147-4751.jpg',
        title: "Lorem Ipsum",
        desc:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
    },
    {
        bgColor: "#7952B3",
        img: 'https://t3.ftcdn.net/jpg/01/38/61/48/360_F_138614801_Xx5aDLUQKTXkEqVl8IBoJInJEGvqmxh9.jpg',
        title: "Lorem Ipsum",
        desc:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
    },
    {
        bgColor: "#1597BB",
        img: 'https://img.freepik.com/fotos-premium/conexion-gafas-vr-tecnologia-linea-metaverse_10221-14040.jpg',
        title: "Lorem Ipsum",
        desc:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
    },
];

function HomePage() {
    const [processedTranscript, setProcessedTranscript] = useState('');
    const [data, setData] = useState(initialData);
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [showInvalidNotice, setShowInvalidNotice] = useState(false);

    useEffect(() => {
        if (processedTranscript) {
            const fetchData = async () => {
                const newData = await Promise.all(processedTranscript.map(async (item, index) => {
                    
                    const type = item.type;
                    const id = item.id;

                    if (type === "error" || type ==="Error" || id === 0) {
                        setShowInvalidNotice(true);
                        return;
                    }
    
                    try {
                        let result;
                        if (type === "experiencias" || type === "Experiencias" || type === "experiencia" || type === "Experiencia") {
                            result = await fetch('http://localhost:3000/experiencias/' + id);
                        } else if (type === "salas" || type === "Salas" || type === "sala" || type === "Sala") {
                            result = await fetch('http://localhost:3000/salas/' + id);
                        }
    
                        if (result.ok) {
                            const data = await result.json();
                            if(type === "experiencias" || type === "Experiencias" || type === "experiencia" || type === "Experiencia"){
                                return {
                                    ...item,
                                    img: data[0].portadaURL,
                                    title: data[0].nombre,
                                    desc: data[0].descripcion
                                };
                            }
                            else{
                                return {
                                    ...item,
                                    img: data[0].fotoURL,
                                    title: data[0].nombre,
                                    desc: data[0].descripcion
                                };
                            }
                            
                        } else {
                            console.error('Error fetching ${type} with id ${id}');
                            return item; // Conservar el item original en caso de error
                        }
                    } catch (error) {
                        console.error('Error fetching ${type} with id ${id}:', error);
                        return item; // Conservar el item original en caso de error
                    }
                }));
    
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

            <SpeechBotCard width='100%' height='25rem' onProcessedText={handleProcessedText} />

            {showInvalidNotice ? (
                <RecomendacionesInvalidas />
            ) : (
                showRecommendations && (
                    <RecommendationsCarousel data={data} activeSlide={parseInt(Math.floor(data.length / 2))} />
                )
            )}

            <br />
            <ImageSlider images={IMAGES} options={OPTIONS} />
            <br />
            <ImageSlider images={IMAGES} options={OPTIONS} />
            <br />
            <ImageSlider images={IMAGES} options={OPTIONS} />
            <br />
            <ImageSlider images={IMAGES} options={OPTIONS} />
        </>
    )
}

export default HomePage;
