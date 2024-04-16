import React, { useRef, useState, useEffect } from "react";

function TextField({ value, onChange, onKeyDown, texts }) {
  const inputRef = useRef(null);

  useEffect(() => {
    // Scroll the input field to the end whenever the value changes
    if (inputRef.current) {
      inputRef.current.scrollLeft = inputRef.current.scrollWidth;
    }
  }, [value]);



  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [paused, setPaused] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    let timeoutId;

    const simulateTyping = (text, index) => {
      if (index === text.length) {
        // Move to the next text after typing completes
        timeoutId = setTimeout(() => {
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
          setDisplayedText('');
          setPaused(false); // Resume text generation for the next text
        }, 1000); // Add delay before switching to the next text
        return;
      }

      timeoutId = setTimeout(() => {
        setDisplayedText((prevText) => prevText + text.charAt(index));
        simulateTyping(text, index + 1);
      }, 100); // Adjust typing speed here
    };

    if (!paused && !isFocused) {
      const currentText = texts[currentTextIndex];
      simulateTyping(currentText, 0);
    }

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
    };
  }, [texts, currentTextIndex, paused, isFocused]);

  const handleInputClick = () => {
    setPaused(true);
    setDisplayedText('');
  };

  const handleInputChange = (event) => {
    setDisplayedText(event.target.value);
    setPaused(true); // Pause text generation when user starts typing
  };

  const handleInputBlur = () => {
    if (displayedText === '') {
      setPaused(false); // Resume text generation if user hasn't typed anything
    }
    setIsFocused(false);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  /* const handleFocus = () => {
    console.log("handleFocus: Focus currently set to: ", focusedState);
    onFocused(false);
    console.log("After isFocused: ", focusedState);
  };

  const handleBlur = () => {
    console.log("handleBlur: Focus currently set to: ", focusedState);
    onFocused(true);
    console.log("After isFocused: ", focusedState);
  }; */

  return (
    <input
      ref={inputRef}
      name="asistente de voz"
      className="text-field"
      value={displayedText} //value
      onClick={handleInputClick}
      onChange={handleInputChange} //onChange
      onKeyDown={onKeyDown}
      onBlur={handleInputBlur} // Trigger handleBlur when input loses focus
      onFocus={handleInputFocus}
    />
  );
}

export default TextField;
