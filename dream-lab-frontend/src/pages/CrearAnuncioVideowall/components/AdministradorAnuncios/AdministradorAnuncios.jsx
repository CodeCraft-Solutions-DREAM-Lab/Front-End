import React, { useState, useEffect} from "react";
import "./AdministradorAnuncios.css";
import TarjetaAnuncio from "./components/TarjetaAnuncio/TarjetaAnuncio";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ModalEliminacionAnuncio from "./components/ModalEliminacionAnuncio/ModalEliminacionAnuncio";

function AdministradorAnuncios(props) {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch("https://readanuncios-j5zt2ysdwq-uc.a.run.app/");
            const jsonData = await response.json();
            console.log(jsonData);
            setData(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [mostrarModal, setMostrarModal] = useState(false);

    const toggleTarjeta = (index) => {
        const newData = [...data];
        newData[index].encendido = !newData[index].encendido;
        setData(newData);
    };

    const moveAnuncio = (dragIndex, hoverIndex) => {
        const draggedAnuncio = data[dragIndex];
        const newData = [...data];
        newData.splice(dragIndex, 1);
        newData.splice(hoverIndex, 0, draggedAnuncio);
        setData(newData);
    };

    const reducirDescripcion = (descripcion) => {
        if (descripcion && descripcion.length > 64) {
            return descripcion.slice(0, 64) + "...";
        }
        return descripcion;
    };

    const dataActualizada = data.map((anuncio) => {
        let descripcionReducida = "";
        if (anuncio.descripcion) {
            descripcionReducida = anuncio.descripcion.length > 64 ? reducirDescripcion(anuncio.descripcion) : anuncio.descripcion;
        }
        return { ...anuncio, descripcionReducida };
    });
    

    const abrirModal = () => {
        setMostrarModal(true);
    };

    const cerrarModal = () => {
        setMostrarModal(false);
    };

    function ajustarHoras(hora) {
        // Parseamos la hora en formato "hh:mm"
        const [horaStr, minutoStr] = hora.split(":");
        let horaNum = parseInt(horaStr, 10);
        let minutoNum = parseInt(minutoStr, 10);
    
        // Restamos 6 horas
        horaNum -= 6;
    
        // Si la hora es negativa, restamos un día y ajustamos la hora
        if (horaNum < 0) {
            horaNum += 24;
        }
    
        // Convertimos de nuevo a cadena y formateamos
        const horaAjustada = `${horaNum.toString().padStart(2, "0")}:${minutoNum.toString().padStart(2, "0")}`;
    
        return horaAjustada;
    }
    
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

        const fechaFormateada = anuncio.fecha.split(" ")[0] + " " + anuncio.fecha.split(" ")[2] + ", " + anuncio.fecha.split(" ")[4];

        const horaInicioAjustada = ajustarHoras(anuncio.horaInicio);
        const horaFinAjustada = ajustarHoras(anuncio.horaFin);

        return (
            <div ref={(node) => drag(drop(node))}>
                <TarjetaAnuncio
                    experiencia={
                        anuncio.soloImagen
                            ? "Imagen en videowall"
                            : anuncio.personalizado
                            ? anuncio.descripcionReducida
                            : anuncio.nombreSala
                    }
                    sala={
                        anuncio.soloImagen
                            ? "Anuncio sencillo"
                            : anuncio.nombreEvento
                    }
                    hora={
                        anuncio.soloImagen || anuncio.personalizado
                            ? null
                            : horaInicioAjustada + " - " + horaFinAjustada
                    }
                    dia={anuncio.soloImagen ? null : fechaFormateada}
                    encendido={anuncio.encendido}
                    funcion={() => toggleTarjeta(index)}
                    isDragging={isDragging}
                    soloImagen={anuncio.soloImagen}
                    imagen={anuncio.urlImagen}
                    funcionTrash={abrirModal}
                    posicion={anuncio.posicion}
                    personalizado={anuncio.personalizado}
                />
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
                    {dataActualizada.map((anuncio, index) => (
                        <Anuncio
                            key={anuncio.id}
                            anuncio={anuncio}
                            index={index}
                        />
                    ))}
                    <div className="degradado-down-anuncios"></div>
                </div>

                {mostrarModal && (
                    <ModalEliminacionAnuncio
                        size="2xl"
                        cerrarModal={cerrarModal}
                        isOpen={true}
                        onClose={() => {
                            cerrarModal();
                        }}
                        onOk={() => {
                            cerrarModal();
                        }}
                    />
                )}
            </div>
        </DndProvider>
    );
}

export default AdministradorAnuncios;


