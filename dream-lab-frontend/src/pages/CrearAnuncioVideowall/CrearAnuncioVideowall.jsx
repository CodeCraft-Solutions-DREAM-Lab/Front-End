import React from "react";
import "./CrearAnuncioVideowall.css";
import BotonVisualizarVideowall from "./components/BotonVisualizarVideowall/BotonVisualizarVideowall/BotonVisualizarVideowall";
import imagenExpandir from "../../assets/CrearAnuncioVideowall/expandir.webp";
import flechaSiguiente from "../../assets/CrearAnuncioVideowall/flechaSiguiente.webp";
import { useNavigate } from "react-router-dom";
import FormularioCreacionAnuncio from "./components/FormularioCreacionAnuncio/FormularioCreacionAnuncio";
import Navbar from "../../GlobalComponents/NavBar/NavBar";
import AdministradorAnuncios from "../CrearAnuncioVideowall/components/AdministradorAnuncios/AdministradorAnuncios";
import TipoAnuncioSelector from "./components/TipoAnuncioSelector/TipoAnuncioSelector";
import NavBarAdmin from "../../GlobalComponents/NavBarAdmin/NavBarAdmin";

function CrearAnuncioVideowall() {

    let navigate = useNavigate();

    const handleClickVideowall = () => {
        navigate(`/videowall`);
    };

    return(
        <div>
            
            <NavBarAdmin/>

            <div className="elementos-creacion-anuncio">

                <div className="creacion-anuncio-columna-izq">
                    <FormularioCreacionAnuncio/>
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
                        <AdministradorAnuncios/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CrearAnuncioVideowall;