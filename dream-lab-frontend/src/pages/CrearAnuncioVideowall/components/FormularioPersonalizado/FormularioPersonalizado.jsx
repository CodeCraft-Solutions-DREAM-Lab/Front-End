import React, { useState, useEffect } from "react";
import "./FormularioPersonalizado.css";
import Checkbox from "../FormularioCreacionAnuncio/components/Checkbox/Checkbox";
import SubirImagenBox from "../FormularioCreacionAnuncio/components/SubirImagenBox/SubirImagenBox";
import AgregarImagen from "../../../../assets/CrearAnuncioVideowall/agregarImagen.webp";
import BotonAgregar from "../FormularioCreacionAnuncio/components/BotonAgregar/BotonAgregar";
import TipoAnuncioSelector from "../../components/TipoAnuncioSelector/TipoAnuncioSelector";
import { get } from "src/utils/ApiRequests.js";
import { Input } from "@nextui-org/react";
import { uploadFile } from "../../../../firebase/config"; // Importar la función uploadFile
import AgregarImagenError from "../../../../assets/CrearAnuncioVideowall/subirArchivoErroneo.png";

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
    const [enviado, setEnviado] = useState(false); // Nuevo estado para manejar el mensaje de enviado
    const [fileSeleccionado, setFileSeleccionado] = useState(null);
    const [procesandoSolicitud, setProcesandoSolicitud] = useState(false); // Variable de estado para indicar si se está procesando la solicitud o no
    const [mensajeAdvertencia, setMensajeAdvertencia] = useState(""); // Estado para el mensaje de advertencia
    const [isInvalidFile, setIsInvalidFile] = useState(false);

    const handleFileSelected = (file) => {
        // Manejar el archivo seleccionado aquí, por ejemplo, almacenarlo en el estado del formulario
        setFileSeleccionado(file);
        console.log("Archivo seleccionado:", file);
    };

    const handleInvalidFileChange = (invalid) => {
        setIsInvalidFile(invalid);
    };

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

    const postData = async (anuncio) => {
        try {
            const response = await fetch(
                "https://createanuncio2-j5zt2ysdwq-uc.a.run.app",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(anuncio), // Aquí pasamos directamente el objeto 'anuncio'
                }
            );

            if (!response.ok) {
                throw new Error("Error al enviar datos al servidor.");
            }

            console.log("POST:" + anuncio);

            console.log("Datos enviados correctamente al servidor.");
            // Después de enviar los datos satisfactoriamente, limpiar los campos y mostrar el mensaje de enviado
            setTitulo("");
            setDescripcion("");
            setFileSeleccionado(null);
            setCaracteresRestantesTit(30);
            setCaracteresRestantesDesc(100);
            setEnviado(true);
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

    const formatDate = (date) => {
        const options = { day: "numeric", month: "long", year: "numeric" };
        return new Intl.DateTimeFormat("es-ES", options).format(date);
    };

    const formatTime = (date) => {
        const options = { hour: "numeric", minute: "numeric" };
        return new Intl.DateTimeFormat("es-ES", options).format(date);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        setProcesandoSolicitud(true); // Cambiar el estado de procesando solicitud a verdadero

        // Validar campos obligatorios
        if (
            (!isCheckedSoloImage &&
                (!titulo || !descripcion || !fileSeleccionado)) ||
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

        // Recolectar los datos del formulario
        const fechaActual = new Date();
        const fechaYHoraInicio = new Date(
            fechaActual.getFullYear(),
            fechaActual.getMonth(),
            fechaActual.getDate(),
            13,
            0,
            0
        ); // 13:00:00
        const fechaYHoraFin = new Date(
            fechaActual.getFullYear(),
            fechaActual.getMonth(),
            fechaActual.getDate(),
            16,
            40,
            0
        ); // 16:40:00

        const urlFoto = await uploadFile(fileSeleccionado); // Subir el archivo seleccionado

        const formData = {
            descripcion: descripcion,
            encendido: true,
            fecha: formatDate(new Date()), // Convertir y formatear la fecha
            horaInicio: formatTime(fechaYHoraInicio), // Convertir y formatear la hora de inicio
            horaFin: formatTime(fechaYHoraFin), // Convertir y formatear la hora de fin
            nombreEvento: "",
            nombreSala: titulo,
            personalizado: opcionPersonalizadoSeleccionado,
            posicion: props.numeroAnuncios,
            soloImagen: isCheckedSoloImage,
            urlImagen: urlFoto,
        };

        // Enviar los datos al servidor
        await postData(formData);
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
                <form onSubmit={handleSubmit}>
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
                                data-cy="titulo-anuncio-personalizado"
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
                                    data-cy="descripcion-anuncio-personalizado"
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
                                key={enviado ? "selected" : "not-selected"} // Agregar una clave que cambie cuando se seleccione o no un archivo
                                imagen={isInvalidFile? AgregarImagenError : AgregarImagen}
                                titulo= {isInvalidFile ? "Archivo inválido" : "Sube una imagen"}
                                advertencia= {isInvalidFile ? "Formatos aceptados = " + "jpg / jpeg / png / webp / gif" : "Resolución recomendada: 2880 x 2160"}
                                onFileSelected={handleFileSelected} // Asegúrate de que handleFileSelected sea una función definida en el componente padre
                                onInvalidFileChange={handleInvalidFileChange}
                            />
                        </div>
                    </div>

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
                        <button type="submit" disabled={procesandoSolicitud}>
                            {procesandoSolicitud ? (
                                "Procesando solicitud..."
                            ) : (
                                <BotonAgregar 
                                    texto= {mensajeAdvertencia? "Error" : "Agregar" }
                                    error= {mensajeAdvertencia? true : false}
                                />
                            )}
                        </button>
                    </div>
                </form>
                {mensajeAdvertencia && (
                    <p className="mensaje-enviado-anuncio" data-cy="mensaje-advertencia-anuncio-personalizado">
                        {mensajeAdvertencia}
                    </p>
                )}
                {enviado && (
                    <p className="mensaje-enviado-anuncio" data-cy="mensaje-enviado-anuncio-personalizado">
                        ¡Datos enviados correctamente!
                    </p>
                )}
            </div>
        </div>
    );
}

export default FormularioCreacionAnuncio;
