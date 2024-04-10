import React, { useState, useEffect } from "react";
import { EvervaultCard } from "../components/aceternity/evervault-card.jsx";
import GlassCard from '../components/general/glass-card.jsx';
import MicrophoneButton from "./MicrophoneButton.jsx";
import SendButton from "./SendButton.jsx";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import TextField from "./TextField.jsx";
import "../App.css";

function SpeechBotCard(props) {

	// --- Para el reconocimiento de voz ---
	const {
        transcript,
        resetTranscript,
        browserSupportsSpeechRecognition,
		listening,
    } = useSpeechRecognition();

	// Validar que el navegador maneje reconocimiento de voz
    if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn't support speech recognition.</span>;
    }
	
	// Función para activar el micrófono
    const onClick = () => {
		console.log("Listening...")
		resetTranscript();
        SpeechRecognition.startListening({ language: 'es-MX' });
    }

	// Función para el manejo del transcript procesado
	const handleProcessedText = (processedText) => {
		props.onProcessedText(processedText);
        console.log("Results:\n", processedText);
    };


	// --- Para el input del teclado ---
	const [text, setText] = useState('');

	function handleChange(e) {
		setText(e.target.value);
	}

	// Función de apoyo para verificar funcionalidad del micrófono
	useEffect(() => {
		if (transcript != '' && listening) {
			console.log("Transcript variable: ", transcript);
			setText(transcript);
		}
	}, [text, listening, transcript]);

	return (
		<div
			className="flex flex-col items-start mx-auto p-4 relative"
			style={{
				width: props.width,
				height: props.height
			}}>

			{/* <EvervaultCard /> */}
			<div className="relative z-10 flex items-center center">
				<div className="centered-container">
					<GlassCard className="inputReconocimientoVoz" height='6rem' width='50rem' padding='0 2rem 0 2rem'>
						<MicrophoneButton onClick={onClick} isActive={listening}/>
						<TextField value={text} onChange={handleChange}/>
						<SendButton transcript={text} onProcessedText={handleProcessedText}/>
					</GlassCard >
				</div>
			</div>
		</div>
	);
}

export default SpeechBotCard;