import React from "react";
import { Button } from "../components/aceternity/moving-border.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function MicrophoneButton() {
	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition,
	  } = useSpeechRecognition();

	if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn't support speech recognition.</span>;
	}
	  
	const onClick = () => {
		SpeechRecognition.startListening({ language: 'es-MX' });
		resetTranscript();
		console.log(transcript);
	}

	return (
		<div>
			<Button
				borderRadius="1.75rem"
				className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
				onClick={onClick}
			>
				<FontAwesomeIcon icon={faMicrophone} size="3x" />
			</Button>
		</div>
	);
}

export default MicrophoneButton;