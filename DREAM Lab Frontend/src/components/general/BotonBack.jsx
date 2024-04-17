import React, { useState, useEffect } from "react";
import BackButton from "../../Home/Images/backButton.png";
import { useNavigate } from 'react-router-dom';

function BotonBack(props){

    let navigate = useNavigate();

    
    const handleClick = () => {
        navigate(props.ruta);
    };

    return(
        <img src={BackButton} alt="Regresar" onClick={handleClick}/>
    )
}

export default BotonBack;