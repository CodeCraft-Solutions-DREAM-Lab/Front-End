import React, { useState, useEffect, useRef } from "react";
import BotonBack from "../components/general/BotonBack";
import TarjetaLogro from "./TarjetaLogro";
import './ReservacionesActivas.css'

function Logros(){
    return(
        <div>

        <div className="back-subtitulo-div">
            <div className="boton-back"><BotonBack ruta="/profile/"/></div>
            <h2 className="sub-celular">Logros</h2>
        </div>

        <div className="reservaciones-div-celular">

        <div className="reservaciones-div-in-celular">

                        <TarjetaLogro 
							progresoLogro="0.73"
							nombreLogro="Big Dreamer"
							descripcion="Asiste a más de 35 eventos en el Dream Lab."
							colorFondo="#7885F8"
							iconoUtilizado='LogoBigDreamer'
						/>

						<TarjetaLogro 
							progresoLogro="1"
							nombreLogro="Robot Expert"
							descripcion="Asiste a 3 talleres en el Dimesion Forge."
							colorFondo="#7885F8"
							iconoUtilizado='LogoRobot'
						/>

						<TarjetaLogro 
							progresoLogro="0.5"
							nombreLogro="Apple Developer"
							descripcion="Asiste a 3 talleres de Swift."
							colorFondo="#7885F8"
							iconoUtilizado='LogoRobot'
						/>

                        <TarjetaLogro 
							progresoLogro="0.5"
							nombreLogro="Apple Developer"
							descripcion="Asiste a 3 talleres de Swift."
							colorFondo="#7885F8"
							iconoUtilizado='LogoRobot'
						/>

                        <TarjetaLogro 
							progresoLogro="0.5"
							nombreLogro="Apple Developer"
							descripcion="Asiste a 3 talleres de Swift."
							colorFondo="#7885F8"
							iconoUtilizado='LogoRobot'
						/> 

                        <div className="degradado-down-celular"></div>                 

                </div>
        </div>
    </div>
        )
}

export default Logros;