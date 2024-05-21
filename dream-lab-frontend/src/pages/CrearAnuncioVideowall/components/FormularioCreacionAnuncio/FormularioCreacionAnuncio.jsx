import React, { useState, useEffect } from "react";
import "./FormularioCreacionAnuncio.css";
import Checkbox from "./components/Checkbox/Checkbox";
import SubirImagenBox from "./components/SubirImagenBox/SubirImagenBox";
import AgregarImagen from "../../../../assets/CrearAnuncioVideowall/agregarImagen.png";
import BotonAgregar from "./components/BotonAgregar/BotonAgregar";
import TipoAnuncioSelector from "../../components/TipoAnuncioSelector/TipoAnuncioSelector";
import { DatePicker } from "@nextui-org/react";
import { get, API_URL } from "src/utils/ApiRequests.js";
import { TimeInput } from "@nextui-org/react";
import {
    Autocomplete,
    AutocompleteItem,
    Select,
    SelectItem,
} from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { uploadFile } from "../../../../firebase/config"; // Importar la función uploadFile
import AgregarImagenError from "../../../../assets/CrearAnuncioVideowall/subirArchivoErroneo.png";

function FormularioCreacionAnuncio(props) {
    const [titulo, setTitulo] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [fecha, setFecha] = useState(null);
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFin, setHoraFin] = useState("");
    const [isCheckedSoloImage, setisCheckedSoloImage] = useState(false);
    const [enviado, setEnviado] = useState(false); // Nuevo estado para manejar el mensaje de enviado
    const [fileSeleccionado, setFileSeleccionado] = useState(null);
    const [procesandoSolicitud, setProcesandoSolicitud] = useState(false);
    const [mensajeAdvertencia, setMensajeAdvertencia] = useState(""); // Estado para el mensaje de advertencia
    const [isInvalidFile, setIsInvalidFile] = useState(false);

    const handleInvalidFileChange = (invalid) => {
        setIsInvalidFile(invalid);
    };

    const handleFileSelected = (file) => {
        // Manejar el archivo seleccionado aquí, por ejemplo, almacenarlo en el estado del formulario
        setFileSeleccionado(file);
        console.log("Archivo seleccionado:", file);
    };

    const handleTituloChange = (event) => {
        setTitulo(event.target.value);
        setCaracteresRestantesTit(30 - event.target.value.length);
    };

    const handleUbicacionChange = (event) => {
        setUbicacion(event.target.value);
    };

    const handleFechaChange = (date) => {
        setFecha(date);
    };

    const handleHoraInicioChange = (time) => {
        setHoraInicio(time);
    };

    const handleHoraFinChange = (time) => {
        setHoraFin(time);
    };

    const postData = async (anuncio) => {
        try {
            const response = await fetch(
                "https://createanuncio2-j5zt2ysdwq-uc.a.run.app",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(anuncio),
                }
            );

            if (!response.ok) {
                throw new Error("Error al enviar datos al servidor.");
            }

            console.log("Datos enviados correctamente al servidor.");
            // Después de enviar los datos satisfactoriamente, limpiar los campos y mostrar el mensaje de enviado
            setTitulo("");
            setUbicacion("");
            setFecha(null);
            setHoraInicio("");
            setHoraFin("");
            setEnviado(true);
            setCaracteresRestantesTit(30);
            setFileSeleccionado(null);
            props.actualizarAdminAnuncios();

            // Reiniciar el mensaje de enviado después de unos segundos
            setTimeout(() => {
                setEnviado(false);
            }, 3000);
        } catch (error) {
            console.error("Error al enviar datos:", error);
        } finally {
            setProcesandoSolicitud(false); // Cambiar el estado de procesando solicitud a falso
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcesandoSolicitud(true); // Cambiar el estado de procesando solicitud a verdadero

        // Validar campos obligatorios
        if (
            (!isCheckedSoloImage &&
                (!titulo ||
                    !ubicacion ||
                    !fecha ||
                    !fileSeleccionado ||
                    !horaInicio ||
                    !horaFin)) ||
            (isCheckedSoloImage && !fileSeleccionado) ||
            isInvalidFile === true
        ) {
            const errorMessage = isInvalidFile
                ? "Por favor adjunte un archivo de imagen válido."
                : isCheckedSoloImage
                ? "Por favor adjunte una imagen."
                : "Existen campos vacíos. Por favor complete todos los campos.";

            setMensajeAdvertencia(errorMessage);

            // Restablecer el mensaje de advertencia después de unos segundos
            setTimeout(() => {
                setMensajeAdvertencia("");
            }, 3000);

            setProcesandoSolicitud(false); // Cambiar el estado de procesando solicitud a falso
            return; // Detener el envío del formulario
        }

        const urlFoto = await uploadFile(fileSeleccionado); // Subir el archivo seleccionado

        const formData = {
            descripcion: "",
            encendido: true,
            fecha: formatDate(fecha),
            horaInicio: formatTime(horaInicio),
            horaFin: formatTime(horaFin),
            id: 5,
            nombreEvento: titulo,
            nombreSala: ubicacion,
            personalizado: opcionPersonalizadoSeleccionado,
            posicion: props.numeroAnuncios,
            soloImagen: isCheckedSoloImage,
            urlImagen: urlFoto,
        };

        await postData(formData);
    };

    const handleCheckboxChange = (type) => {
        if (type === "soloImagen") {
            setisCheckedSoloImage(!isCheckedSoloImage);
        }
    };

    const [
        opcionPersonalizadoSeleccionado,
        setOpcionPersonalizadoSeleccionado,
    ] = useState(false);
    const [opcionExperienciaSeleccionado, setOpcionExperienciaSeleccionado] =
        useState(true);

    const cambiarEstadoOpciones = () => {
        setOpcionPersonalizadoSeleccionado(!opcionPersonalizadoSeleccionado);
        setOpcionExperienciaSeleccionado(!opcionExperienciaSeleccionado);
        props.handleTipoAnuncioSeleccionado(
            !opcionPersonalizadoSeleccionado,
            !opcionExperienciaSeleccionado
        );
    };

    const [salasBD, setSalasBD] = useState([]);

    {
        /*  
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
        : [];*/
    }

    const formatDate = (date) => {
        if (!date) return ""; // Manejar el caso en que date sea null
        return `${date.day} de ${new Intl.DateTimeFormat("es-ES", {
            month: "long",
        }).format(new Date(date.year, date.month - 1))}, ${date.year}`;
    };

    const formatTime = (time) => {
        if (!time) return ""; // Manejar el caso en que time sea null
        const hour = time.hour.toString().padStart(2, "0"); // Agregar cero adelante si es necesario
        const minute = time.minute.toString().padStart(2, "0"); // Agregar cero adelante si es necesario
        return `${hour}:${minute}`;
    };
    const [caracteresRestantesTit, setCaracteresRestantesTit] = useState(30);

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
                <form onSubmit={handleSubmit}>
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
                                maxLength={30}
                                isDisabled={isCheckedSoloImage ? true : false}
                                value={titulo}
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
                                <Input
                                    type="text"
                                    aria-label="Selector de ubicación"
                                    placeholder="Ubicación"
                                    onChange={handleUbicacionChange}
                                    maxLength={35}
                                    isDisabled={
                                        isCheckedSoloImage ? true : false
                                    }
                                    value={ubicacion}
                                />
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
                                    value={fecha}
                                    onChange={handleFechaChange}
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
                                    value={horaInicio}
                                    onChange={handleHoraInicioChange}
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
                                    value={horaFin}
                                    onChange={handleHoraFinChange}
                                />{" "}
                            </div>
                        </div>

                        <div className="subir-imagen-div-formulario">
                            <SubirImagenBox
                                key={enviado ? "selected" : "not-selected"} // Agregar una clave que cambie cuando se seleccione o no un archivo
                                imagen={
                                    isInvalidFile
                                        ? AgregarImagenError
                                        : AgregarImagen
                                }
                                titulo={
                                    isInvalidFile
                                        ? "Archivo inválido"
                                        : "Sube una imagen"
                                }
                                advertencia={
                                    isInvalidFile
                                        ? "Formatos aceptados = " +
                                          "jpg / jpeg / png / webp / gif"
                                        : "Resolución recomendada: 2880 x 2160"
                                }
                                onFileSelected={handleFileSelected} // Asegúrate de que handleFileSelected sea una función definida en el componente padre
                                onInvalidFileChange={handleInvalidFileChange}
                            />
                        </div>
                    </div>

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
                        <button type="submit">
                            {procesandoSolicitud ? (
                                "Procesando solicitud..."
                            ) : (
                                <BotonAgregar
                                    texto={
                                        mensajeAdvertencia ? "Error" : "Agregar"
                                    }
                                    error={mensajeAdvertencia ? true : false}
                                />
                            )}
                        </button>
                    </div>
                    {mensajeAdvertencia && (
                        <p className="mensaje-enviado-anuncio">
                            {mensajeAdvertencia}
                        </p>
                    )}
                    {enviado && (
                        <p className="mensaje-enviado-anuncio">
                            ¡Datos enviados correctamente!
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}

export default FormularioCreacionAnuncio;
