import React, { useRef, useEffect } from "react";

import "./TextField.css";

function TextField({ value, onChange, onKeyDown }) {
    const inputRef = useRef(null);

    useEffect(() => {
        // Scroll the input field to the end whenever the value changes
        if (inputRef.current) {
            inputRef.current.scrollLeft = inputRef.current.scrollWidth;
        }
    }, [value]);

    return (
        <input
            ref={inputRef}
            name="asistente de voz"
            className="text-field"
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder="Escribe o habla para pedir una recomendación"
        />
    );
}

export default TextField;
