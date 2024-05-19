import React, { useState } from "react";
import "./CrearAnuncioVideowall.css";
import BotonVisualizarVideowall from "./components/BotonVisualizarVideowall/BotonVisualizarVideowall/BotonVisualizarVideowall";
import imagenExpandir from "../../assets/CrearAnuncioVideowall/expandir.png";
import flechaSiguiente from "../../assets/CrearAnuncioVideowall/flechaSiguiente.png";
import { useNavigate } from "react-router-dom";
import FormularioCreacionAnuncio from "./components/FormularioCreacionAnuncio/FormularioCreacionAnuncio";
import Navbar from "../../GlobalComponents/NavBar/NavBar";
import AdministradorAnuncios from "../CrearAnuncioVideowall/components/AdministradorAnuncios/AdministradorAnuncios";
import FormularioPersonalizado from "../CrearAnuncioVideowall/components/FormularioPersonalizado/FormularioPersonalizado";

function CrearAnuncioVideowall() {
    let navigate = useNavigate();

    const handleClickVideowall = () => {
        navigate(`/videowall`);
    };

    const [opcionPersonalizadoSeleccionado, setOpcionPersonalizadoSeleccionado] = useState(false);
    const [opcionExperienciaSeleccionado, setOpcionExperienciaSeleccionado] = useState(true);
    const [numElementos, setNumElementos] = useState(0);

    // Define una función de callback para recibir el número de elementos desde el AdministradorAnuncios
    const handleNumElementos = (num) => {
        setNumElementos(num);
        console.log("Número de elementos:", num);
    };

    const handleTipoAnuncioSeleccionado = (opcionPersonalizado, opcionExperiencia) => {
        setOpcionPersonalizadoSeleccionado(opcionPersonalizado);
        setOpcionExperienciaSeleccionado(opcionExperiencia);
    };

    return (
        <div>
            <Navbar />

            <div className="elementos-creacion-anuncio">
                <div className="creacion-anuncio-columna-izq">
                    {opcionExperienciaSeleccionado ? (
                        <FormularioCreacionAnuncio
                            opcionPersonalizadoSeleccionado={
                                opcionPersonalizadoSeleccionado
                            }
                            opcionExperienciaSeleccionado={
                                opcionExperienciaSeleccionado
                            }
                            handleTipoAnuncioSeleccionado={
                                handleTipoAnuncioSeleccionado
                            }
                            numeroAnuncios={numElementos}
                        />
                    ) : (
                        <FormularioPersonalizado 
                            opcionPersonalizadoSeleccionado={
                                opcionPersonalizadoSeleccionado
                            }
                            opcionExperienciaSeleccionado={
                                opcionExperienciaSeleccionado
                            }
                            handleTipoAnuncioSeleccionado={
                                handleTipoAnuncioSeleccionado
                            }
                            numeroAnuncios={numElementos}
                        />
                    )}
                </div>

                <div className="creacion-anuncio-columna-der">
                    <div className="componente-visualizar-videowall-button">
                        <BotonVisualizarVideowall
                            ruta={handleClickVideowall}
                            imagenIzq={imagenExpandir}
                            frase="Visualizar videowall"
                            imagenDer={flechaSiguiente}
                        />
                    </div>

                    <div className="componente-admin-anuncios-div">
                        <AdministradorAnuncios 
                            onNumElementosChange={handleNumElementos}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CrearAnuncioVideowall;
