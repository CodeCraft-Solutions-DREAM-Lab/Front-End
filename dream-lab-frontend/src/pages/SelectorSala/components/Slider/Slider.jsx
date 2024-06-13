import React, { useEffect, useState } from "react";
import "./Slider.css";
import unaPersona from "src/assets/SelectorSala/onePerson.webp";
import grupoPersonas from "src/assets/SelectorSala/group.webp";
import { getFromSessionStorage, saveToSessionStorage } from "src/utils/Storage";
import {Slider, Button} from "@nextui-org/react";
import GroupIcon from "src/assets/Icons/GroupIcon";
import UserIcon from "src/assets/Icons/UserIcon";

function CustomSlider({
    minimo,
    maximo,
    fetchFreeHoursAgain,
    setFetchFreeHoursAgain,
}) {
    const [value, setValue] = useState(
        parseInt(getFromSessionStorage("personas")) || minimo
    );
    const [timeoutId, setTimeoutId] = useState(null);

    const handleChange = (val) => {

        setValue(val);
        saveToSessionStorage("personas", val);

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
            setFetchFreeHoursAgain(!fetchFreeHoursAgain);
        }, 1000); 

        setTimeoutId(newTimeoutId);
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
            <Slider
                aria-label="Volume"
                size="md"
                // color="white"
                minValue={minimo}
                maxValue={maximo}
                value={value}
                onChange={handleChange}
                classNames={{
                    filler: "bg-white",
                    thumb: "bg-white",
                    track: "border-l-white",

                    
                    // thumb: "bg-gradient-to-r from-pink-300 to-cyan-300 dark:from-pink-600 dark:to-cyan-800",
                    // filler: "bg-gradient-to-r from-pink-300 to-cyan-300 dark:from-pink-600 dark:to-cyan-800",
                  }}
                startContent={
                    <UserIcon
                        className="w-6 h-6"
                        color="#FFFFFF"
                    />
                }
                endContent={
                    <GroupIcon
                        className="w-6 h-6"
                        color="#FFFFFF"
                    />
                }
                className="max-w-md"
            />
            </div>
        </div>
    );
}

export default CustomSlider;
