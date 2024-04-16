import React, { useState } from 'react';
import './Slider.css'; 
import unaPersona from '../Home/Images/onePerson.png'
import grupoPersonas from '../Home/Images/group.png'


function Slider({minimo, maximo}) {
  const [value, setValue] = useState(Math.floor(maximo/2)); 

  const handleChange = (event) => {
    setValue(event.target.value); 
  };

  return (
    <div className="slider-out">

        <div className='texto-num-personas'><output htmlFor="slider" id="slider-value"> {value} personas </output></div>
        <div className='slider-container-in'>
            <img className='foto-una-persona' src={unaPersona}/>
            <input type="range" min={minimo} max={maximo} value={value} onChange={handleChange} className="range-slider"/>
            <img className='foto-grupo' src={grupoPersonas}/>
        </div>
    </div>
  );
}

export default Slider;
