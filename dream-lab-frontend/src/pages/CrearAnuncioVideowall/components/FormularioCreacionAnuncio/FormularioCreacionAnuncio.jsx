import React from "react";
import "./FormularioCreacionAnuncio.css";
import { useState, useEffect } from "react";
import Checkbox from "./components/Checkbox/Checkbox";
import SubirImagenBox from "./components/SubirImagenBox/SubirImagenBox";
import AgregarImagen from "../../../../assets/CrearAnuncioVideowall/agregarImagen.png";
import BotonAgregar from "./components/BotonAgregar/BotonAgregar";
import TipoAnuncioSelector from "../../components/TipoAnuncioSelector/TipoAnuncioSelector";
import { DatePicker } from "@nextui-org/react";
import { get, API_URL } from "src/utils/ApiRequests.js";
import { TimeInput } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Input } from "@nextui-org/react";

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

    const [
        opcionPersonalizadoSeleccionado,
        setOpcionPersonalizadoSeleccionado,
    ] = useState(false);
    const [opcionExperienciaSeleccionado, setOpcionExperienciaSeleccionado] =
        useState(true);

    // Función para cambiar el estado de las opciones
    const cambiarEstadoOpciones = () => {
        setOpcionPersonalizadoSeleccionado(!opcionPersonalizadoSeleccionado);
        setOpcionExperienciaSeleccionado(!opcionExperienciaSeleccionado);
        props.handleTipoAnuncioSeleccionado(
            !opcionPersonalizadoSeleccionado,
            !opcionExperienciaSeleccionado
        );
    };

    const [salasBD, setSalasBD] = useState([]);

    useEffect(() => {
        get("salas")
            .then((result) => {
                setSalasBD(result);
                console.log(result);
            })
            .catch((error) => {
                console.error("An error occurred:", error);
            });
    }, []);

    const staticOptions = salasBD
        ? salasBD.map((sala) => ({
              label: sala.nombre,
              value: sala.idSala.toString(),
          }))
        : [];

    const [titulo, setTitulo] = useState("");
    const [caracteresRestantesTit, setCaracteresRestantesTit] = useState(50);

    // Contador: Título de anuncio
    const handleTituloChange = (event) => {
        const inputTitulo = event.target.value;
        const remainingChars = 50 - inputTitulo.length;
        setTitulo(inputTitulo);
        setCaracteresRestantesTit(remainingChars);
    };

    return (
        <div className="div-exterior-formulario-creacion-anuncio">
            <div className="formulario-primera-mitad">
                <div className="formulario-primera-mitad-pt1">
                    <h1 className="sub-formulario">
                        {props.titulo}Agregar anuncio
                    </h1>
                </div>
                <div className="formulario-primera-mitad-pt2">
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

            <div className="formulario-creacion-anuncio">
                <form>
                    <div className="experiencia-anuncio-formulario">
                        <label className="label-formulario-anuncio">
                            Título
                        </label>{" "}
                        <br></br>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Input
                                type="text"
                                aria-label="Selector de sala"
                                placeholder="Título del anuncio"
                                onChange={handleTituloChange}
                                maxLength={50}
                                isDisabled={isCheckedSoloImage ? true : false}
                            />
                        </div>
                        <div className="footer-input-formulario-anuncio">
                            ({caracteresRestantesTit} caracteres restantes)
                        </div>
                        <div className="sala-fecha-anuncio-formulario">
                            <div className="formulario-sala-pregunta">
                                <label className="label-formulario-anuncio">
                                    Ubicación
                                </label>{" "}
                                <br></br>
                                <Autocomplete
                                    defaultItems={staticOptions}
                                    aria-label="Selector de sala"
                                    placeholder="Ingresa la ubicación"
                                    className="max-w-xs"
                                    allowsCustomValue
                                    maxLength={35}
                                    isDisabled={
                                        isCheckedSoloImage ? true : false
                                    }
                                >
                                    {(sala) => (
                                        <AutocompleteItem key={sala.value}>
                                            {sala.label}
                                        </AutocompleteItem>
                                    )}
                                </Autocomplete>
                            </div>

                            <div className="formulario-fecha-pregunta flex flex-col mx-0">
                                <label className="label-formulario-anuncio">
                                    Fecha
                                </label>

                                <DatePicker
                                    aria-label="Selector de fecha"
                                    isDisabled={
                                        isCheckedSoloImage ? true : false
                                    }
                                />
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
                                <TimeInput
                                    label={null}
                                    aria-label="Selector de hora de inicio"
                                    isDisabled={
                                        isCheckedSoloImage ? true : false
                                    }
                                />
                                <div className="espacio-forms"></div>
                                <label className="label-formulario-anuncio">
                                    Hora de fin
                                </label>{" "}
                                <br></br>
                                <TimeInput
                                    label={null}
                                    aria-label="Selector de hora de fin"
                                    isDisabled={
                                        isCheckedSoloImage ? true : false
                                    }
                                />{" "}
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
