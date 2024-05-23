import React from "react";
import "./TipoAnuncioSelector.css";

function TipoAnuncioSelector({ opcionPersonalizadoSeleccionado, opcionExperienciaSeleccionado, funcion}) {
    
    return (
        <div className="contenedor-tipo-anuncio-selector">
            <div onClick={funcion} className={opcionExperienciaSeleccionado ? "opcion-experiencia-anuncio-selector-pressed" : "opcion-experiencia-anuncio-selector" }  data-cy="tipo-formulario-evento-boton"> Evento </div>
            <div  onClick={funcion} className={opcionPersonalizadoSeleccionado ? "opcion-personalizado-anuncio-selector-pressed" : "opcion-personalizado-anuncio-selector"} data-cy="tipo-formulario-personalizado-boton"> Personalizado </div>
        </div>
    );
}

export default TipoAnuncioSelector;
