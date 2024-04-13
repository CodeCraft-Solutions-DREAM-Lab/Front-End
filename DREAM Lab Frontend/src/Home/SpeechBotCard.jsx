import React, { useState, useEffect } from "react";
import GlassCard from "../components/general/glass-card.jsx";
import MicrophoneButton from "./MicrophoneButton.jsx";
import SendButton from "./SendButton.jsx";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import TextField from "./TextField.jsx";
import "../App.css";
import "../components/general/glass-card.css";

function SpeechBotCard(props) {
  // --- Para el reconocimiento de voz ---
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
    listening,
  } = useSpeechRecognition();

  const [clicked, setClicked] = useState(0);

  // Función para activar el micrófono
  const onClick = () => {
    setClicked(1);
    console.log("Listening...");
    resetTranscript();
    SpeechRecognition.startListening({ language: "es-MX" });
  };

  // Función para el manejo del transcript procesado
  const handleProcessedText = (processedText) => {
    props.onProcessedText(processedText);
    console.log("Results:\n", processedText);
  };

  // --- Para el input del teclado ---
  const [text, setText] = useState("");

  function handleChange(e) {
    setText(e.target.value);
  }

  // Mandar transcript a ser procesado al presionar "Enter" en el teclado
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setClicked(2);
      console.log("Clicked set to 2 from key press");
    }
  };

  useEffect(() => {
    // Mostrar en el campo de texto lo que se está dictando
    if (transcript != "" && listening) {
      console.log("Transcript variable: ", transcript);
      setText(transcript);
    }

    // Mandar transcript a ser procesado al ya no detectar la voz
    if (clicked == 1 && transcript != "" && !listening) {
      console.log("Clicked set to 2 automatically");
      setClicked(2);
    }
  }, [text, listening, transcript]);

  return (
    <div className="inputRecomendaciones glass-card">
      {browserSupportsSpeechRecognition && (
        <MicrophoneButton onClick={onClick} isActive={listening} />
      )}
      <TextField
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <SendButton
        transcript={text}
        onProcessedText={handleProcessedText}
        micWasClicked={clicked}
        resetClicked={setClicked}
      />
    </div>
  );
}

export default SpeechBotCard;
