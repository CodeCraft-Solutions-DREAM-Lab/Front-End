import React, { useState, useEffect} from "react";
import "./AdministradorAnuncios.css";
import TarjetaAnuncio from "./components/TarjetaAnuncio/TarjetaAnuncio";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ModalEliminacionAnuncio from "./components/ModalEliminacionAnuncio/ModalEliminacionAnuncio";

function AdministradorAnuncios(props) {
    const [data, setData] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [anuncioIdEliminar, setAnuncioIdEliminar] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch("https://readanuncios-j5zt2ysdwq-uc.a.run.app/");
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const toggleTarjeta = async (index) => {
        const newData = [...data];
        newData[index].encendido = !newData[index].encendido;
        console.log(newData[index].firebaseId, newData[index].encendido, newData[index].posicion);
        setData(newData);
    
        try {
            await fetch(`https://updateanuncio2-j5zt2ysdwq-uc.a.run.app?id=${newData[index].firebaseId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    encendido: newData[index].encendido,
                    posicion: newData[index].posicion,
                }),
            });
        } catch (error) {
            console.error("Error al actualizar el estado de encendido:", error);
        }
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

    const abrirModal = (anuncioId) => {
        setMostrarModal(true);
        setAnuncioIdEliminar(anuncioId);
    };

    const cerrarModal = () => {
        setMostrarModal(false);
    };

    function ajustarHoras(hora) {
        const [horaStr, minutoStr] = hora.split(":");
        let horaNum = parseInt(horaStr, 10);
        let minutoNum = parseInt(minutoStr, 10);
    
        horaNum -= 6;
    
        if (horaNum < 0) {
            horaNum += 24;
        }
    
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
                            : anuncio.personalizado
                            ? anuncio.nombreSala
                            : anuncio.nombreEvento
                    }
                    hora={
                        anuncio.soloImagen || anuncio.personalizado
                            ? null
                            : anuncio.horaInicio + " - " + anuncio.horaFin
                    }
                    dia={anuncio.soloImagen || anuncio.personalizado ? null : anuncio.fecha}
                    encendido={anuncio.encendido}
                    funcion={() => toggleTarjeta(index)}
                    isDragging={isDragging}
                    soloImagen={anuncio.soloImagen}
                    imagen={anuncio.urlImagen}
                    funcionTrash={() => abrirModal(anuncio.firebaseId)} // Pasar el ID del anuncio al abrir el modal
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
                        onClose={cerrarModal}
                        onOk={cerrarModal}
                        anuncioId={anuncioIdEliminar} // Pasar el ID del anuncio a eliminar como prop
                    />
                )}
            </div>
        </DndProvider>
    );
}

export default AdministradorAnuncios;
