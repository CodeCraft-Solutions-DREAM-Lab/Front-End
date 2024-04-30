import React from "react";
import "./FormularioCreacionAnuncio.css";
import { useState } from "react";
import Checkbox from "./components/Checkbox/Checkbox";
import SubirImagenBox from "./components/SubirImagenBox/SubirImagenBox";
import AgregarImagen from "../../../../assets/CrearAnuncioVideowall/agregarImagen.png";
import BotonAgregar from "./components/BotonAgregar/BotonAgregar";
import SelectorPersonalizado from "./components/SelectorPersonalizado/SelectorPersonalizado";
import TipoAnuncioSelector from "../../components/TipoAnuncioSelector/TipoAnuncioSelector"


function FormularioCreacionAnuncio(props) {
    const [isCheckedSoloImage, setisCheckedSoloImage] = useState(false);
    const [isCheckedMensajePersonalizado, setisCheckedMensajePersonalizado] =
        useState(false);

    const handleCheckboxChange = (type) => {
        if (type === "soloImagen") {
            setisCheckedSoloImage(!isCheckedSoloImage);
        } else if (type === "mensajePersonalizado") {
            setisCheckedMensajePersonalizado(!isCheckedMensajePersonalizado);
        }
    };

    const [opcionPersonalizadoSeleccionado, setOpcionPersonalizadoSeleccionado] = useState(false);
    const [opcionExperienciaSeleccionado, setOpcionExperienciaSeleccionado] = useState(true);


    // Función para cambiar el estado de las opciones
    const cambiarEstadoOpciones = () => {
        setOpcionPersonalizadoSeleccionado(!opcionPersonalizadoSeleccionado);
        setOpcionExperienciaSeleccionado(!opcionExperienciaSeleccionado);
    };

    return (
        <div className="div-exterior-formulario-creacion-anuncio">

            <div className="formulario-primera-mitad">
                <div className="formulario-primera-mitad-pt1"><h1 className="sub-formulario">{props.titulo}Agregar anuncio</h1></div>
                <div className="formulario-primera-mitad-pt2">
                    <TipoAnuncioSelector
                        opcionExperienciaSeleccionado={opcionExperienciaSeleccionado}
                        opcionPersonalizadoSeleccionado={opcionPersonalizadoSeleccionado}
                        funcion={cambiarEstadoOpciones}
                    />
                </div>
            </div>

            <div className="formulario-creacion-anuncio">
                <form>
                    <div className="experiencia-anuncio-formulario">
                        <label className="label-formulario-anuncio">
                            Nombre de la experiencia
                        </label>{" "}
                        <br></br>
                        <input
                            className="input-formulario-anuncio"
                            type="text"
                            placeholder="Nombre de la experiencia"
                        />
                        <div className="sala-fecha-anuncio-formulario">
                            <div className="formulario-sala-pregunta">
                                <label className="label-formulario-anuncio">
                                    Sala
                                </label>{" "}
                                <br></br>
                                <SelectorPersonalizado />
                            </div>

                            <div className="formulario-fecha-pregunta">
                                <label className="label-formulario-anuncio">
                                    Fecha
                                </label>{" "}
                                <br></br>
                                <SelectorPersonalizado />
                            </div>
                        </div>
                    </div>

                    <div className="contenedor-mitad-2-formulario">
                        <div className="horario-div-anuncio-formulario">
                            <div className="formulario-horario-pregunta">
                                <label className="label-formulario-anuncio">
                                    Hora de inicio
                                </label>{" "}
                                <br></br>
                                <SelectorPersonalizado />
                                <div className="espacio-forms"></div>
                                <label className="label-formulario-anuncio">
                                    Hora de fin
                                </label>{" "}
                                <br></br>
                                <SelectorPersonalizado />
                            </div>
                        </div>

                        <div className="subir-imagen-div-formulario">
                            <SubirImagenBox
                                imagen={AgregarImagen}
                                titulo="Sube una imagen"
                                advertencia="Resolución recomendada: 2880 x 2160"
                            />
                        </div>
                    </div>
                </form>

                <div className="checkbox-formulario-anuncio">
                    <Checkbox
                        label="Solo imagen"
                        isChecked={isCheckedSoloImage}
                        handleCheckboxChange={() =>
                            handleCheckboxChange("soloImagen")
                        }
                    />
                </div>

                <div className="boton-agregar-div-out">
                    <BotonAgregar />
                </div>
            </div>
        </div>
    );
}

export default FormularioCreacionAnuncio;
