import React, { useState } from "react";
import ImageSlider from './ImageSlider'
import SpeechBotCard from './SpeechBotCard'
import '../App.css'
import GlassCard from '../components/general/glass-card'
import RecommendationsCarousel from './RecommendationsCarousel'
import "./RecommendationsCarousel.css"
import UserAvatar from '../components/general/UserAvatar'

const OPTIONS = { dragFree: true, loop: true }

const unsplash_prefix = 'https://images.unsplash.com/photo-'
const unsplash_suffix = '?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'

/*const IMAGES = [{ 'id': 'sala-1', 'url': `${unsplash_prefix}1610194352361-4c81a6a8967e${unsplash_suffix}` },
{ 'id': 'sala-2', 'url': `${unsplash_prefix}1618202133208-2907bebba9e1${unsplash_suffix}` },
{ 'id': 'sala-3', 'url': `${unsplash_prefix}1548021682-1720ed403a5b${unsplash_suffix}` },
{ 'id': 'sala-4', 'url': `${unsplash_prefix}1496753480864-3e588e0269b3${unsplash_suffix}` },
{ 'id': 'sala-5', 'url': `${unsplash_prefix}1613346945084-35cccc812dd5${unsplash_suffix}` },
{ 'id': 'sala-6', 'url': `${unsplash_prefix}1516681100942-77d8e7f9dd97${unsplash_suffix}` },
{ 'id': 'sala-7', 'url': `${unsplash_prefix}1709777114364-f1d4da772786${unsplash_suffix}` },
{ 'id': 'sala-8', 'url': `${unsplash_prefix}1709525091854-7152bddb6d9d${unsplash_suffix}` },
{ 'id': 'sala-9', 'url': `${unsplash_prefix}1707343845208-a20c56d2c8ba${unsplash_suffix}` },]*/
const IMAGES = [{ 'id': 'sala-1', 'url': '/ImagenSalaVR.png' },
{ 'id': 'Deep Net', 'url': '/ImagenUsoRouters.png' },
{ 'id': 'Testing Land', 'url': '/ImagenExpGoogle.png' },
{ 'id': 'Electric Garage', 'url': `${unsplash_prefix}1496753480864-3e588e0269b3${unsplash_suffix}` },
{ 'id': 'Electric Garage', 'url': `${unsplash_prefix}1613346945084-35cccc812dd5${unsplash_suffix}` },
{ 'id': 'Electric Garage', 'url': `${unsplash_prefix}1516681100942-77d8e7f9dd97${unsplash_suffix}` },
{ 'id': 'Electric Garage', 'url': `${unsplash_prefix}1709777114364-f1d4da772786${unsplash_suffix}` },
{ 'id': 'Curso de Swift', 'url': '/ImagenCursoSwift.png' },
{ 'id': 'Deep Net', 'url': '/ImagenConnections.png' },]

function HomePage() {
    const [processedTranscript, setProcessedTranscript] = useState('');

    const handleProcessedText = (processedText) => {
        setProcessedTranscript(processedText);
    };

    console.log("Processed Transcript in HomePage:", processedTranscript);

    return (
        <>
            <UserAvatar />
			      <GlassCard className="navbar" height='4.5rem' padding='0.5rem'>
                <div className="logo-container">
                    <img src="././LogoDreamLab.png" alt="Logo" className="logo" />
                    <h1 className="dreamlab">DREAM Lab</h1>
                </div>
            </GlassCard >

			      <SpeechBotCard width='100%' height='25rem' onProcessedText={handleProcessedText}/>
      
            
            {processedTranscript && (
                <div className="processed-transcript-container">
                    <h2>Recomendaciones: </h2>
                    <p>{processedTranscript}</p>
                </div>
            )}

            <br />
            <ImageSlider images={IMAGES} options={OPTIONS} />
            <br />
            <ImageSlider images={IMAGES} options={OPTIONS} />
            <br />
            <ImageSlider images={IMAGES} options={OPTIONS} />
            <br />
            <ImageSlider images={IMAGES} options={OPTIONS} />

			<div className="carousel-container">
                <RecommendationsCarousel images={IMAGES} width='60rem' imageWidth='20rem' imageHeight='20rem' />
            </div>
        </>
    )
}

export default HomePage;
