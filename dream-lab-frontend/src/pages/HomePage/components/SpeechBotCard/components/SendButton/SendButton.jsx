import { useState, useEffect } from "react";

import { API_URL } from "src/utils/ApiRequests.js";

import "./SendButton.css";

// Imagenes
import loadingIcon from "src/assets/SpeechBotCard/loading.gif";
import sendIcon from "src/assets/SpeechBotCard/simboloEnviar.png";

function SendButton({
    transcript,
    onProcessedText,
    micWasClicked,
    resetClicked,
}) {
    const [processing, setProcessing] = useState(false);

    const processTranscript = async (transcript) => {
        try {
            setProcessing(true);
            // Simulate asynchronous processing by sending the data to the server
            console.log("processTranscript transcript var: ", transcript);
            const response = await fetch(`http://127.0.0.1:5000/recomendar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: transcript }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            return data.processed_text;
        } catch (error) {
            console.error("Error:", error);
            return null; // Return null in case of an error
        } finally {
            resetClicked(0);
            console.log("Clicked reset to 0");
            setProcessing(false);
        }
    };

    const handleClick = async () => {
        console.log("Transcript sent to be processed: ", transcript);
        if (!transcript || processing) return; // Exit early if transcript is empty or processing is ongoing
        const processedText = await processTranscript(transcript);
        if (processedText !== null) {
            // Call onProcessedText only if processing was successful
            onProcessedText(processedText);
        }
    };

    useEffect(() => {
        if (micWasClicked == 2) {
            console.log("Automatically sending transcript for processing...");
            handleClick();
        }
    }, [micWasClicked]);

    return (
        <button
            data-cy="button-enviar-recomendaciones"
            className="send-button"
            onClick={handleClick}
            disabled={processing}
        >
            {processing ? (
                // Render loading image when processing is ongoing
                <img src={loadingIcon} alt="Processing..." />
            ) : (
                // Render send image when not processing
                <img src={sendIcon} alt="Enviar" />
            )}
        </button>
    );
}

export default SendButton;
