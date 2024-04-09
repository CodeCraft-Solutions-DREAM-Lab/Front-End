import BotonRegresar from "../components/general/BotonRegresar";
import ListaReservaciones from "./ListaReservaciones";
import { useEffect, useState } from "react";
import NameCard from "./NameCard";
import TarjetaLogro from "./TarjetaLogro";
import TarjetaReservacion from "./TarjetaReservacion";

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
			<h1 style={{ color: 'white' }}>Perfil de usuario</h1>
			<NameCard/>

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

			<TarjetaReservacion/>

			<ListaReservaciones reservations={reservaciones} setReservations={setReservaciones} />
		</div>
	);
}

export default Profile;