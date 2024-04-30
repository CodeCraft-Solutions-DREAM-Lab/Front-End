import React from "react";
import "./TipoAnuncioSelector.css";

function TipoAnuncioSelector({ opcionPersonalizadoSeleccionado, opcionExperienciaSeleccionado, funcion}) {
    
    return (
        <div className="contenedor-tipo-anuncio-selector">
            <div onClick={funcion} className={opcionExperienciaSeleccionado ? "opcion-experiencia-anuncio-selector-pressed" : "opcion-experiencia-anuncio-selector"}> Experiencia </div>
            <div  onClick={funcion} className={opcionPersonalizadoSeleccionado ? "opcion-personalizado-anuncio-selector-pressed" : "opcion-personalizado-anuncio-selector"}> Personalizado </div>
        </div>
    );
}

export default TipoAnuncioSelector;
