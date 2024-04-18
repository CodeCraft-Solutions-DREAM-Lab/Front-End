import React, { useState, useEffect } from "react";
import MicrophoneButton from "./MicrophoneButton.jsx";
import SendButton from "./SendButton.jsx";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import TextField from "./TextField.jsx";
import "../App.css";
import "../components/general/GlassCard.css";

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

  const handleProcessedText = (processedText) => {
    // Expresión regular para encontrar tipo y ID
    const regex = /(\w+),\s*Id:\s*(\d+)/g;

    // Array para almacenar las coincidencias
    const matches = [];

    // Buscar todas las coincidencias en el texto procesado
    let match;
    while ((match = regex.exec(processedText)) !== null) {
        // Agregar el tipo y el ID a las coincidencias encontradas
        matches.push({
            type: match[1], // Tipo (sala o experiencia)
            id: parseInt(match[2]) // ID convertido a número
        });
    }

    // Llamar a la función onProcessedText con las coincidencias encontradas
    props.onProcessedText(matches);
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


  const promptIdeas = [
    "Quiero hacer un robot",
    "Me interesa la ciberseguridad",
    "Quiero explorar realidad virutal",
    "Configuración de routers",
    "Tengo un proyecto de electrónica"
  ];

  /* const [items, setItems] = useState([
    'Me interesa algo de circuitos', 
    'Quiero aprender cómo funciona el internet', 
    'Me gusta experimentar con arduinos'
  ]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if(isFocused) {
      setText('');
    }

    if (clicked == 0 && transcript == "" && !listening && !isFocused) {
      
      let timeout = 0;
      setText(''); // Reset currentItemValue before typing out new item
      const currentItem = items[currentItemIndex];
      
      // Iterate over each character in the currentItem
      for (let i = 0; i < currentItem.length; i++) {
        // Delay the execution of setCurrentItemValue for each character
        setTimeout(() => {
          setText(prevValue => prevValue + currentItem[i]);
        }, timeout);
        timeout += 100; // Adjust this value to control the typing speed
      }
      
      // Set timeout to move to the next item
      setTimeout(() => {
        setCurrentItemIndex(prevIndex => (prevIndex + 1) % items.length);
      }, timeout + 500); // Add extra delay before moving to the next item
    }
  }, [clicked, currentItemIndex, items, listening, transcript]); */
    

  


  
  // Mostrar en el campo de texto lo que se está dictando
  useEffect(() => {
    if (transcript !== "" && listening) {
      console.log("Transcript variable: ", transcript);
      setText(transcript);
    }
  }, [transcript, listening]);
  
  // Mandar transcript a ser procesado al ya no detectar la voz
  useEffect(() => {
    if (clicked === 1 && transcript !== "" && !listening) {
      console.log("Clicked set to 2 automatically");
      setClicked(2);
    }
  }, [clicked, transcript, listening]);

  return (
    <div className="inputRecomendaciones glass-card">
      {browserSupportsSpeechRecognition && (
        <MicrophoneButton onClick={onClick} isActive={listening} />
      )}
      <TextField
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        texts={promptIdeas}
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
