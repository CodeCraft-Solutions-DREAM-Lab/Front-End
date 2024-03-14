import React, { useEffect } from "react";
import { Button } from "../components/aceternity/moving-border.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import TranscriptProcessor from "../components/general/TranscriptProcessor.jsx";

function MicrophoneButton() {
    const {
        transcript,
        resetTranscript,
        browserSupportsSpeechRecognition,
		listening,
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn't support speech recognition.</span>;
    }
	
    const onClick = () => {
		resetTranscript();
        SpeechRecognition.startListening({ language: 'es-MX' });
    }

	const handleProcessedText = (processedText) => {
        // Do something with the processed text if needed
        console.log(processedText);
    };

	useEffect(() => {
		if (!listening) {
			console.log(transcript);
			resetTranscript();
		}
	}, [listening, transcript]);
	
    return (
        <div>
            <Button
                borderRadius="1.75rem"
                className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
                onClick={onClick}
            >
                <FontAwesomeIcon icon={faMicrophone} size="3x" />
            </Button>
			<TranscriptProcessor transcript={transcript} onProcessedText={handleProcessedText} />
        </div>
    );
}

export default MicrophoneButton;
