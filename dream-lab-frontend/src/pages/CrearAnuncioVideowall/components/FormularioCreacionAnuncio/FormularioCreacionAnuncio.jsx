import React from "react";
import "./FormularioCreacionAnuncio.css";
import { useState, useEffect } from "react";
import Checkbox from "./components/Checkbox/Checkbox";
import SubirImagenBox from "./components/SubirImagenBox/SubirImagenBox";
import AgregarImagen from "../../../../assets/CrearAnuncioVideowall/agregarImagen.png";
import BotonAgregar from "./components/BotonAgregar/BotonAgregar";
import SelectorPersonalizado from "./components/SelectorPersonalizado/SelectorPersonalizado";
import TipoAnuncioSelector from "../../components/TipoAnuncioSelector/TipoAnuncioSelector";
import HoraSelector from "./components/HoraSelector/HoraSelector";
import { DatePicker } from "@nextui-org/react";
import { get, API_URL } from "src/utils/ApiRequests.js";
import { TimeInput } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
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

    const [selectedOption, setSelectedOption] = useState("");

    const handleSelectChange = (value) => {
        setSelectedOption(value);
    };

    const handleInputChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const staticOptions = salasBD
        ? salasBD.map((sala) => ({
              label: sala.nombre,
              value: sala.idSala.toString(),
          }))
        : [];

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
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
                            {isCheckedSoloImage === true ? (
                                <Input
                                    type="text"
                                    aria-label="Selector de sala"
                                    placeholder="Título del anuncio"
                                    isDisabled
                                />
                            ) : (
                                <Input
                                    type="text"
                                    aria-label="Selector de sala"
                                    placeholder="Título del anuncio"
                                />
                            )}
                        </div>
                        <div className="sala-fecha-anuncio-formulario">
                            <div className="formulario-sala-pregunta">
                                <label className="label-formulario-anuncio">
                                    Ubicación
                                </label>{" "}
                                <br></br>
                                {isCheckedSoloImage === true ? (
                                    <Autocomplete
                                        defaultItems={staticOptions}
                                        aria-label="Selector de sala"
                                        placeholder="Ingresa la ubicación"
                                        className="max-w-xs"
                                        allowsCustomValue
                                        isDisabled
                                    >
                                        {(sala) => (
                                            <AutocompleteItem key={sala.value}>
                                                {sala.label}
                                            </AutocompleteItem>
                                        )}
                                    </Autocomplete>
                                ) : (
                                    <Autocomplete
                                        defaultItems={staticOptions}
                                        aria-label="Selector de sala"
                                        placeholder="Ingresa la ubicación"
                                        className="max-w-xs"
                                        allowsCustomValue
                                    >
                                        {(sala) => (
                                            <AutocompleteItem key={sala.value}>
                                                {sala.label}
                                            </AutocompleteItem>
                                        )}
                                    </Autocomplete>
                                )}
                            </div>

                            <div className="formulario-fecha-pregunta flex flex-col mx-0">
                                <label className="label-formulario-anuncio">
                                    Fecha
                                </label>
                                {isCheckedSoloImage === true ? (
                                    <DatePicker
                                        aria-label="Selector de fecha"
                                        isDisabled
                                    />
                                ) : (
                                    <DatePicker aria-label="Selector de fecha" />
                                )}
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
                                {isCheckedSoloImage === true ? (
                                    <TimeInput
                                        label={null}
                                        isDisabled
                                        aria-label="Selector de hora de inicio"
                                    />
                                ) : (
                                    <TimeInput
                                        label={null}
                                        aria-label="Selector de hora de inicio"
                                    />
                                )}
                                <div className="espacio-forms"></div>
                                <label className="label-formulario-anuncio">
                                    Hora de fin
                                </label>{" "}
                                <br></br>
                                {isCheckedSoloImage === true ? (
                                    <TimeInput
                                        label={null}
                                        isDisabled
                                        aria-label="Selector de hora de fin"
                                    />
                                ) : (
                                    <TimeInput
                                        label={null}
                                        aria-label="Selector de hora de fin"
                                    />
                                )}{" "}
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
