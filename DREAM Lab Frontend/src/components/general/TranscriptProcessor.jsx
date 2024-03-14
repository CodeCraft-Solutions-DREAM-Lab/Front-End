import React, { useEffect } from "react";

function TranscriptProcessor({ transcript, onProcessedText }) {
    useEffect(() => {
        const processData = async () => {
            try {
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
                onProcessedText(data.processed_text);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (transcript) { // Only initiate fetching if transcript exists
            processData();
        }
    }, [transcript, onProcessedText]);

    return null;
}

export default TranscriptProcessor;
