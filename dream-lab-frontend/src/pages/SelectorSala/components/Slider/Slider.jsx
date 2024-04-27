import React, { useEffect, useState } from "react";
import "./Slider.css";
import unaPersona from "../../assets/images/onePerson.png";
import grupoPersonas from "../../assets/images/group.png";
import { getFromSessionStorage, saveToSessionStorage } from "src/utils/Storage";

function Slider({
    minimo,
    maximo,
    fetchFreeHoursAgain,
    setFetchFreeHoursAgain,
}) {
    const [value, setValue] = useState(
        parseInt(getFromSessionStorage("personas")) || minimo
    );

    // useEffect(() => {
        
    // }, [value]);

    const handleChange = (event) => {
        setValue(event.target.value);
        saveToSessionStorage("personas", event.target.value);
        setFetchFreeHoursAgain(!fetchFreeHoursAgain);
    };

    return (
        <div className="slider-out">
            <div className="texto-num-personas">
                <output htmlFor="slider" id="slider-value">
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
        </div>
    );
}

export default Slider;
