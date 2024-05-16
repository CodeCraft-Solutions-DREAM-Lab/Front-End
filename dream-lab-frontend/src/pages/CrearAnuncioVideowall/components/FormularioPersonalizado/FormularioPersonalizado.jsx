import React, { useState, useEffect } from "react";
import "./FormularioPersonalizado.css";
import Checkbox from "../FormularioCreacionAnuncio/components/Checkbox/Checkbox";
import SubirImagenBox from "../FormularioCreacionAnuncio/components/SubirImagenBox/SubirImagenBox";
import AgregarImagen from "../../../../assets/CrearAnuncioVideowall/agregarImagen.png";
import BotonAgregar from "../FormularioCreacionAnuncio/components/BotonAgregar/BotonAgregar";
import TipoAnuncioSelector from "../../components/TipoAnuncioSelector/TipoAnuncioSelector";
import { get } from "src/utils/ApiRequests.js";
import { Input } from "@nextui-org/react";

function FormularioCreacionAnuncio(props) {
    const [isCheckedSoloImage, setisCheckedSoloImage] = useState(false);
    const [
        opcionPersonalizadoSeleccionado,
        setOpcionPersonalizadoSeleccionado,
    ] = useState(true);
    const [opcionExperienciaSeleccionado, setOpcionExperienciaSeleccionado] =
        useState(false);
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [caracteresRestantesTit, setCaracteresRestantesTit] = useState(50);
    const [caracteresRestantesDesc, setCaracteresRestantesDesc] = useState(100);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "titulo") {
            const remainingChars = 50 - value.length;
            setTitulo(value);
            setCaracteresRestantesTit(remainingChars);
        } else if (name === "descripcion") {
            const remainingChars = 100 - value.length;
            setDescripcion(value);
            setCaracteresRestantesDesc(remainingChars);
        }
    };

    useEffect(() => {
        get("salas")
            .then((result) => {
                // Lógica para manejar el resultado
            })
            .catch((error) => {
                console.error("An error occurred:", error);
            });
    }, []);

    const handleCheckboxChange = (type) => {
        if (type === "soloImagen") {
            setisCheckedSoloImage(!isCheckedSoloImage);
        }
    };

    const cambiarEstadoOpciones = () => {
        setOpcionPersonalizadoSeleccionado(!opcionPersonalizadoSeleccionado);
        setOpcionExperienciaSeleccionado(!opcionExperienciaSeleccionado);
        props.handleTipoAnuncioSeleccionado(
            !opcionPersonalizadoSeleccionado,
            !opcionExperienciaSeleccionado
        );
    };

    return (
        <div className="div-exterior-formulario-creacion-anuncio-personalizado">
            <div className="formulario-primera-mitad-personalizado">
                <div className="formulario-primera-mitad-pt1-personalizado">
                    <h1 className="sub-formulario-personalizado">
                        {props.titulo}Agregar anuncio
                    </h1>
                </div>
                <div className="formulario-primera-mitad-pt2-personalizado">
                    <TipoAnuncioSelector
                        opcionExperienciaSeleccionado={
                            opcionExperienciaSeleccionado
                        }
                        opcionPersonalizadoSeleccionado={
                            opcionPersonalizadoSeleccionado
                        }
                        funcion={cambiarEstadoOpciones}
                    />
                </div>
            </div>

            <div className="formulario-creacion-anuncio-personalizado">
                <form>
                    <div className="experiencia-anuncio-formulario-personalizado">
                        <label className="label-formulario-anuncio-personalizado">
                            Título
                        </label>{" "}
                        <br></br>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Input
                                type="text"
                                aria-label="Selector de sala"
                                placeholder="Título del anuncio"
                                name="titulo"
                                value={titulo}
                                onChange={handleInputChange}
                                maxLength={50}
                                isDisabled={isCheckedSoloImage ? true : false}
                            />
                        </div>
                        <p className="footer-input-formulario-anuncio">
                            ({caracteresRestantesTit} caracteres restantes)
                        </p>
                        <div className="mitad2-personalizado-crear-anuncio">
                            <label className="label-formulario-anuncio-personalizado">
                                Descripción
                            </label>{" "}
                            <br></br>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Input
                                    type="text"
                                    aria-label="Selector de sala"
                                    placeholder="Descripción del anuncio"
                                    name="descripcion"
                                    value={descripcion}
                                    onChange={handleInputChange}
                                    maxLength={100}
                                    isDisabled={
                                        isCheckedSoloImage ? true : false
                                    }
                                />
                            </div>
                            <p className="footer-input-formulario-anuncio">
                                ({caracteresRestantesDesc} caracteres restantes)
                            </p>
                        </div>
                    </div>

                    <div className="contenedor-mitad-2-formulario-personalizado">
                        <div className="subir-imagen-div-formulario-personalizado">
                            <SubirImagenBox
                                imagen={AgregarImagen}
                                titulo="Sube una imagen"
                                advertencia="Resolución recomendada: 2880 x 2160"
                            />
                        </div>
                    </div>
                </form>

                <div className="checkbox-formulario-anuncio-personalizado">
                    <Checkbox
                        label="Solo imagen"
                        isChecked={isCheckedSoloImage}
                        handleCheckboxChange={() =>
                            handleCheckboxChange("soloImagen")
                        }
                    />
                </div>

                <div className="boton-agregar-div-out-personalizado">
                    <BotonAgregar />
                </div>
            </div>
        </div>
    );
}

export default FormularioCreacionAnuncio;
