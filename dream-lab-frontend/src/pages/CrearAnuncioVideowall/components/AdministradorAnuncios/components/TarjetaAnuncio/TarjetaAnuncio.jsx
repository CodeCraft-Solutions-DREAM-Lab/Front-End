import React from 'react';
import "./TarjetaAnuncio.css";
import ClicImage from "../../../../../../assets/Profile/trash.webp";
import OpenEye from "../../../../../../assets/CrearAnuncioVideowall/openEye.png";
import ClosedEye from "../../../../../../assets/CrearAnuncioVideowall/closedEye.png";

function TarjetaReservacion(props) {
    // Truncar el título si tiene más de 20 caracteres
    const tituloTruncado = props.sala && props.sala.length > 20 ? `${props.sala.slice(0, 20)}...` : props.sala;

    return (
        <div
            className={`div-externo-anuncio ${
                props.encendido ? "" : "apagado"
            }`}
        >
            <div
                style={{ backgroundImage: `url(${props.imagen})` }}
                className="div-imagen-anuncio-izq"
            ></div>

            <div className="div-texto-del-anuncio">
                <div className="first-section-anuncio-card">
                    <div className="div-datos-anuncio">
                        <h1 className="sala-anuncio" title={props.sala}>{tituloTruncado}</h1> {/* Utilizar el título completo como atributo title */}
                        <p
                            className={
                                props.personalizado
                                ? "experiencia-anuncio-personalizado"
                                : "experiencia-anuncio"
                            }
                        >
                            {props.experiencia}
                        </p>
                    </div>

                    <div className="clic-tarjeta-anuncio">
                        <img
                            data-cy="eye-icon"
                            className="clic-image2"
                            src={props.encendido ? OpenEye : ClosedEye}
                            alt="Imagen presionar"
                            onClick={props.funcion}
                        />
                        <img
                            data-cy="trash-icon"
                            className="clic-image"
                            src={ClicImage}
                            alt="Imagen presionar"
                            onClick={props.funcionTrash}
                        />
                    </div>
                </div>

                <div className="linea"></div>

                <div className="div-fecha-anuncio">
                    <div className="hora-anuncio">
                        <p>{props.hora}</p>
                    </div>
                    <div className="dia-anuncio">
                        <p>{props.dia}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TarjetaReservacion;
