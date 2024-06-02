import "./EsferaPuntosPrioridad.css";
import { useState } from "react";
import { post } from "src/utils/ApiRequests";
import { getFromLocalStorage } from "src/utils/Storage";
import AvisoLogroNuevo from "src/GlobalComponents/AvisoLogroNuevo/AvisoLogroNuevo";

function EsferaPuntosPrioridad(props) {
  const [infoAvisoLogro, setInfoAvisoLogro] = useState("");
  const [notificacionLogroActiva, setNotificacionLogroActiva] = useState(true);

    const handleInfoAvisoLogroChange = async () => {
      try {
        const response2 = await post(
          `logros/progresoLogro/${getFromLocalStorage("user")}/7`
        );
        setInfoAvisoLogro(response2);
        console.log(response2);
      } catch (error) {
        console.error(error);
      }
    };

    if (props.puntos >= 500 && notificacionLogroActiva === true) {
      handleInfoAvisoLogroChange();
      setNotificacionLogroActiva(false);
    }

  return (
    <div className="div-esfera-out agua-animada">
      <div className="div-esfera-in"></div>
      <div className="div-informacion">
        <h1 data-cy="numero-puntos-prioridad" className="puntos-prioridad">
          {props.puntos}
        </h1>
        <h2 className="subtitulo">{props.subtitulo}</h2>
      </div>

      {infoAvisoLogro.nuevaPrioridad != null && (
        <AvisoLogroNuevo isOpen={true} datosLogro={infoAvisoLogro} />
      )}
    </div>
  );
}

export default EsferaPuntosPrioridad;
