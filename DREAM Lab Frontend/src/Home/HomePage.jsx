import React, { useState } from "react";
import ImageSlider from './ImageSlider'
import SpeechBotCard from './SpeechBotCard'
import '../App.css'
import RecommendationsCarousel from './RecommendationsCarousel'
import "./RecommendationsCarousel.css"
import TranscriptProcessor from "../components/general/TranscriptProcessor";

const OPTIONS = { dragFree: true, loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const unsplash_prefix = 'https://images.unsplash.com/photo-'
const unsplash_suffix = '?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
const IMAGES = [
    { 'id': 'sala-1', 'url': `${unsplash_prefix}1610194352361-4c81a6a8967e${unsplash_suffix}` },
    { 'id': 'sala-2', 'url': `${unsplash_prefix}1618202133208-2907bebba9e1${unsplash_suffix}` },
    { 'id': 'sala-3', 'url': `${unsplash_prefix}1548021682-1720ed403a5b${unsplash_suffix}` },
    { 'id': 'sala-4', 'url': `${unsplash_prefix}1496753480864-3e588e0269b3${unsplash_suffix}` },
    { 'id': 'sala-5', 'url': `${unsplash_prefix}1613346945084-35cccc812dd5${unsplash_suffix}` },
    { 'id': 'sala-6', 'url': `${unsplash_prefix}1516681100942-77d8e7f9dd97${unsplash_suffix}` },
    { 'id': 'sala-7', 'url': `${unsplash_prefix}1709777114364-f1d4da772786${unsplash_suffix}` },
    { 'id': 'sala-8', 'url': `${unsplash_prefix}1709525091854-7152bddb6d9d${unsplash_suffix}` },
    { 'id': 'sala-9', 'url': `${unsplash_prefix}1707343845208-a20c56d2c8ba${unsplash_suffix}` }
];

function HomePage() {
    const [processedTranscript, setProcessedTranscript] = useState('');

    const handleProcessedText = (processedText) => {
        setProcessedTranscript(processedText);
    };

    console.log("Processed Transcript in HomePage:", processedTranscript);

    return (
        <>
            <SpeechBotCard width='100%' height='18rem'/>
            
            <div className="carousel-container">
                <RecommendationsCarousel images={IMAGES} width='60rem' imageWidth='20rem' imageHeight='20rem' processedTranscript={processedTranscript} />
            </div>

            <br />
            <ImageSlider images={IMAGES} options={OPTIONS} />
            <br />
            <ImageSlider images={IMAGES} options={OPTIONS} />
            <br />
            <ImageSlider images={IMAGES} options={OPTIONS} />
            <br />
            <ImageSlider images={IMAGES} options={OPTIONS} />

            {/* Removed TranscriptProcessor component from here */}
        </>
    )
}

export default HomePage;
