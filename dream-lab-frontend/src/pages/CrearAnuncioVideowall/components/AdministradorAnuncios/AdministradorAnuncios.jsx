import React, { useState } from "react";
import "./AdministradorAnuncios.css";
import TarjetaAnuncio from "./components/TarjetaAnuncio";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function AdministradorAnuncios(props) {
    const [datosAnuncios, setDatosAnuncios] = useState([
        {
            id: "1",
            sala: "Sala Horizons",
            experiencia: "VR Experience",
            descripcion: "",
            hora: "13:00 - 15:00",
            dia: "15 de diciembre",
            encendido: true,
            imagen: "https://firebasestorage.googleapis.com/v0/b/dream-lab-videowall.appspot.com/o/AnuncioSeminarioCiberseguridad.jpeg?alt=media&token=44017c35-7e65-49d3-b526-e0043db6b3ab",
            soloImagen: true,
            personalizado: false,
        },
        {
            id: "2",
            sala: "Sala Sunset",
            experiencia: "AR Adventure",
            descripcion: "",
            hora: "10:00 - 12:00",
            dia: "16 de diciembre",
            encendido: true,
            imagen: "https://firebasestorage.googleapis.com/v0/b/dream-lab-videowall.appspot.com/o/ElectricGarage.jpg?alt=media&token=d0e7fe74-4103-4b6b-97b6-18e37172978d",
            soloImagen: false,
            personalizado: false,
        },
        {
            id: "3",
            sala: "Sala Galaxy",
            experiencia: "Space Exploration",
            descripcion:
                "Explora el espacio con la realidad virtual. ¡Vive la experiencia el día de las madres!",
            hora: "15:00 - 17:00",
            dia: "17 de diciembre",
            encendido: true,
            imagen: "https://firebasestorage.googleapis.com/v0/b/dream-lab-videowall.appspot.com/o/TallerDeImpresion3D.jpeg?alt=media&token=902c0779-3519-4ad6-81c7-29cfe26c0379",
            soloImagen: false,
            personalizado: true,
        },
    ]);

    const toggleTarjeta = (index) => {
        const newDatosAnuncios = [...datosAnuncios];
        newDatosAnuncios[index].encendido = !newDatosAnuncios[index].encendido;
        setDatosAnuncios(newDatosAnuncios);
    };

    const moveAnuncio = (dragIndex, hoverIndex) => {
        const draggedAnuncio = datosAnuncios[dragIndex];
        const newDatosAnuncios = [...datosAnuncios];
        newDatosAnuncios.splice(dragIndex, 1);
        newDatosAnuncios.splice(hoverIndex, 0, draggedAnuncio);
        setDatosAnuncios(newDatosAnuncios);
    };

    // Función para reducir la descripción a 20 palabras
    const reducirDescripcion = (descripcion) => {
        if (descripcion.length > 64) {
            return descripcion.slice(0, 64) + "...";
        }
        return descripcion;
    };

    // Dentro de la función que actualiza los datos de los anuncios
    const datosAnunciosActualizados = datosAnuncios.map((anuncio) => {
        let descripcionReducida = anuncio.descripcion;
        if (anuncio.descripcion.length > 64) {
            descripcionReducida = reducirDescripcion(anuncio.descripcion);
        }
        return { ...anuncio, descripcionReducida };
    });

    const Anuncio = ({ anuncio, index }) => {
        const [{ isDragging }, drag] = useDrag({
            type: "anuncio",
            item: { index },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        });

        const [, drop] = useDrop({
            accept: "anuncio",
            hover(item) {
                if (item.index !== index) {
                    moveAnuncio(item.index, index);
                    item.index = index;
                }
            },
        });

        return (
            <div ref={(node) => drag(drop(node))}>
                {anuncio.personalizado ? (
                    <TarjetaAnuncio
                        sala={anuncio.sala}
                        experiencia={anuncio.descripcionReducida}
                        encendido={anuncio.encendido}
                        funcion={() => toggleTarjeta(index)}
                        isDragging={isDragging}
                        imagen={anuncio.imagen}
                        personalizado={true}
                    />
                ) : anuncio.soloImagen ? (
                    <TarjetaAnuncio
                        sala="Imagen en videowall"
                        experiencia="Anuncio sencillo"
                        encendido={anuncio.encendido}
                        funcion={() => toggleTarjeta(index)}
                        isDragging={isDragging}
                        imagen={anuncio.imagen}
                        personalizado={false}
                    />
                ) : (
                    <TarjetaAnuncio
                        sala={anuncio.sala}
                        experiencia={anuncio.experiencia}
                        hora={anuncio.hora}
                        dia={anuncio.dia}
                        encendido={anuncio.encendido}
                        funcion={() => toggleTarjeta(index)}
                        isDragging={isDragging}
                        imagen={anuncio.imagen}
                        personalizado={false}
                    />
                )}
            </div>
        );
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="contenedor-admin-anuncios">
                <h1 className="sub-admin-anuncios">
                    {props.titulo} Administrador de anuncios
                </h1>

                <div className="contenedor-admin-anuncios-in">
                    {datosAnunciosActualizados.map((anuncio, index) => (
                        <Anuncio
                            key={anuncio.id}
                            anuncio={anuncio}
                            index={index}
                        />
                    ))}
                    <div className="degradado-down-anuncios"></div>
                </div>
            </div>
        </DndProvider>
    );
}

export default AdministradorAnuncios;
