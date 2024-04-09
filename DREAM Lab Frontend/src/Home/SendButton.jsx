import { useState } from 'react';

function SendButton({ transcript, onProcessedText }) {
    const [processing, setProcessing] = useState(false);

    const processTranscript = async (transcript) => {
        try {
            setProcessing(true); // Start processing, set processing state to true
            // Simulate asynchronous processing by sending the data to the server
            console.log("processTranscript transcript var: ", transcript)
            const response = await fetch('http://localhost:3000/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt: transcript })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data.processed_text;
        } catch (error) {
            console.error('Error:', error);
            return null; // Return null in case of an error
        } finally {
            setProcessing(false); // Stop processing, set processing state to false
        }
    };

    const handleClick = async () => {
        console.log("Transcript sent to be processed: ", transcript)
        if (!transcript || processing) return; // Exit early if transcript is empty or processing is ongoing
        const processedText = await processTranscript(transcript);
        if (processedText !== null) {
            // Call onProcessedText only if processing was successful
            onProcessedText(processedText);
        }
    };

    return (
        <button className="send-button" onClick={handleClick}>
            {processing ? (
                // Render loading image when processing is ongoing
                <img src="/loading.gif" alt="Processing..." />
            ) : (
                // Render send image when not processing
                <img src="/simboloEnviar.png" alt="Enviar" />
            )}
        </button>
    );
}

export default SendButton;
