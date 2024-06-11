import React, { useEffect, useState } from "react";
import "./Slider.css";
import unaPersona from "src/assets/SelectorSala/onePerson.webp";
import grupoPersonas from "src/assets/SelectorSala/group.webp";
import { getFromSessionStorage, saveToSessionStorage } from "src/utils/Storage";

import {Slider, Button} from "@nextui-org/react";

function CustomSlider({
    minimo,
    maximo,
    fetchFreeHoursAgain,
    setFetchFreeHoursAgain,
}) {
    const [value, setValue] = useState(
        parseInt(getFromSessionStorage("personas")) || minimo
    );

    const handleChange = (event) => {
        setValue(event.target.value);
        saveToSessionStorage("personas", event.target.value);
        setFetchFreeHoursAgain(!fetchFreeHoursAgain);
    };

    const setOnePerson = () => {
        if (getFromSessionStorage("personas") == null) {
            saveToSessionStorage("personas", 1);
        }
    };

    useEffect(() => {
        setOnePerson();
    }, []);

    return (
        <div className="Custom-out" data-cy="slider-container-personas">
            <div className="texto-num-personas">
                <output
                    htmlFor="slider"
                    id="slider-value"
                    data-cy="slider-output-texto"
                >
                    {" "}
                    {value} personas{" "}
                </output>
            </div>
            <div className="slider-container-in">
                <img className="foto-una-persona" src={unaPersona} />
                <input
                    type="range"
                    min={minimo}
                    max={maximo}
                    value={value}
                    onChange={handleChange}
                    className="range-slider"
                />
                <img className="foto-grupo" src={grupoPersonas} />
            </div>
            <div className="slider-container-in">
            {/* <Slider
                aria-label="Volume"
                size="lg"
                color="success"
                value={value}
                onChange={setValue}
                startContent={
                
                    <img className="foto-una-persona" src={unaPersona} />
                
                }
                endContent={
                
                    <img className="foto-grupo" src={grupoPersonas} />
                
                }
                className="max-w-md"
            /> */}
            </div>
        </div>
    );
}

export default CustomSlider;
