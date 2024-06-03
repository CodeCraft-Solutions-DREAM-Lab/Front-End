import { useState, useEffect} from "react";
import { Button } from "@nextui-org/react";
import propTypes from "prop-types";


function SalaCard({ text, bloqueada, id, updateSalaState}) {
    const [clicked, setClicked] = useState(false);
    const [resultante, setResultante] = useState();

    useEffect(() => {
		if(bloqueada){
            setResultante("bloqueada");
        }
        else{
            setResultante("no bloqueada");
        }
	}, [bloqueada]);

    const handleClick = () => {
        const newClickedState = !clicked;
        setClicked(newClickedState);
        updateSalaState(id, newClickedState);
    };

    const getBackgroundColor = () => {
        if (clicked) {
            return bloqueada ? "#1bac55" : "#A9A9A9"; // Morado si está bloqueada, Blanco si no está bloqueada
        }
        return bloqueada ? "#A9A9A9" : "#1bac55"; // Gris si está bloqueada, Verde si no está bloqueada
    };

    const getBorder = () => {
        if (clicked) {
            return "4px solid #8087F2"; // Moradito para cambios
        }
        return "none";
    };

    return (
        <Button
            className="bg-[#1bac55] text-white text-lg min-w-48 max-w-48 p-8 align-bottom shadow-md"
            style={{ backgroundColor: getBackgroundColor(), border: getBorder() }}
            onClick={handleClick}
        >
            <label className="sala-card-label text-wrap align-middle text-white" >{text}</label>
        </Button>
    );
}

SalaCard.propTypes = {
    text: propTypes.string,
    bloqueada: propTypes.bool,
    resultante: propTypes.string,
};

export default SalaCard;