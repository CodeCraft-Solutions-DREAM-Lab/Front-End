import React, { useState, useEffect, useRef } from "react";
import './ReservacionesActivas.css'
import TarjetaReservacion from "./TarjetaReservacion";
import BotonBack from "../components/general/BotonBack";

function ReservacionesActivas(){
    return(

        <div>

            <div className="back-subtitulo-div">
                <div className="boton-back"><BotonBack ruta="/profile/"/></div>
                <h2 className="sub-celular">Reservaciones activas</h2>
            </div>

            <div className="reservaciones-div-celular">

                        <div className="reservaciones-div-in-celular">

                            <TarjetaReservacion 
                                sala="Sala Horizons"
                                experiencia="VR Experience"
                                hora="3:00 - 5:00 pm."
                                dia="15 de diciembre"
                            />

                            <TarjetaReservacion
                                sala="Dimension Forge"
                                experiencia="Make a Computer - Course"
                                hora="10:00 - 11:00 am."
                                dia="24 de enero"
                            />
                            
                            <TarjetaReservacion
                                sala="Lego Room"
                                experiencia="Swift Course"
                                hora="11:00 am - 1:00 pm."
                                dia="26 de enero"
                            />

                            <TarjetaReservacion
                                sala="Lego Room"
                                experiencia="Swift Course"
                                hora="11:00 am - 1:00 pm."
                                dia="26 de enero"
                            />

                            <TarjetaReservacion
                                sala="Lego Room"
                                experiencia="Swift Course"
                                hora="11:00 am - 1:00 pm."
                                dia="26 de enero"
                            />

                            <TarjetaReservacion
                                sala="Lego Room"
                                experiencia="Swift Course"
                                hora="11:00 am - 1:00 pm."
                                dia="26 de enero"
                            />

                            <div className="degradado-down-celular"></div>                 

                        </div>
            </div>
        </div>
    )
}

export default ReservacionesActivas;