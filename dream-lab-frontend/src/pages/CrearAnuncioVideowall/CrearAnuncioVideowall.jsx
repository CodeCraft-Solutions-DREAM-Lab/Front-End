// Hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Estilos
import "./CrearAnuncioVideowall.css";

// Componentes
import BotonVisualizarVideowall from "./components/BotonVisualizarVideowall/BotonVisualizarVideowall/BotonVisualizarVideowall";
import FormularioCreacionAnuncio from "./components/FormularioCreacionAnuncio/FormularioCreacionAnuncio";
import AdministradorAnuncios from "./components/AdministradorAnuncios/AdministradorAnuncios";
import FormularioPersonalizado from "./components/FormularioPersonalizado/FormularioPersonalizado";

// Assets
import imagenExpandir from "src/assets/CrearAnuncioVideowall/expandir.webp";
import flechaSiguiente from "src/assets/CrearAnuncioVideowall/flechaSiguiente.webp";

// Global Components
import NavBarAdmin from "src/GlobalComponents/NavBarAdmin/NavBarAdmin";

// Redux
import { useDispatch } from "react-redux";
import { setActive } from "src/redux/Slices/vistaEstudianteSlice";

// Storage
import { multiClearSessionStorage } from "src/utils/Storage";

function CrearAnuncioVideowall() {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClickVideowall = () => {
        const nuevaPestana = window.open("/videowall", "_blank");
        if (nuevaPestana) {
            nuevaPestana.focus();
        } else {
            // Manejar el caso donde el navegador bloquea la apertura de la nueva pestaña
            // Puedes redirigir al usuario a la página en la misma pestaña si es necesario
            navigate("/videowall");
        }
    };

    const [
        opcionPersonalizadoSeleccionado,
        setOpcionPersonalizadoSeleccionado,
    ] = useState(false);
    const [opcionExperienciaSeleccionado, setOpcionExperienciaSeleccionado] =
        useState(true);
    const [numElementos, setNumElementos] = useState(0);
    const [actualizarAdminAnuncios, setActualizarAdminAnuncios] = useState(0);

    const handleActualizarAdminAnuncios = () => {
        setActualizarAdminAnuncios((prevState) => prevState + 1); // Incrementar el estado en 1 para indicar un cambio
    };

    // Define una función de callback para recibir el número de elementos desde el AdministradorAnuncios
    const handleNumElementos = (num) => {
        setNumElementos(num);
        console.log("Número de elementos:", num);
    };

    const handleTipoAnuncioSeleccionado = (
        opcionPersonalizado,
        opcionExperiencia
    ) => {
        setOpcionPersonalizadoSeleccionado(opcionPersonalizado);
        setOpcionExperienciaSeleccionado(opcionExperiencia);
    };

    // Limpiar estados de reservaciones, vista de estudiante y reservacion de
    // admin
    useEffect(() => {
        dispatch(setActive(false));
        multiClearSessionStorage([
            "horaInicio",
            "horaInicioIsoString",
            "duration",
            "fecha",
            "fechaIsoString",
            "personas",
            "experiencia",
            "sala",
            "idExperiencia",
            "idSala",
            "reservType",
            "materials",
            "competidores",
            "cupos",
            "formattedDate",
            "formattedTime",
            "horaCorte",
            "nameSalaExperiencia",
            "vistaEstudiante",
            "nombreReservacionAdmin",
        ]);
    }, [dispatch]);

    return (
        <div className="out-crear-anuncios-div">
            <NavBarAdmin />

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
                            actualizarAdminAnuncios={
                                handleActualizarAdminAnuncios
                            }
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
                            actualizarAdminAnuncios={
                                handleActualizarAdminAnuncios
                            }
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
                            actualizar={actualizarAdminAnuncios} // Pasar el estado para actualizar el componente
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CrearAnuncioVideowall;
