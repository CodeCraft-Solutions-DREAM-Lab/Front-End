import React, { useEffect } from "react";

function TranscriptProcessor({ transcript, onProcessedText }) {
    // Function to process transcript text
    const processTranscript = async (transcript) => {
        try {
            // Simulate asynchronous processing by sending the data to the server
            const response = await fetch('http://localhost:5000/process_text', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text_input: transcript })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data.processed_text;
        } catch (error) {
            console.error('Error:', error);
            return null; // Return null in case of an error
        }
    };

    useEffect(() => {
        const processData = async () => {
            if (!transcript) return; // Exit early if transcript is empty
            const processedText = await processTranscript(transcript);
            if (processedText !== null) {
                // Call onProcessedText only if processing was successful
                onProcessedText(processedText);
            }
        };

        processData();
    }, [transcript, onProcessedText]);

    return null;
}

export default TranscriptProcessor;
