import React, { useState, useEffect, useRef } from "react";
import "./AdministradorAnuncios.css";
import TarjetaAnuncio from "./components/TarjetaAnuncio/TarjetaAnuncio";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ModalEliminacionAnuncio from "./components/ModalEliminacionAnuncio/ModalEliminacionAnuncio";

function AdministradorAnuncios(props) {
  const [data, setData] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [anuncioIdEliminar, setAnuncioIdEliminar] = useState(null);
  const [cambiosPendientes, setCambiosPendientes] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(10);
  const [mostrarCambiosAplicados, setMostrarCambiosAplicados] = useState(false);
  const timerRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await fetch("https://readanuncios-j5zt2ysdwq-uc.a.run.app/");
      const jsonData = await response.json();
      jsonData.sort((a, b) => a.posicion - b.posicion);
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
    setData(newData);
    setCambiosPendientes(true);
  };

  const moveAnuncio = async (dragIndex, hoverIndex) => {
    const draggedAnuncio = data[dragIndex];
    const newData = [...data];
    newData.splice(dragIndex, 1);
    newData.splice(hoverIndex, 0, draggedAnuncio);
    setData(newData);
    setCambiosPendientes(true);
  };

  const reducirDescripcion = (descripcion) => {
    if (descripcion && descripcion.length > 64) {
      return descripcion.slice(0, 64) + "...";
    }
    return descripcion;
  };

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
          funcionTrash={() => abrirModal(anuncio.firebaseId)}
          posicion={anuncio.posicion}
          personalizado={anuncio.personalizado}
        />
      </div>
    );
  };

  useEffect(() => {
    if (cambiosPendientes) {
      timerRef.current = setInterval(() => {
        if (tiempoRestante > 0) {
          setTiempoRestante(tiempoRestante - 1);
        } else {
          clearInterval(timerRef.current);
          setCambiosPendientes(false);
          setTiempoRestante(10);
          enviarCambios();
        }
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [cambiosPendientes, tiempoRestante]);

  const enviarCambios = async () => {
    try {
      await Promise.all(data.map(async (anuncio, index) => {
        await fetch(`https://updateanuncio2-j5zt2ysdwq-uc.a.run.app?id=${anuncio.firebaseId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            encendido: anuncio.encendido,
            posicion: index,
          }),
        });
      }));
      console.log("Cambios aplicados");
      setMostrarCambiosAplicados(true);

      // Después de 3 segundos, ocultar el mensaje de cambios aplicados
      setTimeout(() => {
        setMostrarCambiosAplicados(false);
      }, 3000);
    } catch (error) {
      console.error("Error al enviar los cambios:", error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="contenedor-admin-anuncios">
        <h1 className="sub-admin-anuncios">
          {mostrarCambiosAplicados ? "Cambios aplicados satisfactoriamente" : cambiosPendientes ? `Envío de cambios en ${tiempoRestante} segundos` : "Administrador de anuncios"}
        </h1>

        <div className="contenedor-admin-anuncios-in">
          {data.map((anuncio, index) => (
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
            anuncioId={anuncioIdEliminar}
          />
        )}
      </div>
    </DndProvider>
  );
}

export default AdministradorAnuncios;
