import BotonRegresar from "../components/general/BotonRegresar";
import ListaReservaciones from "./ListaReservaciones";
import { useEffect, useState } from "react";
import NameCard from "./NameCard";
import TarjetaLogro from "./TarjetaLogro";
import TarjetaReservacion from "./TarjetaReservacion";
import EsferaPuntosPrioridad from "./EsferaPuntosPrioridad";
import BotonCelular from "./BotonCelular";
import './Profile.css'


function Profile() {

	const [reservaciones, setReservaciones] = useState([]);

	useEffect(() => {
		fetch('https://dreamlab-api.azurewebsites.net/reservaciones/usuario/A0XXXXXX1')
			.then(response => response.json())
			.then(data => {
				setReservaciones(data);
			})
			.catch((error) => {
				console.error('Error:', error);
			});

	}, []);

	return (

		<div>
			<BotonRegresar />
			<NameCard/>

			<div className="div-exterior-perfil">

				<div className="esfera-div-celular">
					<EsferaPuntosPrioridad
						puntos="367"
						subtitulo="Puntos de prioridad"
					/>
				</div>

				<div className="logros-div">

					<h2 className="sub">Logros</h2>

					<div className="logros-div-in">

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
					</div>

				</div>

				<div className="esfera-div">
					<EsferaPuntosPrioridad
						puntos="367"
						subtitulo="Puntos de prioridad"
					/>
				</div>

				<div className="reservaciones-div">

					<h2 className="sub">Reservaciones activas</h2>

					<div className="reservaciones-div-in">

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
					</div>
				</div>

				<div className="botones-modo-celular">
					<BotonCelular texto="Logros" imagen="logros"/>
					<BotonCelular texto="Reservaciones activas" imagen="calendario"/>
				</div>

			</div>
			
			<ListaReservaciones reservations={reservaciones} setReservations={setReservaciones} />
		</div>
	);
}

export default Profile;